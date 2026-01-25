import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import FeaturedWeddings1 from '../../assets/images/AestheticSection/AestheticSection1.jpg';
import FeaturedWeddings2 from '../../assets/images/AestheticSection/AestheticSection2.jpg';


// --- PLACEHOLDER IMAGES ---
const IMG_MAIN = FeaturedWeddings1; 
const IMG_DETAIL = FeaturedWeddings2; 

const AestheticSection = () => {
  const containerRef = useRef(null);

  // --- PARALLAX & SCROLL SETUP ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Vertical Parallax for detail image
  const yDetail = useTransform(scrollYProgress, [0, 1], [150, -150]);
  
  // --- ANIMATIONS ---
  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  const curtainVars = {
    hidden: { height: "100%" },
    show: { 
      height: "0%", 
      transition: { duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.3 } 
    }
  };

  const textItemVars = {
    hidden: { y: 40, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    // 1. UPDATED COLOR BACKGROUND (#222923)
    <section ref={containerRef} className="relative bg-[#222923] py-24 md:py-40 overflow-hidden text-white">
      
      {/* BACKGROUND TEXTURE */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}>
      </div>

      {/* --- 2. VISIBLE MOVING BACKGROUND TEXT --- */}
      {/* Used stroke-text CSS for high visibility + elegance */}
      <div className="absolute top-[20%] left-0 w-full overflow-hidden opacity-10 pointer-events-none select-none z-0">
        <motion.div
          className="flex whitespace-nowrap font-serif font-bold text-transparent text-[8rem] md:text-[14rem] leading-none"
          style={{ WebkitTextStroke: "2px #A6906E" }} // Gold Outline
          variants={marqueeVariants}
          animate="animate"
        >
          <span className="mx-8">CINEMATIC ARTISTRY</span>
          <span className="mx-8">CINEMATIC ARTISTRY</span>
          <span className="mx-8">CINEMATIC ARTISTRY</span>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center">
          
          {/* --- LEFT SIDE: TEXT CONTENT --- */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-5 flex flex-col justify-center order-2 md:order-1"
          >
            {/* Animated Label */}
            <div className="flex items-center gap-4 mb-8 overflow-hidden">
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: "3rem" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-[1px] bg-[#A6906E]"
              />
              <motion.span variants={textItemVars} className="text-[#A6906E] font-bold tracking-[0.25em] text-xs uppercase">
                The Philosophy
              </motion.span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-8">
              <motion.div variants={textItemVars}>Defined by</motion.div>
              <div className="flex items-baseline gap-4">
                <motion.span variants={textItemVars} className="italic font-light text-gray-400">Light</motion.span> 
                <motion.span variants={textItemVars}>&</motion.span>
              </div>
              <motion.div 
                variants={textItemVars}
                className="ml-12 md:ml-20 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A6906E]"
              >
                Shadow
              </motion.div>
            </h2>

            {/* Description */}
            <motion.p 
              variants={textItemVars}
              className="text-gray-300 font-light leading-loose text-sm md:text-base mb-10 border-l border-[#A6906E]/30 pl-6"
            >
              Photography is not merely about capturing a subject; it is about preserving a feeling. 
              My work focuses on the subtle interplay of <span className="text-[#A6906E] font-normal">natural light</span>, 
              raw emotion, and cinematic composition to tell stories that words simply cannot.
            </motion.p>

            {/* Interactive Magnetic Button */}
            <motion.div variants={textItemVars} className="pt-4">
               <button className="group flex items-center gap-4 text-white uppercase text-xs font-bold tracking-widest">
                  <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#A6906E] group-hover:border-[#A6906E] transition-all duration-300">
                    <ArrowRight size={16} />
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">Read Our Story</span>
               </button>
            </motion.div>
          </motion.div>

          {/* --- RIGHT SIDE: VISUALS --- */}
          <div className="md:col-span-7 relative order-1 md:order-2 h-[500px] md:h-[700px]">
            
            {/* IMAGE 1: MAIN BACKGROUND (Curtain Reveal) */}
            <div className="absolute top-0 right-0 w-[90%] h-[85%] overflow-hidden">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative w-full h-full"
              >
                {/* The Image */}
                <motion.img 
                  src={IMG_MAIN} 
                  alt="Cinematic Portrait" 
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="w-full h-full object-cover opacity-80 mix-blend-lighten" 
                />
                
                {/* The "Curtain" Overlay - Now uses the Dark Background color to reveal */}
                <motion.div 
                  variants={curtainVars}
                  className="absolute inset-0 bg-[#0a0a0a] z-20 origin-bottom"
                />
                
                {/* Gold Border Frame */}
                <div className="absolute inset-6 border border-[#A6906E]/30 pointer-events-none z-30"></div>
              </motion.div>
            </div>

            {/* IMAGE 2: FLOATING DETAIL (Parallax + Float) */}
            <motion.div 
              style={{ y: yDetail }} // Connected to Scroll
              className="absolute bottom-0 left-0 md:left-8 w-[50%] h-[45%] z-20"
            >
               {/* Continuous Breathing Animation */}
               <motion.div
                 animate={{ y: [0, -20, 0] }} 
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                 className="w-full h-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
               >
                  <div className="w-full h-full overflow-hidden border-2 border-[#A6906E]/50 relative group">
                    <img 
                      src={IMG_DETAIL} 
                      alt="Texture Detail" 
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                    />
                    {/* Gold Overlay tint */}
                    <div className="absolute inset-0 bg-[#A6906E]/10 mix-blend-overlay pointer-events-none"></div>
                  </div>
               </motion.div>
            </motion.div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-[#A6906E] opacity-20 rounded-full blur-sm"></div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AestheticSection;