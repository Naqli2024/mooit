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

export const createSalesInvoice = createAsyncThunk(
  "createSalesInvoice",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/create-salesInvoice`,
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const generateInvoiceId = createAsyncThunk(
  "generateInvoiceId",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/generateInvoiceId`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllInvoices = createAsyncThunk(
  "getAllInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/getAllInvoices`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteSalesInvoiceByInvoiceId = createAsyncThunk(
  "deleteSalesInvoiceByInvoiceId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/delete-salesInvoice/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editSalesInvoice = createAsyncThunk(
  "editSalesInvoice",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${baseUrl}/edit-salesInvoice`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const generateOrderNo = createAsyncThunk(
  "generateOrderNo",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/generateOrderNo`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const salesInvoiceSlice = createSlice({
  name: "salesInvoice",
  initialState: {
    loading: false,
    salesInvoiceData: null,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFulFilled = (state, action) => {
      state.loading = false;
      state.salesInvoiceData = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.salesInvoiceData = {};
      state.error = action.payload;
    };
    [
      createSalesInvoice,
      generateInvoiceId,
      getAllInvoices,
      deleteSalesInvoiceByInvoiceId,
      editSalesInvoice,
      generateOrderNo,
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default salesInvoiceSlice.reducer;
