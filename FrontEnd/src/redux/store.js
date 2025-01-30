import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice, // Add more reducers here if needed
  },
});

export default store;
