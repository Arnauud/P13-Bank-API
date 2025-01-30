// Navigation.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/argentBankLogo.png';
import { logout } from '../redux/slices/userSlice';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, username } = useSelector((state) => state.user);


  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()); // Logout logic is handled in the userSlice
    navigate('/login');  // Redirect to login page after logout
  };

  const handleLogin = () => {
    navigate('/login');
  };


  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isLoggedIn ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i> {username}
            </Link>
            <Link className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-user-circle"></i> Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/Login" onClick={handleLogin}>
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;