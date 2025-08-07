import axios from "axios";

// axios instance with credential
const api = axios.create({
  baseURL: " http://localhost:4000/api",
  withCredentials: true,
});

// global state for refresh timer controll
let refreshTimeoutId = null;
let isAutoRefreshEnabled = true;

// decode JWT token
const getTokenPayload = (token) => {
  try {
    const base64Payload = token.split(".")[1];
    const jsonPayload = atob(
      base64Payload.replace(/-/g, "+").replace(/_/g, "/")
    );
    return JSON.parse(decodeURIComponent(escape(jsonPayload)));
  } catch (error) {
    console.error("Failed to decode token payload:", error);
    return null;
  }
};

// refresh access token
export const refreshAccessToken = async () => {
  try {
    const res = await api.get("/refresh-token", {
      headers: {
        "Cache-Control": "no-store",
      },
    });
    console.log("Access token refreshed");
    return res.data.payload?.userInfo;
  } catch (err) {
    console.error("Refresh token failed:", err);
    // Stop proactive refresh on 401 errors
    if (err.response?.status === 401) {
      stopProactiveRefresh();
    }
    return null;
  }
};

// get access token from cookie(client-site)
export const getAccessTokenFromCookie = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/accessToken=([^;]+)/);
  return match ? match[1] : null;
};

// stop proactive refresh(on log out)
export const stopProactiveRefresh = () => {
  isAutoRefreshEnabled = false;
  if (refreshTimeoutId) clearTimeout(refreshTimeoutId);
  refreshTimeoutId = null;
  console.log("Proactive refresh stopped");
};

// start proactive token refresh
export const setupProactiveRefresh = () => {
  if (refreshTimeoutId) clearTimeout(refreshTimeoutId);

  // don't setup if refresh is disabled
  if (!isAutoRefreshEnabled) {
    console.log("Auto refresh is disabled, skipping setup");
    return;
  }

  const token = getAccessTokenFromCookie();
  if (!token) {
    console.log("No access token found, skipping proactive refresh");
    return;
  }

  const payload = getTokenPayload(token);
  if (!payload?.exp) {
    console.log("Invalid token payload, skipping proactive refresh");
    return;
  }

  const now = Math.floor(Date.now() / 1000);
  const refreshInMs = (payload.exp - now - 60) * 1000; // refresh 60s before expiry

  if (refreshInMs <= 0) {
    console.warn(
      "Access token already expired or near expiry. Skipping proactive refresh."
    );
    return;
  }

  console.log("Scheduling token refresh in", refreshInMs / 1000, "seconds");

  refreshTimeoutId = setTimeout(async () => {
    if (!isAutoRefreshEnabled) {
      console.log("Auto refresh disabled during timeout, aborting");
      return;
    }

    try {
      const refreshedUser = await refreshAccessToken();
      if (refreshedUser) {
        setupProactiveRefresh(); // re-schedule only if successful
      } else {
        console.warn("User not refreshed. Stopping refresh.");
        stopProactiveRefresh();
      }
    } catch (err) {
      console.error("Auto-refresh failed:", err);
      stopProactiveRefresh();
    }
  }, refreshInMs);
};

// axios interceptors for auto retry on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Don't retry refresh-token requests to avoid infinite loops
    if (originalRequest.url?.includes("/refresh-token")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshedUser = await refreshAccessToken();

      if (refreshedUser) {
        setupProactiveRefresh();
        return api(originalRequest);
      } else {
        stopProactiveRefresh();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
