import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPurchaseByproductName = createAsyncThunk(
  "getPurchaseByproductName",
  async (productNames, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/getPurchaseByproductName', {productNames}
      );
      return response.data?.data || [];
    } catch (error) {
      console.log(error)
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getPurchaseByproductNameSlice = createSlice({
  name: "getPurchaseByproductName",
  initialState,
  reducers: {
    clearProductData: (state) => {
      state.data = []; // Clear previous data when needed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPurchaseByproductName.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPurchaseByproductName.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
        state.error = null;
      })
      .addCase(getPurchaseByproductName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = []; 
      });
  },
});

export const { clearProductData } = getPurchaseByproductNameSlice.actions;
export default getPurchaseByproductNameSlice.reducer;
