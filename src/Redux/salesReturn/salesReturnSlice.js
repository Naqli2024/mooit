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

export const createSalesReturn = createAsyncThunk(
  "createSalesReturn",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/create-salesReturn`,
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const generateSalesReturnNumber = createAsyncThunk(
  "generateSalesReturnNumber",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/generateSalesReturnNumber`);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllSalesReturn = createAsyncThunk(
  "getAllSalesReturn",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/getAllSalesReturn`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteSalesReturnBySalesReturnId = createAsyncThunk(
  "deleteSalesReturnBySalesReturnId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/deleteSalesReturnBySalesReturnId/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const salesReturnSlice = createSlice({
  name: "salesReturn",
  initialState: {
    loading: false,
    salesReturnData: null,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFulFilled = (state, action) => {
      state.loading = false;
      state.salesReturnData = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.salesReturnData = state.customers || {};
      state.error = action.payload;
    };
    [
      createSalesReturn,
      generateSalesReturnNumber,
      getAllSalesReturn,
      deleteSalesReturnBySalesReturnId,
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default salesReturnSlice.reducer;
