import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logo from "../../Images/Logo3.png";
import { Link } from 'react-router-dom';

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear any stored user data (e.g., tokens, session info)
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');

    console.log('User signed out successfully');
    // Redirect the user to the home page or sign-in page
    navigate('/sign_in');
  };

  return (
    <>
      <Link to="/" className='parent-container'><img src={logo} alt="logo" className="logos" /></Link>
      <div className="logout-container">
        <h1>Are you sure you want to sign out?</h1>
        <div className="logout-buttons">
          <button onClick={handleSignOut} className="confirm-logout">
            Yes, Sign Out
          </button>
          <button onClick={() => navigate(-1)} className="cancel-logout">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default SignOut;