import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, ArrowLeftRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- COMPONENTS ---
import CTASection from '../components/features/CTASection';
import FAQSection from '../components/features/FAQSection';

// --- IMAGE IMPORTS ---
import Wedding1 from '../assets/images/ServicesMenu/wedding.jpg';
import Wedding2 from '../assets/images/FeaturedWeddings/FeaturedWeddings1.jpg';
import Wedding3 from '../assets/images/FeaturedWeddings/FeaturedWeddings2.jpg';

// Placeholders


import Engagement1 from '../assets/images/ServicesMenu/Engagement.jpg';
import Engagement2 from '../assets/images/FeaturedWeddings/FeaturedWeddings1.jpg';
import Engagement3 from '../assets/images/FeaturedWeddings/FeaturedWeddings2.jpg';

import Birthday1 from '../assets/images/ServicesMenu/Birthdays.jpg';
const Birthday2 = "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?q=80&w=600";
const Birthday3 = "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=600";

import Baby1 from '../assets/images/ServicesMenu/BabyShoots.jpg';
const Baby2 = "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600";
const Baby3 = "https://images.unsplash.com/photo-1519340241574-2291ec335c46?q=80&w=600";

const HERO_IMAGES = [Wedding1, Engagement1, Baby1]; // Renamed to match AboutPage convention

const COLLECTIONS = [
  {
    id: "weddings",
    title: "Weddings",
    subtitle: "Eternal Love",
    desc: "A symphony of emotions. We capture the grandeur and the intimate whispers of your special day with a romantic, cinematic touch.",
    link: "/gallery/weddings",
    images: [Wedding1, Wedding2, Wedding3]
  },
  {
    id: "engagements",
    title: "Engagements",
    subtitle: "The Promise",
    desc: "Raw, unscripted connection. These sessions are about the chemistry between you two, set against breathtaking backdrops.",
    link: "/gallery/engagements",
    images: [Engagement1, Engagement2, Engagement3]
  },
  {
    id: "birthdays",
    title: "Birthdays",
    subtitle: "Joyous Moments",
    desc: "Vibrant energy and pure happiness. We document the laughter, the lights, and the legacy of your celebration.",
    link: "/gallery/birthdays",
    images: [Birthday1, Birthday2, Birthday3]
  },
  {
    id: "baby-shoots",
    title: "Baby Shoots",
    subtitle: "New Beginnings",
    desc: "Soft, warm, and tender. Preserving the fleeting moments of new life with a gentle, organic aesthetic.",
    link: "/gallery/baby-shoots",
    images: [Baby1, Baby2, Baby3]
  }
];

const PortfolioPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null); // Added ref for parallax

  // --- HERO SLIDER LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // --- SCROLL PARALLAX (Matching About Page) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  // Note: yParallax isn't used on the hero images in the AboutPage provided, 
  // but the hook is set up there. I'll keep the structure identical.

  return (
    <main className="w-full bg-[#FDFBF7] text-[#1a1a1a] overflow-x-hidden selection:bg-[#A6906E] selection:text-white">

      {/* =========================================
          1. CINEMATIC HERO SLIDER (Consistent with About Page)
      ========================================= */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        
        {/* SLIDESHOW */}
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
               src={HERO_IMAGES[currentSlide]} 
               alt={`Slide ${currentSlide}`} 
               className="w-full h-full object-cover opacity-80"
             />
             {/* Gradient Overlays for Visibility */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          </motion.div>
        </AnimatePresence>

        {/* PAGE NAME LABEL (Fixed Visibility) */}
        <div className="absolute top-32 left-6 md:left-12 z-30 flex items-center gap-4 mix-blend-difference text-white">
            <span className="h-[2px] w-12 bg-[#A6906E]"></span>
            <span className="font-bold tracking-[0.3em] text-xs uppercase drop-shadow-md">
                The Portfolio
            </span>
        </div>

        {/* HERO CONTENT */}
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
                
                {/* Slide Indicators */}
                <div className="flex gap-3">
                   {HERO_IMAGES.map((_, index) => (
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

        {/* Scroll Indicator */}
        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 right-8 text-white/50 z-30 hidden md:block"
        >
            <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest rotate-90 mb-8">Scroll</span>
                <ArrowDown size={20} />
            </div>
        </motion.div>

        {/* CSS for Outline Text effect */}
        <style>{`
          .stroke-text {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
            color: transparent;
          }
        `}</style>
      </section>


      {/* =========================================
          2. BENTO GRID COLLECTIONS (Modern UI)
      ========================================= */}
      <div className="relative z-10 flex flex-col gap-12 md:gap-0" ref={containerRef}>
        {COLLECTIONS.map((collection, index) => (
            <ModernBentoSection key={collection.id} collection={collection} index={index} />
        ))}
      </div>

      {/* --- CTA --- */}
       <FAQSection />

      <CTASection />

     
    </main>
  );
};

// --- SUB-COMPONENT: MODERN BENTO SECTION ---
const ModernBentoSection = ({ collection, index }) => {
  const isEven = index % 2 === 0;
  
  // Alternating Light Backgrounds
  const bgClass = isEven ? "bg-[#FDFBF7]" : "bg-white";

  return (
    <section className={`relative w-full py-20 md:py-32 overflow-hidden ${bgClass}`}>
        
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
            <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24`}>
                
                {/* --- 1. TEXT CONTENT (Sticky on Desktop) --- */}
                <div className="w-full lg:w-[35%] flex flex-col items-start text-left lg:sticky lg:top-32 h-fit">
                    
                    {/* Floating Label */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A6906E]/10 border border-[#A6906E]/20 mb-6">
                        <Star size={12} className="text-[#A6906E] fill-[#A6906E]" />
                        <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#A6906E]">
                            {collection.subtitle}
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-6xl font-serif text-[#1a1a1a] mb-6 leading-tight">
                        {collection.title}
                    </h2>

                    <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed mb-8">
                        {collection.desc}
                    </p>

                    <Link 
                        to={collection.link} 
                        className="group flex items-center gap-4 text-xs md:text-sm font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-[#A6906E] transition-all"
                    >
                        <div className="w-12 h-12 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[#A6906E] group-hover:border-[#A6906E] group-hover:scale-110">
                            <ArrowRight size={18} className="text-[#1a1a1a] -rotate-45 group-hover:rotate-0 group-hover:text-white transition-all duration-300" />
                        </div>
                        <span>Explore Gallery</span>
                    </Link>
                </div>

                {/* --- 2. MODERN IMAGE UI --- */}
                <div className="w-full lg:w-[65%]">
                    
                    {/* DESKTOP: BENTO GRID */}
                    <div className="hidden lg:grid grid-cols-2 gap-4 h-[600px]">
                        {/* Main Image (Large) */}
                        <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer">
                             <Link to={collection.link} className="block w-full h-full">
                                <img 
                                    src={collection.images[0]} 
                                    alt="Main" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500" />
                             </Link>
                        </div>
                        
                        {/* Secondary Images (Bottom Row) */}
                        <div className="rounded-2xl overflow-hidden h-[250px] relative group">
                            <img src={collection.images[1]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="rounded-2xl overflow-hidden h-[250px] relative group">
                            <img src={collection.images[2]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                    </div>

                    {/* MOBILE: HORIZONTAL SWIPE CAROUSEL (App-like feel) */}
                    <div className="lg:hidden w-full relative">
                        {/* Scroll Container */}
                        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6">
                            {collection.images.map((img, i) => (
                                <div key={i} className="min-w-[85vw] h-[400px] snap-center rounded-2xl overflow-hidden relative shadow-lg">
                                    <img src={img} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                                </div>
                            ))}
                        </div>
                        
                        {/* Swipe Hint */}
                        <div className="flex items-center gap-2 justify-end mt-2 text-[#A6906E] opacity-70">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Swipe</span>
                            <ArrowLeftRight size={14} />
                        </div>
                    </div>

                </div>

            </div>
        </div>

    </section>
  );
};

export default PortfolioPage;