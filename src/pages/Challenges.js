import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Challenges.css";

const Challenges = () => {
  const navigate = useNavigate();

  // XP Challenges
  const challenges = [
    { id: 1, title: "🚴‍♂️ Bike to Work Challenge", reward: 40 },
    { id: 2, title: "🥦 Go Meatless for a Day", reward: 25 },
    { id: 3, title: "💡 Reduce Energy Consumption", reward: 30 },
    { id: 4, title: "🚶‍♂️ Walk Instead of Driving", reward: 30 },
    { id: 5, title: "🛍️ Use Reusable Bags", reward: 25 },
  ];

  const [completed, setCompleted] = useState([]);

  const handleComplete = (id) => {
    if (!completed.includes(id)) {
      setCompleted([...completed, id]);
    }
  };

  // Determine Badge Type
  const getBadge = () => {
    if (completed.length === 5) {
      return <div className="gold-badge"><span className="badge-icon">🏆</span> Gold Badge</div>;
    } else if (completed.length === 4) {
      return <div className="silver-badge"><span className="badge-icon">🥈</span> Silver Badge</div>;
    } else if (completed.length === 3) {
      return <div className="bronze-badge"><span className="badge-icon">🥉</span> Bronze Badge</div>;
    }
    return null;
  };

  return (
    <div className="challenges-container">
      <h1>🎯 Personalized Challenges</h1>
      <p>Complete these challenges to reduce emissions and earn rewards!</p>

      <ul className="challenges-list">
        {challenges.map((challenge) => (
          <li key={challenge.id} className="challenge-item">
            <span className={completed.includes(challenge.id) ? "completed" : ""}>
              {challenge.title}
            </span>
            <strong>Earn {challenge.reward} XP</strong>
            <button
              className="complete-button"
              onClick={() => handleComplete(challenge.id)}
              disabled={completed.includes(challenge.id)}
            >
              {completed.includes(challenge.id) ? "✅ Completed" : "Complete Challenge"}
            </button>
          </li>
        ))}
      </ul>

      {/* 🏆 Badge Display */}
      <div className="badge-container">{getBadge()}</div>

      <button className="next-button" onClick={() => navigate("/progress")}>
        View My Progress 📊
      </button>
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
    </div>
  );
};

export default Challenges;
