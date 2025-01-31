// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ProfileUser from './pages/profile';

function App() {
  const { isLoggedIn, username } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation isLoggedIn={isLoggedIn} username={username} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />

          {/* 🔒 Protected Route: Only allow access to /profile if logged in */}
          <Route path="/profile" element={isLoggedIn ? <ProfileUser /> : <Navigate to="/login" />} />

          {/* 🔄 Default Redirect: If no route matches, go to Home or Login */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/profile" : "/login"} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
