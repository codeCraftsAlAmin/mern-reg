import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/api";

const RESEND_URL = "/resend-verification";

// post data to the backend
export const resendVerifyData = createAsyncThunk(
  "resend/resendVerifyData",
  async ({ email }, thunkApi) => {
    try {
      const res = await api.post(RESEND_URL, { email });
      return res.data;
    } catch (error) {
      console.log(error.response);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// handle resend slice
const initialState = {
  isLoading: false,
  isError: null,
  isSuccess: false,
  user: null,
  verificationExpiresAt: null,
};

export const resendSlice = createSlice({
  name: "resend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resendVerifyData.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = false;
      })
      // remove the fulfilled case - let register slice handle it
      .addCase(resendVerifyData.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = action.payload || "Something went wrong";
      });
  },
});

export default resendSlice.reducer;
