import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPackageDetails = createAsyncThunk(
  "getPackageDetails",
  async (id, { rejectedWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/getPackageDetailsByPackageSlip/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectedWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occured"
      );
    }
  }
);

const getPackageDetailsByPackageSlipSlice = createSlice({
    name: "getPackageDetails",
    initialState: {
        loading: false,
        packageDetail: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPackageDetails.pending, state => {
            state.loading = true
        })
        builder.addCase(getPackageDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.packageDetail = action.payload;
            state.error = null
        })
        builder.addCase(getPackageDetails.rejected, (state, action) => {
            state.loading = false;
            state.packageDetail = null;
            state.error = action.payload
        })
    }
})

export default getPackageDetailsByPackageSlipSlice.reducer;