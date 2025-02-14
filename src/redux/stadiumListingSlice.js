import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
};

const stadiumListingSlice = createSlice({
  name: "stadiumListings",
  initialState,
  reducers: {
    setStadiumListings: (state, action) => {
      state.listings = action.payload;
    },
    updateStadiumListing: (state, action) => {
      const { id, status } = action.payload;
      const listingIndex = state.listings.findIndex(listing => listing.id === id);
      if (listingIndex !== -1) {
        state.listings[listingIndex].status = status;
      }
    },
  },
});

export const { setStadiumListings, updateStadiumListing } = stadiumListingSlice.actions;
export default stadiumListingSlice.reducer;