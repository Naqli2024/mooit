import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteSaleOrderById = createAsyncThunk(
  "deleteSaleOrderById",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/deleteSaleOrderById/${_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occured"
      );
    }
  }
);

const deleteSaleOrderByIdSlice = createSlice({
  name: "deleteSaleOrderById",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSaleOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSaleOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deleteSaleOrderById.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      });
  },
});

export default deleteSaleOrderByIdSlice.reducer;
