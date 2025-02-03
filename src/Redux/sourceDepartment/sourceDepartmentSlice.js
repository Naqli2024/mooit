import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createSourceDepartment = createAsyncThunk(
    'createSourceDepartment',
    async(payload, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:4000/api/createSourceDepartment", payload)
            return response.data
        }catch(error) {
            return rejectWithValue(error?.response?.data?.message || error.message || "An unknown error occured")
        }
    }
)

export const getAllSourceDepartment = createAsyncThunk(
    'getAllSourceDepartment',
    async(_, {rejectWithValue}) => {
        try {
            const response =  await axios.get("http://localhost:4000/api/getSourceDepartment")
            return response.data.data
        }catch(error) {
            return rejectWithValue(error?.response?.data?.message || error.message || "An unknown error occured")
        }
    }
)

export const deleteSourceDepartmentByDepartmentCode = createAsyncThunk(
    'deleteSourceDepartmentByDepartmentCode',
    async(id, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/deleteSourceDepartment/${id}`)
            return response.data
        }catch(error) {
            return rejectWithValue(error?.response?.data?.message || error.message || "An unknown error occured")
        }
    }
)

const sourceDepartmentSlice = createSlice({
    name: "sourceDepartment",
    initialState: {
        loading: false,
        sourceDepartment: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        const handlePending = (state) => {
            state.loading = true
        }
        const handleFulFilled = (state, action) => {
            state.loading = false;
            state.sourceDepartment = action.payload;
            state.error = null
        }
        const handleRejected = (state, action) => {
            state.loading = false;
            state.sourceDepartment = null;
            state.error = action.payload
        }

        [createSourceDepartment, getAllSourceDepartment, deleteSourceDepartmentByDepartmentCode].forEach((action) => {
            builder
            .addCase(action.pending, handlePending) 
            .addCase(action.fulfilled, handleFulFilled)
            .addCase(action.rejected, handleRejected)
        })
    }
})

export default sourceDepartmentSlice.reducer;