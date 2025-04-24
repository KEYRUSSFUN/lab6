import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), 
  endpoints: (builder) => ({

    fetchUsers: builder.query({
      query: () => '/admin/users',
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/delete/${userId}`,
        method: 'DELETE',
      }),
    }),

    blockUser: builder.mutation({
      query: ({ userId, action }) => ({
        url: `/admin/${action}/${userId}`,
        method: 'PUT',
      }),
    }),

    fetchProfile: builder.query({
      query: () => '/profile', 
    }),

    updateProfile: builder.mutation({
      query: ({ id, profileData }) => ({
        url: `/profile/${id}`,
        method: 'PUT',
        body: profileData,
      }),
    }),

    createAccount: builder.mutation({
      query: (account) => ({
        url: '/signup',
        method: 'POST',
        body: account,
      }),
    }),

    signinAccount: builder.mutation({
      query: (account) => ({
        url: '/signin',
        method: 'POST',
        body: account,
      }),
    }),

    checkSession: builder.query({
      query: () => '/session',
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useFetchProfileQuery,
  useUpdateProfileMutation,
  useCreateAccountMutation,
  useSigninAccountMutation,
  useCheckSessionQuery,
  useBlockUserMutation,
  useDeleteUserMutation,
  useLogoutMutation,
  useFetchUsersQuery,
} = userApi;


export const checkSessionAsync = createAsyncThunk(
  'auth/checkSession',
  async () => {
      const response = await axios.get(`/api/session`, {withCredentials: true});
      return response.data;
  }
);

const sessionSlice = createSlice({
  name: 'feedback',
  initialState: {
    isAuthenticated: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkSessionAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkSessionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.authenticated;
      })
      .addCase(checkSessionAsync.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = 'Ошибка входа';
      })
  },
});

export default sessionSlice.reducer;
