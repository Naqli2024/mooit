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

export const createWarehouse = createAsyncThunk(
  "createWarehouse",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/create-warehouse`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllWarehouses = createAsyncThunk(
  "allWarehouses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/getAllWarehouses`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteWarehouse = createAsyncThunk(
  "deleteWarehouse",
  async(id, {rejectWithValue}) => {
    try {
      const {data} = await axios.delete(`${baseUrl}/delete-warehouse/${id}`)
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const createSpace = createAsyncThunk(
  "createSpace",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/create-space`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createSpaceStructure = createAsyncThunk(
  "createSpaceStructure",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/create-space-structure`,
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const warehouseSlice = createSlice({
  name: "warehouseSlice",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFulFilled = (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.data = {};
      state.error = action.payload;
    };
    [
      createWarehouse,
      getAllWarehouses,
      createSpace,
      createSpaceStructure,
      deleteWarehouse
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default warehouseSlice.reducer;
