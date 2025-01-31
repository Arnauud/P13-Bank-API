import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login } from '../redux/slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isLoggedIn, email: rememberedEmail, rememberMe } = useSelector((state) => state.user);

  const [email, setEmail] = useState(rememberedEmail || ''); // Auto-fill remembered email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRemembered, setIsRemembered] = useState(rememberMe);

  // 🔹 Redirect if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', { email, password });

      if (response.data.status === 200) {
        const { token, user } = response.data.body;

        dispatch(login({ username: user.username, token, email, rememberMe: isRemembered }));

        navigate('/profile'); // Redirect after login
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      setError('Error during login.');
      console.error('Login error:', error.message);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={isRemembered}
              onChange={(e) => setIsRemembered(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default Login;
