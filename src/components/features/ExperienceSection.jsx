import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 1. IMPORT YOUR LOCAL IMAGES ---
// Note: To see the 3D layering effect best, use two DIFFERENT images.
// Currently using the same image as requested, but I recommend adding a second one (e.g. ExperienceSection2.jpg)
import ExpImg1 from '../../assets/images/ExperienceSection/ExperienceSection1.jpg';
import ExpImg2 from '../../assets/images/ExperienceSection/ExperienceSection2.jpg';
// import ExpImg2 from '../../assets/images/ExperienceSection/ExperienceSection2.jpg'; // Uncomment if you have a second image

const IMG_BASE = ExpImg1; 
const IMG_OVERLAY = ExpImg2; // Replace with ExpImg2 for better contrast

const ExperienceSection = () => {
  const sectionRef = useRef(null);

  // --- PARALLAX SCROLL SETUP ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Base image moves slightly (Back layer)
  const yBase = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  // Overlay image moves faster (Front layer) -> Creates 3D depth
  const yOverlay = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  // --- MARQUEE ANIMATION ---
  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 35,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#FDFBF7] overflow-hidden py-20 md:py-32">
      
      {/* --- RICH TEXTURE OVERLAY (Adds that 'expensive' paper feel) --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}>
      </div>

      {/* --- 2. MOVING TEXT (Integrated Inside) --- */}
      <div className="absolute top-[5%] left-0 w-full overflow-hidden opacity-10 select-none pointer-events-none z-0">
        <motion.div
          className="flex whitespace-nowrap font-serif text-[#2A332A] font-bold tracking-tight uppercase text-[4rem] md:text-[8rem] leading-none"
          variants={marqueeVariants}
          animate="animate"
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mx-4">
               VIKUM JAYASEKARA PHOTOGRAPHY
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16 items-center px-6 relative z-10">
        
        {/* --- 3. LEFT SIDE: PARALLAX IMAGES --- */}
        <div className="relative h-[450px] sm:h-[500px] md:h-[700px] w-full">
          
          {/* Layer A: Background Image */}
          <div className="absolute inset-0 w-[90%] h-full overflow-hidden rounded-sm border border-[#EBE7DE]">
            <motion.div style={{ y: yBase }} className="w-full h-[120%] -top-[10%] relative">
               <img 
                src={IMG_BASE} 
                alt="Photography Aesthetic" 
                className="w-full h-full object-cover opacity-95 grayscale-[20%]" 
              />
            </motion.div>
          </div>

          {/* Layer B: Foreground Image (Smaller, Faster) */}
          <motion.div 
            style={{ y: yOverlay }}
            className="absolute right-0 bottom-8 md:bottom-24 w-[55%] h-[55%] border-[6px] border-[#FDFBF7] shadow-[0_20px_40px_-10px_rgba(42,51,42,0.2)] z-20"
          >
            <img 
              src={IMG_OVERLAY} 
              alt="Emotional Moment" 
              className="w-full h-full object-cover" 
            />
            {/* Fine Gold Line Border inside */}
            <div className="absolute inset-2 border border-white/30 pointer-events-none"></div>
          </motion.div>
          
          {/* Decorative Gold Box Element */}
          <div className="absolute right-[-15px] bottom-[25px] md:bottom-[80px] w-[55%] h-[55%] border border-[#A6906E] z-0 opacity-60"></div>
        </div>


        {/* --- 4. RIGHT SIDE: CONTENT --- */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center md:pl-10"
        >
            {/* Small Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-[#A6906E]"></span>
              <span className="text-[#A6906E] font-bold tracking-[0.2em] text-xs uppercase">
                Est. 2024
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1a1a1a] mb-8 leading-[1.05]">
              Experience <br /> 
              <span className="italic font-light text-[#555]">The Art Of</span> <br />
              <span className="text-[#A6906E]">
                Photography
              </span>
            </h2>

            {/* Description */}
            <p className="text-[#555] text-sm md:text-[17px] leading-loose mb-10 font-normal max-w-lg">
              Our photography process is designed to be seamless, luxurious, and enjoyable. 
              We don't just take pictures; we craft timeless heirlooms. Let us turn your 
              vision into reality with our expert guidance and artistic touch.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/about" 
                className="group flex items-center justify-center gap-3 bg-[#2A332A] text-white px-10 py-4 uppercase text-[11px] font-bold tracking-[0.2em] hover:bg-[#1a211a] transition-all duration-300 shadow-xl"
              >
                Read More 
                <ChevronRight size={14} className="text-[#A6906E] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                to="/services" 
                className="group flex items-center justify-center gap-3 border border-[#A6906E] text-[#2A332A] px-10 py-4 uppercase text-[11px] font-bold tracking-[0.2em] hover:bg-[#A6906E] hover:text-white transition-all duration-300"
              >
                Services 
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;