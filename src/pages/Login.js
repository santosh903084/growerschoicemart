import { Navbar, Footer } from "../components/allComponents";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/pages/login.css";
import { useAuth } from "../context/auth-context";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useCart } from "../context/cart-context";
import { useWishList } from "../context/wishlist-context";
import { users } from "../backend/db/users"; // Import your user data
//import firebase from "firebase/compat/app"; // Note the use of 'compat' for compatibility with older versions
import "firebase/compat/database"; // You can also import other Firebase services as needed



export const Login = () => {
  const { auth, setAuth } = useAuth();
  const { dispatchCart } = useCart();
  const { dispatchWishList } = useWishList();
  const [passwordType, setPasswordType] = useState("password");
  const [testData, setTestData] = useState({ email: "", password: "" });
  const editLoginForm = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLoginForm = (e) => {
    e.preventDefault();
    const form = editLoginForm.current;
    const enteredEmail = form["emailId"].value;
    const enteredPassword = form["passwordField"].value;

    // Check if the entered email and password match any user in the users array
    const foundUser = users.find(user => user.email === enteredEmail && user.password === enteredPassword);

    if (foundUser) {
      // Simulate a successful login
      handleSuccessfulLogin(foundUser);
    } else {
      // Simulate a failed login
      handleFailedLogin();
    }

    editLoginForm.current.reset();
  };

  const handleSuccessfulLogin = (user) => {
    // Simulate setting authentication data and updating context
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("token", "your_dummy_token"); // You can generate a token here
    setAuth({
      ...auth,
      token: "your_dummy_token",
      isLoggedIn: true,
    });

    dispatchCart({ type: "UPDATE-CART", payload: user.cart || [] });
    dispatchWishList({ type: "UPDATE-WISHLIST", payload: user.wishlist || [] });

    setTestData({ email: "", password: "" });
    toast.success("Login Success");

    navigate(from, { replace: true });
  };

  const handleFailedLogin = () => {
    console.log("Login Error");
    toast.error("Login Failed");
  };

  return (
    <>
      <Navbar />
      {/* Main Container */}
      <form
        ref={editLoginForm}
        onSubmit={handleLoginForm}
        className="login-container  flex-column-center pd-y-md"
      >
        <div className="login-card">
          {/* Heading */}
          <h2 className="text-center mg-xsm">Login</h2>
          {/* Email-id */}
          <div className="email-id-item mg-xsm flex-column fw-bold">
            <label htmlFor="email-id" className="mg-bottom-xsm">
              Email address <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              id="email-id"
              name="emailId"
              className="mg-bottom-xsm"
              defaultValue={testData.email}
              placeholder="xyz@gmail.com"
              required
            />
          </div>
          {/* Password */}
          <div className="password-item mg-xsm flex-column fw-bold">
            <label htmlFor="password" className="mg-bottom-xsm">
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type={passwordType}
              id="password"
              name="passwordField"
              defaultValue={testData.password}
              className="mg-bottom-xsm"
              minLength="8"
              required
            />
            <i
              className="material-icons login-pwd-show-icon"
              onClick={() =>
                setPasswordType((passwordType) =>
                  passwordType === "password" ? "text" : "password"
                )
              }
            >
              {passwordType === "password" ? "visibility_off" : "visibility"}
            </i>
            <Link to="/admin" className="forgot-password">
              Admin Page
            </Link>
          </div>
          {/*  Remember Me  */}
          <div className="remember-item mg-xsm fw-bold align-center">
            <input type="checkbox" className="mg-xsm" id="remember" />
            <label htmlFor="terms">Remember Me</label>
          </div>
          {/* Buttons */}
          <button href="" className="btn btn-solid fw-bold">
            LOGIN
          </button>
          <button
            type="submit"
            className="btn-outline btn fw-bold  "
            onClick={() =>
              setTestData({
                email: "test@gmail.com",
                password: "test@123",
              })
            }
          >
            Login with Test Credentials
          </button>
          <Link to="/signup" className="btn btn-outline-icon fw-bold">
            Create New Account<i className="material-icons">chevron_right</i>
          </Link>
        </div>
      </form>
      <Footer />
    </>
  );
};
