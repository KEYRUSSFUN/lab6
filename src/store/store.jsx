import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from "../reducers/feedback";
import userReducer from "../reducers/user";
import counterSlice from '../reducers/counterSlice';

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    user: userReducer,
    counter: counterSlice,
  },
});