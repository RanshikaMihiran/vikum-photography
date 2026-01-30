import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- COMPONENTS ---
import CTASection from '../components/features/CTASection';

// --- IMAGE IMPORTS ---
import Wedding1 from '../assets/images/ServicesMenu/wedding.jpg';
// Replace these with your high-res images
const Wedding2 = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600";
import Engagement1 from '../assets/images/ServicesMenu/Engagement.jpg';
import Birthday1 from '../assets/images/ServicesMenu/Birthdays.jpg';
import Baby1 from '../assets/images/ServicesMenu/BabyShoots.jpg';

const HERO_SLIDES = [Wedding1, Engagement1, Baby1];

const COLLECTIONS = [
  {
    id: "weddings",
    title: "Weddings",
    subtitle: "The Union",
    desc: "Cinematic love stories captured in real-time.",
    link: "/gallery/weddings",
    color: "#FDFBF7", // Cream background
    textColor: "#1a1a1a",
    cover: Wedding2
  },
  {
    id: "engagements",
    title: "Engagements",
    subtitle: "The Promise",
    desc: "The spark before the vows. Candid and raw.",
    link: "/gallery/engagements",
    color: "#E8E6E1", // Slightly darker cream
    textColor: "#1a1a1a",
    cover: Engagement1
  },
  {
    id: "birthdays",
    title: "Birthdays",
    subtitle: "Celebrations",
    desc: "Joyous milestones surrounded by loved ones.",
    link: "/gallery/birthdays",
    color: "#1a1a1a", // Dark background for contrast
    textColor: "#FDFBF7",
    cover: Birthday1
  },
  {
    id: "baby-shoots",
    title: "Baby Shoots",
    subtitle: "New Life",
    desc: "Gentle, lifestyle moments of your growing family.",
    link: "/gallery/baby-shoots",
    color: "#A6906E", // Gold background
    textColor: "#FDFBF7",
    cover: Baby1
  }
];

const PortfolioPage = () => {

  
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- HERO LOGIC (UNCHANGED) ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (

    
    <main className="w-full bg-[#FDFBF7] overflow-x-hidden selection:bg-[#A6906E] selection:text-white">

      

      {/* =========================================
          1. CINEMATIC HERO (KEPT AS IS)
      ========================================= */}
      <section className="relative h-screen w-full overflow-hidden bg-black z-0">
        <AnimatePresence mode='wait'>
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
             <img 
               src={HERO_SLIDES[currentSlide]} 
               alt={`Gallery Slide ${currentSlide}`} 
               className="w-full h-full object-cover opacity-70"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-32 left-6 md:left-12 z-30 flex items-center gap-4 mix-blend-difference text-white">
            <span className="h-[2px] w-12 bg-[#A6906E]"></span>
            <span className="font-bold tracking-[0.3em] text-xs uppercase drop-shadow-md">
                The Collections
            </span>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 z-30 text-white">
          <div className="max-w-[1600px] mx-auto">
             <div className="overflow-hidden">
                <motion.h1 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-7xl md:text-9xl lg:text-[11rem] font-serif leading-none mb-4"
                >
                   Visual <span className="text-transparent stroke-text">Anthology</span>
                </motion.h1>
             </div>
             
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex flex-col md:flex-row gap-8 items-start md:items-center"
             >
                <p className="text-gray-300 text-lg font-light max-w-lg leading-relaxed border-l-2 border-[#A6906E] pl-6">
                   A curated selection of our finest work across all disciplines.
                   <br/>Explore the stories we've had the honor to tell.
                </p>
                
                <div className="flex gap-3">
                   {HERO_SLIDES.map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1 transition-all duration-500 rounded-full ${index === currentSlide ? 'w-12 bg-[#A6906E]' : 'w-4 bg-white/30 hover:bg-white'}`}
                      />
                   ))}
                </div>
             </motion.div>
          </div>
        </div>

        <style>{`
          .stroke-text {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
            color: transparent;
          }
        `}</style>
      </section>


      {/* =========================================
          2. STICKY STACKING CARDS (Modern Trend)
      ========================================= */}
      <div className="relative z-10">
        
        {/* Intro Text */}
        <section className="py-24 px-6 bg-[#FDFBF7] flex justify-center text-center">
            <div className="max-w-2xl">
                <span className="text-[#A6906E] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Our Portfolio</span>
                <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a]">Curated Galleries</h2>
            </div>
        </section>

        {/* The Stacking Section */}
        <div className="flex flex-col">
            {COLLECTIONS.map((collection, index) => (
                <StickyCard key={collection.id} collection={collection} index={index} />
            ))}
        </div>

      </div>

      {/* --- CTA --- */}
      <CTASection />

    </main>
  );
};

// --- SUB-COMPONENT: STICKY CARD ---
const StickyCard = ({ collection, index }) => {
  // We use sticky positioning so cards stack on top of each other
  // 'top-0' makes them stick to the top of the viewport
  return (
    <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-t border-black/5" 
         style={{ backgroundColor: collection.color, color: collection.textColor }}>
        
        <div className="max-w-[1600px] mx-auto w-full h-full px-6 py-12 md:p-20 flex flex-col md:flex-row items-center gap-12 md:gap-24 relative">
            
            {/* 1. TEXT CONTENT */}
            <div className="w-full md:w-1/3 flex flex-col justify-center z-20 order-2 md:order-1">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-6xl font-serif font-bold opacity-20">0{index + 1}</span>
                    <div className="h-[1px] w-12 bg-current opacity-30"></div>
                </div>

                <span className="font-bold tracking-[0.2em] text-xs uppercase mb-4 opacity-70">
                    {collection.subtitle}
                </span>

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-none">
                    {collection.title}
                </h2>

                <p className="text-lg md:text-xl font-light leading-relaxed mb-12 opacity-80 max-w-md">
                    {collection.desc}
                </p>

                <Link 
                   to={collection.link} 
                   className="group inline-flex items-center gap-4 px-8 py-4 border border-current rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                >
                   <span className="text-xs font-bold uppercase tracking-widest">Open Gallery</span>
                   <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                </Link>
            </div>

            {/* 2. IMAGE CONTENT */}
            <div className="w-full md:w-2/3 h-[50vh] md:h-full relative z-10 order-1 md:order-2">
                <div className="relative w-full h-full overflow-hidden rounded-sm group cursor-pointer shadow-2xl">
                   <Link to={collection.link} className="block w-full h-full">
                       <motion.img 
                           initial={{ scale: 1.2 }}
                           whileInView={{ scale: 1 }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           src={collection.cover} 
                           alt={collection.title} 
                           className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                       />
                       
                       {/* Hover Overlay */}
                       <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500" />
                   </Link>
                </div>
            </div>

        </div>
    </div>
  );
};

export default PortfolioPage;