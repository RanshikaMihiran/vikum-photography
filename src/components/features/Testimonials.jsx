import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';

// --- MOCK DATA ---
const TESTIMONIALS = [
  {
    id: 1,
    name: "GAYANI & FERNANDO",
    location: "Colombo",
    image: "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=400",
    text: "Vikum is absolutely incredible! From the smallest details to the most emotional moments, the photos are beyond breathtaking. He made us feel so comfortable.",
    rating: 5
  },
  {
    id: 2,
    name: "SACHITHA & HIRUNI",
    location: "Kandy",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400",
    text: "We cannot thank you enough. Every shot reflects the love, joy, and magic of the day so perfectly. The results are beyond our expectations!",
    rating: 5
  },
  {
    id: 3,
    name: "SULANI & DANANJAYA",
    location: "Galle",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400",
    text: "You didn't just take photos—you captured emotions. We are truly in love with the effort you put into every single shot. Highly recommended!",
    rating: 5
  },
  {
    id: 4,
    name: "AMAYA & KASUN",
    location: "Nuwara Eliya",
    image: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=400",
    text: "The best decision we made for our wedding! Professional, punctual, and so much fun. The album quality is world-class.",
    rating: 5
  },
  {
    id: 5,
    name: "SHENALI & RYAN",
    location: "Negombo",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400",
    text: "An artist in every sense. The lighting, the composition, the mood—everything was perfect. Thank you for giving us memories for a lifetime.",
    rating: 5
  }
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const carouselRef = useRef();
  
  // Motion Value for the slider X position
  const x = useMotionValue(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Track hover state

  useEffect(() => {
    if(carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const visibleWidth = carouselRef.current.offsetWidth;
        setMaxScroll(-(scrollWidth - visibleWidth));
    }
  }, []);

  // --- AUTO SCROLL LOGIC ---
  useEffect(() => {
    const autoSlide = setInterval(() => {
      // Only slide if not paused and maxScroll is calculated
      if (!isPaused && maxScroll !== 0) {
        const currentX = x.get();
        // If we are near the end (within 50px), loop back to start. Otherwise slide left.
        if (currentX <= maxScroll + 50) {
            animate(x, 0, { type: "spring", stiffness: 200, damping: 30 }); // Smooth return to start
        } else {
            slide('next'); // Standard slide
        }
      }
    }, 1000); // 4 Seconds Interval

    return () => clearInterval(autoSlide);
  }, [isPaused, maxScroll]);

  // --- SLIDER CONTROLS ---
  const slide = (direction) => {
    const currentX = x.get();
    const slideAmount = 420; // Distance to slide
    let newX;

    if (direction === 'next') {
        newX = currentX - slideAmount;
        // Check if we overshoot the end
        if (newX < maxScroll) newX = maxScroll; 
    } else {
        newX = currentX + slideAmount;
        // Check if we overshoot the start
        if (newX > 0) newX = 0;
    }

    animate(x, newX, {
        type: "spring",
        stiffness: 250, // Softer spring
        damping: 35
    });
  };

  // --- ANIMATION VARIANTS ---
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const cardVars = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section ref={containerRef} className="relative bg-[#FDFBF7] py-24 md:py-32 overflow-hidden">
      
      {/* --- ATMOSPHERE: ROTATING RING --- */}
      <div className="absolute top-[-10%] right-[-5%] opacity-[0.03] pointer-events-none select-none z-0">
         <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="w-[600px] h-[600px] border-[2px] border-[#A6906E] rounded-full border-dashed"
         />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 mb-16 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-[#A6906E]"></span>
              <span className="text-[#A6906E] font-bold tracking-[0.2em] text-xs uppercase">
                Client Reviews
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-[#1a1a1a] leading-[1.1]">
              Kind Words <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a1a1a] to-[#666]">
                From Our Couples
              </span>
            </h2>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-4">
            <button 
                onClick={() => slide('prev')}
                className="w-14 h-14 rounded-full border border-[#1a1a1a]/10 flex items-center justify-center text-[#1a1a1a] hover:bg-[#2A332A] hover:text-white hover:border-[#2A332A] transition-all duration-300 active:scale-95"
            >
                <ArrowLeft size={20} />
            </button>
            <button 
                onClick={() => slide('next')}
                className="w-14 h-14 rounded-full border border-[#1a1a1a]/10 flex items-center justify-center text-[#1a1a1a] hover:bg-[#2A332A] hover:text-white hover:border-[#2A332A] transition-all duration-300 active:scale-95"
            >
                <ArrowRight size={20} />
            </button>
          </div>
        </div>

      </div>

      {/* --- SLIDER TRACK --- */}
      {/* Added onMouseEnter/Leave here to pause auto-scroll */}
      <div 
        className="pl-6 md:pl-[max(2rem,calc((100vw-1600px)/2+2rem))] overflow-hidden relative z-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div 
          ref={carouselRef} 
          className="flex gap-6 md:gap-10 pb-12 cursor-grab active:cursor-grabbing"
          style={{ x }} 
          drag="x"
          dragConstraints={{ right: 0, left: maxScroll }}
          whileTap={{ scale: 0.99 }} 
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.id} item={item} variants={cardVars} />
          ))}
        </motion.div>
      </div>

      {/* --- MOBILE SWIPE HINT --- */}
      <div className="flex justify-center md:hidden mt-4 text-[#A6906E]/60 text-xs font-bold tracking-widest uppercase animate-pulse">
         Swipe to Explore
      </div>

    </section>
  );
};

// --- CARD COMPONENT ---
const TestimonialCard = ({ item, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="relative min-w-[320px] md:min-w-[480px] group select-none"
    >
      <div className="bg-white p-8 md:p-12 h-full flex flex-col justify-between shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-[#A6906E]/10 rounded-sm relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
        
        {/* SHINE EFFECT */}
        <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-12 group-hover:animate-shine pointer-events-none z-0" />

        {/* TOP DECOR */}
        <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#A6906E" stroke="none" />
                ))}
            </div>
            <Quote size={32} className="text-[#A6906E]/20" />
        </div>

        {/* TEXT */}
        <p className="text-[#444] font-serif text-lg md:text-xl leading-relaxed italic mb-10 relative z-10">
          "{item.text}"
        </p>

        {/* CLIENT INFO */}
        <div className="flex items-center gap-5 mt-auto border-t border-[#1a1a1a]/5 pt-6 relative z-10">
            <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0">
                {/* Ring Animation */}
                <div className="absolute inset-0 rounded-full border border-[#A6906E] opacity-30 group-hover:scale-110 group-hover:rotate-180 transition-all duration-700 border-dashed"></div>
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover rounded-full p-1" 
                />
            </div>

            <div>
                <h4 className="text-[#1a1a1a] font-bold text-sm tracking-wider uppercase mb-1">
                    {item.name}
                </h4>
                <span className="text-[#A6906E] text-xs font-bold tracking-widest block">
                    {item.location}
                </span>
            </div>
        </div>

        {/* BOTTOM LINE */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#A6906E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10"></div>
      </div>
    </motion.div>
  );
};

export default Testimonials;