import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createNewVendor = createAsyncThunk(
  "createNewVendor",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/createNewVendor",
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "An unknown error occured"
      );
    }
  }
);

export const getAllVendors = createAsyncThunk(
  "getAllVendors",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/getAllVendors"
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "An unknown error occured"
      );
    }
  }
);

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    loading: false,
    vendors: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFulFilled = (state, action) => {
      state.loading = false;
      state.vendors = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.vendors = null;
      state.error = action.payload;
    };
    [createNewVendor, getAllVendors].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default vendorSlice.reducer;
