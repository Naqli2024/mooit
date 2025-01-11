import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createPurchase = createAsyncThunk(
  "purchase/createPurchase",
  async (purchaseData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/create-purchase",
        purchaseData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPurchase.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default purchaseSlice.reducer;
