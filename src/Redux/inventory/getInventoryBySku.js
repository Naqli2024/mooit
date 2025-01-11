import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInventoryBySku = createAsyncThunk(
    'fetchInventoryBySku',
    async(sku, {rejectWithValue}) => {
       try{
        const response = await axios.post('http://localhost:4000/api/getInventoryBySku', {sku});
        return response.data.data
       }catch(error) {
        return rejectWithValue(error.message);
       }
    }
)

const findInventoryBySkuSlice = createSlice({
    name: "fetchInventoryBySku",
    initialState: {
        loading: false,
        inventoryBySku: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchInventoryBySku.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchInventoryBySku.fulfilled, (state, action) => {
            state.loading = false;
            state.inventoryBySku = action.payload
        })
        .addCase(fetchInventoryBySku.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default findInventoryBySkuSlice.reducer;