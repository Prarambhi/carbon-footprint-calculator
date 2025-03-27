import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; // Import CSS styles

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (if stored in localStorage/sessionStorage)
    localStorage.removeItem("userToken"); // Adjust based on your auth system
    navigate("/auth"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <h2 className="logo">EcoTrack</h2>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="title-box">
  Carbon Footprint Calculator
</div>


      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate("/Logging")}>
          <h3>Carbon Footprint</h3>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/Challenges")}>
          <h3>Tasks to Reduce It</h3>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/Progress")}>
          <h3>Track Your Record</h3>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/Rewards")}>
          <h3>Redeem Rewards</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
