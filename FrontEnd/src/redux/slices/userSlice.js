import { createSlice } from '@reduxjs/toolkit';

// Retrieve persisted user data
const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
const rememberMe = localStorage.getItem('rememberMe') === 'true';
const email = rememberMe ? localStorage.getItem('email') || '' : '';

const initialState = {
  isLoggedIn: !!storedToken, // Auto-login if token exists
  username: storedUser ? JSON.parse(storedUser).username : '',
  token: storedToken || null,
  rememberMe: rememberMe,
  email: email, // Auto-fill email
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, token, email, rememberMe } = action.payload;
      state.isLoggedIn = true;
      state.username = username;
      state.token = token;
      state.rememberMe = rememberMe;
      state.email = rememberMe ? email : '';

      // Store in localStorage or sessionStorage
      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ username }));
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('email', email);
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify({ username }));
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = '';
      state.token = null;
      state.rememberMe = false;
      state.email = '';

      // Clear storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('email');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
