import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const findPurchaseById = createAsyncThunk(
  "findProduct/findPurchaseById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/getPurchaseById/${id}`
      );
      return response.data && response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const findPurchaseByIdSlice = createSlice({
  name: "findProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findPurchaseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(findPurchaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(findPurchaseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default findPurchaseByIdSlice.reducer;
