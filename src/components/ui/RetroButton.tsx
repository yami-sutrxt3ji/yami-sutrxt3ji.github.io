import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const RetroButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false 
}: ButtonProps) => {
  const variants = {
    primary: 'bg-portfolio-accent text-white shadow-[4px_4px_0px_#000] hover:bg-opacity-90',
    secondary: 'bg-portfolio-secondary text-white shadow-[4px_4px_0px_#000] hover:bg-opacity-90',
    danger: 'bg-portfolio-error text-white shadow-[4px_4px_0px_#000] hover:bg-opacity-90',
    success: 'bg-portfolio-success text-portfolio-bg shadow-[4px_4px_0px_#000] hover:bg-opacity-90',
    outline: 'border-2 border-portfolio-border text-portfolio-border hover:bg-portfolio-border hover:text-portfolio-bg shadow-[4px_4px_0px_#000]',
  };

  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-6 py-2 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  return (
    <motion.button
      whileHover={!disabled ? { translateX: -2, translateY: -2, boxShadow: '6px 6px 0px #000' } : {}}
      whileTap={!disabled ? { translateX: 2, translateY: 2, boxShadow: '0px 0px 0px #000' } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        font-bold uppercase tracking-widest transition-all duration-100
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default RetroButton;
