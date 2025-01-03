import { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import logo from "../../Images/Logo3.png";

function Enter() {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const userTypeRef = useRef(null);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);

  const signUpHandler = async (event) => {
    event.preventDefault();

    const formValues = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      userType: userTypeRef.current.value,
    };

    console.log("Form values: ", formValues);

    if (
      formValues.username &&
      formValues.email &&
      formValues.password &&
      formValues.password === formValues.confirmPassword &&
      formValues.userType
    ) {
      console.log("Submitting form...");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_NODEJS_BACKEND}/user/signup`,
          {
            method: "POST",
            body: JSON.stringify({
              username: formValues.username,
              email: formValues.email,
              password: formValues.password,
              userType: formValues.userType,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok && (response.status === 201 || response.status === 200)) {
          // Now sign in the user after successful signup
          const signInResponse = await fetch(
            `${import.meta.env.VITE_NODEJS_BACKEND}/user/signin`,
            {
              method: "POST",
              body: JSON.stringify({
                username: formValues.username,
                password: formValues.password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (signInResponse.ok) {
            const data = await signInResponse.json();
            localStorage.setItem('authToken', data.token);
            setShowFailureAlert(false);
            setShowSuccessAlert(true);
            const userDetails = await response.json();
            localStorage.setItem("loggedInUserName", formValues.username);
            localStorage.setItem("userDetails", JSON.stringify(userDetails));

            if (formValues.userType === "Scholar") {
              navigate("/scholar-dashboard");
            } else if (formValues.userType === "Learner") {
              navigate("/");
            }

            usernameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            confirmPasswordRef.current.value = "";
            userTypeRef.current.value = "";
          } else {
            setShowSuccessAlert(false);
            setShowFailureAlert(true);
          }
        } else {
          setShowSuccessAlert(false);
          setShowFailureAlert(true);
        }
      } catch (error) {
        console.error("Error during signup: ", error);
        setShowSuccessAlert(false);
        setShowFailureAlert(true);
      }
    } else {
      console.log("Validation failed");
      setShowFailureAlert(true);
    }
  };

  return (
    <>
      <Link to="/" className='parent-container'>
        <img src={logo} alt="logo" className="logos" />
      </Link>
      <h1>Ready to explore? Create your account and dive in!</h1>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={signUpHandler}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              ref={confirmPasswordRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType">User Type</label>
            <select id="userType" ref={userTypeRef}>
              <option value="">Select User Type</option>
              <option value="Scholar">Scholar</option>
              <option value="Learner">Learner</option>
            </select>
          </div>

          <button type="submit">Enter the Community</button>
        </form>

        {showSuccessAlert && <p className="success-alert">Registration successful!</p>}
        {showFailureAlert && <p className="failure-alert">Error in registration. Please try again.</p>}

        <div className="or-divider">
          <p>or</p>
        </div>

        <div className="login-redirect">
          Already on Scholarly? <Link to="/sign_in" className="login-link">Log in</Link>
        </div>
      </div>
    </>
  );
}

export default Enter;