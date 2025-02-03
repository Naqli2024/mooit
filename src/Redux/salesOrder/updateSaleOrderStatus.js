import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateSaleOrderStatus = createAsyncThunk(
    "updateSaleOrderStatus",
    async(payload, {rejectWithValue}) => {
        try {
            const response = await axios.put('http://localhost:4000/api/updateSaleOrderStatus', payload)
            return response.data.data
        }catch(error) {
            return rejectWithValue(error.response?.data?.message || error.message || "Unknown error")
        }
    }
)

const updateSaleOrderStatusSlice = createSlice({
    name: "updateSaleOrderStatus",
    initialState: {
        loading: false,
        updatedStatus: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(updateSaleOrderStatus.pending, (state) => {
            state.loading = true
        })
        .addCase(updateSaleOrderStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.updatedStatus = action.payload;
            state.error = null
        })
        .addCase(updateSaleOrderStatus.rejected, (state, action) => {
            state.loading = false;
            state.updatedStatus = null;
            state.error = action.payload
        })
    }
})

export default updateSaleOrderStatusSlice.reducer;