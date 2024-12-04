import React from 'react';
import './style.css';

function GoogleSignInButton() {
  const handleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=token&scope=profile%20email`;
  };

  return (
    <div className="google-signin-container">
      <button onClick={handleLogin} className="custom-google-button">
      Continue with Google <i className="fa fa-fw fa-google"></i>
      </button>
    </div>
  );
}

export default GoogleSignInButton;