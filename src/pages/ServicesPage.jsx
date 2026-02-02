import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Camera, CheckCircle, Mail, Sparkles, Star, Plus, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- COMPONENTS ---
import CTASection from '../components/features/CTASection';

// --- IMAGE IMPORTS ---
import WeddingImg from '../assets/images/ServicesMenu/wedding.jpg';
import EngagementImg from '../assets/images/ServicesMenu/Engagement.jpg';
import BirthdayImg from '../assets/images/ServicesMenu/Birthdays.jpg';
import BabyImg from '../assets/images/ServicesMenu/BabyShoots.jpg';
import MaternityImg from '../assets/images/ServicesMenu/Pregnancy.jpg';

// Hero Slider Images (Using top 3 services for the hero)
const HERO_SLIDES = [WeddingImg, EngagementImg, MaternityImg];

const SERVICES = [
  {
    id: "01",
    title: "Weddings",
    subtitle: "The Big Day",
    desc: "We document your love story with a cinematic, documentary approach. From the nervous anticipation of getting ready to the wild joy of the dance floor, we capture the full spectrum of emotions.",
    features: ["Full Day Coverage", "Drone Cinematography", "Private Online Gallery", "Fine Art Prints"],
    image: WeddingImg,
    link: "/contact"
  },
  {
    id: "02",
    title: "Engagement",
    subtitle: "The Beginning",
    desc: "Before the vows, there is the spark. Engagement sessions are the perfect way to get comfortable in front of the camera. We choose a location that means something to you and create magic.",
    features: ["2 Hour Session", "Multiple Locations", "Outfit Changes", "Save-the-Date Files"],
    image: EngagementImg,
    link: "/contact"
  },
  {
    id: "03",
    title: "Birthdays",
    subtitle: "Milestone Events",
    desc: "Whether it's a luxurious 21st, a sophisticated 50th, or a child's first cake smash, we capture the joy. Our event photography is candid and unobtrusive, catching the laughter and details.",
    features: ["Event Coverage", "Candid Portraits", "Detail Shots", "Fast Turnaround"],
    image: BirthdayImg,
    link: "/contact"
  },
  {
    id: "04",
    title: "Baby Shoots",
    subtitle: "Newborn & Family",
    desc: "Those tiny fingers and sleepy yawns change so fast. We specialize in lifestyle newborn photography, typically done in the comfort of your home. No stiff posing—just gentle, natural moments.",
    features: ["In-Home Session", "Prop Selection", "Family Portraits", "Soft Natural Editing"],
    image: BabyImg,
    link: "/contact"
  },
  {
    id: "05",
    title: "Pregnancy",
    subtitle: "Maternity",
    desc: "Celebrating the miracle of life. We create artistic, empowering portraits that highlight the beauty of motherhood. Whether in a studio setting or outdoors at golden hour, you will look radiant.",
    features: ["Gown Guide", "Partner Inclusion", "Golden Hour", "High-End Retouching"],
    image: MaternityImg,
    link: "/contact"
  }
];

const ServicesPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  // --- HERO SLIDESHOW LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="w-full bg-[#FDFBF7] text-[#1a1a1a] overflow-x-hidden selection:bg-[#A6906E] selection:text-white">


      {/* =========================================
          1. CINEMATIC HERO SLIDER (Matching About Page)
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
               src={HERO_SLIDES[currentSlide]} 
               alt={`Slide ${currentSlide}`} 
               className="w-full h-full object-cover opacity-70"
             />
             {/* Gradient Overlays for Visibility */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          </motion.div>
        </AnimatePresence>

        {/* PAGE NAME LABEL (Fixed Visibility) */}
        <div className="absolute top-32 left-6 md:left-12 z-30 flex items-center gap-4 mix-blend-difference text-white">
            <span className="h-[2px] w-12 bg-[#A6906E]"></span>
            <span className="font-bold tracking-[0.3em] text-xs uppercase drop-shadow-md">
                Service Catalog
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
                   Visual <span className="text-transparent stroke-text">Narratives</span>
                </motion.h1>
             </div>
             
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex flex-col md:flex-row gap-8 items-start md:items-center"
             >
                <p className="text-gray-300 text-lg font-light max-w-lg leading-relaxed border-l-2 border-[#A6906E] pl-6">
                   From the "I Do" to the "Happy Birthday".
                   <br/>We bottle your most precious memories.
                </p>
                
                {/* Slide Indicators */}
                <div className="flex gap-3">
                   {HERO_SLIDES.map((_, index) => (
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
          2. SERVICE LIST (Cinematic Slow Zoom)
      ========================================= */}
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-32 md:gap-48">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>


      {/* =========================================
          3. THE PROCESS
      ========================================= */}
      <section className="bg-[#111] text-white py-32 px-6 relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-[#A6906E]/5 to-transparent pointer-events-none" />

         <div className="max-w-[1400px] mx-auto text-center mb-20 relative z-10">
            <span className="text-[#A6906E] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">The Experience</span>
            <h2 className="text-4xl md:text-6xl font-serif">How It Works</h2>
         </div>

         <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-8 relative z-10">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-10 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#A6906E]/30 to-transparent z-0"></div>

            <ProcessStep 
              number="01" 
              icon={<Mail />} 
              title="Inquiry" 
              desc="Send us a note. We'll check our calendar and send you a custom brochure." 
            />
            <ProcessStep 
              number="02" 
              icon={<Calendar />} 
              title="Planning" 
              desc="We discuss your vision, timeline, and location to ensure perfection." 
            />
            <ProcessStep 
              number="03" 
              icon={<Camera />} 
              title="The Shoot" 
              desc="Relax. We guide you gently, capturing the magic as it unfolds." 
            />
            <ProcessStep 
              number="04" 
              icon={<Sparkles />} 
              title="Delivery" 
              desc="Your edited, high-res gallery arrives in 4-6 weeks ready to print." 
            />
         </div>
      </section>


      {/* =========================================
          4. INVESTMENT
      ========================================= */}
      <section className="py-24 px-6 border-t border-[#A6906E]/20">
         <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8 flex justify-center text-[#A6906E]">
                <Star className="fill-current" size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#1a1a1a]">Investment</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
               We offer bespoke collections tailored to your specific needs.
               <br/>
               <span className="text-[#1a1a1a] font-medium block mt-4">Wedding Collections start at LKR 150,000</span>
               <span className="text-[#1a1a1a] font-medium block">Portrait Sessions start at LKR 25,000</span>
            </p>
            <Link 
               to="/contact" 
               className="inline-flex items-center gap-3 px-10 py-4 bg-[#1a1a1a] text-white uppercase text-xs font-bold tracking-widest hover:bg-[#A6906E] transition-colors duration-300 rounded-sm shadow-xl"
            >
               Get Full Price Guide
            </Link>
         </div>
      </section>

      {/* --- CTA --- */}
      <CTASection />

    </main>
  );
};

// --- SUB-COMPONENT: SERVICE CARD ---
const ServiceCard = ({ service, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
       
       {/* IMAGE SIDE (Cinematic Slow Zoom) */}
       <div className="w-full lg:w-1/2 group relative h-[500px] md:h-[650px] overflow-hidden rounded-sm cursor-pointer shadow-2xl">
          
          {/* 1. Image: Slow Cinematic Zoom */}
          <motion.img 
            initial={{ scale: 1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          />
          
          {/* 2. Elegant Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col items-center justify-center">
             
             {/* 3. Floating Glass Button */}
             <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                 <div className="backdrop-blur-md bg-white/10 border border-white/30 px-8 py-4 rounded-full text-white uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                    Explore Gallery <ArrowRight size={14} />
                 </div>
             </div>
          </div>
       </div>

       {/* TEXT SIDE */}
       <div className="w-full lg:w-1/2 flex flex-col justify-center">
          
          <motion.div 
             initial={{ opacity: 0, x: isEven ? -30 : 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
             <span className="text-[#A6906E]/20 font-serif text-8xl md:text-9xl font-bold select-none block -mb-6 md:-mb-10">
                {service.id}
             </span>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
          >
             <h3 className="text-4xl md:text-6xl font-serif text-[#1a1a1a] mb-3 group-hover:text-[#A6906E] transition-colors">
                {service.title}
             </h3>
             <span className="text-xs font-bold uppercase tracking-widest text-[#A6906E] mb-8 block pl-1">
                {service.subtitle}
             </span>
             
             <p className="text-gray-500 font-light leading-loose text-lg mb-10 border-l-2 border-gray-200 pl-6">
                {service.desc}
             </p>

             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#1a1a1a] font-medium group/item hover:text-[#A6906E] transition-colors">
                     <CheckCircle size={16} className="text-[#A6906E] shrink-0" />
                     {feature}
                  </li>
                ))}
             </ul>

             <Link 
               to={service.link} 
               className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-[#A6906E] transition-colors relative"
             >
                <span className="border-b border-[#1a1a1a] group-hover:border-[#A6906E] pb-1 transition-all">Start Project</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
             </Link>
          </motion.div>
       </div>
    </div>
  );
};

// --- SUB-COMPONENT: PROCESS STEP ---
const ProcessStep = ({ number, icon, title, desc }) => (
   <div className="relative z-10 bg-[#1a1a1a] p-8 flex flex-col items-center text-center group border border-white/5 hover:border-[#A6906E] transition-colors duration-500 rounded-sm">
      <div className="w-20 h-20 rounded-full bg-[#222] flex items-center justify-center text-[#A6906E] mb-6 group-hover:scale-110 group-hover:bg-[#A6906E] group-hover:text-white transition-all duration-500 shadow-xl">
         {icon}
      </div>
      <span className="text-[#A6906E] font-bold text-xs mb-2 block tracking-widest">{number}</span>
      <h4 className="text-2xl font-serif mb-4 text-white">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
   </div>
);

export default ServicesPage;