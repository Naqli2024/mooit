import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPackages = createAsyncThunk(
  "getAllPackages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/getAllPackage"
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "An error occured"
      );
    }
  }
);

const getAllPackagesSlice = createSlice({
    name: "getAllPackages",
    initialState: {
        loading: false,
        packageList: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllPackages.pending, state => {
            state.loading = true
        })
        .addCase(getAllPackages.fulfilled, (state, action) => {
            state.loading = false;
            state.packageList = action.payload;
            state.error = null
        })
        .addCase(getAllPackages.rejected, (state, action) => {
            state.loading = false;
            state.packageList = null;
            state.error = action.payload
        })
    }
})

export default getAllPackagesSlice.reducer;