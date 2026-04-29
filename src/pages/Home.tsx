import { useState } from 'react';
import DesktopIcon from "../components/os/DesktopIcon";
import Taskbar from "../components/os/Taskbar";
import KenkoModal from "../components/modals/KenkoModal";
import ArcadeModal from "../components/modals/ArcadeModal";
import RetroWindow from "../components/ui/RetroWindow";

interface HomeProps {
  onShutdown: () => void;
}

const Home = ({ onShutdown }: HomeProps) => {
  const [windows, setWindows] = useState({
    about: { isOpen: false, zIndex: 10 },
    kenko: { isOpen: false, zIndex: 10 },
    arcade: { isOpen: false, zIndex: 10 },
    education: { isOpen: false, zIndex: 10 },
    skills: { isOpen: false, zIndex: 10 },
    avatar: { isOpen: false, zIndex: 10 }
  });

  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(20);

  const toggleWindow = (name: keyof typeof windows) => {
    setWindows(prev => {
      const isClosing = prev[name].isOpen;
      const newZ = !isClosing ? maxZIndex + 1 : prev[name].zIndex;
      if (!isClosing) setMaxZIndex(newZ);
      return { 
        ...prev, 
        [name]: { isOpen: !isClosing, zIndex: newZ } 
      };
    });
    if (!windows[name].isOpen) setActiveWindow(name);
  };

  const focusWindow = (name: keyof typeof windows) => {
    if (activeWindow === name) return;
    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);
    setWindows(prev => ({
      ...prev,
      [name]: { ...prev[name], zIndex: newZ }
    }));
    setActiveWindow(name);
  };

  const stats = [
    { label: 'Curiosity', value: 95, color: 'bg-portfolio-accent' },
    { label: 'Systems Knowledge', value: 80, color: 'bg-portfolio-border' },
    { label: 'Consistency', value: 60, color: 'bg-portfolio-secondary' },
    { label: 'Sleep Schedule', value: 30, color: 'bg-portfolio-error' },
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#008080] flex flex-col">
      {/* Desktop Background (Classic Pattern + Subtle Gradient) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#008080] via-[#006060] to-[#004040]" />
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />

      {/* Icon Grid */}
      <div className="grid grid-flow-col grid-rows-[repeat(auto-fill,100px)] gap-4 auto-cols-[100px] relative z-10 h-[calc(100vh-80px)] p-4 pt-8">
        <DesktopIcon 
          label="System.sys" 
          icon="🖥️" 
          onClick={() => toggleWindow('about')} 
        />
        <DesktopIcon 
          label="Avatar.png" 
          icon="🖼️" 
          onClick={() => toggleWindow('avatar')} 
        />
        <DesktopIcon 
          label="Education.doc" 
          icon="📂" 
          onClick={() => toggleWindow('education')} 
          color="text-yellow-400"
        />
        <DesktopIcon 
          label="Skills.bin" 
          icon="💾" 
          onClick={() => toggleWindow('skills')} 
          color="text-portfolio-secondary"
        />
        <DesktopIcon 
          label="Kenko.exe" 
          icon="⚙️" 
          onClick={() => toggleWindow('kenko')} 
          color="text-portfolio-accent"
        />
        <DesktopIcon 
          label="GoalHunter.exe" 
          icon="🎮" 
          onClick={() => toggleWindow('arcade')} 
          color="text-portfolio-border"
        />
      </div>

      {/* Taskbar */}
      <Taskbar onShutdown={onShutdown} />

      {/* Windows */}
      
      {/* 1. About Me (System Properties) */}
      <div 
        className={windows.about.isOpen ? 'block' : 'hidden'}
        style={{ zIndex: windows.about.zIndex, position: 'absolute' }} 
        onMouseDown={() => focusWindow('about')}
      >
        <RetroWindow 
          isOpen={windows.about.isOpen} 
          onClose={() => toggleWindow('about')} 
          title="SYSTEM_PROPERTIES" 
          width="max-w-md"
        >
          <div className="p-6 bg-black font-mono space-y-6">
            <div className="flex gap-4 items-center border-b border-white/20 pb-4">
              <div className="text-4xl text-portfolio-success">🖥️</div>
              <div>
                <h3 className="text-portfolio-success text-lg font-bold">ASHISH_CORE_v3</h3>
                <p className="text-[10px] text-white/60 uppercase tracking-widest">General Purpose Engineering Model</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs text-portfolio-border uppercase border-l-2 border-portfolio-border pl-2 font-bold">Hardware_Specs</h4>
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="flex justify-between text-[10px] uppercase font-bold">
                    <span>{stat.label}</span>
                    <span>{stat.value}%</span>
                  </div>
                  <div className="h-2 bg-white/10 border border-white/20">
                    <div className={`h-full ${stat.color} shadow-[0_0_8px_rgba(255,255,255,0.3)]`} style={{ width: `${stat.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] leading-relaxed italic text-white/80 border-t border-white/10 pt-4">
              "I like systems more than surfaces. I find beauty in the invisible layers."
            </p>
          </div>
        </RetroWindow>
      </div>

      {/* 2. Avatar Viewer */}
      <div 
        className={windows.avatar.isOpen ? 'block' : 'hidden'}
        style={{ zIndex: windows.avatar.zIndex, position: 'absolute' }} 
        onMouseDown={() => focusWindow('avatar')}
      >
        <RetroWindow 
          isOpen={windows.avatar.isOpen} 
          onClose={() => toggleWindow('avatar')} 
          title="AVATAR_VIEWER" 
          width="max-w-xs"
        >
          <div className="p-4 bg-black flex flex-col items-center">
            <div className="relative group overflow-hidden border-2 border-portfolio-border mb-4">
              <img src="/assets/avatar.png" alt="Ashish" className="w-full grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <span className="text-[8px] text-white font-mono">IMAGE_ID: ASHISH_01</span>
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <div className="flex-1 text-[10px] bg-portfolio-success/20 text-portfolio-success border border-portfolio-success/40 p-1 text-center font-bold animate-pulse uppercase">[Online]</div>
              <div className="flex-1 text-[10px] bg-portfolio-accent/20 text-portfolio-accent border border-portfolio-accent/40 p-1 text-center font-bold uppercase">[Building]</div>
            </div>
          </div>
        </RetroWindow>
      </div>

      {/* 3. Education Document */}
      <div 
        className={windows.education.isOpen ? 'block' : 'hidden'}
        style={{ zIndex: windows.education.zIndex, position: 'absolute' }} 
        onMouseDown={() => focusWindow('education')}
      >
        <RetroWindow 
          isOpen={windows.education.isOpen} 
          onClose={() => toggleWindow('education')} 
          title="EDUCATION.DOC" 
        >
          <div className="p-8 bg-white text-black font-serif leading-relaxed min-h-[400px] shadow-inner">
            <h2 className="text-2xl border-b-2 border-black mb-6 pb-2 font-bold uppercase tracking-tighter">Academic_Records</h2>
            <div className="space-y-8">
              <section>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg leading-tight text-blue-900">Computer Science Engineering</h3>
                  <span className="text-xs font-mono bg-blue-100 px-2">GPA: 8.5+</span>
                </div>
                <p className="text-sm italic text-gray-600">2021 - Present</p>
                <ul className="mt-4 list-disc list-inside text-sm space-y-2 text-gray-800">
                  <li>Specializing in System Internals & Low-level Architectures</li>
                  <li>In-depth study of OS kernels, memory management, and file systems</li>
                  <li>Active member of the Cybersecurity & Systems Research Lab</li>
                </ul>
              </section>
              <section className="bg-gray-50 p-4 border-l-4 border-blue-900">
                <h3 className="font-bold text-md mb-2">Technical Research Focus</h3>
                <p className="text-xs text-gray-700 leading-normal">
                  Independent deep-dives into ARM/x86 assembly, real-time operating systems (RTOS), 
                  and hardware-software co-design. Actively building custom firmware for IoT prototypes.
                </p>
              </section>
            </div>
            <div className="mt-12 text-[9px] border-t border-gray-200 pt-4 opacity-60 text-center uppercase tracking-widest">
              Digital Authenticity Guaranteed - Ashish.OS Security Server
            </div>
          </div>
        </RetroWindow>
      </div>

      {/* 4. Skills Terminal */}
      <div 
        className={windows.skills.isOpen ? 'block' : 'hidden'}
        style={{ zIndex: windows.skills.zIndex, position: 'absolute' }} 
        onMouseDown={() => focusWindow('skills')}
      >
        <RetroWindow 
          isOpen={windows.skills.isOpen} 
          onClose={() => toggleWindow('skills')} 
          title="SKILLS_SHELL" 
        >
          <div className="p-6 bg-black font-mono text-xs text-portfolio-success shadow-inner min-w-[320px]">
            <p className="mb-4 text-white font-bold">$ fetch --technical-inventory</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-portfolio-border border-b border-portfolio-border/30 pb-1 mb-2 font-bold uppercase tracking-widest text-[10px]">Languages</h4>
                <div className="space-y-1">
                  <p>Python [▓▓▓▓▓▓▓▓▓░] 90%</p>
                  <p>C/C++  [▓▓▓▓▓▓▓▓░░] 80%</p>
                  <p>JS/TS  [▓▓▓▓▓▓▓▓░░] 80%</p>
                  <p>Rust   [▓▓▓▓░░░░░░] 40%</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-portfolio-border border-b border-portfolio-border/30 pb-1 mb-2 font-bold uppercase tracking-widest text-[10px]">Systems_&_HW</h4>
                <div className="space-y-1">
                  <p className="flex items-center gap-2"><span className="text-white">●</span> Firmware Development</p>
                  <p className="flex items-center gap-2"><span className="text-white">●</span> Embedded C/C++</p>
                  <p className="flex items-center gap-2"><span className="text-white">●</span> 3D Fabrication/CAD</p>
                  <p className="flex items-center gap-2"><span className="text-white">●</span> Linux Kernel/Admin</p>
                </div>
              </div>
            </div>
            <p className="mt-8 text-white animate-pulse">$ _</p>
          </div>
        </RetroWindow>
      </div>

      {/* Modals */}
      <div 
        className={windows.kenko.isOpen ? 'block' : 'hidden'}
        style={{ zIndex: windows.kenko.zIndex, position: 'absolute' }} 
        onMouseDown={() => focusWindow('kenko')}
      >
        <KenkoModal isOpen={windows.kenko.isOpen} onClose={() => toggleWindow('kenko')} />
      </div>
      <div 
        className={windows.arcade.isOpen ? 'block' : 'hidden'}
        style={{ zIndex: windows.arcade.zIndex, position: 'absolute' }} 
        onMouseDown={() => focusWindow('arcade')}
      >
        <ArcadeModal isOpen={windows.arcade.isOpen} onClose={() => toggleWindow('arcade')} />
      </div>
    </div>
  );
};

export default Home;
