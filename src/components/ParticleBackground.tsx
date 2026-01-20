"use client";

import { motion } from "framer-motion";

export default function ParticleBackground() {
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Gradient Orbs - only on desktop */}
      <div className="hidden sm:block">
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{
            background: "radial-gradient(circle, #FFD54F 0%, transparent 70%)",
            top: "5%",
            right: "5%",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{
            background: "radial-gradient(circle, #2196F3 0%, transparent 70%)",
            bottom: "20%",
            left: "5%",
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Simple static gradient for mobile - no animations */}
      <div 
        className="sm:hidden absolute w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{
          background: "radial-gradient(circle, #FFD54F 0%, transparent 70%)",
          top: "10%",
          right: "0%",
        }}
      />
    </div>
  );
}
