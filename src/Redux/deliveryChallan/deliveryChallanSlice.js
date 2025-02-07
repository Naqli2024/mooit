import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:4000/api";

const handleApiError = (error) => {
  return (
    error?.response?.data?.message ||
    error.message ||
    "An unknown error occured"
  );
};

export const createDeliveryChallan = createAsyncThunk(
  "createDeliveryChallan",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/create-challan`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllChallans = createAsyncThunk(
  "getAllChallans",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/getAllChallan`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const generateDeliveryChallan = createAsyncThunk(
  "generateDeliveryChallan",
  async (_, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${baseUrl}/deliveryChallan`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getChallanBySalesOrderId = createAsyncThunk(
  "getChallanBySalesOrderId",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/getChallanBySalesOrderId/${id}`
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deletedChallanBySaleOrderId = createAsyncThunk(
  'deletedChallanBySaleOrderId',
  async(id, {rejectWithValue}) => {
    try {
      const {data} = await axios.delete(`${baseUrl}/deleteChallanBySaleOrderId/${id}`)
      return data;
    }catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

const deliveryChallanSlice = createSlice({
  name: "deliveryChallan",
  initialState: {
    loading: false,
    challan: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFulFilled = (state, action) => {
      state.loading = false;
      state.challan = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.challan = null;
      state.error = action.payload;
    };
    [
      createDeliveryChallan,
      getAllChallans,
      generateDeliveryChallan,
      getChallanBySalesOrderId,
      deletedChallanBySaleOrderId
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default deliveryChallanSlice.reducer;
