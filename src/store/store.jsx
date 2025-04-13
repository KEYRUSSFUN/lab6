import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from "../reducers/feedback";
import userReducer from "../reducers/user";

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    user: userReducer,
  },
});