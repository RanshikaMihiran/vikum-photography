import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Camera, Heart, Lightbulb, ArrowDown, Instagram, ArrowRight } from 'lucide-react';

// --- COMPONENT IMPORTS ---
import Testimonials from '../components/features/Testimonials';
import CTASection from '../components/features/CTASection';

// --- IMAGE IMPORTS ---
// We use your hero images for the slider. You can add more here easily.
import HeroImg1 from '../assets/images/Hero/hero1.jpg';
import HeroImg2 from '../assets/images/Hero/hero2.jpg';
import BioImg from '../assets/images/AestheticSection/AestheticSection2.jpg'; // Using this for the Bio section

const HERO_IMAGES = [HeroImg1, HeroImg2]; // Add more images to this array for the slider

const AboutPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  // --- HERO SLIDER LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  // --- SCROLL PARALLAX ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main className="w-full bg-[#FDFBF7] text-[#1a1a1a] overflow-x-hidden selection:bg-[#A6906E] selection:text-white">

      {/* =========================================
          1. CINEMATIC HERO SLIDER
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
                The Profile
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
                   Vikum <span className="text-transparent stroke-text">Jayasekara</span>
                </motion.h1>
             </div>
             
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex flex-col md:flex-row gap-8 items-start md:items-center"
             >
                <p className="text-gray-300 text-lg font-light max-w-lg leading-relaxed border-l-2 border-[#A6906E] pl-6">
                   Visual Artist & Storyteller based in Sri Lanka.
                   <br/>Creating timeless legacies for couples worldwide.
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
          2. BIO SECTION (Animated Reveal)
      ========================================= */}
      <section className="py-24 md:py-40 px-6 relative overflow-hidden">
        
        {/* Decorative Background Text */}
        <div className="absolute top-20 right-[-10%] text-[20rem] font-serif text-[#A6906E]/5 pointer-events-none select-none whitespace-nowrap z-0">
           Storyteller
        </div>

        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
           
           {/* LEFT: Text Content */}
           <div className="order-2 lg:order-1">
              <motion.div
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
              >
                  <span className="text-[#A6906E] font-bold tracking-[0.25em] text-xs uppercase mb-6 block">My Journey</span>
                  
                  <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-[1.1]">
                     "I don't just take photos. <br/>
                     <span className="italic text-[#A6906E]">I keep moments."</span>
                  </h2>
                  
                  <div className="space-y-8 text-gray-500 text-lg font-light leading-relaxed">
                     <p>
                        My journey began not with a camera, but with a fascination for storytelling. 
                        I realized early on that the most powerful stories aren't always written in words—they 
                        are felt in a glance, a touch, or a fleeting smile.
                     </p>
                     <p>
                        For over a decade, I have specialized in <strong>documentary-style wedding photography</strong>. 
                        I reject the stiff, awkward poses of the past. Instead, I foster an environment where you 
                        can be 100% yourself.
                     </p>
                  </div>

                  {/* Signature & Button */}
                  <div className="mt-12 flex flex-col md:flex-row items-start md:items-center gap-10">
                     <div className="font-serif text-5xl text-[#A6906E] opacity-60 italic">Vikum J.</div>
                     
                     <a href="/gallery" className="group flex items-center gap-4 px-8 py-4 border border-[#1a1a1a]/10 hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 rounded-sm">
                        <span className="text-xs font-bold uppercase tracking-widest">View Portfolio</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </a>
                  </div>
              </motion.div>
           </div>

           {/* RIGHT: Image (Parallax & Mask) */}
           <div className="order-1 lg:order-2" ref={containerRef}>
              <div className="relative group w-full h-[600px] md:h-[700px] overflow-hidden rounded-sm">
                 
                 {/* Curtain Reveal Animation */}
                 <motion.div 
                    initial={{ height: "100%" }}
                    whileInView={{ height: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
                    className="absolute inset-0 bg-[#A6906E] z-20 pointer-events-none"
                 />

                 {/* Parallax Image */}
                 <motion.img 
                   style={{ y: yParallax }}
                   src={BioImg} 
                   alt="Vikum Working" 
                   className="w-full h-[120%] object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                 />

                 {/* Hover Badge */}
                 <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg">
                    <Instagram className="w-5 h-5 text-[#A6906E]" />
                 </div>
              </div>
           </div>

        </div>
      </section>


      {/* =========================================
          3. STATS (Grid with Counting Animation)
      ========================================= */}
      <section className="bg-[#1a1a1a] text-white border-y border-white/5">
         <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
               <AnimatedStat number="10+" label="Years Active" />
               <AnimatedStat number="500+" label="Weddings Shot" />
               <AnimatedStat number="50+" label="Destinations" />
               <AnimatedStat number="100%" label="Satisfaction" />
            </div>
         </div>
      </section>


      {/* =========================================
          4. PHILOSOPHY (Interactive Cards)
      ========================================= */}
      <section className="bg-[#111] text-white py-24 px-6 relative">
         <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div>
                  <span className="text-[#A6906E] font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Our Ethos</span>
                  <h2 className="text-4xl md:text-5xl font-serif">Why We Do It</h2>
               </div>
               <p className="text-gray-400 max-w-md text-sm leading-relaxed text-right md:text-left">
                  We believe wedding photography should be an experience, not a chore. Here is what defines our approach.
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               <PhilosophyCard 
                  icon={<Camera size={28} />}
                  title="Cinematic"
                  desc="We treat your wedding like a film set, using natural light to create imagery that feels grand yet intimate."
               />
               <PhilosophyCard 
                  icon={<Heart size={28} />}
                  title="Authentic"
                  desc="No awkward posing. We capture the raw, messy, beautiful reality of your connection."
               />
               <PhilosophyCard 
                  icon={<Lightbulb size={28} />}
                  title="Timeless"
                  desc="True-to-life editing that defies trends. Your photos will look as classic in 50 years as they do today."
               />
            </div>
         </div>
      </section>

      {/* --- IMPORTED SECTIONS --- */}
      <Testimonials />
      <CTASection />

    </main>
  );
};

// --- SUB-COMPONENT: ANIMATED STAT ---
const AnimatedStat = ({ number, label }) => {
    return (
        <div className="group py-16 px-6 flex flex-col items-center justify-center bg-[#1a1a1a] hover:bg-[#222] transition-colors duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#A6906E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.span 
               initial={{ opacity: 0, scale: 0.5 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ type: "spring", stiffness: 100 }}
               className="text-5xl md:text-6xl font-serif text-white group-hover:text-[#A6906E] transition-colors duration-300"
            >
                {number}
            </motion.span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-4 group-hover:text-white transition-colors duration-300">
                {label}
            </span>
        </div>
    );
};

// --- SUB-COMPONENT: PHILOSOPHY CARD (Hover Effect) ---
const PhilosophyCard = ({ icon, title, desc }) => (
    <div className="p-10 border border-white/10 bg-[#1a1a1a] hover:bg-[#222] hover:border-[#A6906E]/50 transition-all duration-500 group rounded-sm relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#A6906E] blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
        
        <div className="inline-flex p-4 rounded-full bg-[#2A332A] text-[#A6906E] mb-6 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-2xl font-serif mb-4 text-white group-hover:text-[#A6906E] transition-colors">{title}</h3>
        <p className="text-gray-400 font-light text-sm leading-relaxed">{desc}</p>
    </div>
);

export default AboutPage;