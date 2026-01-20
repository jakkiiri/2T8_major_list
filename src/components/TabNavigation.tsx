"use client";

import { motion } from "framer-motion";
import { Users, BarChart3, Trophy, Grid3X3 } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "students", label: "Students", shortLabel: "List", icon: Users },
  { id: "analytics", label: "Analytics", shortLabel: "Stats", icon: BarChart3 },
  { id: "leaderboard", label: "Leaderboard", shortLabel: "Ranks", icon: Trophy },
  { id: "grid", label: "By Major", shortLabel: "Majors", icon: Grid3X3 },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex justify-center mb-5 sm:mb-8">
      <div className="glass-strong rounded-2xl p-1.5 sm:p-2 flex gap-1 sm:gap-2 w-full max-w-md sm:max-w-3xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex-1 px-2 sm:px-10 py-2.5 sm:py-3.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5 sm:gap-3 ${
                isActive ? "text-[#002A5C]" : "text-gray-400 hover:text-white active:text-white"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#FFD54F] to-[#FFE082] rounded-xl"
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
              <span className="relative z-10 text-xs sm:text-base font-medium">
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
