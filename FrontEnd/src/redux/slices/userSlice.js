import { createSlice } from '@reduxjs/toolkit';
import { persistUserToStorage, clearUserFromStorage, getStoredUser } from '../utils/userStorage';

const storedUser = getStoredUser(); // ✅ Use utility function instead of manual JSON.parse()
const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
const rememberMe = localStorage.getItem('rememberMe') === 'true';

const initialState = {
  isLoggedIn: !!storedToken,
  firstName: storedUser?.firstName || '',
  lastName: storedUser?.lastName || '',
  email: storedUser?.email || '',
  token: storedToken || null,
  rememberMe: rememberMe,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { firstName, lastName, email, token, rememberMe } = action.payload;
      state.isLoggedIn = true;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.token = token;
      state.rememberMe = rememberMe;

      persistUserToStorage({ firstName, lastName, email, token, rememberMe });
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.token = null;
      state.rememberMe = false;

      clearUserFromStorage();
    },
    updateUserName: (state, action) => {
      const { firstName, lastName } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;

      persistUserToStorage({ firstName, lastName, email: state.email, token: state.token, rememberMe: state.rememberMe });
    },
  },
});

export const { login, logout, updateUserName } = userSlice.actions;
export default userSlice.reducer;
