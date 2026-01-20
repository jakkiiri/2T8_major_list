"use client";

import { motion } from "framer-motion";
import { Student, MAJORS } from "@/types";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { TrendingUp, Users, Award, Percent } from "lucide-react";
import { useMemo } from "react";

interface AnalyticsProps {
  students: Student[];
}

export default function Analytics({ students }: AnalyticsProps) {
  const stats = useMemo(() => {
    const majorCounts: Record<string, number> = {};
    MAJORS.forEach((m) => (majorCounts[m.name] = 0));
    students.forEach((s) => {
      majorCounts[s.major] = (majorCounts[s.major] || 0) + 1;
    });

    const data = MAJORS.map((major) => ({
      name: major.shortName,
      fullName: major.name,
      count: majorCounts[major.name] || 0,
      color: major.color,
      icon: major.icon,
      percentage: ((majorCounts[major.name] || 0) / students.length) * 100,
    })).sort((a, b) => b.count - a.count);

    const mostPopular = data[0];
    const leastPopular = data[data.length - 1];

    return { data, mostPopular, leastPopular, total: students.length };
  }, [students]);

  const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
    delay,
  }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ElementType;
    color: string;
    delay: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 relative overflow-hidden group"
    >
      <div
        className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
        style={{ backgroundColor: color }}
      />
      <div className="relative z-10">
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color }} />
        </div>
        <p className="text-gray-400 text-xs sm:text-sm mb-1">{title}</p>
        <p className="text-xl sm:text-3xl font-bold text-white mb-1 truncate">{value}</p>
        <p className="text-xs sm:text-sm truncate" style={{ color }}>
          {subtitle}
        </p>
      </div>
    </motion.div>
  );

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { fullName: string; icon: string; percentage: number; color: string } }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-strong rounded-lg sm:rounded-xl p-3 sm:p-4">
          <p className="text-white font-semibold flex items-center gap-2 text-sm sm:text-base">
            <span>{data.icon}</span>
            {data.fullName}
          </p>
          <p className="text-[#FFD54F] text-sm">{payload[0].value} students</p>
          <p className="text-gray-400 text-xs sm:text-sm">{data.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 sm:space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Total Students"
          value={stats.total}
          subtitle="EngSci 2T8"
          icon={Users}
          color="#FFD54F"
          delay={0}
        />
        <StatCard
          title="Most Popular"
          value={stats.mostPopular?.name || "N/A"}
          subtitle={`${stats.mostPopular?.count || 0} students`}
          icon={Award}
          color={stats.mostPopular?.color || "#FFD54F"}
          delay={0.1}
        />
        <StatCard
          title="Avg/Major"
          value={(stats.total / MAJORS.length).toFixed(1)}
          subtitle="students"
          icon={TrendingUp}
          color="#4CAF50"
          delay={0.2}
        />
        <StatCard
          title="Top Share"
          value={`${stats.mostPopular?.percentage.toFixed(0)}%`}
          subtitle="of cohort"
          icon={Percent}
          color="#2196F3"
          delay={0.3}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD54F]" />
            Distribution
          </h3>
          <div className="h-48 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="count"
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {stats.data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4">
            {stats.data.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-300"
              >
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD54F]" />
            Per Major
          </h3>
          <div className="h-48 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.data} layout="vertical">
                <XAxis type="number" stroke="#666" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#666"
                  width={40}
                  fontSize={10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  radius={[0, 8, 8, 0]}
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {stats.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Detailed Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6"
      >
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FFD54F]" />
          Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {stats.data.map((major, index) => (
            <motion.div
              key={major.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all hover:bg-white/5"
              style={{ borderLeft: `3px solid ${major.color}` }}
            >
              <div className="text-2xl sm:text-3xl">{major.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm sm:text-base truncate">{major.fullName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${major.percentage}%` }}
                      transition={{ delay: 0.5 + 0.1 * index, duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: major.color }}
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400 min-w-[50px] sm:min-w-[60px] text-right">
                    {major.count} ({major.percentage.toFixed(0)}%)
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
