import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createInventory = createAsyncThunk(
  "createInventory",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/create-inventory",
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unknown error occurred');
    }
  }
);


const createInventorySlice = createSlice({
    name: "createInventory",
    initialState: {
        loading: false,
        inventory: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createInventory.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(createInventory.fulfilled, (state, action) => {
            state.loading = false;
            state.inventory = action.payload
        })
        .addCase(createInventory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default createInventorySlice.reducer;