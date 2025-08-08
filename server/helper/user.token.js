const isProduction = process.env.NODE_ENV === "production";

// create access token
const setAccessToken = async (res, accessToken) => {
  try {
    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000, // 15mins
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });
  } catch (error) {
    throw error;
  }
};

// create refresh token
const setRefreshToken = async (res, refreshToken) => {
  try {
    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { setAccessToken, setRefreshToken };
