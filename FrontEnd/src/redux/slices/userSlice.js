// userSlice.js (Redux slice)
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // Initialize with localStorage value
  username: '',
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
      // Save to localStorage when login occurs
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = '';
      state.token = null;
      // Remove from localStorage when logout occurs
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
