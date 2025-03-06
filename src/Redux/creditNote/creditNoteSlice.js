import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:4000/api";

const handleApiError = (error) => {
  return (
    error?.response?.data?.message ||
    error.message ||
    "An unknown error occurred"
  );
};

export const createCreditNote = createAsyncThunk(
  "createCreditNote",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/create-creditNote`,
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const generateCreditNoteId = createAsyncThunk(
  "generateCreditNoteId",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/generateCreditNoteId`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllCreditNotes = createAsyncThunk(
  "getAllCreditNotes",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/getAllCreditNotes`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteCreditNoteByCreditNoteId = createAsyncThunk(
  "deleteCreditNoteByCreditNoteId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/deleteCreditNoteByCreditNoteId/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateCreditNote = createAsyncThunk(
  "updateCreditNote",
  async ({creditNoteId, payload}, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${baseUrl}/updateCreditNote/${creditNoteId}`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getCreditNoteDetailsByCreditNoteId = createAsyncThunk(
  "getCreditNoteDetailsByCreditNoteId",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/getCreditNoteDetailsByCreditNoteId/${id}`
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const creditNoteSlice = createSlice({
  name: "creditNoteSlice",
  initialState: {
    loading: false,
    creditNote: null,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFulFilled = (state, action) => {
      state.loading = false;
      state.creditNote = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.creditNote = {};
      state.error = action.payload;
    };
    [
        createCreditNote,
        generateCreditNoteId,
        getAllCreditNotes,
        deleteCreditNoteByCreditNoteId,
        updateCreditNote,
        getCreditNoteDetailsByCreditNoteId
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default creditNoteSlice.reducer;
