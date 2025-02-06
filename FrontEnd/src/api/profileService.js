import { getStoredToken } from '../redux/utils/userStorage';

export const updateUserProfile = async (firstName, lastName) => {
  const token = getStoredToken(); // 🔹 Centralized token retrieval
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
