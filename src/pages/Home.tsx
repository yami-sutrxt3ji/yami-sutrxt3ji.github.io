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
    <div className="relative h-screen w-screen overflow-hidden bg-[#1a1a40] flex flex-col font-body">
      {/* Aggressive Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a40] via-[#2a2a60] to-[#070711]" />
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ 
        backgroundImage: 'linear-gradient(#3366cc 1px, transparent 1px), linear-gradient(90deg, #3366cc 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      {/* Top Banner (RPG Revelation Style) */}
      <header className="relative z-[100] bg-[#000080] border-b-4 border-portfolio-accent shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center px-4 md:px-8 py-3">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl md:text-4xl font-display text-white italic tracking-tighter" style={{ textShadow: '3px 3px 0 #ff00ff' }}>
              ASHISH_REVELATION
            </h1>
            <nav className="hidden lg:flex gap-6 text-[10px] font-display text-portfolio-text">
              <button onClick={() => toggleWindow('about')} className="hover:text-portfolio-accent transition-colors">[ABOUT_ME]</button>
              <button onClick={() => toggleWindow('skills')} className="hover:text-portfolio-accent transition-colors">[CORE_SKILLS]</button>
              <button onClick={() => toggleWindow('education')} className="hover:text-portfolio-accent transition-colors">[ACADEMICS]</button>
              <button onClick={() => toggleWindow('arcade')} className="hover:text-portfolio-accent transition-colors">[ARCADE_SYS]</button>
            </nav>
          </div>
          <div className="text-[10px] font-mono text-portfolio-secondary font-bold flex gap-4">
            <span className="hidden sm:inline">ADM: ASHISH_V3</span>
            <span className="animate-pulse">● ONLINE</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-transparent via-portfolio-accent to-transparent h-1 w-full" />
      </header>

      {/* Main Desktop Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Icon Grid */}
        <div className="grid grid-flow-col grid-rows-[repeat(auto-fill,110px)] gap-6 auto-cols-[110px] relative z-10 h-full p-6 pt-10">
          <DesktopIcon 
            label="SYS_PROPS" 
            icon="🖥️" 
            onClick={() => toggleWindow('about')} 
          />
          <DesktopIcon 
            label="AVATAR_01" 
            icon="🖼️" 
            onClick={() => toggleWindow('avatar')} 
          />
          <DesktopIcon 
            label="EDUCATION" 
            icon="📂" 
            onClick={() => toggleWindow('education')} 
            color="text-portfolio-secondary"
          />
          <DesktopIcon 
            label="BIN_SKILLS" 
            icon="💾" 
            onClick={() => toggleWindow('skills')} 
            color="text-portfolio-accent"
          />
          <DesktopIcon 
            label="KENKO_APP" 
            icon="⚙️" 
            onClick={() => toggleWindow('kenko')} 
            color="text-portfolio-border"
          />
          <DesktopIcon 
            label="ARCADE_RUN" 
            icon="🎮" 
            onClick={() => toggleWindow('arcade')} 
            color="text-portfolio-success"
          />
        </div>

        {/* Windows */}
        
        {/* 1. About Me */}
        <div 
          className={windows.about.isOpen ? 'block' : 'hidden'}
          style={{ zIndex: windows.about.zIndex, position: 'absolute', top: '5%', left: '5%' }} 
          onMouseDown={() => focusWindow('about')}
        >
          <RetroWindow 
            isOpen={windows.about.isOpen} 
            onClose={() => toggleWindow('about')} 
            title="SYSTEM_CORE_INFO" 
            width="max-w-md"
          >
            <div className="p-6 bg-portfolio-panel border-inset font-mono space-y-6">
              <div className="flex gap-4 items-center border-b-2 border-portfolio-accent pb-4">
                <div className="text-5xl text-portfolio-accent drop-shadow-[0_0_8px_#ff00ff]">🖥️</div>
                <div>
                  <h3 className="text-portfolio-text-bright text-xl font-display italic">ASHISH_CORE</h3>
                  <p className="text-[10px] text-portfolio-secondary uppercase tracking-widest font-bold">High-Performance Developer Unit</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs text-portfolio-border uppercase font-display mb-2">Hardware_Stats</h4>
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-portfolio-text">
                      <span>{stat.label}</span>
                      <span className="text-portfolio-accent">{stat.value}%</span>
                    </div>
                    <div className="h-3 bg-black border border-portfolio-border p-[1px]">
                      <div className={`h-full ${stat.color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`} style={{ width: `${stat.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] leading-relaxed italic text-portfolio-text-bright border-t border-portfolio-border/30 pt-4 bg-black/40 p-2">
                "I FIND BEAUTY IN THE INVISIBLE LAYERS. SYSTEMS OVER SURFACES."
              </p>
            </div>
          </RetroWindow>
        </div>

        {/* 2. Avatar Viewer */}
        <div 
          className={windows.avatar.isOpen ? 'block' : 'hidden'}
          style={{ zIndex: windows.avatar.zIndex, position: 'absolute', top: '15%', left: '40%' }} 
          onMouseDown={() => focusWindow('avatar')}
        >
          <RetroWindow 
            isOpen={windows.avatar.isOpen} 
            onClose={() => toggleWindow('avatar')} 
            title="AVATAR_VIEWER_0.1" 
            width="max-w-xs"
          >
            <div className="p-4 bg-black flex flex-col items-center">
              <div className="relative group overflow-hidden border-4 border-portfolio-accent mb-4">
                <img src="/assets/avatar.png" alt="Ashish" className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 contrast-125" />
                <div className="absolute inset-0 bg-gradient-to-t from-portfolio-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-[10px] text-white font-display">ID: ASHISH_REVELATION</span>
                </div>
              </div>
              <div className="flex gap-2 w-full">
                <div className="flex-1 text-[10px] bg-portfolio-success/20 text-portfolio-success border-2 border-portfolio-success p-1 text-center font-bold animate-pulse uppercase">[ONLINE]</div>
                <div className="flex-1 text-[10px] bg-portfolio-accent/20 text-portfolio-accent border-2 border-portfolio-accent p-1 text-center font-bold uppercase">[ACTIVE]</div>
              </div>
            </div>
          </RetroWindow>
        </div>

        {/* 3. Education Document */}
        <div 
          className={windows.education.isOpen ? 'block' : 'hidden'}
          style={{ zIndex: windows.education.zIndex, position: 'absolute', top: '10%', right: '5%' }} 
          onMouseDown={() => focusWindow('education')}
        >
          <RetroWindow 
            isOpen={windows.education.isOpen} 
            onClose={() => toggleWindow('education')} 
            title="ACADEMIC_RECORDS.PDF" 
          >
            <div className="p-8 bg-white text-black font-serif leading-relaxed min-h-[400px] shadow-inner border-4 border-portfolio-accent">
              <h2 className="text-3xl border-b-4 border-black mb-6 pb-2 font-display italic tracking-tighter text-portfolio-accent">GRAD_RECORDS</h2>
              <div className="space-y-8">
                <section>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl leading-tight text-[#000080]">COMPUTER_SCIENCE_ENG</h3>
                    <span className="text-xs font-mono bg-portfolio-accent text-white px-2 py-1">GPA: 8.5+</span>
                  </div>
                  <p className="text-sm italic text-gray-700 font-bold">2021 - PRESENT</p>
                  <ul className="mt-4 list-disc list-inside text-sm space-y-2 text-gray-900 font-semibold">
                    <li>SPECIALIZING IN SYSTEM INTERNALS</li>
                    <li>DEEP DIVE: OS KERNELS & MEMORY MGMT</li>
                    <li>CYBERSECURITY LAB ACTIVE MEMBER</li>
                  </ul>
                </section>
                <section className="bg-portfolio-accent/10 p-4 border-l-8 border-portfolio-accent">
                  <h3 className="font-display text-sm mb-2">RESEARCH_FOCUS</h3>
                  <p className="text-xs text-black leading-normal font-bold">
                    ARM/X86 ASSEMBLY, REAL-TIME OS (RTOS), 
                    HARDWARE-SOFTWARE CO-DESIGN. BUILDING CUSTOM FIRMWARE.
                  </p>
                </section>
              </div>
              <div className="mt-12 text-[10px] border-t-2 border-black pt-4 opacity-80 text-center font-display uppercase tracking-widest text-[#000080]">
                AUTHENTIC_DATA_SYSTEM_REVELATION
              </div>
            </div>
          </RetroWindow>
        </div>

        {/* 4. Skills Terminal */}
        <div 
          className={windows.skills.isOpen ? 'block' : 'hidden'}
          style={{ zIndex: windows.skills.zIndex, position: 'absolute', bottom: '15%', left: '20%' }} 
          onMouseDown={() => focusWindow('skills')}
        >
          <RetroWindow 
            isOpen={windows.skills.isOpen} 
            onClose={() => toggleWindow('skills')} 
            title="SKILL_LOADER_V1" 
          >
            <div className="p-6 bg-[#070711] font-mono text-sm text-portfolio-success shadow-inner border-2 border-portfolio-accent min-w-[360px]">
              <p className="mb-4 text-portfolio-secondary font-bold font-display text-xs">$ BINARY_FETCH --TECH</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="text-portfolio-accent border-b-2 border-portfolio-accent pb-1 mb-2 font-display tracking-widest text-[10px]">LANGS</h4>
                  <div className="space-y-2">
                    <p className="flex justify-between">PYTHON <span className="text-portfolio-secondary">90%</span></p>
                    <div className="h-2 bg-white/10 w-full"><div className="h-full bg-portfolio-accent" style={{width: '90%'}}></div></div>
                    <p className="flex justify-between">C/C++ <span className="text-portfolio-secondary">80%</span></p>
                    <div className="h-2 bg-white/10 w-full"><div className="h-full bg-portfolio-accent" style={{width: '80%'}}></div></div>
                    <p className="flex justify-between">TS/JS <span className="text-portfolio-secondary">80%</span></p>
                    <div className="h-2 bg-white/10 w-full"><div className="h-full bg-portfolio-accent" style={{width: '80%'}}></div></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-portfolio-accent border-b-2 border-portfolio-accent pb-1 mb-2 font-display tracking-widest text-[10px]">CORE_ENG</h4>
                  <div className="space-y-2 text-xs">
                    <p className="flex items-center gap-2 text-portfolio-text-bright"><span className="text-portfolio-accent">>></span> FIRMWARE_DEV</p>
                    <p className="flex items-center gap-2 text-portfolio-text-bright"><span className="text-portfolio-accent">>></span> EMBEDDED_SYS</p>
                    <p className="flex items-center gap-2 text-portfolio-text-bright"><span className="text-portfolio-accent">>></span> 3D_FABRICATION</p>
                    <p className="flex items-center gap-2 text-portfolio-text-bright"><span className="text-portfolio-accent">>></span> KERNEL_ADMIN</p>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-portfolio-accent animate-pulse font-bold">$ RUNNING_...</p>
            </div>
          </RetroWindow>
        </div>

        {/* Modals */}
        <div 
          className={windows.kenko.isOpen ? 'block' : 'hidden'}
          style={{ zIndex: windows.kenko.zIndex, position: 'absolute', top: '20%', left: '30%' }} 
          onMouseDown={() => focusWindow('kenko')}
        >
          <KenkoModal isOpen={windows.kenko.isOpen} onClose={() => toggleWindow('kenko')} />
        </div>
        <div 
          className={windows.arcade.isOpen ? 'block' : 'hidden'}
          style={{ zIndex: windows.arcade.zIndex, position: 'absolute', top: '15%', right: '15%' }} 
          onMouseDown={() => focusWindow('arcade')}
        >
          <ArcadeModal isOpen={windows.arcade.isOpen} onClose={() => toggleWindow('arcade')} />
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar onShutdown={onShutdown} />
    </div>
  );
};

export default Home;
