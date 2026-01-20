"use client";

import { motion } from "framer-motion";
import { Student, MAJORS } from "@/types";
import { Users, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

interface MajorGridProps {
  students: Student[];
}

export default function MajorGrid({ students }: MajorGridProps) {
  const [expandedMajor, setExpandedMajor] = useState<string | null>(null);

  const majorGroups = useMemo(() => {
    const groups: Record<string, Student[]> = {};
    MAJORS.forEach((m) => (groups[m.name] = []));
    students.forEach((s) => {
      if (groups[s.major]) {
        groups[s.major].push(s);
      }
    });
    // Sort students in each group alphabetically
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => a.name.localeCompare(b.name));
    });
    return groups;
  }, [students]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4 sm:mb-8"
      >
        <h2 className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
          Explore by Major
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Tap to see students
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
      >
        {MAJORS.map((major) => {
          const studentsInMajor = majorGroups[major.name] || [];
          const isExpanded = expandedMajor === major.name;

          return (
            <motion.div
              key={major.name}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className="relative"
            >
              <motion.div
                onClick={() =>
                  setExpandedMajor(isExpanded ? null : major.name)
                }
                className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer transition-all active:scale-[0.98] relative overflow-hidden"
                style={{ borderLeft: `4px solid ${major.color}` }}
              >
                {/* Background Glow */}
                <div
                  className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 rounded-full blur-3xl opacity-10"
                  style={{ backgroundColor: major.color }}
                />

                {/* Header */}
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-4xl shadow-lg"
                      style={{ backgroundColor: `${major.color}20` }}
                    >
                      {major.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-xl font-bold text-white">
                        {major.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400">{major.shortName}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="p-1.5 sm:p-2 rounded-full bg-white/10"
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  </motion.div>
                </div>

                {/* Description - hidden on mobile when collapsed */}
                <p className="text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4 mb-3 sm:mb-4 relative z-10 hidden sm:block">
                  {major.description}
                </p>

                {/* Student Count */}
                <div
                  className="flex items-center gap-2 text-sm sm:text-lg font-semibold relative z-10 mt-2 sm:mt-0"
                  style={{ color: major.color }}
                >
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{studentsInMajor.length} students</span>
                </div>

                {/* Expanded Student List */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10 space-y-1.5 sm:space-y-2">
                    {studentsInMajor.length > 0 ? (
                      studentsInMajor.map((student, idx) => (
                        <motion.div
                          key={student.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <div
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold"
                            style={{
                              backgroundColor: `${major.color}30`,
                              color: major.color,
                            }}
                          >
                            {student.name.charAt(0)}
                          </div>
                          <span className="text-white text-sm sm:text-base">{student.name}</span>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-3 sm:py-4 text-sm">
                        No students yet
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
