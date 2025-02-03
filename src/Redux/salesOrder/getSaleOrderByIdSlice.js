import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSaleOrderBySaleOrderId = createAsyncThunk(
  "getSaleOrderById",
  async (saleOrderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/getSaleOrderBySaleOrderId/${saleOrderId}`
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

const getSaleOrderBySaleOrderIdSlice = createSlice({
  name: "getSaleOrderById",
  initialState: {
    loading: false,
    saleOrderData: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSaleOrderBySaleOrderId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSaleOrderBySaleOrderId.fulfilled, (state, action) => {
        state.loading = false;
        state.saleOrderData = action.payload;
        state.error = null;
      })
      .addCase(getSaleOrderBySaleOrderId.rejected, (state, action) => {
        state.loading = false;
        state.saleOrderData = null;
        state.error = action.payload;
      });
  },
});

export default getSaleOrderBySaleOrderIdSlice.reducer;
