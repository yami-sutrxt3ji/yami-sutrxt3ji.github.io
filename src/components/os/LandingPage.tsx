import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  const [isPrinted, setIsPrinted] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Initial state
      await controls.start({ opacity: 1 });
      // The "Printing" phase
      setIsPrinted(true);
    };
    sequence();
  }, [controls]);

  return (
    <div className="fixed inset-0 bg-[#070711] z-[900] flex items-center justify-center overflow-hidden font-body">
      {/* Aggressive Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{ 
        backgroundImage: 'linear-gradient(#3366cc 1px, transparent 1px), linear-gradient(90deg, #3366cc 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        transform: 'perspective(500px) rotateX(60deg) translateY(-100px)',
        transformOrigin: 'top'
      }} />

      <div className="relative z-10 flex flex-col items-center">
        {/* 3D Cube Container */}
        <div className="relative w-64 h-64 mb-12 perspective-1000">
          <motion.div 
            className="w-full h-full relative preserve-3d"
            animate={{ rotateY: 360, rotateX: 20 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {/* Cube Faces (Wireframe) */}
            {[
              "rotateY(0deg) translateZ(128px)",
              "rotateY(90deg) translateZ(128px)",
              "rotateY(180deg) translateZ(128px)",
              "rotateY(270deg) translateZ(128px)",
              "rotateX(90deg) translateZ(128px)",
              "rotateX(-90deg) translateZ(128px)"
            ].map((transform, i) => (
              <div 
                key={i}
                className="absolute inset-0 border-2 border-portfolio-accent/40 bg-portfolio-accent/5"
                style={{ transform }}
              />
            ))}

            {/* Content inside cube */}
            <div className="absolute inset-0 flex items-center justify-center preserve-3d">
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={isPrinted ? { opacity: 1, scale: 1 } : {}}
                className="text-6xl"
              >
                🎮
              </motion.div>
            </div>
          </motion.div>

          {/* Printer Head (Laser) */}
          <motion.div 
            className="absolute left-[-20%] right-[-20%] h-1 bg-portfolio-accent shadow-[0_0_15px_#ff00ff] z-20"
            initial={{ top: '0%' }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Aggressive Typography */}
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-display text-portfolio-accent italic tracking-tighter"
            style={{ textShadow: '4px 4px 0 #3366cc, 8px 8px 0 #1a1a40' }}
          >
            ASHISH_CORE
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-portfolio-secondary font-bold tracking-[0.3em] uppercase text-sm"
          >
            System Initialization v3.0
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="pt-8"
          >
            <button 
              onClick={onStart}
              className="group relative px-12 py-4 bg-portfolio-accent text-white font-display text-xl skew-x-[-12deg] hover:scale-110 transition-transform active:scale-95"
            >
              <span className="absolute inset-0 border-4 border-portfolio-secondary translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
              <span className="relative z-10">INITIALIZE_SYSTEM</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Style for 3D */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

export default LandingPage;
