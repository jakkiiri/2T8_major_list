"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Reduce particles on mobile for performance
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    
    const particleCount = mobile ? 10 : 30;
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Orbs - simplified on mobile */}
      <motion.div
        className="absolute w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, #FFD54F 0%, transparent 70%)",
          top: "10%",
          right: "10%",
        }}
        animate={isMobile ? {} : {
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {!isMobile && (
        <>
          <motion.div
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-10"
            style={{
              background: "radial-gradient(circle, #2196F3 0%, transparent 70%)",
              bottom: "20%",
              left: "5%",
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{
              background: "radial-gradient(circle, #E91E63 0%, transparent 70%)",
              top: "60%",
              right: "30%",
            }}
            animate={{
              x: [0, 40, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#FFD54F]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid Pattern - hidden on mobile */}
      <div className="absolute inset-0 grid-bg opacity-30 hidden sm:block" />
    </div>
  );
}
