"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { RobotSeason } from "@/types/robots";

interface DiamondCardProps {
  season: RobotSeason;
  onClick: () => void;
}

export default function DiamondCard({ season, onClick }: DiamondCardProps) {
  return (
    <motion.div
      transition={{ type: "spring", stiffness: 220, damping: 12 }}
      className="relative w-48 h-48 overflow-hidden shadow-lg cursor-pointer"
      onClick={onClick}
    >
        <Image
          src={season.robotImage}
          alt={`Robot ${season.year}`}
          fill
          className="object-cover grayscale-25 opacity-25 hover:opacity-50 hover:grayscale-0 ease-in"
        />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-white font-semibold text-xl drop-shadow-md">
          {season.year}
        </span>
      </div>
    </motion.div>
  );
}
