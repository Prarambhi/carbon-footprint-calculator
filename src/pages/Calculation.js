import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../styles/Calculation.css";

const Calculation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transport, distance, energy, diet, waste } = location.state || {};

  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [breakdown, setBreakdown] = useState({
    transport: 0,
    distance: 0,
    energy: 0,
    food: 0,
    waste: 0,
  });

  // Utility: Format email to be Firebase-friendly
  const formatEmailForFirestore = (email) => email.replace(/\./g, ",");

  const [reducingTips, setReducingTips] = useState([]);

  useEffect(() => {
    const calculateCarbonFootprint = async () => {
      if (!auth.currentUser) return;

      // Convert inputs to numbers
      const distanceTravelled = parseFloat(distance) || 0;
      const energyUsage = parseFloat(energy) || 0;
      const wasteGenerated = parseFloat(waste) || 0;

      // Define emission factors (all in kg CO₂)
      // Transport: Use different factors based on mode.
      // If transport equals "bike", treat it as a motorcycle emission factor.
      const modeEmissionFactors = {
        car: 0.12,        // Typical gasoline car: 0.12 kg CO₂ per km.
        motorcycle: 0.08, // Typical motorcycle: ~0.08 kg CO₂ per km.
        public: 0.05,     // Public transport per person may be lower.
        walking: 0.0,     // Walking produces no tailpipe emissions.
      };

      // Map "bike" (if provided) to "motorcycle" for calculation purposes.
      const modeKey = transport === "bike" ? "motorcycle" : transport;
      const transportEmission = distanceTravelled * (modeEmissionFactors[modeKey] || 0);

      // Energy: Emission factor per kWh (value depends on regional grid mix).
      const energyEmissionFactor = 0.45; // Example: 0.45 kg CO₂ per kWh.
      const energyEmission = energyUsage * energyEmissionFactor;

      // Diet: Daily food-related emissions (assumed as a daily constant per diet type).
      
      const dietEmissionFactors = {
        vegan: 2.5,
        vegetarian: 3.8,
        omnivore: 7.2,
      };
      const dietEmission = dietEmissionFactors[diet] || 0;

      // Waste: Emission factor per kg waste generated.
      const wasteEmissionFactor = 0.5;
      const wasteEmission = wasteGenerated * wasteEmissionFactor;

      // Total emission: Sum of all categories.
      const totalEmission = (
        transportEmission +
        energyEmission +
        dietEmission +
        wasteEmission
      ).toFixed(2);

      // Update state with breakdown of emissions.
      setCarbonFootprint(totalEmission);
      setBreakdown({
        transport: transportEmission.toFixed(2),
        energy: energyEmission.toFixed(2),
        diet: dietEmission.toFixed(2),
        waste: wasteEmission.toFixed(2),
      });

      // Store data in Firebase
      const formattedEmail = formatEmailForFirestore(auth.currentUser.email);
      try {
        await addDoc(collection(db, "users", formattedEmail, "carbonCalculations"), {
          transport,
          distance: distanceTravelled,
          energy: energyUsage,
          diet,
          waste: wasteGenerated,
          emissionValue: totalEmission,
          breakdown: {
            transport: transportEmission,
            energy: energyEmission,
            diet: dietEmission,
            waste: wasteEmission,
          },
          timestamp: serverTimestamp(),
        });
        console.log("Carbon footprint saved for", auth.currentUser.email);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };

    calculateCarbonFootprint();
  }, [transport, distance, energy, diet, waste]);


  // Function to generate personalized reducing tips
  const generateReducingTips = () => {
    let tips = [];
  
    // Transport Tips
    if (transport === "car" && distance > 5) {
      tips.push("🚲 Consider using a bicycle or walking for short distances.");
      tips.push("🚌 Use public transport instead of a private car to reduce emissions.");
    }
    if (transport === "car" && distance > 20) {
      tips.push("🚗 Consider carpooling to reduce fuel consumption and emissions.");
      tips.push("⚡ If possible, switch to an electric or hybrid vehicle.");
    }
    if (transport === "bike" && distance > 10) {
      tips.push("🚴‍♂️ Ensure regular maintenance of your bicycle to improve efficiency.");
    }
    if (transport === "public transport" && distance > 30) {
      tips.push("⏳ Try to adjust your schedule to avoid peak hours, reducing overall congestion.");
    }
  
    // Energy Usage Tips
    if (energy > 40) {
      tips.push("💡 Reduce energy consumption by using energy-efficient appliances.");
      tips.push("🔌 Unplug devices when not in use to save electricity.");
    }
    if (energy > 70) {
      tips.push("🌞 Install solar panels to reduce dependency on fossil-fueled electricity.");
      tips.push("❄️ Adjust your air conditioning or heating to be more energy-efficient.");
    }
    if (energy < 20) {
      tips.push("🎉 Great job! Keep up the good work by using energy-efficient lighting and appliances.");
    }
  
    // Food Consumption Tips
    if (diet === "non vegetarian") {
      tips.push("🥦 Reduce meat consumption and include more plant-based foods.");
      tips.push("🍽 Try having one meat-free day per week to lower carbon footprint.");
    }
    if (diet === "heavy meat eater") {
      tips.push("🥩 Reduce red meat intake, as beef and lamb have higher carbon footprints.");
      tips.push("🌱 Experiment with plant-based protein alternatives.");
    }
    if (diet === "vegetarian" || diet === "vegan") {
      tips.push("💚 You're already making a great impact! Consider reducing processed food consumption for even better sustainability.");
    }
  
    // Waste Management Tips
    if (waste > 30) {
      tips.push("♻️ Recycle more to reduce waste impact on the environment.");
      tips.push("🍃 Compost organic waste instead of throwing it away.");
    }
    if (waste > 50) {
      tips.push("🛍️ Reduce single-use plastics by using reusable bags and containers.");
      tips.push("🔄 Buy products with minimal packaging or made from recycled materials.");
    }
    if (waste < 20) {
      tips.push("🌍 Excellent waste management! Keep up the good work with reusing and recycling.");
    }
  
    // Combined Scenarios
    if (transport === "car" && energy > 50 && waste > 40) {
      tips.push("🌎 Consider working remotely when possible to reduce transport emissions.");
      tips.push("🚗 Reduce unnecessary trips by planning errands in one go.");
    }
    if (diet === "non vegetarian" && energy > 60) {
      tips.push("🔥 Cooking more at home instead of ordering out can reduce energy and food waste.");
      tips.push("🌾 Buying local and seasonal produce reduces emissions from long-distance transport.");
    }
    if (distance > 50 && transport === "public transport") {
      tips.push("💼 If commuting long distances daily, consider remote work or relocating closer to work.");
    }
  
    setReducingTips(tips);
  };
  

  return (
    <div className="calculation-container">
      <h1>🌍 Your Carbon Footprint</h1>
      <p>Based on your logged activities, here is your estimated daily carbon footprint:</p>

      {carbonFootprint !== null ? (
        <div className="carbon-result">
          <h2>{carbonFootprint} kg CO₂</h2>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(carbonFootprint * 10, 100)}%` }}
            ></div>
          </div>
          <div className="category-breakdown">
            <p>🚗 Transport: {breakdown.transport} kg CO₂</p>
            <p>📏 Distance Travelled: {distance} km</p>
            <p>⚡ Energy: {breakdown.energy} kg CO₂</p>
            <p>🥗 Diet: {breakdown.diet} kg CO₂</p>
            <p>🗑 Waste: {breakdown.waste} kg CO₂</p>
          </div>
        </div>
      ) : (
        <p>Calculating...</p>
      )}


      <button className="reduce-button" onClick={generateReducingTips}>
        Show Reducing Tips
      </button>

      {reducingTips.length > 0 && (
        <div className="reducing-tips">
          <h3>♻️ Personalized Reducing Tips</h3>
          <ul>
            {reducingTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="next-button" onClick={() => navigate("/progress")}>
        View Progress
      </button>

      <button className="back-button" onClick={() => navigate("/dashboard")}>
        Back
      </button>
    </div>
  );
};

export default Calculation;
