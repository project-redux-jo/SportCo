import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./sliceAuth";
import courtReducer from "./StaduimsSlice";
import wishlistReducer from "./wishlistSlice";
import LandReducer from './sliceLandlord';
import landlordApplicationsReducer from './landlordApplicationSlice';
import listingsReducer from './listingSlice';
import userReducer from './userslice';
import paymentSlice from './paymentSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    courtInfo: courtReducer,
    wishlist: wishlistReducer,
    Land:LandReducer,
    user: userReducer,
    landlordApplications: landlordApplicationsReducer,
    listings: listingsReducer,
    payment : paymentSlice ,
  },
});

export default store;
