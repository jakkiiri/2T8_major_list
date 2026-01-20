"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ENGSCI_QUOTES } from "@/types";
import { Sparkles, GraduationCap, PlusCircle, ArrowRight } from "lucide-react";

export default function Header() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % ENGSCI_QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative overflow-hidden">
      {/* Background Elements - hidden on mobile */}
      <div className="absolute inset-0 grid-bg opacity-50 hidden sm:block" />
      
      {/* Floating decorative elements - hidden on mobile for performance */}
      <div className="hidden lg:block">
        <motion.div
          className="absolute top-10 right-20 text-6xl opacity-20"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ⚙️
        </motion.div>
        <motion.div
          className="absolute top-20 left-32 text-4xl opacity-20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          🔬
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-40 text-5xl opacity-20"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          💡
        </motion.div>
      </div>

      <div className="relative z-10 py-6 sm:py-10 px-4 sm:px-8">
        {/* Main Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Logo Area */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <motion.div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FFD54F] to-[#FF9800] flex items-center justify-center shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{ boxShadow: ["0 0 20px rgba(255,213,79,0.3)", "0 0 40px rgba(255,213,79,0.6)", "0 0 20px rgba(255,213,79,0.3)"] }}
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
            >
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-[#002A5C]" />
            </motion.div>
            
            <div className="text-left">
              <h1 className="font-[family-name:var(--font-orbitron)] text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-white via-[#FFD54F] to-white bg-clip-text text-transparent gradient-animate">
                  EngSci 2T8
                </span>
              </h1>
              <p className="text-[#FFD54F] font-medium text-sm sm:text-lg tracking-widest uppercase">
                Major Tracker
              </p>
            </div>
          </div>

          {/* University Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass mb-5 sm:mb-6"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD54F]" />
            <span className="text-xs sm:text-sm text-gray-300">
              <span className="hidden sm:inline">University of Toronto • Faculty of Applied Science & Engineering</span>
              <span className="sm:hidden">UofT Engineering</span>
            </span>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD54F]" />
          </motion.div>

          {/* BIG Call to Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <motion.a
              href="https://forms.gle/My1Kv9cdrK7DST3m6"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#FFD54F] via-[#FFC107] to-[#FFD54F] text-[#002A5C] font-bold text-lg sm:text-2xl shadow-2xl hover:shadow-[0_0_40px_rgba(255,213,79,0.5)] transition-all border-2 border-[#FFE082]"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              animate={{ 
                boxShadow: [
                  "0 10px 40px rgba(255,213,79,0.3)",
                  "0 10px 60px rgba(255,213,79,0.5)",
                  "0 10px 40px rgba(255,213,79,0.3)"
                ]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <PlusCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              <span>ADD YOUR MAJOR</span>
              <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <p className="text-gray-400 text-sm sm:text-base mt-3 font-medium">
              🎓 2T8s only • One submission per person
            </p>
          </motion.div>

          {/* Rotating Quote - Fixed height to prevent layout shift */}
          <div className="w-full max-w-3xl mx-auto h-[80px] sm:h-[70px] relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center text-sm sm:text-xl md:text-2xl text-gray-300 italic font-light leading-relaxed px-4"
              >
                &ldquo;{ENGSCI_QUOTES[quoteIndex]}&rdquo;
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
