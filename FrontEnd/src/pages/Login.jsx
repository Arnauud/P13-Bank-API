import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../redux/actions/userActions'; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isLoggedIn, email: rememberedEmail, rememberMe } = useSelector((state) => state.user);

  const [email, setEmail] = useState(rememberedEmail || ''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRemembered, setIsRemembered] = useState(rememberMe);

  // 🔹 Redirect if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(handleLogin({ email, password, isRemembered, navigate, setError })); 
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
