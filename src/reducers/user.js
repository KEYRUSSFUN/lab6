import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const handleServerError = (response) => {
  if (!response.data.success) {
    throw new Error(response.data.error);
  }
  return response.data;
};

const handleApiError = (error, rejectWithValue) => {
  if (axios.isAxiosError(error) && error.response) {
    return rejectWithValue({
      message: error.response.data.error || error.response.statusText,
      status: error.response.status,
    });
  } else {
    return rejectWithValue(error.message || 'Неизвестная ошибка');
  }
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/profile`);
      return handleServerError(response);
    } catch (error) {
      return handleApiError(error, rejectWithValue);;
    }
  }
);

export const updateProfileAsync = createAsyncThunk(
  'profile/updateProfile',
  async ({ id, profileData }, { rejectWithValue }) => {  
    try {
      const response = await axios.put(`/api/profile/${id}`, profileData);
      return handleServerError(response); 
    } catch (error) {
      return handleApiError(error, rejectWithValue);;
    }
  }
);

export const createAccountAsync = createAsyncThunk(
  'signup/createAccount',
  async (account, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/signup`, account);
      return handleServerError(response);
    } catch (error) {
      return handleApiError(error, rejectWithValue);
    }
  }
);

export const signinAccountAsync = createAsyncThunk(
  'signin/signinAccount',
  async (account, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/signin`, account);
      dispatch(checkSessionAsync());
      return handleServerError(response);
    } catch (error) {
      return handleApiError(error, rejectWithValue);
    }
  }
);

export const checkSessionAsync = createAsyncThunk(
  'auth/checkSession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/session`, { withCredentials: true });
      return handleServerError(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message || 'Неизвестная ошибка';
        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue(error.message || 'Неизвестная ошибка');
      }
    }
  }
);

export const Logout = createAsyncThunk(
  'session/Logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/logout`, { withCredentials: true });
      return handleServerError(response);
    } catch (error) {
      return handleApiError(error, rejectWithValue);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: null,
    username: null,
    user: null,
    profile: null,
    loading: false,
    error: null,
    registred: null,
    updated: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null; 
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null; 
        state.updated = true;
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      .addCase(createAccountAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccountAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.registred = true;
      })
      .addCase(createAccountAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        console.log(action.payload);
      })
      .addCase(signinAccountAsync.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(signinAccountAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signinAccountAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        localStorage.removeItem('token');
      })
      .addCase(checkSessionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkSessionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.username = action.payload.username;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(checkSessionAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.username = null;
        state.user = null;
      })
      .addCase(Logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.username = null;
        state.profile = null;
        state.error = null;
      })
      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;