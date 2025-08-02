// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eyeClosed from "../assets/eye closed.png";
import eyeOpened from "../assets/eye opened.png";
import "../styles/SignIn.css";
import axios from "axios";
import CustomToast from "../components/CustomToast";
import clsx from "clsx";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const BaseUrl = import.meta.env.VITE_BACKEND_URL;

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      showToast("error", "Please enter both email/username and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { identifier, password };

      const response = await axios.post(`${BaseUrl}/auth/login`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      sessionStorage.setItem("tl_user", JSON.stringify(response.data.data));

      showToast("success", response.data.message);
      setTimeout(() => navigate("/explorepage"), 1000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Invalid credentials. Please try again.";
      showToast("error", errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {toast && (
        <CustomToast
          type={toast.type}
          message={toast.message}
          duration={4000}
          onClose={() => setToast(null)}
        />
      )}

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

            <button
              type="submit"
              className={clsx(
                "login-button",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <p className="signup-link cursor-pointer">
              New user? <a onClick={() => navigate("/signup")}>Signup here</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
