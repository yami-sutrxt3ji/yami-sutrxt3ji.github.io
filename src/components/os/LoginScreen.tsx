import { useState } from 'react';
import { motion } from 'framer-motion';
import RetroButton from '../ui/RetroButton';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For portfolio, we accept any "login" or just allow it
    if (password.length > 0) {
      onLogin();
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#008080] z-[900] flex items-center justify-center p-4">
      {/* Background Pattern - subtle classic tiles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          x: isError ? [0, -10, 10, -10, 10, 0] : 0
        }}
        className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-[8px_8px_0px_rgba(0,0,0,0.5)] p-8 max-w-sm w-full"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-white border-2 border-inset mb-4 p-2">
            <img src="/assets/avatar.png" alt="User" className="w-full h-full object-cover grayscale" />
          </div>
          <h2 className="font-display text-xl text-black">ASHISH_LOGIN</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-black uppercase mb-2">User: Guest</label>
            <input
              autoFocus
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-r-white border-b-white border-l-[#808080] border-t-[#808080] px-3 py-2 text-black font-mono outline-none focus:ring-1 focus:ring-blue-800"
            />
          </div>

          <div className="flex gap-2">
            <RetroButton 
              className="flex-1"
              variant="outline"
              onClick={onLogin}
            >
              GUEST_LOGIN
            </RetroButton>
            <RetroButton 
              className="flex-1"
              onClick={onLogin}
            >
              ENTER
            </RetroButton>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-[#808080] text-[10px] text-center text-black/60 font-mono">
          SYSTEM_ID: DESKTOP-ASHISH-7392<br />
          POWERED BY ASHISH_OS v3.0
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
