import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, X, ZoomIn } from 'lucide-react';
import CTASection from '../../components/features/CTASection';
import { WEDDINGS } from '../../data/weddingData'; 

const WeddingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wedding, setWedding] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const foundWedding = WEDDINGS.find((w) => w.id === id);
    if (foundWedding) {
        setWedding(foundWedding);
        window.scrollTo(0, 0); 
    } else {
        navigate('/gallery/weddings'); 
    }
  }, [id, navigate]);

  if (!wedding) return <div className="h-screen bg-[#FDFBF7] flex items-center justify-center">Loading...</div>;

  return (
    <main className="w-full bg-[#FDFBF7] text-[#1a1a1a] min-h-screen selection:bg-[#A6906E] selection:text-white">
      <section className="relative h-[85vh] w-full overflow-hidden">
         <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} src={wedding.coverImage} alt={wedding.couple} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
         
         <div className="absolute top-28 left-6 md:left-12 z-30">
            <Link to="/gallery/weddings" className="group flex items-center gap-3 text-white/80 hover:text-white uppercase text-xs font-bold tracking-widest transition-all">
               <div className="p-3 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all"><ArrowLeft size={16} /></div>
               Back to Collection
            </Link>
         </div>

         <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-30 text-white">
            <div className="max-w-5xl">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center gap-6 text-[#A6906E] text-xs font-bold uppercase tracking-widest mb-6">
                   <span className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full"><Calendar size={14} /> {wedding.date}</span>
                   <span className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full"><MapPin size={14} /> {wedding.location}</span>
               </motion.div>
               <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-6xl md:text-8xl lg:text-9xl font-serif leading-none mb-6">
                  {wedding.couple}
               </motion.h1>
               <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-lg md:text-xl font-light text-gray-200 max-w-2xl leading-relaxed border-l-2 border-[#A6906E] pl-6">
                  {wedding.description}
               </motion.p>
            </div>
         </div>
      </section>

      <section className="py-24 px-4 md:px-8">
         <div className="max-w-[1600px] mx-auto">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
               {wedding.gallery.map((imgSrc, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.05 }} className="break-inside-avoid relative group overflow-hidden rounded-sm cursor-pointer shadow-sm hover:shadow-2xl transition-all" onClick={() => setSelectedImage(imgSrc)}>
                     <img src={imgSrc} alt={`${wedding.couple} moment ${index + 1}`} className="w-full h-auto object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                     <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"><ZoomIn size={24} /></div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-50"><X size={40} /></button>
            <motion.img initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} src={selectedImage} className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
      <CTASection />
    </main>
  );
};
export default WeddingDetailsPage;