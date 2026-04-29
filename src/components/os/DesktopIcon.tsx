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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="flex flex-col items-center p-2 w-[100px] gap-2 transition-all group cursor-pointer select-none outline-none"
    >
      <div className={`text-5xl ${color} drop-shadow-[0_4px_0_rgba(0,0,0,1)] group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_#ff00ff] transition-all`}>
        {icon}
      </div>
      <span className="text-[10px] font-display text-white text-center break-words leading-tight shadow-black drop-shadow-[2px_2px_0_rgba(0,0,0,1)] uppercase bg-black/40 px-1 py-0.5 group-hover:bg-portfolio-accent group-hover:text-black transition-colors">
        {label}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;
