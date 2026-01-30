import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '../../data/constants';

// YOUR LOGO IMPORT
import LogoImg from '../../assets/images/vmlogo1.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // --- STYLING LOGIC ---

  // 1. SOLID CONTAINER STYLE (Reverted from Glass)
  // bg-neutral-900 -> Solid Dark Background (No transparency)
  // shadow-xl -> Strong shadow to separate from content
  const solidNavStyles = "fixed top-0 w-full z-50 bg-[#121212] border-b border-white/5 shadow-2xl font-sans h-20 transition-all duration-300";

  // Base Link Style
  const baseLinkStyles = "h-full flex items-center px-6 text-[15px] font-medium transition-all duration-300 capitalize relative overflow-hidden";
  
  // 2. ACTIVE STATE (White Block)
  // Keeps the "White Block" look you liked for the active page
  const activeStyles = "bg-white text-neutral-900 shadow-lg"; 
  
  // 3. INACTIVE STATE
  // Standard hover effect
  const inactiveStyles = "text-gray-300 hover:bg-white/10 hover:text-white";

  return (
    <nav className={solidNavStyles}>
      <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center h-full">
        
        {/* --- LEFT: LOGO --- */}
        <Link to="/" className="flex items-center z-50 shrink-0 py-2">
          <img 
            src={LogoImg} 
            alt="Vikum Photography" 
            className="h-12 md:h-14 w-auto object-contain opacity-100" 
          />
        </Link>

        {/* --- RIGHT: DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center h-full">
          
          {/* MENU LINKS CONTAINER */}
          <div className="flex items-center h-full mr-0">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="relative group h-full">
                
                {/* MAIN LINK */}
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => 
                    `${baseLinkStyles} ${isActive ? activeStyles : inactiveStyles}`
                  }
                >
                  <span className="flex items-center gap-1 relative z-10">
                    {link.name} 
                    {link.dropdown && <ChevronDown size={14} className="mt-0.5 opacity-70" />}
                  </span>
                </NavLink>
                
                {/* DROPDOWN MENU (Solid Style) */}
                {link.dropdown && (
                  <div className="absolute top-full right-0 w-64 bg-[#1a1a1a] border-t-2 border-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-2xl">
                    <div className="py-2">
                      {link.dropdown.map((sub) => (
                        <NavLink 
                          key={sub.name} 
                          to={sub.path} 
                          className={({ isActive }) => 
                             `block px-6 py-3 text-[13px] border-b border-white/5 last:border-0 capitalize transition-all duration-300
                             ${isActive ? 'text-primary font-bold bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/10 hover:pl-8'}`
                          }
                        >
                          {sub.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* "ASK A QUOTE" BUTTON (Solid Dark Green) */}
          <Link 
            to="/contact" 
            className="flex items-center gap-3 bg-[#2A332A] hover:bg-[#354035] text-white px-8 text-[14px] font-medium transition-all duration-300 h-full border-l border-white/10 tracking-wide group"
          >
            Ask a Quote 
            <ArrowRight 
              size={16} 
              className="text-primary group-hover:translate-x-1 transition-transform duration-300" 
            />
          </Link>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button 
          className="md:hidden text-white p-2 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* --- MOBILE OVERLAY (Solid) --- */}
        <div className={`fixed inset-0 bg-neutral-950 z-40 flex flex-col justify-center items-center gap-8 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {NAV_LINKS.map(link => (
            <NavLink 
              key={link.name} 
              to={link.path} 
              onClick={() => setIsOpen(false)} 
              className={({ isActive }) => 
                `text-3xl font-serif capitalize transition-colors ${isActive ? 'text-primary font-bold scale-110' : 'text-white hover:text-primary'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className="mt-8 px-10 py-4 bg-primary text-white text-sm font-bold tracking-widest uppercase rounded shadow-lg"
          >
            Ask a Quote
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;