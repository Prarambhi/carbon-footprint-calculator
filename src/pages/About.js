import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css"; // Import CSS file

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); // Redirect to landing page
  };

  return (
    <div className="about-container">
      {/* Navbar with Back Button */}
      <nav className="about-navbar">
        <button className="back-button" onClick={handleBack}>Back</button>
      </nav>

      {/* Vision Section */}
      <header className="about-header">
        <h1>Our Vision for the Future</h1>
        <p>
          Our goal is to create a sustainable world where individuals can track, reduce, 
          and offset their carbon footprint through innovative, gamified solutions.
        </p>
      </header>

      {/* Meet the Team Section */}
      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-container">
          <div className="team-member">
            <img src="src\assets\sahil.jpg" alt="Member 1" />
            <h3>Sahil Mahtara</h3>
            
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Member 2" />
            <h3>VishnuPriya Sahu</h3>
           
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Member 3" />
            <h3>Prarambhi Kharose</h3>
            
          </div>
          <div className="team-member">
            <img src="src\assets\vansh.jpg" alt="Member 4" />
            <h3>Vansh Tawar</h3>
          
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
