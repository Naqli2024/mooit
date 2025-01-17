import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const findPurchaseByItemName = createAsyncThunk(
  "findPurchase/findPurchaseByItemName",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/getPurchase",
        data
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const findPurchaseSlice = createSlice({
  name: "findPurchase",
  initialState: {
    loading: false,
    product: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(findPurchaseByItemName.pending, (state) => {
        state.loading = true
    })
    .addCase(findPurchaseByItemName.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload
    })
    .addCase(findPurchaseByItemName.rejected, (state, action) => {
        state.loading = false;
        state.data = action.payload
    })
  }
});

export default findPurchaseSlice.reducer;