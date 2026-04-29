import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#000080] border-b-4 border-portfolio-accent py-3 sticky top-0 z-[100] shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="font-display text-2xl md:text-3xl text-white italic tracking-tighter hover:text-portfolio-accent transition-colors" style={{ textShadow: '2px 2px 0 #ff00ff' }}>
          ASHISH_REVELATION
        </Link>
        <ul className="hidden md:flex gap-6 items-center list-none m-0 p-0 font-display text-[10px]">
          <li>
            <Link to="/" className="text-portfolio-text hover:text-white transition-colors uppercase font-bold tracking-widest">
              [SYSTEM_ROOT]
            </Link>
          </li>
          <li>
            <Link to="/trigger" className="bg-portfolio-accent text-white px-3 py-1.5 border-2 border-portfolio-secondary hover:scale-110 transition-all uppercase font-bold tracking-widest shadow-[4px_4px_0px_#000]">
              TRIGGER_CORE
            </Link>
          </li>
          <li>
            <button className="bg-portfolio-secondary text-black px-4 py-1.5 border-2 border-white hover:bg-white transition-all uppercase font-bold tracking-widest shadow-[4px_4px_0px_#000]">
              ADM_LINK
            </button>
          </li>
        </ul>
      </div>
      <div className="bg-portfolio-accent h-1 w-full opacity-50" />
    </nav>
  );
};

export default Navbar;
