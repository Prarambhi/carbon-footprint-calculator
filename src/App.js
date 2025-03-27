import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Logging from "./pages/Logging";
import Calculation from "./pages/Calculation";
import Challenges from "./pages/Challenges";
import Progress from "./pages/Progress";
import Community from "./pages/Community";
import Rewardss from "./pages/Rewardss";
import Auth from "./pages/Auth";
import Dashboard from "./pages/dashboard";
import Mission from "./pages/Mission";
import About from "./pages/About";
import Rewards from "./pages/Rewards";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/logging" element={<Logging />} />
      <Route path="/calculation" element={<Calculation />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/community" element={<Community />} />
      <Route path="/rewardss" element={<Rewardss />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mission" element={<Mission />} />
      <Route path="/about" element={<About />} />
      <Route path="/rewards" element={<Rewards />} />


    </Routes>
  );
}

export default App;
