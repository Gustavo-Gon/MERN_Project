import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);


    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log('Response:', data);
    if (response.ok) {
      // Save the JWT token to local storage
      localStorage.setItem('token', data.token);
      console.log('Login successful', data);
      console.log('About to navigate');
      navigate('/MainFeed');
    } else {
      setErrorMessage(data.message || 'Failed to login');
    }
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
            onChange={(event) => setUsername(event.target.value)}
            />
        </div>

        <div className="form-group">
          <input 
            type="password" 
            placeholder="Password" 
            className="form-control" 
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
        </div>

        <button type="submit" className="btn">Login</button>
        {errorMessage && <p>{errorMessage}</p>}
        </form>

        <div className="login-help">
          <a href="#" className="forgot-password">Forgot password?</a>
          <Link to="/Register" className="signup-link">Don't have an account? Sign up</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
