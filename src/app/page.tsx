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
    <div className="relative min-h-full w-full">
      <ParticleBackground />
      
      <main className="relative w-full" style={{ zIndex: 1 }}>
        <Header />
        
        <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 pb-8">
          <div className="max-w-[1600px] mx-auto">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-full"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
