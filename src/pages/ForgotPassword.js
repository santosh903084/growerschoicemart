import { Navbar, Footer } from "../components/allComponents";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/forgotpassword.css";
import { useState } from "react";

export const ForgotPassword = () => {
  const defaultEmail = "admin@gmail.com";
  const defaultPassword = "admin@123";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    // Simulate resetting password logic
    console.log("Resetting password...");

    // Redirect to another page after successful validation
    navigate("/admin");
  };

  const validateForm = () => {
    if (email === defaultEmail && password === defaultPassword) {
      setError(""); // Clear any previous error
      return true;
    } else {
      setError("Invalid email or password.");
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleResetPassword();
    }
  };

  return (
    <>
      <Navbar />
      {/* Main Container */}
      <div className="reset-pwd-container flex-column-center pd-y-xlg">
        <div className="reset-pwd-card">
          {/* Heading */}
          <h2 className="text-center mg-xsm">Forgot Password</h2>
          {/* Email-id */}
          <div className="email-id-item mg-xsm flex-column fw-bold">
            <label htmlFor="email-id" className="mg-bottom-xsm">
              Email address
            </label>
            <input
              type="email"
              id="email-id"
              className="mg-bottom-xsm"
              placeholder="xyz@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password */}
          <div className="password-item mg-xsm flex-column fw-bold">
            <label htmlFor="password" className="mg-bottom-xsm">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mg-bottom-xsm"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Error message */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* Buttons */}
          <button onClick={handleSubmit} className="btn btn-solid fw-bold">
            Reset Password
          </button>
          <Link to="/signup" className="btn btn-outline-icon fw-bold">
            Create New Account<i className="material-icons">chevron_right</i>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};