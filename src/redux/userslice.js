import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    role: 'visitor', // 'admin', 'landlord', 'visitor'
    userId: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = 'visitor';
      state.userId = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
