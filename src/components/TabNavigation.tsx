"use client";

import { motion } from "framer-motion";
import { Users, BarChart3, Trophy, Grid3X3 } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "students", label: "Students", icon: Users },
  { id: "analytics", label: "Stats", icon: BarChart3 },
  { id: "leaderboard", label: "Ranks", icon: Trophy },
  { id: "grid", label: "Majors", icon: Grid3X3 },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex justify-center mb-6 sm:mb-8 px-2">
      <div className="glass-strong rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex gap-1 sm:gap-2 w-full max-w-md sm:max-w-none sm:w-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex-1 sm:flex-none px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5 sm:gap-2 ${
                isActive ? "text-[#002A5C]" : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#FFD54F] to-[#FFE082] rounded-lg sm:rounded-xl"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <Icon className="w-4 h-4 sm:w-4 sm:h-4 relative z-10" />
              <span className="relative z-10 text-xs sm:text-sm">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
