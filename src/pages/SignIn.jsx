// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eyeClosed from "../assets/eye closed.png";
import eyeOpened from "../assets/eye opened.png";
import "../styles/SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/ExplorePage");
  };

  return (
    <div className="container">
      <div className="signin-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="identifier">Email or Username</label>
          <input
            className="input-field"
            type="text"
            id="identifier"
            name="identifier"
            placeholder="Enter your email or username"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              className="password-input"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? eyeOpened : eyeClosed}
              alt="Toggle Password"
              className="toggle-icon"
              onClick={handleTogglePassword}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <p className="signup-link">
            New user? <a href="/signup">Signup here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
