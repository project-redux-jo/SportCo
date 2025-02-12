import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./sliceAuth";
import courtReducer from "./StaduimsSlice";
import wishlistReducer from "./wishlistSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    courtInfo: courtReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
