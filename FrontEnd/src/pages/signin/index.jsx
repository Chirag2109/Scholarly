import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import logo from "../../Images/Logo3.png";

function SignIn() {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("loggedInUserName");
    console.log("Username inside useEffect:", username); // Ensure username is logged

    if (username) {
      fetchUserDetails(username);
    }
  }, []); // Empty dependency array ensures this runs only once

  const fetchUserDetails = async (username) => {
    if (!username) {
      console.error("Username is null or undefined.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Token not found.");
      return;
    }

    console.log("Token:", token);
    console.log("Fetching details for username:", username); // Log username

    try {
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/user/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userDetails = await response.json();
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        if (userDetails.userType === "Scholar") {
          navigate("/scholar-dashboard");
        } else if (userDetails.userType === "Learner") {
          navigate("/learner-dashboard");
        } else {
          navigate("/");
        }
      } else {
        console.log("Failed to fetch user details.");
      }
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const newErrors = {};
    if (!username) newErrors.username = "Please enter your username.";
    if (!password) newErrors.password = "Please enter your password.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/user/signin`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.token) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("loggedInUserName", username); // Save username
          fetchUserDetails(username); // Now call with correct username
        } else {
          alert("Sign-in failed: Token not received");
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Sign-in failed");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setIsLoading(false);
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              ref={usernameRef}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="or-divider">
          <p>or</p>
        </div>

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