import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/signup';
import Login from './components/login';
import AddBookmark from './components/Addbookmark';
import ViewBookmark from './components/Viewbookmark';
import Edit from './components/Edit';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  // Handle login state change
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle logout state change
  const handleLogout = () => {
    setIsAuthenticated(false);

  };

  // Handle initial redirection (check if user is authenticated on app load)
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    setIsAuthenticated(currentUser ? true : false);
  }, []);

  // If isAuthenticated is still `null`, it means the authentication check is in progress, show a loading message 
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated && <Navbar handleLogout={handleLogout} />}
      <div className="container">
        <Routes>
          {/* Routes for unauthenticated users */}
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup />} />
              {/* Redirect all other paths to login */}
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              {/* Routes for authenticated users */}
              <Route path="/home" element={<Home />} />
              <Route path="/addbookmark" element={<AddBookmark />} />
              <Route path="/viewbookmark" element={<ViewBookmark />} />
              <Route path="/edit" element={<Edit />} />
              {/* Redirect all other paths to home */}
              <Route path="/home" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
