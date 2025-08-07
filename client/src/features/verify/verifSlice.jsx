import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/api";

// verify-user url
const VERIFY_URL = "/verify";

// post data to the backend
export const verifyData = createAsyncThunk(
  "verify/verifyData",
  async ({ email, otp }, thunkApi) => {
    try {
      const res = await api.post(VERIFY_URL, {
        email,
        verificationCode: otp,
      });
      return res.data;
    } catch (error) {
      console.log(error.response);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// handle verify slice
const initialState = {
  isLoading: false,
  isError: null,
  isSuccess: false,
  user: null,
};

export const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyData.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = false;
      })
      .addCase(verifyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(verifyData.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = action.payload || "Something went wrong";
      });
  },
});

export default verifySlice.reducer;
