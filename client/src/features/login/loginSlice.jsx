import api from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// login url
const LOGIN_URL = "/login";

// REFRESH TOKEN --> regenerate access token and restore user info
export const restoreUser = createAsyncThunk(
  "login/restoreUser",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/refresh-token");
      const user = res.data.payload.userInfo;
      return user;
    } catch (error) {
      // don't treat failed restoration as an error for UI purposes
      console.log("Session expired error", error);
      return thunkAPI.rejectWithValue("Session expired");
    }
  }
);

// post data to the backend
export const loginUserData = createAsyncThunk(
  "login/loginUserData",
  async (userData, thunkApi) => {
    try {
      const res = await api.post(LOGIN_URL, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// handle register slice
const initialState = {
  user: null,
  isLoading: false,
  isError: null,
  isLoggedIn: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // for log out
    clearUserData: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isError = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserData.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isLoggedIn = false;
      })
      .addCase(loginUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.payload?.loggedUser;
        state.isLoggedIn = true;
      })
      .addCase(loginUserData.rejected, (state, action) => {
        state.isLoading = false;
        console.log("Full error in rejected:", action);
        state.isError = action.payload;
      })
      .addCase(restoreUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(restoreUser.rejected, (state) => {
        // Don't set error state for failed restoration
        // This prevents showing error messages on initial load
        state.isLoggedIn = false;
        state.isLoading = false;
        state.user = null;
        // Don't set isError here to avoid showing error messages
      });
  },
});

export const { clearUserData } = loginSlice.actions;
export default loginSlice.reducer;
