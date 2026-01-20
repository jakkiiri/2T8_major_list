"use client";

import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-8 sm:mt-16 py-6 sm:py-8 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 sm:gap-4"
        >
          {/* Made with love */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span>by Jacky Li</span>
          </div>

          {/* Link */}
          <a
            href="https://engsci.utoronto.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-[#FFD54F] transition-colors text-xs sm:text-sm"
          >
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>EngSci Website</span>
          </a>

          {/* Credits */}
          <p className="text-center text-gray-600 text-xs">
            UofT • Engineering Science
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
