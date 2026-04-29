import RetroButton from "../components/ui/RetroButton";
import { useState } from 'react';
import KenkoModal from "../components/modals/KenkoModal";
import ArcadeModal from "../components/modals/ArcadeModal";

const Home = () => {
  const [isKenkoOpen, setIsKenkoOpen] = useState(false);
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);

  const stats = [
    { label: 'Curiosity', value: 95, color: 'bg-portfolio-accent' },
    { label: 'Systems Knowledge', value: 80, color: 'bg-portfolio-border' },
    { label: 'Consistency', value: 60, color: 'bg-portfolio-secondary' },
    { label: 'Sleep Schedule', value: 30, color: 'bg-portfolio-error' },
  ];

  const coreInterests = [
    'Firmware', 'Operating Systems', 'Memory Internals', 
    'Cybersecurity', 'Embedded Systems', 'Binary Analysis'
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="border-l-4 border-portfolio-accent pl-6 py-4 mb-8">
          <h1 className="font-display text-4xl md:text-6xl text-portfolio-text-bright mb-2 uppercase">
            System_Ashish
          </h1>
          <p className="text-portfolio-secondary font-bold tracking-widest uppercase">
            CS Student | Builder | Systems Engineer
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Curious about firmware, hardware, and systems. 
              I break things to understand how they work. Currently architecting 
              modern web systems and low-level prototypes.
            </p>
            <div className="flex gap-4">
              <RetroButton 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                VIEW_PROJECTS
              </RetroButton>
              <RetroButton variant="outline" onClick={() => setIsArcadeOpen(true)}>
                [ PLAY_ARCADE ]
              </RetroButton>
            </div>
          </div>
          
          <div className="bg-portfolio-panel border-2 border-portfolio-border p-6 shadow-[8px_8px_0px_rgba(0,229,255,0.2)]">
            <h3 className="font-display text-portfolio-border mb-4 tracking-tighter text-sm uppercase">📟 SYSTEM_METRICS.EXE</h3>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between border-b border-portfolio-border/20 pb-1">
                <span className="text-portfolio-text-bright uppercase">Uptime:</span>
                <span className="text-portfolio-success uppercase">Chaotic-ish</span>
              </div>
              <div className="flex justify-between border-b border-portfolio-border/20 pb-1">
                <span className="text-portfolio-text-bright uppercase">Status:</span>
                <span className="text-portfolio-success uppercase">Online</span>
              </div>
              <div className="flex justify-between border-b border-portfolio-border/20 pb-1">
                <span className="text-portfolio-text-bright uppercase">Coffee:</span>
                <span className="text-portfolio-warning uppercase">Critical_Level</span>
              </div>
              <div className="flex justify-between">
                <span className="text-portfolio-text-bright uppercase">Location:</span>
                <span className="uppercase">Bengaluru, IN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mb-24 scroll-mt-24">
        <h2 className="font-display text-2xl text-portfolio-border mb-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-portfolio-border/30"></span>
          ABOUT_ME.SYS
          <span className="h-px flex-1 bg-portfolio-border/30"></span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Avatar & Status */}
          <div className="bg-portfolio-panel border-2 border-portfolio-border p-8 text-center shadow-[8px_8px_0px_rgba(0,229,255,0.1)]">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-2 border-2 border-portfolio-accent animate-pulse opacity-50"></div>
              <img 
                src="/assets/avatar.png" 
                alt="Ashish" 
                className="w-32 h-32 object-cover border-2 border-portfolio-border grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <h3 className="font-display text-xl text-portfolio-text-bright mb-2">ASHISH.EXE</h3>
            <p className="text-xs text-portfolio-secondary font-mono mb-6 uppercase tracking-widest">Engineer • Maker • Systems Nerd</p>
            
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-[10px] px-2 py-1 bg-portfolio-success/10 text-portfolio-success border border-portfolio-success/20 font-bold uppercase animate-pulse">
                [ Online ]
              </span>
              <span className="text-[10px] px-2 py-1 bg-portfolio-accent/10 text-portfolio-accent border border-portfolio-accent/20 font-bold uppercase">
                [ Building ]
              </span>
              <span className="text-[10px] px-2 py-1 bg-portfolio-secondary/10 text-portfolio-secondary border border-portfolio-secondary/20 font-bold uppercase">
                [ Learning ]
              </span>
            </div>
          </div>

          {/* Center: Stats & Bio */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Stats */}
              <div className="space-y-4">
                <h4 className="font-display text-sm text-portfolio-border uppercase tracking-widest">Personality_Matrix</h4>
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="flex justify-between text-[10px] uppercase font-mono">
                      <span>{stat.label}</span>
                      <span>{stat.value}%</span>
                    </div>
                    <div className="h-2 bg-portfolio-panel border border-portfolio-border/20">
                      <div 
                        className={`h-full ${stat.color} transition-all duration-1000`} 
                        style={{ width: `${stat.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interests */}
              <div className="space-y-4">
                <h4 className="font-display text-sm text-portfolio-border uppercase tracking-widest">Core_Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {coreInterests.map((interest) => (
                    <span key={interest} className="px-3 py-1 bg-portfolio-panel border border-portfolio-border/30 text-[10px] uppercase font-mono hover:border-portfolio-accent transition-colors">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-portfolio-accent/5 border-l-4 border-portfolio-accent p-6 italic font-mono text-sm leading-relaxed">
              "I like systems more than surfaces. Whether it's the memory management of an OS or the firmware of a physical device, I find beauty in the invisible layers that make technology work."
            </div>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section id="projects" className="scroll-mt-24">
        <h2 className="font-display text-2xl text-portfolio-border mb-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-portfolio-border/30"></span>
          FEATURED_PROJECTS
          <span className="h-px flex-1 bg-portfolio-border/30"></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Kenko Project Card */}
          <div 
            onClick={() => setIsKenkoOpen(true)}
            className="bg-portfolio-panel border-2 border-portfolio-border/30 hover:border-portfolio-accent transition-all p-6 group cursor-pointer hover:-translate-y-1 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_rgba(255,75,129,0.2)]"
          >
            <div className="text-xs text-portfolio-accent font-bold mb-2 tracking-widest uppercase">
              FLAGSHIP // CASE_STUDY
            </div>
            <h3 className="font-display text-xl text-portfolio-text-bright mb-4 group-hover:text-portfolio-accent transition-colors uppercase">
              Kenko_Ahaara
            </h3>
            <p className="text-sm mb-6 text-portfolio-text/80">
              A Windows 98-inspired presentation deck for a healthcare nutrition startup. Features interactive slide navigation and terminal-style boot sequence.
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] px-2 py-1 bg-portfolio-accent/10 text-portfolio-accent border border-portfolio-accent/20 font-bold uppercase">
                React
              </span>
              <span className="text-[10px] px-2 py-1 bg-portfolio-accent/10 text-portfolio-accent border border-portfolio-accent/20 font-bold uppercase">
                Framer_Motion
              </span>
            </div>
          </div>

          {/* Arcade Project Card */}
          <div 
            onClick={() => setIsArcadeOpen(true)}
            className="bg-portfolio-panel border-2 border-portfolio-border/30 hover:border-portfolio-secondary transition-all p-6 group cursor-pointer hover:-translate-y-1 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_rgba(123,97,255,0.2)]"
          >
            <div className="text-xs text-portfolio-secondary font-bold mb-2 tracking-widest uppercase">
              EXPERIMENT // ARCADE
            </div>
            <h3 className="font-display text-xl text-portfolio-text-bright mb-4 group-hover:text-portfolio-secondary transition-colors uppercase">
              Goal_Hunter_98
            </h3>
            <p className="text-sm mb-6 text-portfolio-text/80">
              A retro side-scroller shooter where your interests act as projectiles to capture your professional goals. Built with Canvas API and React.
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] px-2 py-1 bg-portfolio-secondary/10 text-portfolio-secondary border border-portfolio-secondary/20 font-bold uppercase">
                Canvas
              </span>
              <span className="text-[10px] px-2 py-1 bg-portfolio-secondary/10 text-portfolio-secondary border border-portfolio-secondary/20 font-bold uppercase">
                Games
              </span>
            </div>
          </div>
        </div>
      </section>

      <KenkoModal isOpen={isKenkoOpen} onClose={() => setIsKenkoOpen(false)} />
      <ArcadeModal isOpen={isArcadeOpen} onClose={() => setIsArcadeOpen(false)} />
    </main>
  );
};

export default Home;
