import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';


import Birthdays from '../../assets/images/ServicesMenu/Birthdays.jpg';
import BabyShoots from '../../assets/images/ServicesMenu/BabyShoots.jpg';
import Engagement from '../../assets/images/ServicesMenu/Engagement.jpg';
import Pregnancy from '../../assets/images/ServicesMenu/Pregnancy.jpg';
import wedding from '../../assets/images/ServicesMenu/wedding.jpg';

// --- PLACEHOLDER IMAGES ---
// (Replace these with your local imports when you have them)
const IMG_WEDDING = Birthdays;
const IMG_ENGAGEMENT = BabyShoots;
const IMG_BIRTHDAY = Engagement;
const IMG_BABY = Pregnancy;
const IMG_PREGNANCY = wedding;

const SERVICES = [
  {
    id: 1,
    title: "Weddings",
    description: "Capturing the timeless moments of your special day with cinematic elegance and storytelling.",
    image: IMG_WEDDING,
    link: "/gallery/weddings"
  },
  {
    id: 2,
    title: "Engagement",
    description: "Celebrating the beginning of your journey together with intimate, candid storytelling.",
    image: IMG_ENGAGEMENT,
    link: "/gallery/engagements"
  },
  {
    id: 3,
    title: "Birthdays",
    description: "Joyful memories from your milestone celebrations preserved forever in high definition.",
    image: IMG_BIRTHDAY,
    link: "/gallery/birthdays"
  },
  {
    id: 4,
    title: "Baby Shoots",
    description: "The precious, fleeting moments of your little one's early days, captured with care.",
    image: IMG_BABY,
    link: "/gallery/baby"
  },
  {
    id: 5,
    title: "Pregnancy",
    description: "Embracing the beauty and anticipation of motherhood with artistic grace.",
    image: IMG_PREGNANCY,
    link: "/gallery/pregnancy"
  }
];

const ServicesMenu = () => {
  // 1. Desktop State
  const [activeId, setActiveId] = useState(1); 
  
  // 2. Mobile State (First item open by default)
  const [mobileExpanded, setMobileExpanded] = useState(1);

  return (
    // MAIN BACKGROUND COLOR: #222923 (Deep Forest Dark)
    <section className="relative bg-[#222923] py-20 md:py-32 overflow-hidden">
      
      <div className="max-w-[1600px] mx-auto px-6 grid md:grid-cols-12 gap-12">
        
        {/* --- LEFT SIDE: SERVICE LIST --- */}
        <div className="md:col-span-5 flex flex-col justify-center z-20">
          
          <div className="mb-12">
            <span className="text-[#A6906E] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Capturing Life's <br />
              <span className="text-[#A6906E]">Greatest Milestones</span>
            </h2>
          </div>

          <div className="flex flex-col">
            {SERVICES.map((service) => (
              <div 
                key={service.id}
                // Border color adjusted to be subtle against the green background
                className="border-b border-white/5 last:border-0"
                onMouseEnter={() => setActiveId(service.id)} 
              >
                
                {/* --- DESKTOP VIEW --- */}
                <Link 
                  to={service.link}
                  className={`hidden md:flex items-center justify-between py-8 px-6 group transition-all duration-500 rounded-sm
                    ${activeId === service.id 
                      ? 'bg-[#2a332a] translate-x-4 shadow-xl border-l-4 border-[#A6906E]' // Active: Lighter Green Background + Gold Border
                      : 'hover:bg-[#2a332a]/40 hover:pl-8 border-l-4 border-transparent' // Hover: Subtle shift
                    }
                  `}
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-sm font-bold transition-colors duration-300 ${activeId === service.id ? 'text-[#A6906E]' : 'text-gray-600 group-hover:text-gray-400'}`}>
                      0{service.id}
                    </span>
                    <h3 className={`text-2xl font-serif transition-colors duration-300 ${activeId === service.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Icon animates in on active state */}
                  <ArrowUpRight 
                    className={`transition-all duration-500 ${activeId === service.id ? 'text-[#A6906E] opacity-100 translate-x-0' : 'text-white/50 opacity-0 -translate-x-4'}`} 
                  />
                </Link>

                {/* --- MOBILE VIEW (Accordion) --- */}
                <div className="md:hidden">
                  <button 
                    onClick={() => setMobileExpanded(mobileExpanded === service.id ? null : service.id)}
                    className={`w-full flex items-center justify-between py-5 px-4 text-left transition-colors duration-300 rounded-sm
                      ${mobileExpanded === service.id ? 'bg-[#2a332a]' : 'bg-transparent'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                        <span className={`text-xs font-bold ${mobileExpanded === service.id ? 'text-[#A6906E]' : 'text-gray-600'}`}>
                            0{service.id}
                        </span>
                        <h3 className={`text-lg font-serif transition-colors ${mobileExpanded === service.id ? 'text-white' : 'text-gray-300'}`}>
                        {service.title}
                        </h3>
                    </div>
                    {mobileExpanded === service.id ? <Minus size={18} className="text-[#A6906E]"/> : <Plus size={18} className="text-gray-500"/>}
                  </button>

                  <AnimatePresence>
                    {mobileExpanded === service.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-[#2a332a] rounded-b-sm" // Matches the active header color
                      >
                        <div className="pb-8 pt-2 px-4">
                           <div className="relative overflow-hidden rounded-sm mb-4 border border-white/5">
                               <img 
                                  src={service.image} 
                                  alt={service.title} 
                                  className="w-full h-56 object-cover"
                                />
                                <div className="absolute inset-0 bg-[#222923]/20"></div>
                           </div>
                            
                            <p className="text-gray-400 text-sm mb-5 leading-relaxed pl-3 border-l-2 border-[#A6906E]">
                                {service.description}
                            </p>
                            
                            <Link 
                              to={service.link}
                              className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest bg-[#222923] px-5 py-3 hover:bg-[#A6906E] transition-colors rounded-sm shadow-lg"
                            >
                              Explore Gallery <ArrowUpRight size={14} />
                            </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT SIDE: IMAGE DISPLAY (DESKTOP ONLY) --- */}
        <div className="hidden md:block md:col-span-7 relative h-[600px] w-full">
            <div className="absolute inset-0 w-full h-full rounded-sm overflow-hidden border border-white/5 bg-[#2a332a]">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeId}
                        src={SERVICES.find(s => s.id === activeId).image}
                        alt="Service Preview"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover opacity-80" // Slightly reduced opacity to blend with theme
                    />
                </AnimatePresence>
                
                {/* Overlay Text on Image */}
                <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-[#222923] via-[#222923]/80 to-transparent">
                    <motion.div
                        key={`text-${activeId}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                         <p className="text-gray-200 text-lg max-w-md leading-relaxed border-l-2 border-[#A6906E] pl-6">
                            {SERVICES.find(s => s.id === activeId).description}
                         </p>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Outline Box (Using the lighter green) */}
            <div className="absolute -right-4 -bottom-4 w-full h-full border border-[#2a332a] opacity-50 -z-10 rounded-sm"></div>
        </div>

      </div>
    </section>
  );
};

export default ServicesMenu;