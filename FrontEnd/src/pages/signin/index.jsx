import { useRef, useState } from "react";
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import GoogleSignInButton from '../../components/Google';
import './style.css';
import logo from "../../Images/Logo3.png";
import { Link } from 'react-router-dom';

function SignIn() {
  const usernameOrEmailRef = useRef(null);
  const passwordRef = useRef(null);

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [signInSuccess, setSignInSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fetchUserDetails = async () => {
    const email = localStorage.getItem("loggedInUserEmail");
    try {
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/user/${email}`, {
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
      });

      if (response.ok) {
        const userDetails = await response.json();
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        window.location.reload();
      } else {
        console.error("Failed to fetch user details.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data on Submit:", formData);
    const { usernameOrEmail, password } = formData;

    const newErrors = {};
    if (!usernameOrEmail) newErrors.usernameOrEmail = "Username or Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/user/signin`, {
        method: "POST",
        body: JSON.stringify({ usernameOrEmail, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.token) {
          localStorage.setItem("authToken", data.token);
        } else {
          alert("Sign-in failed: Token not received");
          return;
        }
        localStorage.setItem("loggedInUserEmail", usernameOrEmail);
        setSignInSuccess(true);
        alert("Sign-in successful");
        fetchUserDetails();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Sign-in failed");
        return;
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <>
      <Link to="/" className="parent-container">
        <img src={logo} alt="logo" className="logos" />
      </Link>
      <h1>Log in to keep exploring and learning!</h1>
      <div className="register-container">
        <h2>Sign In</h2>
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

          <button type="submit">Sign In</button>
        </form>

        <div className="or-divider">
          <p>or</p>
        </div>

        {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <GoogleSignInButton />
        </GoogleOAuthProvider> */}

        <div className="register-redirect">
          New to Scholarly?{" "}
          <Link to="/sign_up" className="register-link">
            Register here
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignIn;