import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleSignInButton from '../../components/Google';
import './style.css';
import logo from "../../Images/Logo3.png";
import { Link } from 'react-router-dom';

function Enter() {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const newErrors = {};
    if (!formData.usernameOrEmail) {
      newErrors.usernameOrEmail = 'Username or Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    if (Object.keys(newErrors).length === 0) {
      
      console.log('Registration successful', formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Link to="/" className='parent-container'><img src={logo} alt="logo" className="logos" /></Link>
      <h1>Ready to explore? Create your account and dive in!</h1>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usernameOrEmail">Username or Email</label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
            />
            {errors.usernameOrEmail && <p className="error">{errors.usernameOrEmail}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>

          <button type="submit">Enter the Community</button>
        </form>

        <div className="or-divider">
          <p>or</p>
        </div>

        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <GoogleSignInButton />
        </GoogleOAuthProvider>

        <div className="login-redirect">
          Already on Scholarly? <Link to="/sign_in" className="login-link">Log in</Link>
        </div>
      </div>
    </>
  );
}

export default Enter;