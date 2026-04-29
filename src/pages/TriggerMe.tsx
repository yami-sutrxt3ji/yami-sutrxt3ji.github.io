import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { io } from 'socket.io-client'; // Future backend integration

const TRIGGER_ACTIONS = [
  { id: 'annoy', label: 'ANNOY_TERMINAL', icon: '📟', cost: 10, description: 'Causes fake glitches in the developer terminal.' },
  { id: 'popup', label: 'SPAWN_POPUP', icon: '🪟', cost: 25, description: 'Sends a random meme popup to Ashish\'s screen.' },
  { id: 'mute', label: 'MUTE_MUSIC', icon: '🔇', cost: 15, description: 'Mutes the current playlist for 30 seconds.' },
  { id: 'chaos', label: 'CHAOS_VOTE', icon: '🎲', cost: 50, description: 'Starts a 60s global vote for a major system event.' },
  { id: 'flash', label: 'SCREEN_RED', icon: '🚨', cost: 20, description: 'Flashes Ashish\'s screen red for 2 seconds.' },
  { id: 'shake', label: 'SHAKE_ENV', icon: '📳', cost: 30, description: 'Triggers a physical desk shake (via smart device).' },
];

const TriggerMe = () => {
  const [points, setPoints] = useState(100);
  const [status, setStatus] = useState('AGENT_IDLE');
  const [logs, setLogs] = useState<string[]>(['[SYSTEM] Initializing remote link...', '[SYSTEM] Waiting for laptop agent connection...']);

  const handleTrigger = (actionId: string, label: string, cost: number) => {
    if (points < cost) {
      setLogs(prev => [`[ERROR] Insufficient points for ${label}`, ...prev]);
      return;
    }

    setPoints(prev => prev - cost);
    setLogs(prev => [`[COMMAND] Executing ${label}...`, ...prev]);
    setStatus(`EXECUTING_${actionId.toUpperCase()}`);

    // Mock success
    setTimeout(() => {
      setStatus('AGENT_READY');
      setLogs(prev => [`[SUCCESS] ${label} received by laptop agent.`, ...prev]);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Control Panel */}
        <div className="lg:col-span-2 space-y-8">
          <header className="border-b-2 border-portfolio-accent pb-4">
            <h1 className="font-display text-3xl md:text-5xl text-portfolio-text-bright flex items-center gap-4">
              <span className="text-portfolio-accent animate-pulse">●</span>
              TRIGGER_ASHISH.EXE
            </h1>
            <p className="text-portfolio-secondary mt-2 tracking-widest font-mono text-sm">
              REMOTE CHAOS CONTROL INTERFACE // v1.0.4-BETA
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRIGGER_ACTIONS.map((action) => (
              <motion.button
                key={action.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTrigger(action.id, action.label, action.cost)}
                className="bg-portfolio-panel border-2 border-portfolio-border/30 hover:border-portfolio-accent p-6 text-left group transition-all relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl">{action.icon}</span>
                  <span className="font-mono text-xs text-portfolio-accent font-bold">COST: {action.cost}P</span>
                </div>
                <h3 className="font-display text-lg text-portfolio-text-bright mb-2 group-hover:text-portfolio-accent transition-colors">
                  {action.label}
                </h3>
                <p className="text-xs text-portfolio-text/60 font-mono">
                  {action.description}
                </p>
                
                {/* Progress bar background on hover */}
                <div className="absolute bottom-0 left-0 h-1 bg-portfolio-accent w-0 group-hover:w-full transition-all duration-500"></div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-6">
          <div className="bg-portfolio-panel border-2 border-portfolio-border p-6 shadow-[8px_8px_0px_rgba(0,229,255,0.1)]">
            <h3 className="font-display text-portfolio-border mb-6 text-sm">📡 REMOTE_STATUS</h3>
            
            <div className="space-y-4 font-mono">
              <div>
                <div className="text-[10px] text-portfolio-text/50 mb-1 uppercase">Points Available</div>
                <div className="text-3xl text-portfolio-accent font-bold tracking-tighter">
                  {points.toLocaleString()} <span className="text-xs">PTS</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-portfolio-text/50 mb-1 uppercase">Agent Status</div>
                <div className={`text-sm font-bold ${status === 'AGENT_IDLE' ? 'text-portfolio-success' : 'text-portfolio-warning'} animate-pulse`}>
                  {status}
                </div>
              </div>

              <div className="pt-4 border-t border-portfolio-border/20">
                <div className="text-[10px] text-portfolio-text/50 mb-2 uppercase">Command Logs</div>
                <div className="bg-black/50 p-3 h-48 overflow-y-auto text-[10px] space-y-1 text-portfolio-success">
                  {logs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-portfolio-accent/10 border-2 border-portfolio-accent/30 p-6">
            <h4 className="font-display text-portfolio-accent text-xs mb-4">SECURITY_NOTICE</h4>
            <p className="text-[10px] leading-relaxed font-mono opacity-80">
              All triggers are sandboxed. The laptop agent only executes whitelisted commands. 
              No raw shell access is granted to visitors. Emergency stop is active on Ashish's physical machine.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TriggerMe;
