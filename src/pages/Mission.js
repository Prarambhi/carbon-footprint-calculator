import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Mission.css";

const MissionPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleBack = () => {
    navigate("/"); // Redirects to the landing page
  };

  const handleGetStarted = () => {
    navigate("/auth"); // Redirects to the Auth page
  };

  return (
    <div className="mission-container">
      {/* Navbar with Back Button */}
      <nav className="mission-navbar">
        <button className="back-button" onClick={handleBack}>Back</button>
      </nav>

      <header className="mission-header">
        <h1>Our Mission</h1>
        <p>Empowering individuals to track, reduce, and offset their carbon footprint through gamification and rewards.</p>
      </header>

      <section className="mission-content">
        <div className="mission-section">
          <h2>Why It Matters</h2>
          <p>Every action we take leaves a carbon footprint. By making conscious choices, we can collectively reduce our impact on the planet.</p>
        </div>

        <div className="mission-section">
          <h2>How It Works</h2>
          <ul>
            <li><strong>Track:</strong> Log daily activities to measure your carbon footprint.</li>
            <li><strong>Reduce:</strong> Get personalized tips and complete sustainability challenges.</li>
            <li><strong>Earn Rewards:</strong> Participate in eco-friendly actions and redeem rewards.</li>
          </ul>
        </div>

        <div className="mission-section">
          <h2>Our Vision</h2>
          <p>We aim to create a global community committed to reducing carbon emissions through innovative, gamified solutions.</p>
        </div>
      </section>

      <footer className="mission-footer">
        <h2>Join the Movement</h2>
        <p>Every step towards sustainability counts. Start your journey today.</p>
        <button className="mission-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </footer>
    </div>
  );
};

export default MissionPage;
