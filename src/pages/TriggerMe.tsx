import { useState } from 'react';
import { motion } from 'framer-motion';

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

    setTimeout(() => {
      setStatus('AGENT_READY');
      setLogs(prev => [`[SUCCESS] ${label} received by laptop agent.`, ...prev]);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-[#070711] font-body relative overflow-hidden">
      {/* Aggressive Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
        backgroundImage: 'linear-gradient(#ff00ff 1px, transparent 1px), linear-gradient(90deg, #ff00ff 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        transform: 'perspective(500px) rotateX(45deg)',
        transformOrigin: 'top'
      }} />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Control Panel */}
        <div className="lg:col-span-2 space-y-8">
          <header className="border-b-4 border-portfolio-accent pb-4">
            <h1 className="font-display text-4xl md:text-6xl text-white italic tracking-tighter" style={{ textShadow: '4px 4px 0 #3366cc' }}>
              TRIGGER_ASHISH.EXE
            </h1>
            <p className="text-portfolio-secondary mt-2 tracking-[0.3em] font-display text-xs font-bold">
              REMOTE CHAOS CONTROL INTERFACE // V3.0.4-REVELATION
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRIGGER_ACTIONS.map((action) => (
              <motion.button
                key={action.id}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTrigger(action.id, action.label, action.cost)}
                className="bg-portfolio-panel border-4 border-portfolio-accent hover:border-portfolio-secondary p-6 text-left group transition-all relative overflow-hidden shadow-[8px_8px_0px_#000]"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl drop-shadow-[0_0_8px_rgba(255,0,255,0.5)]">{action.icon}</span>
                  <span className="font-display text-[10px] text-portfolio-secondary font-bold bg-black px-2 py-1">COST: {action.cost}P</span>
                </div>
                <h3 className="font-display text-xl text-white mb-2 group-hover:text-portfolio-accent transition-colors italic tracking-tight">
                  {action.label}
                </h3>
                <p className="text-[11px] text-portfolio-text font-bold uppercase tracking-wider">
                  {action.description}
                </p>
                
                <div className="absolute bottom-0 left-0 h-1 bg-portfolio-secondary w-0 group-hover:w-full transition-all duration-500 shadow-[0_0_10px_#ffd700]"></div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-6">
          <div className="bg-[#000080] border-4 border-portfolio-secondary p-6 shadow-[10px_10px_0px_#000]">
            <h3 className="font-display text-portfolio-secondary mb-6 text-xs italic tracking-widest border-b-2 border-portfolio-secondary/30 pb-2">📡 REMOTE_LINK_STATUS</h3>
            
            <div className="space-y-6 font-display">
              <div>
                <div className="text-[10px] text-white/50 mb-1 uppercase tracking-widest">Available Energy</div>
                <div className="text-4xl text-portfolio-accent font-bold tracking-tighter italic" style={{ textShadow: '2px 2px 0 #000' }}>
                  {points.toLocaleString()} <span className="text-xs italic text-portfolio-secondary">PTS</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-white/50 mb-1 uppercase tracking-widest">Agent Link</div>
                <div className={`text-sm font-bold ${status === 'AGENT_IDLE' ? 'text-portfolio-success' : 'text-portfolio-warning'} animate-pulse tracking-widest`}>
                  >> {status}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-portfolio-accent/30">
                <div className="text-[10px] text-white/50 mb-2 uppercase tracking-widest">Command_Buffer</div>
                <div className="bg-black/80 p-3 h-56 overflow-y-auto text-[10px] space-y-2 font-mono text-portfolio-success border-inset">
                  {logs.map((log, i) => (
                    <div key={i} className="border-l-2 border-portfolio-success/30 pl-2">{log}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-portfolio-accent border-4 border-white p-6 text-white shadow-[10px_10px_0px_#000]">
            <h4 className="font-display text-black text-xs mb-4 bg-white px-2 py-1 inline-block">SECURITY_PROTOCOL_v3</h4>
            <p className="text-[10px] leading-relaxed font-bold uppercase tracking-wider italic">
              All triggers are sandboxed. The laptop agent only executes whitelisted commands. 
              No raw shell access is granted. Emergency stop active on host machine.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TriggerMe;
