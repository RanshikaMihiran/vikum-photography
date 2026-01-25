import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import FeaturedWeddings1 from '../../assets/images/FeaturedWeddings/FeaturedWeddings1.jpg';
import FeaturedWeddings2 from '../../assets/images/FeaturedWeddings/FeaturedWeddings2.jpg';
import FeaturedWeddings3 from '../../assets/images/FeaturedWeddings/FeaturedWeddings3.jpg';

import FeaturedWeddings4 from '../../assets/images/FeaturedWeddings/FeaturedWeddings4.jpg';
import FeaturedWeddings5 from '../../assets/images/FeaturedWeddings/FeaturedWeddings5.jpg';
import FeaturedWeddings6 from '../../assets/images/FeaturedWeddings/FeaturedWeddings6.jpg';

// --- PLACEHOLDER IMAGES ---
const IMG_WEDDING_1 = FeaturedWeddings1;
const IMG_WEDDING_2 = FeaturedWeddings2;
const IMG_WEDDING_3 = FeaturedWeddings3;
// New Images
const IMG_WEDDING_4 = FeaturedWeddings4;
const IMG_WEDDING_5 = FeaturedWeddings5;
const IMG_WEDDING_6 = FeaturedWeddings6;

const FeaturedWeddings = () => {
  const [selectedId, setSelectedId] = useState(null);
  const containerRef = useRef(null);

  const weddings = [
    {
      id: 1,
      couple: "RIDMI & VINOD",
      category: "Wedding Shoot",
      image: IMG_WEDDING_1,
    },
    {
      id: 2,
      couple: "IRENI & MILAN",
      category: "Wedding Shoot",
      image: IMG_WEDDING_2,
    },
    {
      id: 3,
      couple: "MADUKA & DINELKA",
      category: "Wedding Shoot",
      image: IMG_WEDDING_3,
    },
    {
      id: 4,
      couple: "AMAYA & KASUN",
      category: "Destination Wedding",
      image: IMG_WEDDING_4,
    },
    {
      id: 5,
      couple: "SHENALI & RYAN",
      category: "Traditional",
      image: IMG_WEDDING_5,
    },
    {
      id: 6,
      couple: "NIPUNI & LAHIRU",
      category: "Engagement",
      image: IMG_WEDDING_6,
    },
  ];

  const selectedWedding = weddings.find(w => w.id === selectedId);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- ANIMATIONS ---
  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 60, // Very slow, elegant scroll
          ease: "linear",
        },
      },
    },
  };

  return (
    <section ref={containerRef} className="relative bg-[#FDFBF7] py-24 md:py-32 overflow-hidden">
      
      {/* --- 1. ANIMATED BACKGROUND TEXT (Marquee) --- */}
      <div className="absolute top-20 left-0 w-full overflow-hidden opacity-[0.04] pointer-events-none z-0 select-none">
        <motion.div
          className="flex whitespace-nowrap font-serif font-bold text-[#1a1a1a] text-[8rem] md:text-[16rem] leading-none"
          variants={marqueeVariants}
          animate="animate"
        >
          <span className="mx-10">LOVE STORIES</span>
          <span className="mx-10">LOVE STORIES</span>
          <span className="mx-10">LOVE STORIES</span>
          <span className="mx-10">LOVE STORIES</span>
        </motion.div>
      </div>
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-6">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8 border-b border-[#1a1a1a]/10 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-[#A6906E]"></span>
              <span className="text-[#A6906E] font-bold tracking-[0.2em] text-xs uppercase">
                Featured Works
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-[#1a1a1a] mb-6 leading-[1.1]">
              Captured <span className="italic font-light text-[#555]">Moments</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a1a1a] to-[#444]">
                In Timeless Frames
              </span>
            </h2>
          </div>
          
          <Link 
            to="/gallery/weddings" 
            className="group flex items-center gap-3 bg-[#2A332A] text-white px-8 py-4 uppercase text-[11px] font-bold tracking-[0.2em] hover:bg-[#1a211a] transition-all duration-300 shadow-xl rounded-sm"
          >
            All Wedding Stories
            <ArrowUpRight size={16} className="text-[#A6906E] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* --- IMAGE GRID (Updated for 6 images) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weddings.map((item) => (
            <motion.div 
              key={item.id}
              layoutId={`container-${item.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative group cursor-pointer h-[500px] md:h-[600px] overflow-hidden rounded-sm shadow-md hover:shadow-2xl transition-all duration-500"
              onClick={() => setSelectedId(item.id)}
            >
              {/* IMAGE WRAPPER */}
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                <motion.img 
                  layoutId={`image-${item.id}`}
                  src={item.image} 
                  alt={item.couple} 
                  className="w-full h-full object-cover transition-all duration-[1500ms] ease-out group-hover:scale-110 opacity-95 group-hover:opacity-100 grayscale-[10%] group-hover:grayscale-0" 
                />
              </div>
              
              {/* MODERN GRADIENT HOVER EFFECT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out mix-blend-multiply" />

              {/* FLOATING CONTENT CARD */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col items-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                
                {/* Decorative Line */}
                <div className="w-12 h-[1px] bg-[#A6906E] mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>

                {/* Category */}
                <span className="text-[#A6906E] text-[11px] font-bold tracking-[0.2em] uppercase mb-2 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-sm group-hover:bg-transparent group-hover:p-0 transition-all">
                  {item.category}
                </span>
                
                {/* Couple Name */}
                <h3 className="text-3xl font-serif text-white uppercase leading-none drop-shadow-lg mb-6 group-hover:text-white/90 transition-colors">
                  {item.couple}
                </h3>

                {/* View Button */}
                <div className="flex items-center gap-3 text-white/80 text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 delay-150">
                   View Gallery <ArrowUpRight size={14} className="text-[#A6906E]" />
                </div>
              
              </div>

              {/* TOP RIGHT ICON */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-[#A6906E] group-hover:border-[#A6906E] transition-all duration-500 z-30">
                <ArrowUpRight size={20} />
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedId && selectedWedding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a]/98 flex items-center justify-center p-4 md:p-8 backdrop-blur-xl"
            onClick={() => setSelectedId(null)}
          >
            
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-3 z-[110] bg-white/10 rounded-full hover:bg-[#A6906E] hover:rotate-90 duration-300"
              onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
            >
              <X size={32} />
            </button>

            <motion.div
              layoutId={`container-${selectedWedding.id}`}
              className="relative w-full max-w-7xl h-full flex items-center justify-center pointer-events-none"
            >
              <motion.img 
                layoutId={`image-${selectedWedding.id}`}
                src={selectedWedding.image} 
                alt={selectedWedding.couple} 
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              />
              
              <div className="absolute bottom-4 md:bottom-8 text-center w-full pointer-events-auto">
                <h3 className="text-2xl md:text-4xl font-serif text-white uppercase mb-2 tracking-wide">{selectedWedding.couple}</h3>
                <span className="text-[#A6906E] text-xs uppercase tracking-[0.2em] bg-white/5 px-6 py-2 rounded-full border border-white/10">
                  {selectedWedding.category}
                </span>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default FeaturedWeddings;