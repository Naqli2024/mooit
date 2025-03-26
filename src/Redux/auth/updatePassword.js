import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:4000/api/auth";

const handleApiError = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "An unknown error occurred"
  );
};

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/update-password`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/forget-password`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    };
    [updatePassword, forgetPassword].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulfilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default passwordSlice.reducer;
