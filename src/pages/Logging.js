import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../styles/Logging.css"; // Import styles

const Logging = () => {
  const navigate = useNavigate();

  // User activity states
  const [transport, setTransport] = useState("");
  const [distance, setDistance] = useState("");
  const [energy, setEnergy] = useState("");
  const [diet, setDiet] = useState("");
  const [waste, setWaste] = useState("");
  const [error, setError] = useState("");

  // XP & Streak System
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [badge, setBadge] = useState("");

  // Function to log activity
  const handleLogActivity = async () => {
    if (!transport || !energy || !diet || !waste || distance === "") {
      setError("⚠️ Please fill in all fields before proceeding!");
      return;
    }

    setError(""); // Clear previous errors

    let newXp = xp + 10;
    let newStreak = streak + 1;

    let newBadge = "";
    if (newStreak === 5) newBadge = "Eco Starter 🌱";
    if (newStreak === 10) newBadge = "Green Warrior 🌍";
    if (newStreak >= 20) newBadge = "Sustainability Champion 🏆";

    setXp(newXp);
    setStreak(newStreak);
    setBadge(newBadge);

    // Store in Firebase
    if (auth.currentUser) {
      const formattedEmail = auth.currentUser.email.replace(/\./g, ",");
      try {
        await addDoc(collection(db, "users", formattedEmail, "carbonLogs"), {
          transport,
          distance,
          energy,
          diet,
          waste,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }

    // Navigate to Calculation page with input data
    navigate("/calculation", {
      state: { transport, distance, energy, diet, waste },
    });
  };

  return (
    <div className="logging-container">
      <nav className="navbar">
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          Back
        </button>
      </nav>

      <h2>Log Your Daily Activities 🌍</h2>
      <p>Earn XP and badges by tracking your carbon footprint daily!</p>

      {error && <p className="error-message">{error}</p>}

      <div className="input-group">
        <label>🚗 Transportation Mode:</label>
        <select value={transport} onChange={(e) => setTransport(e.target.value)}>
          <option value="">Select</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="public">Public Transport</option>
          <option value="walking">Walking</option>
        </select>
      </div>

      <div className="input-group">
        <label>📏 Distance Travelled (km):</label>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          min="0"
        />
      </div>

      <div className="input-group">
        <label>⚡ Energy Usage (kWh):</label>
        <input type="number" value={energy} onChange={(e) => setEnergy(e.target.value)} />
      </div>

      <div className="input-group">
        <label>🥗 Diet Type:</label>
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="">Select</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="omnivore">Omnivore</option>
        </select>
      </div>

      <div className="input-group">
        <label>🗑️ Waste Generated (kg):</label>
        <input type="number" value={waste} onChange={(e) => setWaste(e.target.value)} />
      </div>

      <button className="log-button" onClick={handleLogActivity}>
        Calculate My Footprint 🚀
      </button>

      <div className="progress-section">
        <h3>🔥 Streak: {streak} days</h3>
        <h3>💡 XP: {xp}</h3>
        {badge && <h3>🏅 Badge Earned: {badge}</h3>}
      </div>
    </div>
  );
};

export default Logging;
