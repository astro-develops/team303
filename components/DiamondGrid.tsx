"use client";

import { useEffect, useState } from "react";
import DiamondCard from "./DiamondCard";
import DiamondModal from "./DiamondModal";
import type { RobotSeason } from "@/types/robots";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DiamondGrid() {
  const [seasons, setSeasons] = useState<RobotSeason[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSeason, setOpenSeason] = useState<RobotSeason | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch("/api/robots/all");
        if (!res.ok) throw new Error("Failed to load robot data");

        const json: RobotSeason[] = await res.json();
        if (mounted) setSeasons(json);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (


    <section className="flex flex-col items-center gap-y-12 py-24 w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex w-full justify-center pt-6"
      >
        <Image src="text/Robots.svg" alt="History" width={250} height={100} />
      </motion.div>

      <div>{loading? "Loading robots…": ""}</div>

      <div className="flex flex-wrap justify-center w-full">
        {seasons.map((season) => (
          <div
            key={season.year}
          >
            <DiamondCard
              season={season}
              onClick={() => setOpenSeason(season)}
            />
          </div>
        ))}
      </div>

      <DiamondModal
        open={!!openSeason}
        season={openSeason}
        onClose={() => setOpenSeason(null)}
      />
    </section>
  );
}
