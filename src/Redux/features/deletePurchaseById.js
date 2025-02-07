import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deletePurchaseById = createAsyncThunk(
    'deletePurchaseById',
    async(id, {rejectWithValue}) => {
        try {
            const {data} = await axios.delete(`http://localhost:4000/api/deletePurchaseById/${id}`)
            return data
        }catch(error) {
            return rejectWithValue(error?.response?.data?.message || error.message || "An unknown error occured")
        }
    }
)

const deletePurchaseSlice = createSlice({
    name: "deletePurchaseById",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(deletePurchaseById.pending, state => {
            state.loading = true
        })
        .addCase(deletePurchaseById.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null
        })
        .addCase(deletePurchaseById.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload
        })
    }
})

export default deletePurchaseSlice.reducer;