import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, ArrowUp, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  // --- BACK TO TOP FUNCTION ---
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- LIVE TIME (Optional "Live" Touch) ---
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 border-t border-white/5 font-sans relative overflow-hidden">
      
      {/* --- DECORATIVE BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#A6906E] to-transparent opacity-30" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#A6906E]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 mb-20">
          
          {/* COL 1: BRANDING (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link to="/" className="inline-block mb-8 group">
               <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
                 <span className="text-[#A6906E]">V</span>IKUM
               </h2>
               <span className="text-[10px] tracking-[0.4em] uppercase text-gray-500 group-hover:text-white transition-colors duration-500">
                 Photography
               </span>
            </Link>
            
            <p className="text-gray-400 text-sm leading-loose mb-8 max-w-sm">
              Capturing the raw emotion, natural light, and fleeting moments of your most special days. Based in Sri Lanka, available worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Instagram size={18} />} />
              <SocialLink href="#" icon={<Facebook size={18} />} />
              <SocialLink href="mailto:hello@vikum.com" icon={<Mail size={18} />} />
            </div>
          </div>

          {/* COL 2: EXPLORE (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A6906E] mb-8">
              Explore
            </h3>
            <ul className="flex flex-col gap-4">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/about" text="About Me" />
              <FooterLink to="/gallery" text="Portfolio" />
              <FooterLink to="/blog" text="Journal" />
              <FooterLink to="/contact" text="Contact" />
            </ul>
          </div>

          {/* COL 3: SERVICES (Span 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A6906E] mb-8">
              Services
            </h3>
            <ul className="flex flex-col gap-4">
              <FooterLink to="/gallery/weddings" text="Wedding Photography" />
              <FooterLink to="/gallery/engagements" text="Engagement Sessions" />
              <FooterLink to="/gallery/portraits" text="Editorial Portraits" />
              <FooterLink to="/gallery/destination" text="Destination Weddings" />
            </ul>
          </div>

          {/* COL 4: CONTACT INFO (Span 3) */}
          <div className="lg:col-span-3">
             <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A6906E] mb-8">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-6">
               <div className="flex items-start gap-4 text-gray-400 hover:text-white transition-colors">
                  <MapPin size={20} className="text-[#A6906E] mt-1" />
                  <span className="text-sm leading-relaxed">
                    No 123, Temple Road,<br /> Colombo 07, Sri Lanka
                  </span>
               </div>
               <div className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors">
                  <Phone size={20} className="text-[#A6906E]" />
                  <span className="text-sm">+94 77 123 4567</span>
               </div>
               
               {/* Live Time Display */}
               <div className="mt-4 pt-6 border-t border-white/10">
                 <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Local Time</p>
                 <p className="text-sm text-white font-mono">
                   {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} (GMT+5:30)
                 </p>
               </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Vikum Photography. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-gray-600 hover:text-[#A6906E] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-gray-600 hover:text-[#A6906E] transition-colors">Terms of Use</Link>
            
            {/* Back to Top Button */}
            <button 
              onClick={scrollToTop}
              className="ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#A6906E] text-white transition-all duration-300 group"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

// --- SUB-COMPONENT: HOVER LINK ---
const FooterLink = ({ to, text }) => (
  <li>
    <Link 
      to={to} 
      className="text-sm text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
    >
      <span className="w-0 group-hover:w-2 h-[1px] bg-[#A6906E] transition-all duration-300" />
      <span className="group-hover:translate-x-1 transition-transform duration-300">{text}</span>
    </Link>
  </li>
);

// --- SUB-COMPONENT: SOCIAL ICON ---
const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-[#A6906E] hover:bg-[#A6906E] transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;