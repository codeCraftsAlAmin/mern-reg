import api from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// get all users
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async ({ page = 1, limit = 5, search = "" } = {}, thunkApi) => {
    try {
      const res = await api.get(
        `/users?page=${page}&limit=${limit}&search=${search}`
      );
      const users = res.data.payload;
      // console.log(users);
      return users;
    } catch (error) {
      // console.log(error.response.data.message);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

// delete user by id
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkApi) => {
    try {
      const res = await api.delete(`/users/${id}`);
      // console.log(res.data.message);
      return res.data.message;
    } catch (error) {
      console.log(error.message.data);
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

// handle user actions
export const userActions = createAsyncThunk(
  "users/userActions",
  async ({ id, action }, thunkApi) => {
    try {
      const res = await api.put(`/action-user/${id}`, { action });
      // console.log(res.data.payload.successMessage);
      return res.data.payload;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

// handle get all users and search box slice
const initialState = {
  users: null,
  isLoading: false,
  isError: null,
  isPagination: null,
  isSuccess: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearSuccessMessage: (state) => {
      state.isSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.users = action.payload.users;
        state.isPagination = action.payload.pagination;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.users = null;
        state.isError = action.payload;
        state.isPagination = null;
      })
      .addCase(userActions.fulfilled, (state, action) => {
        state.isSuccess = action.payload.successMessage;
      })
      .addCase(userActions.rejected, (state, action) => {
        state.isError = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isSuccess = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isError = action.payload;
      });
  },
});

export const { clearSuccessMessage } = usersSlice.actions;
export default usersSlice.reducer;
