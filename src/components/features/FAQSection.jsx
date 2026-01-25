import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    id: 1,
    question: "How far in advance should we book?",
    answer: "For weddings, we recommend booking 6-12 months in advance, especially if your date falls during peak season (August - December). For portrait and lifestyle sessions, 1-2 months is usually sufficient."
  },
  {
    id: 2,
    question: "Do you travel for destination weddings?",
    answer: "Absolutely! We love capturing love stories around the world. We have special packages for destination weddings that include travel and accommodation arrangements. Let's discuss your dream location!"
  },
  {
    id: 3,
    question: "How many images will we receive?",
    answer: "For a full-day wedding (8 hours), you can expect between 600-800 fully edited, high-resolution images. For engagement or portrait sessions, we typically deliver 50-80 images."
  },
  {
    id: 4,
    question: "What is your editing style?",
    answer: "Our style is cinematic, timeless, and true-to-life with a touch of warmth. We focus on natural skin tones and preserving the authentic atmosphere of the day, rather than using heavy, trendy filters that might date quickly."
  },
  {
    id: 5,
    question: "Do you provide raw files?",
    answer: "We do not provide RAW files. The editing process is a crucial part of our artistic identity. Rest assured, we carefully select and edit the best images to tell your full story beautifully."
  },
  {
    id: 6,
    question: "How do we secure our date?",
    answer: "To secure your date, we require a signed contract and a 30% retainer fee. The remaining balance is due 2 weeks prior to the wedding day."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative bg-[#222923] py-24 md:py-32 overflow-hidden text-white">
      
      {/* --- BACKGROUND DECOR --- */}
      {/* Subtle radial gradient for depth */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#2a332a] to-[#222923] opacity-50 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
             <span className="h-[1px] w-12 bg-[#A6906E] opacity-50"></span>
             <span className="text-[#A6906E] font-bold tracking-[0.25em] text-xs uppercase">
               Information
             </span>
             <span className="h-[1px] w-12 bg-[#A6906E] opacity-50"></span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Transparency is key to our process. Here are answers to the most common questions we receive from our couples.
          </p>
        </div>

        {/* --- FAQ LIST --- */}
        <div className="flex flex-col">
          {FAQS.map((faq, index) => (
            <div 
              key={faq.id}
              onClick={() => toggleFAQ(index)}
              className="group border-b border-white/10 cursor-pointer"
            >
              
              {/* QUESTION ROW */}
              <div className="py-8 md:py-10 flex items-start md:items-center justify-between gap-6">
                
                <div className="flex items-start md:items-center gap-6 md:gap-10">
                   {/* Number Index */}
                   <span className={`text-xl md:text-2xl font-serif transition-colors duration-300 ${activeIndex === index ? 'text-[#A6906E]' : 'text-white/20'}`}>
                     0{index + 1}
                   </span>
                   
                   {/* Question Text with Slide Effect */}
                   <h3 className={`text-xl md:text-2xl font-serif transition-all duration-300 transform group-hover:translate-x-2 ${activeIndex === index ? 'text-[#A6906E]' : 'text-gray-200'}`}>
                     {faq.question}
                   </h3>
                </div>

                {/* Animated Chevron */}
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`shrink-0 ${activeIndex === index ? 'text-[#A6906E]' : 'text-gray-500'}`}
                >
                  <ChevronDown size={24} />
                </motion.div>
              </div>

              {/* ANSWER (Expandable) */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-12 md:pl-20 pr-4 pb-10">
                      <p className="text-gray-400 leading-loose text-base md:text-lg font-light max-w-2xl">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}
        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="mt-20 flex flex-col items-center">
            <p className="text-gray-500 text-sm mb-6">Can't find what you're looking for?</p>
            
            <Link 
              to="/contact" 
              className="group flex items-center gap-3 text-white px-8 py-4 border border-white/10 hover:border-[#A6906E] hover:bg-[#A6906E] transition-all duration-300 rounded-sm"
            >
              <MessageCircle size={18} />
              <span className="uppercase text-xs font-bold tracking-widest">Contact Support</span>
            </Link>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;