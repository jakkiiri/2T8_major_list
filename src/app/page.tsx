"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import StudentList from "@/components/StudentList";
import Analytics from "@/components/Analytics";
import Leaderboard from "@/components/Leaderboard";
import MajorGrid from "@/components/MajorGrid";
import ParticleBackground from "@/components/ParticleBackground";
import Footer from "@/components/Footer";
import studentsData from "@/data/students.json";
import { Student } from "@/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState("students");
  const students: Student[] = studentsData.students as Student[];

  const renderContent = () => {
    switch (activeTab) {
      case "students":
        return <StudentList students={students} />;
      case "analytics":
        return <Analytics students={students} />;
      case "leaderboard":
        return <Leaderboard students={students} />;
      case "grid":
        return <MajorGrid students={students} />;
      default:
        return <StudentList students={students} />;
    }
  };

  return (
    <main className="min-h-screen relative">
      <ParticleBackground />
      
      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <Footer />
      </div>
    </main>
  );
}
