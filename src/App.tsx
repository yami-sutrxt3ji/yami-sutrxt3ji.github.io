import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import CRTOverlay from "./components/layout/CRTOverlay";
import Home from "./pages/Home";
import TriggerMe from "./pages/TriggerMe";

function App() {
  return (
    <div className="min-h-screen bg-portfolio-bg text-portfolio-text font-body selection:bg-portfolio-accent selection:text-white">
      <CRTOverlay />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trigger" element={<TriggerMe />} />
      </Routes>
    </div>
  );
}

export default App;
