import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Signup.css'; 

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
    } else {
      // Clear error message if passwords match
      setErrorMessage('');
      // Store user data in localStorage (in a real app, this would be done via backend)
      localStorage.setItem('user', JSON.stringify({ username, password }));
      navigate('/login'); // Redirect to login page after signup
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); 
  };

  return (
    <div className="signup">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        
        {/* Display error message if passwords don't match */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>

      {/* Message asking if the user already has an account */}
      <p className="mt-3 text-center">
        Already have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleLoginRedirect}>Login here</span>
      </p>
    </div>
  );
};

export default Signup;
