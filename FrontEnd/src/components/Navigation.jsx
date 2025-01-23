import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ isLoggedIn, username }) => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img 
          className="main-nav-logo-image" 
          src="/img/argentBankLogo.png" 
          alt="Argent Bank Logo" 
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isLoggedIn ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {username}
            </Link>
            <Link className="main-nav-item" to="/logout">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;