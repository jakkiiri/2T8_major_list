"use client";

import { motion } from "framer-motion";
import { Student, MAJORS } from "@/types";
import { User, Search, Filter } from "lucide-react";
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
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl glass-strong text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#FFD54F] transition-all text-sm sm:text-base"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <select
            value={filterMajor}
            onChange={(e) => setFilterMajor(e.target.value)}
            className="w-full sm:w-auto pl-10 sm:pl-12 pr-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl glass-strong text-white outline-none focus:ring-2 focus:ring-[#FFD54F] transition-all appearance-none cursor-pointer text-sm sm:text-base"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <option value="all" className="bg-[#002A5C]">All Majors</option>
            {MAJORS.map((major) => (
              <option key={major.name} value={major.name} className="bg-[#002A5C]">
                {major.icon} {major.shortName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Count */}
      <div className="text-gray-400 text-xs sm:text-sm">
        Showing {sortedStudents.length} of {students.length} students
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
              whileHover={{ scale: 1.01 }}
              className="glass-strong rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                {/* Rank Number */}
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#FFD54F]/20 to-[#FFD54F]/5 flex items-center justify-center text-[#FFD54F] font-bold text-xs sm:text-sm shrink-0">
                  {index + 1}
                </div>

                {/* Avatar */}
                <div
                  className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg shrink-0"
                  style={{ backgroundColor: `${majorInfo?.color}20` }}
                >
                  <User
                    className="w-4 h-4 sm:w-6 sm:h-6"
                    style={{ color: majorInfo?.color }}
                  />
                </div>

                {/* Name */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-lg font-semibold text-white truncate">
                    {student.name}
                  </h3>
                  <p className="text-xs text-gray-400 truncate hidden sm:block">{majorInfo?.description}</p>
                </div>
              </div>

              {/* Major Badge */}
              <div
                className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg font-medium text-xs sm:text-sm flex items-center gap-1 sm:gap-2 shrink-0 ml-2"
                style={{
                  backgroundColor: `${majorInfo?.color}20`,
                  color: majorInfo?.color,
                  border: `1px solid ${majorInfo?.color}40`,
                }}
              >
                <span className="text-base sm:text-lg">{majorInfo?.icon}</span>
                <span className="hidden xs:inline sm:inline">{majorInfo?.shortName}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {sortedStudents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 sm:py-12 text-gray-400"
        >
          <User className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg sm:text-xl">No students found</p>
          <p className="text-xs sm:text-sm">Try adjusting your search or filter</p>
        </motion.div>
      )}
    </div>
  );
}
