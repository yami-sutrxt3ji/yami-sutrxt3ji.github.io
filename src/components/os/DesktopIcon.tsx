import { motion } from 'framer-motion';

interface DesktopIconProps {
  label: string;
  icon: string;
  onClick: () => void;
  color?: string;
}

const DesktopIcon = ({ label, icon, onClick, color = 'text-white' }: DesktopIconProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      whileTap={{ scale: 0.95 }}
      onDoubleClick={onClick}
      className="flex flex-col items-center p-4 w-24 gap-2 transition-colors rounded group cursor-default select-none focus:bg-white/20 outline-none"
    >
      <div className={`text-4xl ${color} drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}>
        {icon}
      </div>
      <span className="text-[10px] font-mono text-white text-center break-words leading-tight shadow-black drop-shadow-[0_1px_1px_rgba(0,0,0,1)] uppercase">
        {label}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;
