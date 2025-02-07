import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deletePackageByPackageSlip = createAsyncThunk(
  "deletePackage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/deletePackageByPackageSlip/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occured"
      );
    }
  }
);

const deletePackageSlice = createSlice({
  name: "deletePackage",
  initialState: {
    loading: false,
    deletedPackage: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePackageByPackageSlip.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePackageByPackageSlip.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedPackage = action.payload;
        state.error = null;
      })
      .addCase(deletePackageByPackageSlip.rejected, (state, action) => {
        state.loading = false;
        state.deletedPackage = null;
        state.error = action.payload;
      });
  },
});

export default deletePackageSlice.reducer;
