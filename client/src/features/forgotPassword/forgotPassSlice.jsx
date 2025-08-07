import api from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// submit email to backend
export const forgotPass = createAsyncThunk(
  "passwordSlice/forgotPass",
  async ({ email }, thunkApi) => {
    try {
      const res = await api.post(
        "/forget-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //   console.log(res.data.payload?.token);
      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

// handle forgot password slice
const initialState = {
  isLoading: false,
  verifyToken: null,
  isError: null,
  isSuccess: null,
};

export const forgotPasswordSlice = createSlice({
  name: "passwordSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(forgotPass.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(forgotPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verifyToken = action.payload.payload?.token;
        state.isSuccess = action.payload.message;
        state.isError = null;
      })
      .addCase(forgotPass.rejected, (state, action) => {
        state.isLoading = false;
        state.verifyToken = null;
        state.isSuccess = false;
        state.isError = action.payload;
      });
  },
});

export default forgotPasswordSlice.reducer;
