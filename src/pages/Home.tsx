import { useState } from 'react';
import KenkoModal from "../components/modals/KenkoModal";

const Home = () => {
  const [isKenkoOpen, setIsKenkoOpen] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="border-l-4 border-portfolio-accent pl-6 py-4 mb-8">
          <h1 className="font-display text-4xl md:text-6xl text-portfolio-text-bright mb-2">
            SYSTEM_ASHISH
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
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-portfolio-accent text-white px-6 py-3 font-bold hover:bg-opacity-80 transition-all uppercase tracking-widest shadow-[4px_4px_0px_#000]"
              >
                VIEW_PROJECTS
              </button>
              <button className="border-2 border-portfolio-secondary text-portfolio-secondary px-6 py-3 font-bold hover:bg-portfolio-secondary hover:text-white transition-all uppercase tracking-widest shadow-[4px_4px_0px_#000]">
                READ_DOCS
              </button>
            </div>
          </div>
          
          <div className="bg-portfolio-panel border-2 border-portfolio-border p-6 shadow-[8px_8px_0px_rgba(0,229,255,0.2)]">
            <h3 className="font-display text-portfolio-border mb-4 tracking-tighter">📟 SYSTEM_METRICS.EXE</h3>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between border-b border-portfolio-border/20 pb-1">
                <span className="text-portfolio-text-bright">UPTIME:</span>
                <span className="text-portfolio-success">CHAOTIC-ISH</span>
              </div>
              <div className="flex justify-between border-b border-portfolio-border/20 pb-1">
                <span className="text-portfolio-text-bright">STATUS:</span>
                <span className="text-portfolio-success">ONLINE</span>
              </div>
              <div className="flex justify-between border-b border-portfolio-border/20 pb-1">
                <span className="text-portfolio-text-bright">COFFEE:</span>
                <span className="text-portfolio-warning">CRITICAL_LEVEL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-portfolio-text-bright">LOCATION:</span>
                <span>BENGALURU, IN</span>
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
            <h3 className="font-display text-xl text-portfolio-text-bright mb-4 group-hover:text-portfolio-accent transition-colors">
              KENKO_AHAARA
            </h3>
            <p className="text-sm mb-6 text-portfolio-text/80">
              A Windows 98-inspired presentation deck for a healthcare nutrition startup. Features interactive slide navigation and terminal-style boot sequence.
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] px-2 py-1 bg-portfolio-accent/10 text-portfolio-accent border border-portfolio-accent/20">
                REACTION
              </span>
              <span className="text-[10px] px-2 py-1 bg-portfolio-accent/10 text-portfolio-accent border border-portfolio-accent/20">
                FRAMER_MOTION
              </span>
            </div>
          </div>

          {/* Project Card Placeholder */}
          {[1, 2].map((i) => (
            <div key={i} className="bg-portfolio-panel border-2 border-portfolio-border/30 hover:border-portfolio-border transition-colors p-6 group">
              <div className="text-xs text-portfolio-secondary font-bold mb-2 tracking-widest uppercase">
                LEVEL {i} // COMPONENT
              </div>
              <h3 className="font-display text-xl text-portfolio-text-bright mb-4 group-hover:text-portfolio-border transition-colors">
                PROJECT_BETA_{i}
              </h3>
              <p className="text-sm mb-6 text-portfolio-text/80">
                Detailed description of the architectural decisions and technology stack used in this specific system.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] px-2 py-1 bg-portfolio-border/10 text-portfolio-border border border-portfolio-border/20">
                  RUST
                </span>
                <span className="text-[10px] px-2 py-1 bg-portfolio-border/10 text-portfolio-border border border-portfolio-border/20">
                  WASM
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <KenkoModal isOpen={isKenkoOpen} onClose={() => setIsKenkoOpen(false)} />
    </main>
  );
};

export default Home;
