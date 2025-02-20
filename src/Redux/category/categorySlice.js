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

export const createCategory = createAsyncThunk(
  "createCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/createCategory`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createSubCategory = createAsyncThunk(
  "createSubCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/category/subcategory`,
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const addProduct = createAsyncThunk(
  "addProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/category/product`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllCategories = createAsyncThunk(
  'getAllCategories',
  async(_, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(`${baseUrl}/getAllCategories`);
      return data.data
    }catch(error) {
      return rejectWithValue(handleApiError(error))
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'deleteCategory', 
  async(id, {rejectWithValue}) => {
    try {
      const {data} = await axios.delete(`http://localhost:4000/api/deleteCategory/${id}`)
      return data;
    }catch(error) {
      return rejectWithValue(handleApiError(error))
    }
  }
)

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    category: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFulFilled = (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.category = null;
      state.error = action.payload;
    };
    [createCategory, createSubCategory, addProduct, getAllCategories, deleteCategory].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default categorySlice.reducer;
