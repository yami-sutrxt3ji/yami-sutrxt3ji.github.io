const Navbar = () => {
  return (
    <nav className="bg-portfolio-panel border-b-2 border-portfolio-border py-4 sticky top-0 z-50 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="font-display text-2xl text-portfolio-border font-bold tracking-widest uppercase">
          ASHISH.EXE
        </div>
        <ul className="hidden md:flex gap-8 items-center list-none m-0 p-0">
          <li>
            <a href="#about" className="text-portfolio-text hover:text-portfolio-border text-sm tracking-widest uppercase transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="text-portfolio-text hover:text-portfolio-border text-sm tracking-widest uppercase transition-colors">
              Projects
            </a>
          </li>
          <li>
            <a href="#experience" className="text-portfolio-text hover:text-portfolio-border text-sm tracking-widest uppercase transition-colors">
              Experience
            </a>
          </li>
          <li>
            <button className="border-2 border-portfolio-border text-portfolio-border px-4 py-2 hover:bg-portfolio-border hover:text-portfolio-bg transition-all uppercase text-sm font-bold">
              CONNECT
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
