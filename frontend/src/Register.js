import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const { firstName, lastName, username, email, password } = formData;
  const navigate = useNavigate();  // Initialize useNavigate

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const newUser = { firstName, lastName, username, email, password };
    try {
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      };
      const response = await fetch('http://localhost:3000/api/auth/register', config);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert('Registration successful. You can now login.'); // Optional: provide a success message
        navigate('/'); // Navigate to the login page after registration
      } else {
        throw new Error(data.message || 'Failed to register');
      }
    } catch (err) {
      console.error('Registration Error:', err);
      alert(err.message); // Display error message to the user
    }
  };

  return (
    <div className="background">
      <div className="login-box">

        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="First Name"
                    className="form-control" 
                    name="firstName" 
                    value={firstName} 
                    onChange={onChange} 
                    required />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Last Name"
                    className="form-control" 
                    name="lastName" 
                    value={lastName} 
                    onChange={onChange} 
                    required />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Username"
                    className="form-control" 
                    name="username" 
                    value={username} 
                    onChange={onChange} 
                    required />
            </div>
            <div className="form-group">
                <input 
                    type="email"
                    placeholder="Email"
                    className="form-control" 
                    name="email" 
                    value={email} 
                    onChange={onChange} 
                    required />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    placeholder="Password"
                    className="form-control" 
                    name="password" 
                    value={password} 
                    onChange={onChange} 
                    required />
            </div>
            
            <button type="submit" className="btn">Register</button>
        </form>
        </div>
    </div>
  );
}

export default Register;
