import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const generateSalesOrderId = createAsyncThunk(
  "generateSalesOrderId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/generateSalesOrderId"
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

const generateSalesOrderIdSlice = createSlice({
    name: "generateSalesOrderId",
    initialState: {
        loading: false,
        salesOrderId: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(generateSalesOrderId.pending, state => {
            state.loading = true
        })
        .addCase(generateSalesOrderId.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null
        })
        .addCase(generateSalesOrderId.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload
        })
    }
})

export default generateSalesOrderIdSlice.reducer;