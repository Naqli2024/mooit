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

export const addJobRoles = createAsyncThunk(
  "addJobRoles",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/addJobRoles`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getJobRoles = createAsyncThunk(
  "getJobRoles",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/getJobRoles`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteJobRoles = createAsyncThunk(
  "deleteJobRoles",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/deleteJobRoles`, {
        data: payload,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editJobRoles = createAsyncThunk(
  "editJobRoles",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${baseUrl}/editJobRoles`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const employeeRoles = createSlice({
  name: "employeeRoles",
  initialState: {
    loading: false,
    empData: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.empData = null;
      state.error = null;
    };
    const handleFulFilled = (state, action) => {
      state.loading = false;
      state.empData = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.empData = null;
      state.error = action.payload;
    };
    [addJobRoles, getJobRoles, deleteJobRoles, editJobRoles].forEach(
      (action) => {
        builder
          .addCase(action.pending, handlePending)
          .addCase(action.fulfilled, handleFulFilled)
          .addCase(action.rejected, handleRejected);
      }
    );
  },
});

export default employeeRoles.reducer;
