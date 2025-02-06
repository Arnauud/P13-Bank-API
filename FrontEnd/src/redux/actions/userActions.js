import { login } from '../slices/userSlice';
import { loginUser } from '../../api/authService';
import { persistUserToStorage } from '../utils/userStorage';

export const handleLogin = ({ email, password, isRemembered, navigate, setError }) => {
  return async (dispatch) => {
    try {
      const data = await loginUser(email, password); // ✅ Call API
      console.log("🔍 API Response:", data);

      if (data.status === 200) {
        const { token, user } = data.body;

        dispatch(login({ firstName: user.firstName, lastName: user.lastName, token, email, rememberMe: isRemembered }));

        // Save user data to localStorage/sessionStorage
        persistUserToStorage({ firstName: user.firstName, lastName: user.lastName, email, token, rememberMe: isRemembered });

        navigate('/profile'); // ✅ Redirect to profile
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      setError('Error during login.');
      console.error('❌ Login error:', error.message);
    }
  };
};
