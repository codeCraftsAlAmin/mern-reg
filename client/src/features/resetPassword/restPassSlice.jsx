import api from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// pass data to backend
export const resetPass = createAsyncThunk(
  "resetPasswordSlice/resetPass",
  async ({ token, password }, thunkApi) => {
    try {
      const res = await api.put(
        "/reset-password",
        { token, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //   console.log(res.data.message);
      return res.data.message;
    } catch (error) {
      //   console.log(error.response.data);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

// handle reset password slice
const initialState = {
  isLoading: false,
  isError: null,
  isSuccess: null,
};

export const resetPasswordSlice = createSlice({
  name: "resetPasswordSlice",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.isLoading = null;
      state.isError = null;
      state.isSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPass.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(resetPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.isSuccess = action.payload;
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.isSuccess = null;
      });
  },
});

export const { clearMessage } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
