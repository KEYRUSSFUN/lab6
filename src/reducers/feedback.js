import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchFeedback = createAsyncThunk(
  'feedback/fetchFeedback',
  async () => {
    const response = await axios.get(`/api/feedback`);
    return response.data;
  }
);

export const deleteFeedbackAsync = createAsyncThunk(
    'feedback/deleteFeedback',
    async (id) => {
      await axios.delete(`/api/feedback/${id}`);
      console.log(id);
      return id;
    }
  );

export const createFeedbackAsync = createAsyncThunk(
    'feedback/createFeedback',
    async (feedback) => {
      const response = await axios.post(`/api/feedback`, feedback);
      return response.data;
    }
  );

export const blockFeedbackAsync = createAsyncThunk(
  'feedback/block',
  async (id) => {
    await axios.put(`/api/feedback/block/${id}`);
    return id;
  }
);

export const unblockFeedbackAsync = createAsyncThunk(
  'feedback/unblock',
  async (id) => {
    await axios.put(`/api/feedback/unblock/${id}`);
    return id;
  }
);

  

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
      .addCase(fetchFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFeedbackAsync.pending, (state) => {
          state.loading = true;
      })
      .addCase(deleteFeedbackAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.feedbacks = state.feedbacks.filter(f => f.id !== action.payload);
      })
      .addCase(deleteFeedbackAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(createFeedbackAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFeedbackAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.feedbacks = [...state.feedbacks, action.payload];
      })
      .addCase(createFeedbackAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      });
  },
});

export default feedbackSlice.reducer;