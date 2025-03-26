import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:4000/api/auth";

const handleApiError = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "An unknown error occurred"
  );
};

// Async action to create an account
export const createAccount = createAsyncThunk(
  "auth/createAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/create-account`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// edit account
export const editAccount = createAsyncThunk(
  "auth/editAccount",
  async ({id, payload}, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${baseUrl}/edit-account/${id}`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Async action to verify email
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/verify-email`, { token });
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Async action to login
export const userLogin = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/login`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Async action to logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Async action for delete account
export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async ({id, payload}, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/delete-account/${id}`, {
        data: payload  
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Async action to check authentication status
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/auth-status`, {
        withCredentials: true, // Sends cookie
      });
      return data;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    clearAuthState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(editAccount.pending, state => {
        state.loading = true
      })
      .addCase(editAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null
      })
      .addCase(editAccount.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload
      })
  },
});

// Export the actions
export const { clearAuthState } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
