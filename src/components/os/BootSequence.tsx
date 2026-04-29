import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LOGS = [
  "ASHISH_OS KERNEL v3.0.4-RELEASE (gcc version 13.2.1)",
  "CPU: Ashish-Core i7 @ 3.40GHz",
  "MEM: 16384MB System RAM detected",
  "VFS: Mounted root (ext4 filesystem) on device 0:1",
  "INIT: Entering runlevel 5",
  "NET: Initializing TCP/IP stack...",
  "AUDIO: Realtek ALC892 initialized",
  "GPU: Creative-RTX Driver Loaded [OK]",
  "SECURITY: SELinux initialized in permissive mode",
  "IO: Mounting /home/ashish/projects...",
  "SYSTEM: All services started successfully."
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinishing(true);
          setTimeout(onComplete, 1200);
        }, 800);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#070711] z-[1000] flex flex-col p-8 font-mono text-sm sm:text-lg leading-relaxed overflow-hidden">
      <AnimatePresence>
        {!isFinishing && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            className="text-portfolio-accent"
          >
            {logs.map((log, i) => (
              <div key={i} className="mb-1">
                <span className="text-portfolio-secondary mr-4">[{ (i * 0.124).toFixed(6) }]</span>
                {log}
              </div>
            ))}
            <div className="animate-pulse inline-block w-3 h-5 bg-portfolio-accent ml-1" />
          </motion.div>
        )}
      </AnimatePresence>

      {isFinishing && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-portfolio-bg"
        >
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-7xl text-portfolio-accent mb-4 tracking-tighter italic" style={{ textShadow: '4px 4px 0 #3366cc' }}>SYSTEM_READY</h1>
            <div className="w-64 h-4 bg-portfolio-panel border-2 border-portfolio-border mx-auto overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                className="w-1/2 h-full bg-portfolio-accent shadow-[0_0_15px_#ff00ff]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BootSequence;
