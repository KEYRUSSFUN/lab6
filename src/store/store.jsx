import { configureStore } from '@reduxjs/toolkit';
import { feedbackApi } from '../reducers/feedback'; 
import { userApi } from "../reducers/user";
import counterSlice from '../reducers/counterSlice';

export const store = configureStore({
  reducer: {
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    counter: counterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(feedbackApi.middleware)
      .concat(userApi.middleware),
});