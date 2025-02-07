import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:4000/api";

const handleApiError = (error) => {
  return (
    error?.response?.data?.message ||
    error.message ||
    "An unknown error occurred"
  );
};

export const createNewVendor = createAsyncThunk(
  "createNewVendor",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/createNewVendor`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllVendors = createAsyncThunk(
  "getAllVendors",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/getAllVendors`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getVendorDetailsById = createAsyncThunk(
  "getVendorDetialsById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/getVendorDetailsById/${id}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateVendorWithPurchase = createAsyncThunk(
  "updateVendorWithPurchase",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/updateVendorWithPurchase`,
        payload
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateOrCreateVendor = createAsyncThunk(
  "updateOrCreateVendor",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/updateOrCreateVendor/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteVendorById = createAsyncThunk(
  "deleteVendorById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/deleteVendorById/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
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
      state.vendors = state.vendors || {};
      state.error = action.payload;
    };
    [
      createNewVendor,
      getAllVendors,
      getVendorDetailsById,
      updateVendorWithPurchase,
      updateOrCreateVendor,
      deleteVendorById,
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default vendorSlice.reducer;
