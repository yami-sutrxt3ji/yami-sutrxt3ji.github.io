import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RetroWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
  isModal?: boolean;
}

const RetroWindow = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  width = 'max-w-4xl',
  isModal = false
}: RetroWindowProps) => {
  const windowContent = (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      drag={!isModal}
      dragMomentum={false}
      className={`bg-portfolio-panel border-4 border-portfolio-accent shadow-[8px_8px_0px_#000000] w-full ${width} overflow-hidden font-body`}
    >
      {/* Title Bar (Aggressive RPG Style) */}
      <div className="bg-gradient-to-r from-[#000080] to-portfolio-accent text-white px-3 py-2 flex justify-between items-center cursor-move select-none border-b-2 border-portfolio-secondary">
        <div className="flex items-center gap-3 text-xs font-display italic tracking-tighter">
          <span className="w-5 h-5 bg-white text-black flex items-center justify-center text-[10px] font-bold">R</span>
          {title}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onClose}
            className="bg-portfolio-secondary text-black border-2 border-white w-6 h-6 flex items-center justify-center text-xs font-bold leading-none hover:bg-white hover:scale-110 transition-all"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Navigation / Links Bar */}
      <div className="flex gap-6 px-4 py-1.5 bg-[#000040] text-[10px] font-display text-portfolio-secondary border-b-2 border-portfolio-accent/30 uppercase">
        <span className="hover:text-white cursor-pointer">[FILE]</span>
        <span className="hover:text-white cursor-pointer">[ACTION]</span>
        <span className="hover:text-white cursor-pointer">[LOGS]</span>
        <div className="flex-1" />
        <span className="text-white opacity-50">v3.0.4</span>
      </div>

      {/* Content Area */}
      <div className="bg-[#070711] text-portfolio-text-bright relative overflow-hidden border-inset">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="bg-portfolio-panel p-4 border-t-2 border-portfolio-accent">
          {footer}
        </div>
      )}
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        isModal ? (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            {windowContent}
          </div>
        ) : (
          windowContent
        )
      )}
    </AnimatePresence>
  );
};

export default RetroWindow;
