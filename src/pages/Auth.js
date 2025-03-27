import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "../styles/Auth.css";
import authBg from "../assets/images/auth-bg.jpg";  // Import your background image

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async () => {
    setError(null);
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="auth-card">
        <h2>{isLogin ? "Welcome Back! " : "Join Us Today! 🌱"}</h2>
        <p className="subtitle">
          {isLogin
            ? "Login to track your carbon footprint."
            : "Sign up to start your sustainability journey."}
        </p>

        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        <button onClick={handleAuth}>{isLogin ? "Login" : "Sign Up"}</button>

        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
