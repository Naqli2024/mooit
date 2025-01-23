import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllSalesOrder = createAsyncThunk(
  "getAllSalesOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/getAllSalesOrders"
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const getAllSalesOrderSlice = createSlice({
  name: "getAllSalesOrder",
  initialState: {
    loading: false,
    allSaleOrder: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSalesOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSalesOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.allSaleOrder = action.payload;
      })
      .addCase(getAllSalesOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getAllSalesOrderSlice.reducer;
