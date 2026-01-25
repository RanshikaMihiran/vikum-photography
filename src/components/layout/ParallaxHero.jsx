import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HERO_CONTENT } from '../../data/constants';

// --- IMAGE IMPORTS ---
import Hero1 from '../../assets/images/Hero/hero1.jpg';
import Hero2 from '../../assets/images/Hero/hero2.jpg';
import Hero3 from '../../assets/images/Hero/hero3.jpg';
import Hero4 from '../../assets/images/Hero/hero4.jpg';

const SLIDES = [
  { id: 1, image: Hero1, alt: "Wedding Couple Beach" },
  { id: 2, image: Hero2, alt: "Couple Forest" },
  { id: 3, image: Hero3, alt: "Portrait Close up" },
  { id: 4, image: Hero4, alt: "Traditional Wedding" },
  { id: 5, image: Hero1, alt: "Candid Laughter" }
];

const ParallaxHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- AUTO-SLIDE LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // --- PARALLAX SCROLL EFFECT ---
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]); 
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  // --- ANIMATION VARIANTS ---
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const wordVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden font-sans bg-black">
      
      {/* --- BACKGROUND SLIDESHOW --- */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SLIDES[currentSlide].image})` }}
        >
            {/* REMOVED the inner solid tint div that was here. It was too heavy. */}
        </motion.div>
      </AnimatePresence>

      {/* --- UPDATED GRADIENT OVERLAYS --- */}
      {/* Lighter Left Gradient: Changed from black/90 to black/60 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent z-10" />
      
      {/* Lighter Bottom Gradient: Changed from black/90 to black/70 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

      {/* --- MAIN CONTENT --- */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 h-full max-w-[1600px] mx-auto px-6 flex flex-col justify-center"
      >
        
        {/* TYPOGRAPHY SECTION */}
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="mt-0 md:mt-10 max-w-5xl space-y-2 md:space-y-4"
        >
          {/* Row 1 */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {["WE", "CAPTURE", "THE", "MOST", "MAGICAL"].map((word, i) => (
               <motion.span 
                 key={i} 
                 variants={wordVars} 
                 // Added a slight shadow to the text box itself for better separation
                 className="bg-white/95 backdrop-blur-md text-black px-2 py-1 md:px-4 md:py-2 text-xl sm:text-3xl md:text-6xl font-bold tracking-wide uppercase shadow-2xl"
               >
                 {word}
               </motion.span>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
             {["MOMENTS", "OF", "YOUR", "LIFE"].map((word, i) => (
               <motion.span 
                 key={i} 
                 variants={wordVars} 
                 className="bg-white/95 backdrop-blur-md text-black px-2 py-1 md:px-4 md:py-2 text-xl sm:text-3xl md:text-6xl font-bold tracking-wide uppercase shadow-2xl"
               >
                 {word}
               </motion.span>
            ))}
          </div>
        </motion.div>

        {/* BOTTOM SECTION: DESC & BUTTONS */}
        <div className="absolute bottom-8 md:bottom-24 left-6 right-6 max-w-[1600px] mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              // Made text slightly brighter (gray-200 instead of gray-300)
              className="hidden sm:block text-gray-200 text-sm md:text-lg leading-relaxed max-w-xl border-l-4 border-primary pl-4 md:pl-6 font-medium drop-shadow-md"
            >
              {HERO_CONTENT.description}
            </motion.p>

            {/* Action Buttons & Dots */}
            <div className="flex flex-col gap-6">
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4 md:justify-end"
              >
                {/* Primary Button */}
                <Link to="/gallery" className="group relative flex items-center justify-center gap-3 bg-white text-black px-6 py-3 md:px-8 md:py-4 uppercase text-xs font-bold tracking-widest hover:bg-primary hover:text-white transition-all duration-300 shadow-xl">
                  Explore Gallery 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
                
                {/* Secondary Button - Added bg-black/20 for better contrast */}
                <Link to="/services" className="group flex items-center justify-center gap-3 border border-white/40 bg-black/20 backdrop-blur-md text-white px-6 py-3 md:px-8 md:py-4 uppercase text-xs font-bold tracking-widest hover:bg-white/20 transition-all duration-300">
                  Services 
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
              </motion.div>

              {/* Slider Dots */}
              <div className="flex gap-3 justify-center md:justify-end">
                {SLIDES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    // Added drop-shadow so dots are visible on bright parts of images
                    className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer drop-shadow-md ${
                      currentSlide === index ? "w-10 bg-primary" : "w-2 bg-white/50 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default ParallaxHero;