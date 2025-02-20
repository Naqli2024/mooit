import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const generateShipmentOrder = createAsyncThunk(
  "generateShipmentOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/generateShipmentOrder"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Unknown Error"
      );
    }
  }
);

export const createShipment = createAsyncThunk(
  "createShipment",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/createShipment",
        payload
      );
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || "Unknown Error";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getShipmentDetails = createAsyncThunk(
  "getShipmentDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/getShipmentDetails/${id}`
      );
      return response.data.data;
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "An error occured"
      );
    }
  }
);

export const deleteShipmentByShipmentOrder = createAsyncThunk(
  "deleteShipmentOrder",
  async (shipmentOrder, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/deleteShipmentByShipmentOrder/${shipmentOrder}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "An error occured"
      );
    }
  }
);

export const updateShipmentStatus = createAsyncThunk(
  "updateShipmentStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/updateShipmentStatus",
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "An error occured"
      );
    }
  }
);

export const getAllShipment = createAsyncThunk(
  "getAllShipment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/getAllShipment"
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "An error occured"
      );
    }
  }
);

const shipmentSlice = createSlice({
  name: "shipmentSlice",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    };
    [
      generateShipmentOrder,
      createShipment,
      getShipmentDetails,
      deleteShipmentByShipmentOrder,
      updateShipmentStatus,
      getAllShipment,
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulfilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default shipmentSlice.reducer;
