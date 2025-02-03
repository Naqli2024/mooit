import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPackageId = createAsyncThunk(
  "getPackageId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/generatePackageSlip"
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occured"
      );
    }
  }
);

const getPackageIdSlice = createSlice({
  name: "getPackageId",
  initialState: {
    loading: false,
    packageId: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPackageId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPackageId.fulfilled, (state, action) => {
        state.loading = false;
        state.packageId = action.payload;
        state.error = null;
      })
      .addCase(getPackageId.rejected, (state, action) => {
        state.loading = false;
        state.packageId = null;
        state.error = action.payload;
      });
  },
});

export default getPackageIdSlice.reducer;
