import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import CRTOverlay from "./components/layout/CRTOverlay";
import Home from "./pages/Home";
import TriggerMe from "./pages/TriggerMe";
import BootSequence from "./components/os/BootSequence";
import LandingPage from "./components/os/LandingPage";

type SystemState = 'BOOTING' | 'LANDING' | 'DESKTOP';

function App() {
  const [systemState, setSystemState] = useState<SystemState>('LANDING');

  const handleShutdown = () => {
    setSystemState('LANDING');
  };

  return (
    <div className="min-h-screen bg-portfolio-bg text-portfolio-text font-body selection:bg-portfolio-accent selection:text-white">
      <CRTOverlay />
      
      {systemState === 'LANDING' && (
        <LandingPage onStart={() => setSystemState('BOOTING')} />
      )}

      {systemState === 'BOOTING' && (
        <BootSequence onComplete={() => setSystemState('DESKTOP')} />
      )}

      {systemState === 'DESKTOP' && (
        <>
          <Routes>
            <Route path="/" element={<Home onShutdown={handleShutdown} />} />
            <Route path="/trigger" element={<><Navbar /><TriggerMe /></>} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
