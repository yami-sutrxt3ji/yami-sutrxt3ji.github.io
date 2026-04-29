import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface TaskbarProps {
  onShutdown: () => void;
}

const Taskbar = ({ onShutdown }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());
  const [isStartOpen, setIsStartOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        setIsStartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#000080] border-t-4 border-portfolio-accent flex items-center px-2 z-[500] shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
      {/* Start Button */}
      <div className="relative" ref={startMenuRef}>
        <button 
          onClick={() => setIsStartOpen(!isStartOpen)}
          className={`flex items-center gap-2 bg-portfolio-secondary border-b-4 border-r-4 border-black px-4 py-1 font-display text-xs italic tracking-tighter transition-all active:translate-y-1 active:translate-x-1 active:border-none
            ${isStartOpen ? 'bg-white text-black' : 'text-black'}`}
        >
          <span className="text-sm">⚡</span>
          <span className="uppercase font-bold">START_OS</span>
        </button>

        {/* Start Menu */}
        <AnimatePresence>
          {isStartOpen && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute bottom-full left-0 mb-2 w-72 bg-portfolio-panel border-4 border-portfolio-accent shadow-[10px_10px_0px_#000000] overflow-hidden font-display"
            >
              <div className="flex">
                {/* Side Banner */}
                <div className="bg-[#000040] w-12 flex items-center justify-center pt-8 overflow-hidden border-r-2 border-portfolio-secondary">
                  <span className="rotate-[-90deg] text-portfolio-accent font-bold tracking-[0.2em] text-xl whitespace-nowrap italic">REVELATION_V3</span>
                </div>
                
                {/* Menu Items */}
                <div className="flex-1 py-2 bg-gradient-to-br from-portfolio-panel to-[#070711]">
                  <Link 
                    to="/trigger" 
                    className="flex items-center gap-4 px-6 py-3 hover:bg-portfolio-accent hover:text-white text-portfolio-text-bright text-xs group transition-colors"
                    onClick={() => setIsStartOpen(false)}
                  >
                    <span className="text-xl group-hover:scale-125 transition-transform">🚨</span>
                    <span>TRIGGER_CORE</span>
                  </Link>
                  
                  <div className="h-0.5 bg-portfolio-secondary mx-4 my-2 opacity-50" />
                  
                  <a 
                    href="https://github.com/yami-sutrxt3ji" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-6 py-3 hover:bg-portfolio-secondary hover:text-black text-portfolio-text-bright text-xs group"
                  >
                    <span className="text-xl group-hover:rotate-12 transition-transform">📂</span>
                    <span>GITHUB_ARCHIVE</span>
                  </a>
                  
                  <a 
                    href="https://linkedin.com/in/ashish-kumar-9a5b4b" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-6 py-3 hover:bg-[#3366cc] hover:text-white text-portfolio-text-bright text-xs group"
                  >
                    <span className="text-xl group-hover:-rotate-12 transition-transform">🌐</span>
                    <span>LINKED_GRID</span>
                  </a>

                  <div className="h-0.5 bg-portfolio-accent mx-4 my-2 opacity-50" />

                  <button 
                    onClick={onShutdown}
                    className="w-full flex items-center gap-4 px-6 py-3 hover:bg-portfolio-error hover:text-white text-portfolio-text-bright text-xs text-left transition-colors"
                  >
                    <span className="text-xl">🔌</span>
                    <span>KILL_SYSTEM</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-1 h-8 bg-portfolio-secondary mx-4 opacity-50" />
      <div className="flex-1 flex items-center gap-2 overflow-hidden" />

      {/* System Tray */}
      <div className="bg-black border-2 border-portfolio-accent px-4 py-1 flex items-center gap-6 text-portfolio-accent font-mono text-[10px] shadow-inner">
        <div className="flex items-center gap-2">
          <span className="text-portfolio-success animate-pulse">●</span>
          <span className="font-bold tracking-widest hidden sm:inline">SYS_LINK_OK</span>
        </div>
        <div className="font-bold text-portfolio-secondary border-l border-portfolio-accent/30 pl-4">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
