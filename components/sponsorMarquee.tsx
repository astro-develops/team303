"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export interface Sponsor {
  name: string;
  image: string;
  url: string;
}

function normalizeSponsors(input: unknown): Sponsor[] {
  if (!input) return [];

  if (Array.isArray(input)) return input as Sponsor[];

  if (typeof input === "object") {
    const obj = input as Record<string, any>;
    if (Array.isArray(obj.all)) return obj.all as Sponsor[];
    if (Array.isArray(obj.sponsors)) return obj.sponsors as Sponsor[];
    if (Array.isArray(obj.data)) return obj.data as Sponsor[];
    if (Array.isArray(obj.entries)) return obj.entries as Sponsor[];
    if (obj.name && obj.image && obj.url) return [obj as Sponsor];
  }

  return [];
}

interface SponsorMarqueeProps {
  sponsors: unknown;
  estimatedCardWidth?: number; // in pixels
}

export default function SponsorMarquee({ sponsors, estimatedCardWidth = 150 }: SponsorMarqueeProps) {
  const list = normalizeSponsors(sponsors);

  if (list.length === 0) {
    console.warn(
      "SponsorMarquee: no sponsors found. Expected Sponsor[] or { all: Sponsor[] } or { sponsors: Sponsor[] }."
    );
  }

  const mid = Math.ceil(list.length / 2);
  const row1 = useMemo(() => list.slice(0, mid), [list]);
  const row2 = useMemo(() => list.slice(mid), [list]);

  const repeatRow = (row: Sponsor[], screenWidth: number, cardWidth: number) => {
    const minRepeats = Math.ceil(screenWidth / (row.length * cardWidth));
    return Array(minRepeats)
      .fill(null)
      .flatMap(() => row);
  };

  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;

  const row1Repeated = repeatRow(row1, screenWidth, estimatedCardWidth);
  const row2Repeated = repeatRow(row2, screenWidth, estimatedCardWidth);

  return (
    <div className="w-screen overflow-hidden relative marquee-container -rotate-[3.5deg]">
      <article className="flex flex-col gap-6">
        <div className="marquee">
          <MarqueeRow data={row1Repeated} />
        </div>

        <div className="marquee">
          <MarqueeRow data={row2Repeated} reverse />
        </div>
      </article>
    </div>
  );
}

interface RowProps {
  data: Sponsor[];
  reverse?: boolean;
}

function MarqueeRow({ data, reverse = false }: RowProps) {
  const fullData = [...data, ...data];

  return (
    <div className={`marquee__group ${reverse ? "marquee-reverse" : ""}`}>
      {fullData.map((e, i) => {
        const isDuplicate = i >= data.length;
        const clickable = reverse ? isDuplicate : !isDuplicate;

        return (
          <motion.a
            key={`${e.name}-${i}`}
            href={e.url}
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={`p-2 bg-[#FFFFFF00] rounded`}
          >
            <div className="p-4 flex items-center justify-center">
              <img
                src={`/sponsors/${e.image}`}
                alt={e.name}
                className="h-[6vh] md:h-[10vh] grayscale-25 opacity-25 hover:grayscale-0 hover:opacity-100"
              />
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
