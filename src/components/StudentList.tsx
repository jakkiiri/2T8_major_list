"use client";

import { motion } from "framer-motion";
import { Student, MAJORS } from "@/types";
import { Search, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";

interface StudentListProps {
  students: Student[];
}

export default function StudentList({ students }: StudentListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMajor, setFilterMajor] = useState<string>("all");

  // Sort students alphabetically by first name
  const sortedStudents = useMemo(() => {
    return [...students]
      .filter((student) => {
        const matchesSearch = student.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesMajor =
          filterMajor === "all" || student.major === filterMajor;
        return matchesSearch && matchesMajor;
      })
      .sort((a, b) => {
        const firstNameA = a.name.split(" ")[0].toLowerCase();
        const firstNameB = b.name.split(" ")[0].toLowerCase();
        return firstNameA.localeCompare(firstNameB);
      });
  }, [students, searchQuery, filterMajor]);

  const getMajorInfo = (majorName: string) => {
    return MAJORS.find((m) => m.name === majorName);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex gap-2 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl glass-strong text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#FFD54F]/50 transition-all text-sm sm:text-base"
          />
        </div>
        <div className="relative">
          <select
            value={filterMajor}
            onChange={(e) => setFilterMajor(e.target.value)}
            className="h-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 rounded-xl glass-strong text-white outline-none focus:ring-2 focus:ring-[#FFD54F]/50 transition-all appearance-none cursor-pointer text-sm sm:text-base"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <option value="all" className="bg-[#002A5C]">All Majors</option>
            {MAJORS.map((major) => (
              <option key={major.name} value={major.name} className="bg-[#002A5C]">
                {major.shortName}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Student Count */}
      <div className="text-gray-400 text-xs sm:text-sm">
        {sortedStudents.length} of {students.length} students
      </div>

      {/* Student List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2 sm:space-y-3"
      >
        {sortedStudents.map((student, index) => {
          const majorInfo = getMajorInfo(student.major);
          return (
            <motion.div
              key={student.id}
              variants={itemVariants}
              className="glass-strong rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
            >
              {/* Rank Number */}
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#FFD54F]/10 flex items-center justify-center text-[#FFD54F] font-bold text-xs sm:text-sm shrink-0">
                {index + 1}
              </div>

              {/* Avatar with initial */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl font-bold shrink-0"
                style={{ 
                  backgroundColor: `${majorInfo?.color}25`,
                  color: majorInfo?.color 
                }}
              >
                {student.name.charAt(0)}
              </div>

              {/* Name and Major */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-lg font-semibold text-white truncate">
                  {student.name}
                </h3>
                {/* Show major under name on mobile only */}
                <p className="text-xs sm:hidden truncate" style={{ color: majorInfo?.color }}>
                  {majorInfo?.icon} {student.major}
                </p>
              </div>

              {/* Major Badge - visible on larger screens */}
              <div
                className="hidden sm:flex px-4 py-2 rounded-lg font-medium text-sm items-center gap-2 shrink-0"
                style={{
                  backgroundColor: `${majorInfo?.color}20`,
                  color: majorInfo?.color,
                  border: `1px solid ${majorInfo?.color}30`,
                }}
              >
                <span className="text-lg">{majorInfo?.icon}</span>
                <span>{majorInfo?.name}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {sortedStudents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-400"
        >
          <p className="text-lg mb-1">No students found</p>
          <p className="text-sm">Try a different search or filter</p>
        </motion.div>
      )}
    </div>
  );
}
