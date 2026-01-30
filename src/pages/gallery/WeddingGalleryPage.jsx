import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, X, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- COMPONENTS ---
import CTASection from '../../components/features/CTASection';

// --- PLACEHOLDER IMAGES (Replace with your local Wedding assets) ---
// Using high-res Unsplash images for the demo
const WEDDING_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000", alt: "The Kiss", span: "h-[400px]" },
  { id: 2, src: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1000", alt: "The Rings", span: "h-[600px]" },
  { id: 3, src: "https://images.unsplash.com/photo-1519225448512-447339e8ea64?q=80&w=1000", alt: "First Dance", span: "h-[500px]" },
  { id: 4, src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000", alt: "Portrait", span: "h-[650px]" },
  { id: 5, src: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=1000", alt: "Details", span: "h-[450px]" },
  { id: 6, src: "https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=1000", alt: "Walking Down Aisle", span: "h-[550px]" },
  { id: 7, src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000", alt: "Reception", span: "h-[400px]" },
  { id: 8, src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1000", alt: "Preparation", span: "h-[500px]" },
  { id: 9, src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000", alt: "Bouquet", span: "h-[600px]" },
];

const WeddingGalleryPage = () => {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // --- PARALLAX HERO ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <main className="w-full bg-[#FDFBF7] text-[#1a1a1a] min-h-screen selection:bg-[#A6906E] selection:text-white">

      {/* =========================================
          1. CINEMATIC HERO SECTION
      ========================================= */}
      <section ref={containerRef} className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        
        {/* Parallax Background */}
        <motion.div 
            style={{ y: yParallax, scale: 1.1 }} 
            className="absolute inset-0 w-full h-[120%]"
        >
           <img 
             src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600" 
             alt="Wedding Hero" 
             className="w-full h-full object-cover opacity-60" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-90" />
        </motion.div>
        
        {/* Text Content */}
        <div className="relative z-10 text-center px-6 text-white max-w-4xl pt-20">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
               <span className="text-[#A6906E] font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
                 The Gallery
               </span>
               <h1 className="text-6xl md:text-8xl font-serif leading-none mb-6">
                 Forever & <span className="italic text-[#A6906E]">Always.</span>
               </h1>
               <p className="text-gray-300 text-lg font-light max-w-xl mx-auto leading-relaxed">
                 A curated collection of love stories, captured in their most honest and beautiful form.
               </p>
           </motion.div>
        </div>
      </section>


      {/* =========================================
          2. MASONRY GALLERY GRID
      ========================================= */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Using Tailwind Columns for Masonry Effect */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            
            {WEDDING_IMAGES.map((img, index) => (
              <motion.div 
                key={img.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="break-inside-avoid relative group overflow-hidden rounded-sm cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                {/* Image */}
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/10 backdrop-blur-md border border-white/30 p-4 rounded-full text-white">
                         <ZoomIn size={24} />
                      </div>
                   </div>
                </div>

                {/* Caption (Bottom) */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-[#A6906E] text-xs font-bold uppercase tracking-widest mb-1">Wedding</p>
                    <h3 className="text-white font-serif text-xl">{img.alt}</h3>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>


      {/* =========================================
          3. IMAGE MODAL (Lightbox)
      ========================================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <X size={40} />
            </button>

            {/* Large Image */}
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
            
            {/* Modal Caption */}
            <div className="absolute bottom-6 left-0 w-full text-center">
              <h3 className="text-2xl font-serif text-white">{selectedImage.alt}</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* =========================================
          4. NEXT STEPS / CTA
      ========================================= */}
      <section className="bg-white py-24 px-6 border-t border-[#1a1a1a]/5">
         <div className="max-w-3xl mx-auto text-center">
            <Heart className="mx-auto text-[#A6906E] mb-6" size={32} />
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#1a1a1a]">Fallen in Love?</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
               See something that resonates with your vision? Let's discuss how we can create a similar magic for your special day.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
               <Link 
                  to="/contact" 
                  className="px-8 py-4 bg-[#1a1a1a] text-white uppercase text-xs font-bold tracking-widest hover:bg-[#A6906E] transition-colors duration-300 rounded-sm"
               >
                  Check Availability
               </Link>
               <Link 
                  to="/services" 
                  className="px-8 py-4 border border-[#1a1a1a] text-[#1a1a1a] uppercase text-xs font-bold tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300 rounded-sm"
               >
                  View Packages
               </Link>
            </div>
         </div>
      </section>

      {/* Global CTA */}
      <CTASection />

    </main>
  );
};

export default WeddingGalleryPage;