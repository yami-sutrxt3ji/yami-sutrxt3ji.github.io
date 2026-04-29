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
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 z-[500]">
      {/* Start Button */}
      <div className="relative" ref={startMenuRef}>
        <button 
          onClick={() => setIsStartOpen(!isStartOpen)}
          className={`flex items-center gap-1 bg-[#c0c0c0] border-2 px-2 py-0.5 font-bold text-xs shadow-black
            ${isStartOpen 
              ? 'border-t-[#808080] border-l-[#808080] border-r-white border-b-white' 
              : 'border-t-white border-l-white border-r-[#808080] border-b-[#808080]'
            }`}
        >
          <span className="text-blue-800 text-sm">田</span>
          <span className="text-black uppercase">Start</span>
        </button>

        {/* Start Menu */}
        <AnimatePresence>
          {isStartOpen && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute bottom-full left-0 mb-1 w-64 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-[4px_4px_0px_#000] overflow-hidden"
            >
              <div className="flex">
                {/* Side Banner */}
                <div className="bg-[#808080] w-8 flex items-center justify-center pt-4 overflow-hidden">
                  <span className="rotate-[-90deg] text-white font-bold tracking-widest text-lg whitespace-nowrap">ASHISH_OS</span>
                </div>
                
                {/* Menu Items */}
                <div className="flex-1 py-1">
                  <Link 
                    to="/trigger" 
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#000080] hover:text-white text-black text-sm group"
                    onClick={() => setIsStartOpen(false)}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">🚨</span>
                    <span>TRIGGER_ME!</span>
                  </Link>
                  
                  <div className="h-px bg-[#808080] border-b border-white my-1" />
                  
                  <a 
                    href="https://github.com/yami-sutrxt3ji" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#000080] hover:text-white text-black text-sm"
                  >
                    <span className="text-lg">🐙</span>
                    <span>GitHub Profile</span>
                  </a>
                  
                  <a 
                    href="https://linkedin.com/in/ashish-kumar-9a5b4b" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#000080] hover:text-white text-black text-sm"
                  >
                    <span className="text-lg">💼</span>
                    <span>LinkedIn</span>
                  </a>

                  <div className="h-px bg-[#808080] border-b border-white my-1" />

                  <button 
                    onClick={onShutdown}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#000080] hover:text-white text-black text-sm text-left"
                  >
                    <span className="text-lg">🔌</span>
                    <span>Shut Down...</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-px h-6 bg-[#808080] border-r border-white mx-2" />
      <div className="flex-1 flex items-center gap-1 overflow-hidden" />

      {/* System Tray */}
      <div className="bg-[#c0c0c0] border-2 border-b-white border-r-white border-l-[#808080] border-t-[#808080] px-3 py-1 flex items-center gap-4 text-black font-mono text-xs shadow-inner">
        <div className="flex items-center gap-1">
          <span className="text-green-600 animate-pulse text-[8px]">●</span>
          <span className="text-[10px] font-bold">ONLINE</span>
        </div>
        <div className="text-[10px] font-bold">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
