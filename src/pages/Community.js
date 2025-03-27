import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Community.css"; // Import styles

const Community = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([
    { name: "Green Warriors", points: 1200 },
    { name: "Eco Avengers", points: 1050 },
    { name: "Sustainable Squad", points: 980 },
  ]);

  const [newTeam, setNewTeam] = useState("");

  const handleCreateTeam = () => {
    if (newTeam.trim() !== "") {
      setTeams([...teams, { name: newTeam, points: 0 }]);
      setNewTeam("");
    }
  };

  return (
    <div className="community-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="website-name">EcoTrack</h2>
        <button className="back-button" onClick={() => navigate("/")}>
          Back
        </button>
      </nav>

      <h1>🌍 Community & Competition</h1>
      <p>Join leaderboards, team challenges, and engage with the eco-community.</p>

      {/* Leaderboard Section */}
      <h2>🏆 Leaderboard</h2>
      <ul className="leaderboard">
        {teams
          .sort((a, b) => b.points - a.points)
          .map((team, index) => (
            <li key={index} className="team">
              <span>{index + 1}. {team.name}</span>
              <span>{team.points} XP</span>
            </li>
          ))}
      </ul>

      {/* Create/Join a Team */}
      <div className="team-section">
        <h2>👥 Join or Create a Team</h2>
        <input
          type="text"
          value={newTeam}
          onChange={(e) => setNewTeam(e.target.value)}
          placeholder="Enter team name"
        />
        <button onClick={handleCreateTeam}>Create Team</button>
      </div>

      {/* Social Sharing */}
      <h2>📢 Share Your Progress</h2>
      <button className="share-button" onClick={() => alert("Shared on Social Media!")}>
        Share on Socials
      </button>
      <button className="rewards-button" onClick={() => navigate("/rewards")}>Claim My Rewards 🎁</button>
    </div>
  );
};

export default Community;
