import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import UserDashboardPage from "./pages/UserDashboardPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUsername(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation isLoggedIn={isLoggedIn} username={username} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/sign-in" 
            element={<SignInPage onLogin={handleLogin} />} 
          />
          <Route 
            path="/user" 
            element={<UserDashboardPage />} 
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;