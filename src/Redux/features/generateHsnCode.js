import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const generateHsnCode = createAsyncThunk(
    'generateHsnCode',
    async(_, {rejectWithValue}) => {
        try {
            const response = await axios.get("http://localhost:4000/api/generateHsnCode")
            return response.data
        } catch(error) {
            return rejectWithValue(error?.response?.data?.message || error.message || "An unknown error occured")
        }
    }
)

const generateHsnCodeSlice = createSlice({
    name: "generateHsnCode",
    initialState: {
        loading: false,
        hsn: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(generateHsnCode.pending, state => {
            state.loading = true
        })
        .addCase(generateHsnCode.fulfilled, (state, action) => {
            state.loading = false;
            state.hsn = action.payload;
            state.error = null
        })
        .addCase(generateHsnCode.rejected, (state, action) => {
            state.loading = false;
            state.hsn = null;
            state.error = action.payload
        })
    }
})

export default generateHsnCodeSlice.reducer;