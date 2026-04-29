import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KenkoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BOOT_MESSAGES = [
  "> mount project://kenko",
  "> checking memory...",
  "> loading nutrition_engine.dll",
  "> rendering slide_viewer...",
  "> analyzing patient cohorts...",
  "> initializing meal database...",
  "> ready"
];

const TOTAL_SLIDES = 21;

const KenkoModal = ({ isOpen, onClose }: KenkoModalProps) => {
  const [isBooted, setIsBooted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && !isBooted) {
      setTerminalOutput([]);
      let step = 0;
      const interval = setInterval(() => {
        if (step < BOOT_MESSAGES.length) {
          setTerminalOutput((prevLog) => [...prevLog, BOOT_MESSAGES[step]]);
          step++;
        } else {
          clearInterval(interval);
          setTimeout(() => setIsBooted(true), 800);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isOpen, isBooted]);

  const nextSlide = () => {
    if (currentSlide < TOTAL_SLIDES) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 1) setCurrentSlide(prev => prev - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !isBooted) return;
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isBooted, currentSlide]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            drag
            dragMomentum={false}
            className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-[4px_4px_0px_#000] w-full max-w-4xl overflow-hidden"
          >
            {/* Title Bar */}
            <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center cursor-move select-none">
              <div className="flex items-center gap-2 text-sm font-bold tracking-tight">
                <span className="w-4 h-4 bg-white/20 flex items-center justify-center">K</span>
                KENKO_AHAARA.EXE
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={onClose}
                  className="bg-[#c0c0c0] text-black border border-t-white border-l-white border-r-black border-b-black w-5 h-5 flex items-center justify-center text-xs font-bold leading-none hover:bg-red-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Menu Bar */}
            <div className="flex gap-4 px-2 py-1 border-b border-[#808080] text-xs text-black">
              <span className="cursor-default"><span className="underline">F</span>ile</span>
              <span className="cursor-default"><span className="underline">E</span>dit</span>
              <span className="cursor-default"><span className="underline">V</span>iew</span>
              <span className="cursor-default"><span className="underline">H</span>elp</span>
            </div>

            {/* Content Area */}
            <div className="bg-black p-4 aspect-video relative overflow-hidden flex flex-col">
              {!isBooted ? (
                <div className="font-mono text-green-500 text-sm overflow-y-auto h-full">
                  {terminalOutput.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                  <div className="animate-pulse">_</div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative flex-1 flex items-center justify-center group"
                >
                  <img 
                    src={`/assets/slides/kenko/${String(currentSlide).padStart(2, '0')}.webp`}
                    alt={`Slide ${currentSlide}`}
                    className="max-h-full object-contain"
                  />
                  
                  {/* Overlay Controls */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-white font-mono text-xs">
                      SLIDE: {String(currentSlide).padStart(2, '0')} / {TOTAL_SLIDES}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom Controls */}
            {isBooted && (
              <div className="bg-[#c0c0c0] p-4 flex justify-between items-center border-t border-white">
                <div className="flex gap-2">
                  <button 
                    onClick={prevSlide}
                    disabled={currentSlide === 1}
                    className="px-6 py-2 border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white disabled:opacity-50 disabled:pointer-events-none"
                  >
                    PREV
                  </button>
                  <button 
                    onClick={nextSlide}
                    disabled={currentSlide === TOTAL_SLIDES}
                    className="px-6 py-2 border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white disabled:opacity-50 disabled:pointer-events-none"
                  >
                    NEXT
                  </button>
                </div>
                <div className="bg-[#c0c0c0] border-2 border-b-white border-r-white border-l-[#808080] border-t-[#808080] px-4 py-1 font-mono text-xs text-black">
                  SYSTEM STATUS: <span className="text-blue-800 font-bold">AHAARA_V1_STABLE</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default KenkoModal;
