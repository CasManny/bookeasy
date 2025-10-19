"use client";

import React from "react";
import { motion } from "motion/react";


export default function Loaders({ size = 64 }) {
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-2">
        <motion.svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            stroke="rgba(15,23,42,0.06)"
            fill="none"
          />

          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            stroke="#3B82F6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference * 0.95, rotate: 0 }}
            animate={{
              strokeDashoffset: [
                circumference * 0.95,
                circumference * 0.35,
                circumference * 0.95,
              ],
              rotate: [0, 90, 360],
            }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            style={{ transformOrigin: "50% 50%" }}
          />
        </motion.svg>
      </div>
    </div>
  );
}
