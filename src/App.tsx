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
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trigger" element={<TriggerMe />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
