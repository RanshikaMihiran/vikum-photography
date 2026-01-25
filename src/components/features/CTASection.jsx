import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- BACKGROUND IMAGE (Light/Airy Shot) ---
const BG_IMAGE = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600"; 

const CTASection = () => {
  const containerRef = useRef(null);
  
  // --- 1. SCROLL PARALLAX ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // --- 2. MARQUEE ANIMATION ---
  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: { repeat: Infinity, repeatType: "loop", duration: 60, ease: "linear" },
      },
    },
  };

  return (
    // LIGHT BACKGROUND: #FDFBF7
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden flex items-center justify-center min-h-[700px] bg-[#FDFBF7]">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <img src={BG_IMAGE} alt="Background" className="w-full h-full object-cover grayscale-[20%]" />
            {/* LIGHT OVERLAY: Fades the image so dark text pops */}
            <div className="absolute inset-0 bg-[#FDFBF7]/90" />
            <div className="absolute inset-0 bg-white/30 mix-blend-soft-light" />
        </motion.div>
      </div>

      {/* --- FLOATING PARTICLES (Gold Dust) --- */}
      <FloatingParticles />

      {/* --- BACKGROUND MARQUEE TEXT --- */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-hidden opacity-[0.04] pointer-events-none select-none z-10">
        <motion.div
          className="flex whitespace-nowrap font-serif font-bold text-[#1a1a1a] text-[10rem] md:text-[18rem] leading-none"
          variants={marqueeVariants}
          animate="animate"
        >
          <span className="mx-8">LET'S CREATE MAGIC</span>
          <span className="mx-8">LET'S CREATE MAGIC</span>
        </motion.div>
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div 
          style={{ y: yText }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
            
            {/* Label */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-8"
            >
                <span className="h-[1px] w-12 bg-[#A6906E]" />
                <span className="text-[#A6906E] font-bold tracking-[0.25em] text-xs uppercase flex items-center gap-3">
                   <Sparkles size={12} /> Start Your Journey
                </span>
                <span className="h-[1px] w-12 bg-[#A6906E]" />
            </motion.div>

            {/* Headline with Staggered Reveal - DARK TEXT */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1a1a1a] mb-8 leading-[1.1]">
                <RevealText text="Let’s Create" delay={0.1} />
                <RevealText text="Magic Together" delay={0.3} highlight={true} />
            </h2>

            {/* Description - DARK GRAY TEXT */}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-gray-500 text-base md:text-xl font-light leading-relaxed max-w-2xl mb-14"
            >
                Your story deserves to be told beautifully. Dates fill up quickly—reach out today to check availability and let's start planning your dream session.
            </motion.p>

            {/* --- BUTTONS --- */}
            <div className="flex flex-col md:flex-row gap-6 items-center w-full md:w-auto">
                <MagneticButton to="/contact" text="Book A Consultation" primary={true} />
                <MagneticButton to="/faq" text="Read FAQ" primary={false} />
            </div>

        </motion.div>
      </div>

      {/* Decorative Border Frame (Dark Thin Line) */}
      <div className="absolute inset-6 md:inset-12 border border-[#1a1a1a]/5 pointer-events-none z-10" />

    </section>
  );
};

// --- SUB-COMPONENT: REVEAL TEXT ---
const RevealText = ({ text, delay, highlight }) => (
  <div className="overflow-hidden inline-block align-bottom mx-2">
    <motion.span
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
      className={`block ${highlight ? 'text-[#A6906E] italic' : ''}`}
    >
      {text}
    </motion.span>
  </div>
);

// --- SUB-COMPONENT: MAGNETIC BUTTON ---
const MagneticButton = ({ to, text, primary }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const xPos = clientX - (left + width / 2);
    const yPos = clientY - (top + height / 2);
    x.set(xPos * 0.3);
    y.set(yPos * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: xSpring, y: ySpring }}>
      <Link 
        ref={ref}
        to={to}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative overflow-hidden flex items-center justify-center gap-3 px-10 py-5 uppercase text-xs font-bold tracking-widest rounded-sm transition-all duration-500 shadow-xl
          ${primary 
            ? 'bg-[#222923] text-white hover:shadow-[0_0_30px_rgba(34,41,35,0.3)]' 
            : 'border border-[#1a1a1a]/20 text-[#1a1a1a] hover:border-[#1a1a1a]'
          }`}
      >
        {/* Hover Fill Effect */}
        <div className={`absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out ${primary ? 'bg-[#A6906E]' : 'bg-[#1a1a1a]'}`} />
        
        {/* Text Color Change on Hover */}
        <span className={`relative z-10 flex items-center gap-2 transition-colors duration-500 ${!primary ? 'group-hover:text-white' : 'group-hover:text-white'}`}>
          {text} {primary ? <Calendar size={16} /> : <ArrowRight size={16} />}
        </span>
      </Link>
    </motion.div>
  );
};

// --- SUB-COMPONENT: FLOATING PARTICLES ---
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#A6906E]/60 blur-[1px]" // Gold Particles
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default CTASection;