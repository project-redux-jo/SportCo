import { createSlice } from '@reduxjs/toolkit';

const listingsSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: [],
    pendingListings: [],
  },
  reducers: {
    addNewListing: (state, action) => {
      state.pendingListings.push(action.payload);
    },
    approveListing: (state, action) => {
      const listing = state.pendingListings.find(l => l.id === action.payload);
      if (listing) {
        state.listings.push(listing);
        state.pendingListings = state.pendingListings.filter(l => l.id !== action.payload);
      }
    },
    denyListing: (state, action) => {
      state.pendingListings = state.pendingListings.filter(l => l.id !== action.payload);
    },
  },
});

export const { addNewListing, approveListing, denyListing } = listingsSlice.actions;
export default listingsSlice.reducer;