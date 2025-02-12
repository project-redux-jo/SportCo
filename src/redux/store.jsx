import { configureStore } from '@reduxjs/toolkit';
import authReducer from './sliceAuth';

const store = configureStore({
  reducer: {
    auth: authReducer,
    
  },
});

export default store;
