import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Rewardss.css";

const Rewardss = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken"); // Check if user is logged in
  const [activeTab, setActiveTab] = useState("coupons");
  const [showAuthWarning, setShowAuthWarning] = useState(false); // State to show login warning

  const handleGetReward = () => {
    if (!isAuthenticated) {
      setShowAuthWarning(true); // Show login prompt
      setTimeout(() => setShowAuthWarning(false), 3000); // Hide after 3 seconds
    } else {
      alert("🎉 Reward Claimed Successfully!");
    }
  };

  return (
    <div className="rewardss-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <h2 className="logo">EcoTrack</h2>
          <p className="tagline">Track. Reduce. Sustain.</p>
        </div>
        <button className="back-button" onClick={() => navigate("/")}>
          Back
        </button>
      </nav>

      {/* Tabs */}
      <div className="tabs">
        <span
          className={activeTab === "coupons" ? "active-tab" : ""}
          onClick={() => setActiveTab("coupons")}
        >
          Coupons
        </span>
        <span
          className={activeTab === "rewards" ? "active-tab" : ""}
          onClick={() => setActiveTab("rewards")}
        >
          My Rewards
        </span>
      </div>

      {/* Daily Rewards Section */}
      {activeTab === "coupons" && (
        <div className="daily-rewards">
          <h2>Daily Rewards</h2>
          <div className="reward-progress">
            {[...Array(5)].map((_, index) => (
              <div key={index} className={`reward-circle ${index === 0 ? "active" : ""}`}>
                ₵2
              </div>
            ))}
          </div>
          <button className="get-reward-btn" onClick={handleGetReward}>
            Get Reward
          </button>
          
          {/* Show login prompt if user is not authenticated */}
          {showAuthWarning && (
            <div className="auth-warning">
              ⚠ You need to <span className="login-link" onClick={() => navigate("/auth")}>Log in</span> to claim rewards!
            </div>
          )}
        </div>
      )}

      {/* Exclusive Deals Section */}
      <div className="exclusive-deals">
        <h2>Exclusive Deals on iCruze</h2>
        <p>Get the best discounts on your favorite products</p>

        <div className="deal-cards">
          <div className="deal-card">
            <h3>Waterproof Smartwatch</h3>
            <p>Just ₹1999/- @ iCruze</p>
            <span className="category">Electronics</span>
          </div>

          <div className="deal-card">
            <h3>Buy Earbuds</h3>
            <p>Just ₹699/- @ iCruze</p>
            <span className="category">Electronics</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewardss;
