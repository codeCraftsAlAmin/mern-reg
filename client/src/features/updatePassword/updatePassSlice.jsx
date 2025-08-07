import api from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// submit info and id
export const updateUserPassword = createAsyncThunk(
  "updatePassword/updateUserPassword",
  async ({ updatedData, id }, thunkApi) => {
    try {
      const res = await api.put(`password-update/${id}`, updatedData, {
        "Content-Type": "application/json",
      });
      // console.log(res.data.message);
      return res.data.message;
    } catch (error) {
      //   console.log(error.response.data);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

// update password slice
const initialState = {
  isLoading: null,
  isError: null,
  isSuccess: null,
};

export const updateUserPassSlice = createSlice({
  name: "updatePassword",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.isSuccess = null;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.isLoading = null;
        state.isSuccess = action.payload;
        state.isError = null;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isLoading = null;
        state.isSuccess = null;
        state.isError = action.payload;
      });
  },
});

export const { clearMessage } = updateUserPassSlice.actions;

export default updateUserPassSlice.reducer;
