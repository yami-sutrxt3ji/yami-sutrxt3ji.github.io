import { useState } from 'react';
import KenkoModal from "../components/modals/KenkoModal";
import ArcadeModal from "../components/modals/ArcadeModal";
import RetroButton from "../components/ui/RetroButton";

const Home = () => {
  const [isKenkoOpen, setIsKenkoOpen] = useState(false);
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="border-l-4 border-portfolio-accent pl-6 py-4 mb-8">
          <h1 className="font-display text-4xl md:text-6xl text-portfolio-text-bright mb-2 uppercase">
            System_Ashish
          </h1>
          <p className="text-portfolio-secondary font-bold tracking-widest uppercase">
            Full Stack Architect // Hardware Hacker // Tinkerer
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Building robust digital systems and physical prototypes. 
              I specialize in high-performance web applications and 
              low-level hardware integration.
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

      {/* Projects Preview */}
      <section id="projects">
        <h2 className="font-display text-2xl text-portfolio-border mb-8 flex items-center gap-4">
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
