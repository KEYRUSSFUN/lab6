import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    fetchFeedback: builder.query({
      query: () => 'feedback',
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `feedback/${id}`,
        method: 'DELETE',
      }),
    }),
    createFeedback: builder.mutation({
      query: (feedback) => ({
        url: 'feedback',
        method: 'POST',
        body: feedback,
      }),
    }),
    blockFeedback: builder.mutation({
      query: (id) => ({
        url: `feedback/block/${id}`,
        method: 'PUT',
      }),
    }),
    unblockFeedback: builder.mutation({
      query: (id) => ({
        url: `feedback/unblock/${id}`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useFetchFeedbackQuery,
  useDeleteFeedbackMutation,
  useCreateFeedbackMutation,
  useBlockFeedbackMutation,
  useUnblockFeedbackMutation,
} = feedbackApi;

const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        feedbackApi.endpoints.fetchFeedback.matchFulfilled,
        (state, action) => {
          state.feedbacks = action.payload;
        }
      )
      .addMatcher(
        feedbackApi.endpoints.deleteFeedback.matchFulfilled,
        (state, action) => {
          state.feedbacks = state.feedbacks.filter(f => f.id !== action.payload);
        }
      )
      .addMatcher(
        feedbackApi.endpoints.createFeedback.matchFulfilled,
        (state, action) => {
          state.feedbacks.push(action.payload);
        }
      );
  },
});

export default feedbackSlice.reducer;