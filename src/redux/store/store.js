import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user';
import messageReducer from "../features/message";

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['user/setSocket'],  
        ignoredPaths: ['user.socket'], 
      },
    }),
});
