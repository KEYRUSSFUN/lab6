import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


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

// Экспортируем хуки для использования в компонентах
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