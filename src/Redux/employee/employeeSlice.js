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

export const createEmployee = createAsyncThunk(
  "createEmployee",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/createNewEmployee`,
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editEmployee = createAsyncThunk(
  "editEmployee",
  async ({ employeeId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/edit-employee/${employeeId}`,
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllEmployee = createAsyncThunk(
  "getAllEmployee",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/getEmployee`);
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getEmployeeByEmployeeId = createAsyncThunk(
  'getEmployeeByEmployeeId',
  async(id, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(`${baseUrl}/getEmployeeByEmployeeId/${id}`);
      return data.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const deleteEmployeeByEmployeeId = createAsyncThunk(
  "deleteEmployeeByEmployeeId",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/delete-employee/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const generateEmployeeId = createAsyncThunk(
  'generateEmployeeId',
  async(_, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(`${baseUrl}/generateEmployeeId`);
      return data.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    loading: false,
    employee: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.employee = null;
      state.error = null;
    };
    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.employee = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.employee = null;
      state.error = action.payload;
    };
    [createEmployee, editEmployee, getAllEmployee, getEmployeeByEmployeeId, deleteEmployeeByEmployeeId].forEach(
      (action) => {
        builder
          .addCase(action.pending, handlePending)
          .addCase(action.fulfilled, handleFulfilled)
          .addCase(action.rejected, handleRejected);
      }
    );
  },
});

const generateEmployeeIdSlice = createSlice({
  name: 'generateEmployeeIdSlice',
  initialState: {
    loading: false,
    employeeId: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(generateEmployeeId.pending, (state) => {
      state.loading = true
    })
    .addCase(generateEmployeeId.fulfilled, (state, action) => {
      state.loading = false;
      state.employeeId = action.payload;
      state.error = null
    })
    .addCase(generateEmployeeId.rejected, (state, action) => {
      state.loading = false;
      state.employeeId = null;
      state.error = action.payload
    })
  }
})

export const employeeReducer = employeeSlice.reducer;
export const generateEmployeeIdReducer = generateEmployeeIdSlice.reducer;
