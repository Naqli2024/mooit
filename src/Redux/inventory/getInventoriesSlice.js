import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getInventories = createAsyncThunk(
  "getInventories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/getInventory"
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const getInventoriesSlice = createSlice({
  name: "getInventories",
  initialState: {
    loading: false,
    inventories: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInventories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInventories.fulfilled, (state, action) => {
        state.loading = false;
        state.inventories = action.payload;
      })
      .addCase(getInventories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getInventoriesSlice.reducer;
