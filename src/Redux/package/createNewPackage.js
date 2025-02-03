import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createNewPackage = createAsyncThunk(
  "newPackage",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/create-package",
        payload
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

const newPackageSlice = createSlice({
  name: "newPackage",
  initialState: {
    loading: false,
    package: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewPackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.package = action.payload;
        state.error = null;
      })
      .addCase(createNewPackage.rejected, (state, action) => {
        state.loading = false;
        state.package = null;
        state.error = action.payload;
      });
  },
});

export default newPackageSlice.reducer;
