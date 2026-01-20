"use client";

import { motion } from "framer-motion";
import { Student, MAJORS } from "@/types";
import { Trophy, Medal, Crown } from "lucide-react";
import { useMemo } from "react";

interface LeaderboardProps {
  students: Student[];
}

export default function Leaderboard({ students }: LeaderboardProps) {
  const rankings = useMemo(() => {
    const majorCounts: Record<string, number> = {};
    MAJORS.forEach((m) => (majorCounts[m.name] = 0));
    students.forEach((s) => {
      majorCounts[s.major] = (majorCounts[s.major] || 0) + 1;
    });

    return MAJORS.map((major) => ({
      ...major,
      count: majorCounts[major.name] || 0,
      percentage: ((majorCounts[major.name] || 0) / students.length) * 100,
    })).sort((a, b) => b.count - a.count);
  }, [students]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 sm:w-7 sm:h-7 text-gray-300" />;
      case 3:
        return <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />;
      default:
        return (
          <span className="text-lg sm:text-2xl font-bold text-gray-500">#{rank}</span>
        );
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border-yellow-500/40";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-gray-500/10 border-gray-400/40";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-amber-700/10 border-amber-600/40";
      default:
        return "glass border-white/10";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Trophy Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4 sm:mb-8"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          <Trophy className="w-10 h-10 sm:w-16 sm:h-16 text-[#FFD54F] mx-auto mb-2 sm:mb-4" />
        </motion.div>
        <h2 className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
          Major Leaderboard
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Ranked by popularity
        </p>
      </motion.div>

      {/* Top 3 Podium - Simplified for mobile */}
      <div className="flex justify-center items-end gap-2 sm:gap-4 mb-4 sm:mb-8">
        {/* Second Place */}
        {rankings[1] && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div
              className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-4xl mb-2 sm:mb-3 shadow-xl"
              style={{ backgroundColor: `${rankings[1].color}30` }}
            >
              {rankings[1].icon}
            </div>
            <div
              className="w-16 sm:w-28 h-14 sm:h-24 rounded-t-lg sm:rounded-t-xl flex flex-col items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${rankings[1].color}40 0%, ${rankings[1].color}20 100%)`,
              }}
            >
              <Medal className="w-4 h-4 sm:w-6 sm:h-6 text-gray-300 mb-0.5 sm:mb-1" />
              <p className="text-white font-bold text-sm sm:text-lg">{rankings[1].count}</p>
              <p className="text-xs text-gray-300">{rankings[1].shortName}</p>
            </div>
          </motion.div>
        )}

        {/* First Place */}
        {rankings[0] && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-5xl mb-2 sm:mb-3 shadow-2xl relative"
              style={{ backgroundColor: `${rankings[0].color}40` }}
            >
              <div className="absolute -top-4 sm:-top-6">
                <Crown className="w-6 h-6 sm:w-10 sm:h-10 text-yellow-400" />
              </div>
              {rankings[0].icon}
            </motion.div>
            <div
              className="w-20 sm:w-32 h-20 sm:h-32 rounded-t-lg sm:rounded-t-xl flex flex-col items-center justify-center relative overflow-hidden"
              style={{
                background: `linear-gradient(180deg, ${rankings[0].color}50 0%, ${rankings[0].color}20 100%)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 to-transparent" />
              <p className="text-white font-bold text-lg sm:text-2xl relative z-10">{rankings[0].count}</p>
              <p className="text-xs sm:text-sm text-gray-200 relative z-10">{rankings[0].shortName}</p>
              <p className="text-xs text-gray-300 relative z-10">{rankings[0].percentage.toFixed(0)}%</p>
            </div>
          </motion.div>
        )}

        {/* Third Place */}
        {rankings[2] && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div
              className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg sm:rounded-2xl flex items-center justify-center text-xl sm:text-3xl mb-2 sm:mb-3 shadow-lg"
              style={{ backgroundColor: `${rankings[2].color}30` }}
            >
              {rankings[2].icon}
            </div>
            <div
              className="w-14 sm:w-24 h-10 sm:h-16 rounded-t-lg sm:rounded-t-xl flex flex-col items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${rankings[2].color}40 0%, ${rankings[2].color}20 100%)`,
              }}
            >
              <Medal className="w-3 h-3 sm:w-5 sm:h-5 text-amber-600 mb-0.5 sm:mb-1" />
              <p className="text-white font-bold text-xs sm:text-base">{rankings[2].count}</p>
              <p className="text-xs text-gray-300">{rankings[2].shortName}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Full Rankings List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-2 sm:space-y-3"
      >
        {rankings.map((major, index) => {
          const rank = index + 1;

          return (
            <motion.div
              key={major.name}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.01 }}
              className={`rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-4 border transition-all ${getRankStyle(
                rank
              )}`}
            >
              {/* Rank */}
              <div className="w-8 sm:w-12 flex justify-center shrink-0">{getRankIcon(rank)}</div>

              {/* Major Icon */}
              <div
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-3xl shrink-0"
                style={{ backgroundColor: `${major.color}20` }}
              >
                {major.icon}
              </div>

              {/* Major Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-lg font-semibold text-white truncate">
                  {major.name}
                </h3>
                <p className="text-xs text-gray-400 truncate hidden sm:block">{major.description}</p>
              </div>

              {/* Stats */}
              <div className="text-right shrink-0">
                <p className="text-lg sm:text-2xl font-bold" style={{ color: major.color }}>
                  {major.count}
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  {major.percentage.toFixed(0)}%
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
