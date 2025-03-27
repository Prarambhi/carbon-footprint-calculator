import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import "../styles/Progress.css";

const COLORS = ["#ff4500", "#00ff7f", "#1e90ff", "#ffcc00"];

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const [categoryEmissions, setCategoryEmissions] = useState([]);
  const [averageFootprint, setAverageFootprint] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Navigation hook

  const formatEmailForFirestore = (email) => email.replace(/\./g, ",");

  useEffect(() => {
    const fetchProgressData = async () => {
      if (!auth.currentUser) return;

      const formattedEmail = formatEmailForFirestore(auth.currentUser.email);
      const userCollection = collection(db, "users", formattedEmail, "carbonCalculations");

      try {
        const snapshot = await getDocs(userCollection);
        if (snapshot.empty) {
          setLoading(false);
          return;
        }

        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          date: new Date(doc.data().timestamp?.seconds * 1000).toLocaleDateString(),
        }));

        setProgressData(data.reverse()); // Show latest data first

        const totalEmission = data.reduce((sum, entry) => sum + parseFloat(entry.emissionValue), 0);
        setAverageFootprint((totalEmission / data.length).toFixed(2));

        if (data.length > 0 && data[0].categoryEmissions) {
          const latestEmissions = data[0].categoryEmissions;
          const formattedEmissions = [
            { name: "Transport", value: parseFloat(latestEmissions.transport) },
            { name: "Energy", value: parseFloat(latestEmissions.energy) },
            { name: "Food", value: parseFloat(latestEmissions.food) },
            { name: "Waste", value: parseFloat(latestEmissions.waste) },
          ];
          setCategoryEmissions(formattedEmissions);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching progress data:", error);
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <div className="progress-container">
      
      {/* Navbar with Back Button */}
      <nav className="navbar">
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          Back
        </button>
      </nav>
      
      {loading ? (
        <p className="loading">Fetching your data...</p>
      ) : progressData.length === 0 ? (
        <p className="no-data">No progress data available.</p>
      ) : (
        <>
          <div className="summary">
            <h2>🌍 Average Emission: {averageFootprint} kg CO₂</h2>
          </div>

          {/* Emission Breakdown (Pie Chart) */}
          <div className="pie-chart-section">
            <h3>🔍 Emission Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryEmissions}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value} kg`}
                >
                  {categoryEmissions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Carbon Footprint History Table */}
          <div className="history-section">
            <h3>📜 Carbon Footprint History</h3>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Emission (kg CO₂)</th>
                </tr>
              </thead>
              <tbody>
                {progressData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.emissionValue} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Graph for long-term impact */}
          <div className="graph-section">
            <h3>📊 Your Carbon Emission Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" stroke="#ddd" />
                <YAxis stroke="#ddd" />
                <Tooltip />
                <Line type="monotone" dataKey="emissionValue" stroke="#00ff7f" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Progress;
