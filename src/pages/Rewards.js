import React from "react"; 
import { useNavigate } from "react-router-dom";
import "../styles/Rewards.css";

const donateOptions = [
  { id: 1, title: "Plant a Tree" },
  { id: 2, title: "Ocean Cleanup" },
  { id: 3, title: "Wildlife Protection" },
  { id: 4, title: "Solar Energy Support"},
  { id: 5, title: "Reduce Plastic Waste" },
];

const ecoProducts = [
  { id: 1, title: "Reusable Water Bottle"},
  { id: 2, title: "Bamboo Toothbrush" },
  { id: 3, title: "Eco-Friendly Tote Bag" },
  { id: 4, title: "Solar-Powered Charger"},
  { id: 5, title: "Recycled Notebook" },
];

const Rewards = () => {
  const navigate = useNavigate();

  const handleDonate = () => alert("Thank you for donating!");
  const handleRedeem = () => alert("Your reward is successfully redeemed!");

  return (
    <div className="rewards-container">
      <h1 className="rewards-title">🎉 Redeem Your Eco-Tokens</h1>
      <p className="rewards-description">Use your earned eco-tokens to support sustainability!</p>

      <div className="rewards-sections">
        {/* Donate Section */}
        <div className="rewards-column">
          <h2 className="section-title">🌍 EcoGive</h2>
          <div className="rewards-list">
            {donateOptions.map((item) => (
              <div key={item.id} className="reward-item">
                <div className="reward-content">
                  <h3>{item.title}</h3>
                  <button onClick={handleDonate} className="action-button">Donate</button>
                </div>
                <img src={item.image} alt={item.title} className="reward-image" />
              </div>
            ))}
          </div>
        </div>

        {/* Eco-Friendly Products Section */}
        <div className="rewards-column">
          <h2 className="section-title">🛍️ EcoGoods</h2>
          <div className="rewards-list">
            {ecoProducts.map((item) => (
              <div key={item.id} className="reward-item">
                <div className="reward-content">
                  <h3>{item.title}</h3>
                  <button onClick={handleRedeem} className="action-button">Redeem</button>
                </div>
                <img src={item.image} alt={item.title} className="reward-image" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
    </div>
  );
};

export default Rewards;
