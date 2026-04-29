import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RetroWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}

const RetroWindow = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  width = 'max-w-4xl' 
}: RetroWindowProps) => {
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
            className={`bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-[4px_4px_0px_#000] w-full ${width} overflow-hidden`}
          >
            {/* Title Bar */}
            <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center cursor-move select-none">
              <div className="flex items-center gap-2 text-sm font-bold tracking-tight">
                <span className="w-4 h-4 bg-white/20 flex items-center justify-center text-[10px]">OS</span>
                {title}
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

            {/* Menu Bar (Optional) */}
            <div className="flex gap-4 px-2 py-1 border-b border-[#808080] text-xs text-black">
              <span className="cursor-default"><span className="underline">F</span>ile</span>
              <span className="cursor-default"><span className="underline">E</span>dit</span>
              <span className="cursor-default"><span className="underline">V</span>iew</span>
              <span className="cursor-default"><span className="underline">H</span>elp</span>
            </div>

            {/* Content Area */}
            <div className="bg-black text-white relative overflow-hidden">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="bg-[#c0c0c0] p-4 border-t border-white">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RetroWindow;
