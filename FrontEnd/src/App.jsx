// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
          <Route path="/profile" element={<ProfileUser />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
