import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPurchaseDetails = createAsyncThunk(
  "getPurchaseDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/getPurchaseList"
      );
      return response.data && response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const getPurchaseDetailsSlice = createSlice({
  name: "getPurchaseDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPurchaseDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPurchaseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPurchaseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getPurchaseDetailsSlice.reducer;
