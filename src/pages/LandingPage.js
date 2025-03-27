import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import landingBg from "../assets/images/landing-background.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="landing-container"
      style={{
        backgroundImage: `url(${landingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100.vh",
        color: "white",
      }}
    >
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">EcoTrack</h2>
        <div className="nav-links">
          <button onClick={() => navigate("/community")} className="nav-button">
            Community
          </button>
          <button onClick={() => navigate("/rewards")} className="nav-button">
            Rewards
          </button>
          <button onClick={() => navigate("/about")} className="nav-button">
            About Us
          </button>
          <button onClick={() => navigate("/mission")} className="nav-button">
            Mission
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="overlay">
        <h1 className="landing-title"> Track & Reduce your Carbon Footprint</h1>
        <p className="landing-subtitle">
        Join our gamified platform to measure, track, and lower your carbon footprint through real-time analytics, challenges, and rewards.
 <br />
        </p>

        <button className="landing-button" onClick={() => navigate("/auth")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
