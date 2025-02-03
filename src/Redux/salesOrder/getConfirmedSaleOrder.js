import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getConfirmedSaleOrder = createAsyncThunk(
  "getConfirmedSaleOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/getSaleOrderConfirmed"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "An unknown error occured"
      );
    }
  }
);

const getConfirmedSaleOrderSlice = createSlice({
  name: "getConfirmedSaleOrder",
  initialState: {
    loading: false,
    sales: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfirmedSaleOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getConfirmedSaleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
        state.error = null;
      })
      .addCase(getConfirmedSaleOrder.rejected, (state, action) => {
        state.loading = false;
        state.sales = null;
        state.error = action.payload;
      });
  },
});

export default getConfirmedSaleOrderSlice.reducer;
