import { useState } from 'react';
import DesktopIcon from "../components/os/DesktopIcon";
import Taskbar from "../components/os/Taskbar";
import KenkoModal from "../components/modals/KenkoModal";
import ArcadeModal from "../components/modals/ArcadeModal";
import RetroWindow from "../components/ui/RetroWindow";

const Home = () => {
  const [windows, setWindows] = useState({
    about: false,
    kenko: false,
    arcade: false,
    education: false,
    skills: false,
    avatar: false
  });

  const toggleWindow = (name: keyof typeof windows) => {
    setWindows(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const stats = [
    { label: 'Curiosity', value: 95, color: 'bg-portfolio-accent' },
    { label: 'Systems Knowledge', value: 80, color: 'bg-portfolio-border' },
    { label: 'Consistency', value: 60, color: 'bg-portfolio-secondary' },
    { label: 'Sleep Schedule', value: 30, color: 'bg-portfolio-error' },
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#008080] p-4 flex flex-col pt-12">
      {/* Desktop Background (Classic Pattern) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ 
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* Icon Grid */}
      <div className="grid grid-flow-col grid-rows-[repeat(auto-fill,100px)] gap-4 auto-cols-[100px] relative z-10 h-[calc(100vh-80px)]">
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
      <Taskbar />

      {/* Windows */}
      
      {/* 1. About Me (System Properties) */}
      <RetroWindow 
        isOpen={windows.about} 
        onClose={() => toggleWindow('about')} 
        title="SYSTEM_PROPERTIES" 
        width="max-w-md"
      >
        <div className="p-6 bg-black font-mono space-y-6">
          <div className="flex gap-4 items-center border-b border-white/20 pb-4">
            <div className="text-4xl">🖥️</div>
            <div>
              <h3 className="text-portfolio-success text-lg">ASHISH_CORE_v3</h3>
              <p className="text-[10px] text-white/60 uppercase tracking-widest">General Purpose Engineering Model</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs text-portfolio-border uppercase border-l-2 border-portfolio-border pl-2">Hardware_Specs</h4>
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="flex justify-between text-[10px] uppercase">
                  <span>{stat.label}</span>
                  <span>{stat.value}%</span>
                </div>
                <div className="h-2 bg-white/10 border border-white/20">
                  <div className={`h-full ${stat.color}`} style={{ width: `${stat.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] leading-relaxed italic text-white/80">
            "I like systems more than surfaces. I find beauty in the invisible layers."
          </p>
        </div>
      </RetroWindow>

      {/* 2. Avatar Viewer */}
      <RetroWindow 
        isOpen={windows.avatar} 
        onClose={() => toggleWindow('avatar')} 
        title="AVATAR_VIEWER" 
        width="max-w-xs"
      >
        <div className="p-4 bg-black flex flex-col items-center">
          <img src="/assets/avatar.png" alt="Ashish" className="w-full grayscale border-2 border-portfolio-border mb-4" />
          <div className="flex gap-2 w-full">
            <div className="flex-1 text-[10px] bg-portfolio-success/20 text-portfolio-success border border-portfolio-success/40 p-1 text-center font-bold animate-pulse uppercase">[Online]</div>
            <div className="flex-1 text-[10px] bg-portfolio-accent/20 text-portfolio-accent border border-portfolio-accent/40 p-1 text-center font-bold uppercase">[Building]</div>
          </div>
        </div>
      </RetroWindow>

      {/* 3. Education Document */}
      <RetroWindow 
        isOpen={windows.education} 
        onClose={() => toggleWindow('education')} 
        title="EDUCATION.DOC" 
      >
        <div className="p-8 bg-white text-black font-serif leading-relaxed min-h-[400px]">
          <h2 className="text-2xl border-b-2 border-black mb-6 pb-2 font-bold uppercase">Academic_Records</h2>
          <div className="space-y-8">
            <section>
              <h3 className="font-bold text-lg">Computer Science Engineering</h3>
              <p className="text-sm italic">2021 - Present</p>
              <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                <li>Focusing on System Internals & Low-level Programming</li>
                <li>Actively exploring Embedded Systems & Firmware</li>
                <li>Contributor to Open Source Systems projects</li>
              </ul>
            </section>
            <section>
              <h3 className="font-bold text-lg">Independent Research</h3>
              <p className="text-sm">Ongoing</p>
              <p className="text-sm mt-2">Deep-diving into Kernel development, binary analysis, and 3D fabrication toolchains.</p>
            </section>
          </div>
          <div className="mt-12 text-[10px] border-t pt-4 opacity-60 text-center uppercase">
            Official Document - Property of Ashish.OS
          </div>
        </div>
      </RetroWindow>

      {/* 4. Skills Terminal */}
      <RetroWindow 
        isOpen={windows.skills} 
        onClose={() => toggleWindow('skills')} 
        title="SKILLS_SHELL" 
      >
        <div className="p-6 bg-black font-mono text-xs text-portfolio-success">
          <p className="mb-4 text-white">$ list_skills --all</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="text-portfolio-border border-b border-portfolio-border/30 pb-1 mb-2">LANGUAGES</h4>
              <p>Python [▓▓▓▓▓▓▓▓▓░] 90%</p>
              <p>C/C++  [▓▓▓▓▓▓▓▓░░] 80%</p>
              <p>React  [▓▓▓▓▓▓▓▓░░] 80%</p>
              <p>Java   [▓▓▓▓▓░░░░░] 50%</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-portfolio-border border-b border-portfolio-border/30 pb-1 mb-2">SYSTEMS_&_HW</h4>
              <p>Firmware Dev   [ACTIVE]</p>
              <p>Embedded Sys   [ACTIVE]</p>
              <p>3D Fabrication [ACTIVE]</p>
              <p>Linux Admin    [ACTIVE]</p>
            </div>
          </div>
          <p className="mt-8 text-white animate-pulse">$ _</p>
        </div>
      </RetroWindow>

      {/* Modals */}
      <KenkoModal isOpen={windows.kenko} onClose={() => toggleWindow('kenko')} />
      <ArcadeModal isOpen={windows.arcade} onClose={() => toggleWindow('arcade')} />
    </div>
  );
};

export default Home;
