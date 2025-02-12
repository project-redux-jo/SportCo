import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.wishlistItems.find((i) => i.id === item.id);
      if (!existingItem) {
        state.wishlistItems.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      state.wishlistItems = state.wishlistItems.filter((i) => i.id !== itemId);
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
