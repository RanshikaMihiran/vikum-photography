import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../../components/features/CTASection';
import { WEDDINGS } from '../../data/weddingData'; 
import HeroImg1 from '../../assets/images/ServicesMenu/wedding.jpg';

const WeddingPortfolioPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main className="w-full bg-[#FDFBF7] text-[#1a1a1a] min-h-screen selection:bg-[#A6906E] selection:text-white">
      <section ref={containerRef} className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y: yParallax, scale: 1.1 }} className="absolute inset-0 w-full h-[120%]">
           <img src={HeroImg1} alt="Wedding Hero" className="w-full h-full object-cover opacity-60" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-90" />
        </motion.div>
        
        <div className="absolute top-32 left-6 md:left-12 z-30 flex items-center gap-4 mix-blend-difference text-white">
            <span className="h-[2px] w-12 bg-[#A6906E]"></span>
            <span className="font-bold tracking-[0.3em] text-xs uppercase drop-shadow-md">The Collections</span>
        </div>
        
        <div className="relative z-10 text-center px-6 text-white pt-20">
           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
               <h1 className="text-5xl md:text-8xl font-serif leading-none mb-6">
                   Real <span className="italic text-[#A6906E]">Love Stories</span>
               </h1>
               <p className="text-gray-300 text-lg font-light max-w-xl mx-auto">
                   Intimate. Grand. Timeless. Explore our featured weddings.
               </p>
           </motion.div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 text-white/50 z-30">
            <ArrowDown size={20} />
        </motion.div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-24 md:gap-40">
           {WEDDINGS.map((wedding, index) => (
             <WeddingCard key={wedding.id} wedding={wedding} index={index} />
           ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
};

const WeddingCard = ({ wedding, index }) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-20 items-center group`}
    >
      <div className="w-full lg:w-[60%] overflow-hidden rounded-sm relative shadow-2xl">
         <Link to={`/gallery/weddings/${wedding.id}`} className="block overflow-hidden relative aspect-[4/3] lg:aspect-[3/2]">
             <img src={wedding.coverImage} alt={wedding.couple} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0" />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-sm text-[#1a1a1a] uppercase text-xs font-bold tracking-widest flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                   View Album <ArrowRight size={14} />
                </div>
             </div>
         </Link>
      </div>
      <div className="w-full lg:w-[40%] text-center lg:text-left">
         <div className="flex flex-col items-center lg:items-start gap-6">
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-[#A6906E] text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 border border-[#A6906E]/20 px-4 py-2 rounded-full bg-[#A6906E]/5">
               <span className="flex items-center gap-2"><Calendar size={12} /> {wedding.date}</span>
               <span className="w-1 h-1 bg-current rounded-full" />
               <span className="flex items-center gap-2"><MapPin size={12} /> {wedding.location}</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1a1a1a] leading-[0.9]">
               <Link to={`/gallery/weddings/${wedding.id}`} className="hover:text-[#A6906E] transition-colors block">
                  {wedding.couple}
               </Link>
            </h2>
            <p className="text-gray-500 font-light leading-relaxed max-w-md mx-auto lg:mx-0 text-lg">
               {wedding.description}
            </p>
            <Link to={`/gallery/weddings/${wedding.id}`} className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1a1a1a] mt-4">
               <span className="border-b border-[#1a1a1a] group-hover:border-[#A6906E] group-hover:text-[#A6906E] transition-all pb-1">See Full Gallery</span>
            </Link>
         </div>
      </div>
    </motion.div>
  );
};

export default WeddingPortfolioPage;