import api from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateUserInfo = createAsyncThunk(
  "update/updateUserInfo",
  async ({ updatedData, id }, thunkApi) => {
    try {
      const formData = new FormData();

      Object.entries(updatedData).forEach(([key, value]) => {
        // only non-empty values will be accepted and the other fields will be skiped
        if (value !== "" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      const res = await api.put(`/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(res.data.message);
      return res.data.message;
    } catch (error) {
      // console.log(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

// handle initial state
const initialState = {
  isSuccess: null,
  isLoading: false,
  isError: false,
};

// create slice
export const updateUserSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.isSuccess = null;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = null;
        state.isError = action.payload;
      });
  },
});

export const { clearMessage } = updateUserSlice.actions;
export default updateUserSlice.reducer;
