import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/user';

// 🔵 Function to log in a user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Return API response
  } catch (error) {
    console.error('❌ API Login Error:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};