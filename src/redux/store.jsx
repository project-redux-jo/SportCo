import { configureStore } from '@reduxjs/toolkit';
import authReducer from './sliceAuth';
import courtReducer from "./StaduimsSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
     courtInfo:courtReducer,
  },
});

export default store;
