import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Taskbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 z-[200]">
      {/* Start Button */}
      <button className="flex items-center gap-1 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white px-2 py-0.5 font-bold text-xs shadow-black">
        <span className="text-blue-800">田</span>
        <span className="text-black">Start</span>
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-[#808080] border-r border-white mx-2" />

      {/* App Tabs (Future) */}
      <div className="flex-1" />

      {/* System Tray */}
      <div className="bg-[#c0c0c0] border-2 border-b-white border-r-white border-l-[#808080] border-t-[#808080] px-3 py-1 flex items-center gap-4 text-black font-mono text-xs">
        <div className="flex items-center gap-1">
          <span className="text-green-600 animate-pulse">●</span>
          <span>ONLINE</span>
        </div>
        <div>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
