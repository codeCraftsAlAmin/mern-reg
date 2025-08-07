import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { resendVerifyData } from "../verify/resendSlice";

// process-register url
const REGISTER_URL = "/process-register";

// post data to the backend
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData, thunkApi) => {
    try {
      const formData = new FormData();

      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await api.post(REGISTER_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      // console.log("Error response: ", error.response);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// handle register state
const initialState = {
  user: null,
  isLoading: false,
  isError: null,
  isSuccess: false,
  email: "",
  verificationExpiresAt: null,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.email = action.payload?.payload?.email;
        state.verificationExpiresAt =
          action.payload?.payload?.verificationExpiresAt;
        state.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Something went wrong";
      })
      // resend verification
      .addCase(resendVerifyData.fulfilled, (state, action) => {
        if (action.payload?.payload?.verificationExpiresAt) {
          state.verificationExpiresAt =
            action.payload.payload.verificationExpiresAt;
        }
      });
  },
});

export default registerSlice.reducer;
