import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import userReducer from './slices/user';  
import themeReducer from './slices/theme';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    theme: themeReducer,
  },
});

export default store;
