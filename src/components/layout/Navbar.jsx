import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight, Instagram, Facebook, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../data/constants';

// YOUR LOGO IMPORT
import LogoImg from '../../assets/images/vmlogo2.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Track which mobile dropdown is expanded
  const [mobileDropdown, setMobileDropdown] = useState(null); 
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setMobileDropdown(null);
  }, [location]);

  // Lock Body Scroll when Menu is Open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // --- STYLES ---
  const solidNavStyles = "fixed top-0 w-full z-50 bg-[#121212] border-b border-white/5 shadow-2xl font-sans h-20 transition-all duration-300";
  const baseLinkStyles = "h-full flex items-center px-6 text-[15px] font-medium transition-all duration-300 capitalize relative overflow-hidden";
  const activeStyles = "bg-white text-[#121212] shadow-lg"; 
  const inactiveStyles = "text-gray-300 hover:bg-white/10 hover:text-white";

  // --- ANIMATION VARIANTS ---
  const menuVariants = {
    closed: { 
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    },
    open: { 
      opacity: 1,
      y: "0%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 30 },
    open: (i) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { delay: 0.1 + (i * 0.1), duration: 0.5 }
    })
  };

  return (
    <nav className={solidNavStyles}>
      <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center h-full">
        
        {/* --- LEFT: LOGO --- */}
        <Link to="/" className="flex items-center z-50 shrink-0 py-2 relative">
          <img 
            src={LogoImg} 
            alt="Vikum Photography" 
            className="h-10 md:h-14 w-auto object-contain" 
          />
        </Link>

        {/* --- RIGHT: DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center h-full">
          <div className="flex items-center h-full mr-0">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="relative group h-full">
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => `${baseLinkStyles} ${isActive ? activeStyles : inactiveStyles}`}
                >
                  <span className="flex items-center gap-1 relative z-10">
                    {link.name} 
                    {link.dropdown && <ChevronDown size={14} className="mt-0.5 opacity-70" />}
                  </span>
                </NavLink>
                
                {/* Desktop Dropdown */}
                {link.dropdown && (
                  <div className="absolute top-full right-0 w-64 bg-[#1a1a1a] border-t-2 border-[#A6906E] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-2xl">
                    <div className="py-2">
                      {link.dropdown.map((sub) => (
                        <NavLink 
                          key={sub.name} 
                          to={sub.path} 
                          className={({ isActive }) => 
                             `block px-6 py-3 text-[13px] border-b border-white/5 last:border-0 capitalize transition-all duration-300
                             ${isActive ? 'text-[#A6906E] font-bold bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/10 hover:pl-8'}`
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

          <Link 
            to="/contact" 
            className="flex items-center gap-3 bg-[#1a1a1a] hover:bg-[#A6906E] text-white px-8 text-[14px] font-medium transition-all duration-300 h-full border-l border-white/10 tracking-wide group"
          >
            Ask a Quote 
            <ArrowRight size={16} className="text-[#A6906E] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>

        {/* --- MOBILE MENU TOGGLE --- */}
        <button 
          className="md:hidden relative z-[60] text-white p-2 focus:outline-none mix-blend-difference" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <AnimatePresence mode="wait">
             {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                   <X size={32} />
                </motion.div>
             ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                   <Menu size={32} />
                </motion.div>
             )}
          </AnimatePresence>
        </button>

        {/* --- MOBILE FULLSCREEN OVERLAY --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-[#0a0a0a] z-[55] flex flex-col pt-24 pb-8 px-6 md:px-12 overflow-y-auto"
            >
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex flex-col gap-6">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div key={link.name} custom={i} variants={linkVariants}>
                      
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between group">
                            <NavLink 
                              to={link.path} 
                              className={({ isActive }) => 
                                `text-4xl md:text-6xl font-serif capitalize transition-all duration-300 flex items-center gap-4
                                ${isActive ? 'text-[#A6906E] translate-x-4' : 'text-gray-400 hover:text-white hover:translate-x-4'}`
                              }
                            >
                              <span className="text-sm font-sans font-bold tracking-widest uppercase text-[#A6906E] opacity-50 mb-auto mt-2">0{i+1}</span>
                              {link.name}
                            </NavLink>

                            {/* Dropdown Toggle Arrow */}
                            {link.dropdown && (
                               <button 
                                 onClick={(e) => {
                                    e.preventDefault();
                                    setMobileDropdown(mobileDropdown === link.name ? null : link.name);
                                 }}
                                 className={`p-4 text-gray-500 hover:text-[#A6906E] transition-transform duration-300 ${mobileDropdown === link.name ? 'rotate-180 text-[#A6906E]' : ''}`}
                               >
                                  <ChevronDown size={28} />
                               </button>
                            )}
                        </div>

                        {/* Mobile Submenu Accordion */}
                        <AnimatePresence>
                           {link.dropdown && mobileDropdown === link.name && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="overflow-hidden pl-12 flex flex-col gap-4 mt-4 border-l border-white/10"
                              >
                                 {link.dropdown.map((sub) => (
                                    <Link 
                                       key={sub.name}
                                       to={sub.path}
                                       className="text-xl text-gray-500 hover:text-white transition-colors py-1 block"
                                    >
                                       {sub.name}
                                    </Link>
                                 ))}
                              </motion.div>
                           )}
                        </AnimatePresence>
                      </div>

                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile Footer Area */}
              <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 transition={{ delay: 0.6 }}
                 className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                 <div className="flex gap-6">
                    <a href="#" className="text-gray-400 hover:text-[#A6906E] transition-colors"><Instagram /></a>
                    <a href="#" className="text-gray-400 hover:text-[#A6906E] transition-colors"><Facebook /></a>
                    <a href="#" className="text-gray-400 hover:text-[#A6906E] transition-colors"><Mail /></a>
                 </div>
                 
                 <Link 
                   to="/contact" 
                   className="w-full md:w-auto text-center bg-[#A6906E] text-white py-4 px-8 text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-white hover:text-[#121212] transition-colors"
                 >
                    Get a Quote
                 </Link>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;