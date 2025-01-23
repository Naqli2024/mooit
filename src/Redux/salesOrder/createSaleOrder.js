import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createSaleOrder = createAsyncThunk(
  "saleOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/create-saleOrder",
        payload
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occurred"
      );
    }
  }
);

const createSaleOrderSlice = createSlice({
  name: "saleOrder",
  initialState: {
    loading: false,
    saleOrder: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSaleOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSaleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.saleOrder = action.payload;
      })
      .addCase(createSaleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default createSaleOrderSlice.reducer;
