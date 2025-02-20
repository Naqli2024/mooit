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

export const createNewCustomer = createAsyncThunk(
  "createNewCustomer",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/createNewCustomer`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllCustomers = createAsyncThunk(
  "getAllCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/getAllCustomers`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getCustomerDetailsById = createAsyncThunk(
  "getCustomerDetialsById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/getCustomerDetailsById/${id}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateOrCreateCustomer = createAsyncThunk(
  "updateOrCreateCustomer",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/updateOrCreateCustomer/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteCustomerById = createAsyncThunk(
  "deleteCustomerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/deleteCustomerById/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    loading: false,
    customers: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFulFilled = (state, action) => {
      state.loading = false;
      state.customers = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.customers = state.customers || {};
      state.error = action.payload;
    };
    [
      createNewCustomer,
      getAllCustomers,
      getCustomerDetailsById,
      updateOrCreateCustomer,
      deleteCustomerById,
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default customerSlice.reducer;
