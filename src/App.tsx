import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import CRTOverlay from "./components/layout/CRTOverlay";
import Home from "./pages/Home";
import TriggerMe from "./pages/TriggerMe";
import BootSequence from "./components/os/BootSequence";
import LoginScreen from "./components/os/LoginScreen";

type SystemState = 'BOOTING' | 'LOGIN' | 'DESKTOP';

function App() {
  const [systemState, setSystemState] = useState<SystemState>('BOOTING');

  const handleShutdown = () => {
    setSystemState('BOOTING');
  };

  return (
    <div className="min-h-screen bg-portfolio-bg text-portfolio-text font-body selection:bg-portfolio-accent selection:text-white">
      <CRTOverlay />
      
      {systemState === 'BOOTING' && (
        <BootSequence onComplete={() => setSystemState('LOGIN')} />
      )}

      {systemState === 'LOGIN' && (
        <LoginScreen onLogin={() => setSystemState('DESKTOP')} />
      )}

      {systemState === 'DESKTOP' && (
        <>
          {/* Hide standard Navbar in Desktop mode if we want full OS feel, 
              but keeping it for navigation fallback if needed. 
              Actually, for full OS feel, we can hide it or integrate it. 
              Let's hide it for Home (Desktop) and show for others. */}
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
