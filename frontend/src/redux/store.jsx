import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice';
import storeReducer from '../redux/storeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stores: storeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
