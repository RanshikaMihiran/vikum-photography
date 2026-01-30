import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, align = 'center' }) => {
  return (
    <section className="bg-[#FDFBF7] pt-40 pb-20 px-6 w-full">
      <div className={`max-w-[1600px] mx-auto flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
        
        {/* Animated Line */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: 60 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-[1px] bg-[#A6906E] mb-8"
        />

        {/* Subtitle */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[#A6906E] font-bold tracking-[0.3em] text-xs uppercase mb-6"
        >
          {subtitle}
        </motion.span>

        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#1a1a1a] leading-[0.9]"
        >
          {title}
        </motion.h1>

      </div>
    </section>
  );
};

export default PageHeader;