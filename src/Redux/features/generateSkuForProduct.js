import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const generateSkuForProduct = createAsyncThunk(
    'generateSkuForProduct',
    async(_, {rejectWithValue}) => {
        try {
            const response = await axios.get("http://localhost:4000/api/generateSkuForProduct")
            return response.data
        } catch(error) {
            return rejectWithValue(error?.response?.data?.message || error.message || "An unknown error occured")
        }
    }
)

const generateSkuSlice = createSlice({
    name: "generateSku",
    initialState: {
        loading: false,
        sku: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(generateSkuForProduct.pending, state => {
            state.loading = true
        })
        .addCase(generateSkuForProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.sku = action.payload;
            state.error = null
        })
        .addCase(generateSkuForProduct.rejected, (state, action) => {
            state.loading = false;
            state.sku = null;
            state.error = action.payload
        })
    }
})

export default generateSkuSlice.reducer;