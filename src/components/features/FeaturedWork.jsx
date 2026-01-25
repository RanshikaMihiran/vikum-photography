import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 1. UPDATED IMAGE IMPORTS ---
// Make sure these files exist in your folder: src/assets/images/FeaturedWork/
import WeddingImg from '../../assets/images/FeaturedWork/FeaturedWork1.jpg';
import FashionImg from '../../assets/images/FeaturedWork/FeaturedWork2.jpg';
import PortraitImg from '../../assets/images/FeaturedWork/FeaturedWork3.jpg';

const FeaturedWork = () => {
  const containerRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  // Parallax hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // --- 2. UPDATED COLLECTIONS DATA ---
  const collections = [
    {
      id: 1,
      title: "Love Stories",
      subtitle: "Weddings & Engagements",
      image: WeddingImg, // Using the imported variable
      link: "/gallery/weddings",
      colSpan: "md:col-span-2", 
      height: "h-[400px] md:h-[500px]"
    },
    {
      id: 2,
      title: "Editorial",
      subtitle: "Fashion & Concepts",
      image: FashionImg, // Using the imported variable
      link: "/gallery/fashion",
      colSpan: "md:col-span-1", 
      height: "h-[400px] md:h-[500px]"
    },
    {
      id: 3,
      title: "Portraits",
      subtitle: "Personal & Branding",
      image: PortraitImg, // Using the imported variable
      link: "/gallery/portraits",
      colSpan: "md:col-span-3", 
      height: "h-[350px] md:h-[600px]"
    }
  ];

  // --- LIGHTBOX LOGIC ---
  const selectedItem = collections.find(c => c.id === selectedId);
  const selectedIndex = collections.findIndex(c => c.id === selectedId);

  const handleNext = (e) => {
    e.stopPropagation();
    const nextIndex = (selectedIndex + 1) % collections.length;
    setSelectedId(collections[nextIndex].id);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const prevIndex = (selectedIndex - 1 + collections.length) % collections.length;
    setSelectedId(collections[prevIndex].id);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedId) return;
      if (e.key === 'Escape') setSelectedId(null);
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  return (
    <section ref={containerRef} className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden">
      
      {/* BACKGROUND DECORATION */}
      <motion.div 
        style={{ y: yText }}
        className="absolute top-0 right-0 text-[10rem] md:text-[20rem] font-serif font-bold text-[#1a1a1a] leading-none whitespace-nowrap opacity-50 select-none pointer-events-none z-0"
      >
        PORTFOLIO
      </motion.div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-6">
          <div>
            <span className="text-[#A6906E] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Curated Collections
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              Visual Stories <br />
              <span className="text-[#333]">Captured in Time</span>
            </h2>
          </div>
          
          <Link 
            to="/gallery" 
            className="hidden md:flex items-center gap-2 text-white border-b border-[#A6906E] pb-1 hover:text-[#A6906E] transition-colors uppercase text-xs font-bold tracking-widest"
          >
            View Full Gallery <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((item) => (
            <div 
              key={item.id} 
              className={`relative group overflow-hidden rounded-sm cursor-pointer ${item.colSpan} ${item.height}`}
              onClick={() => setSelectedId(item.id)}
            >
              {/* Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60" />
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end items-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[#A6906E] text-xs font-bold tracking-[0.2em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.subtitle}
                </span>
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-3xl md:text-5xl font-serif text-white italic">
                    {item.title}
                  </h3>
                  
                  {/* Link Button */}
                  <Link 
                    to={item.link}
                    onClick={(e) => e.stopPropagation()}
                    className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-[#A6906E] hover:border-[#A6906E] transition-all duration-300 z-20"
                  >
                    <ArrowUpRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            
            {/* CLOSE */}
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-[110]"
              onClick={() => setSelectedId(null)}
            >
              <X size={40} />
            </button>

            {/* PREV */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all z-[110] group"
              onClick={handlePrev}
            >
              <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* NEXT */}
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all z-[110] group"
              onClick={handleNext}
            >
              <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* IMAGE */}
            <motion.div
              layoutId={selectedId}
              className="relative w-full max-w-6xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
              />
              
              <div className="absolute bottom-[-3rem] text-center w-full">
                <h3 className="text-2xl font-serif text-white">{selectedItem.title}</h3>
                <p className="text-[#A6906E] text-xs uppercase tracking-widest">{selectedItem.subtitle}</p>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default FeaturedWork;