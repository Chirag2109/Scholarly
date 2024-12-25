import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import logo from "../../Images/Logo3.png";

function SignIn() {
  const navigate = useNavigate();
  const usernameOrEmailRef = useRef(null);
  const passwordRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserDetails = async () => {
    const email = localStorage.getItem("loggedInUserEmail");
    if (!email) {
      console.error("No email found in localStorage.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_NODEJS_BACKEND}/user/${email}`, {
        headers: {
          Authorization: localStorage.getItem("authToken"),
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
        console.error("Failed to fetch user details.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameOrEmail = usernameOrEmailRef.current.value;
    const password = passwordRef.current.value;

    const newErrors = {};
    if (!usernameOrEmail) newErrors.usernameOrEmail = "Please enter your username or email.";
    if (!password) newErrors.password = "Please enter your password.";
    if (usernameOrEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail)) {
      newErrors.usernameOrEmail = "Invalid email format.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

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
          localStorage.setItem("loggedInUserEmail", usernameOrEmail);
          fetchUserDetails();
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
            <label htmlFor="usernameOrEmail">Username or Email</label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              ref={usernameOrEmailRef}
            />
            {errors.usernameOrEmail && <p className="error">{errors.usernameOrEmail}</p>}
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