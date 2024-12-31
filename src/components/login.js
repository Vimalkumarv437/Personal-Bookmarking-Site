import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in when the component mounts
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      navigate('/'); // Redirect to home if user is already logged in
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      onLogin(); // Notify parent component (App) to update isAuthenticated
      setErrorMessage('');
      navigate('/'); // Redirect to the home page after successful login
    } else {
      setErrorMessage('Invalid credentials Please Try Again');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-6 col-lg-4">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="form2">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Display error message if there is one */}
          {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <p className="mt-3 text-center">
          No account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleSignupRedirect}>Sign up here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
