import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  // State hooks for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Handle for submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', username, password);
    // Add in backend service 
  };

  return (
    <div className="background">
      <div className="login-box">
      <h1 className="cursive-text">TrailBlazers</h1>

        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Username"
            className="form-control" 
            name="username"
            value={username}
            onChange={handleInputChange}
            />
        </div>

        <div className="form-group">
          <input 
            type="password" 
            placeholder="Password" 
            className="form-control" 
            name="password"
            value={password}
            onChange={handleInputChange}
            />
        </div>

        <button type="submit" className="btn">Login</button>
        </form>

        <div className="login-help">
          <a href="#" className="forgot-password">Forgot password?</a>
          <a href="#" className="signup-link">Don't have an account? Sign up</a>
        </div>

      </div>
    </div>
  );
}

export default App;
