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
    // Replaced 'any' with a Record that maps possible keys to Sponsor arrays
    const obj = input as Record<string, Sponsor[] | string | undefined>;
    
    if (Array.isArray(obj.all)) return obj.all as Sponsor[];
    if (Array.isArray(obj.sponsors)) return obj.sponsors as Sponsor[];
    if (Array.isArray(obj.data)) return obj.data as Sponsor[];
    if (Array.isArray(obj.entries)) return obj.entries as Sponsor[];
    
    // Check for a single Sponsor object
    const single = input as Partial<Sponsor>;
    if (single.name && single.image && single.url) {
      return [single as Sponsor];
    }
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
    if (row.length === 0) return [];
    const minRepeats = Math.ceil(screenWidth / (row.length * cardWidth));
    return Array(Math.max(1, minRepeats))
      .fill(null)
      .flatMap(() => row);
  };

  // Safe window check for Next.js SSR
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;

  const row1Repeated = repeatRow(row1, screenWidth, estimatedCardWidth);
  const row2Repeated = repeatRow(row2, screenWidth, estimatedCardWidth);

  return (
    <div className="w-screen overflow-hidden relative marquee-container -rotate-[3.5deg] z-0">
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
  // Guard against empty data to prevent infinite loops or crashes
  const fullData = data.length > 0 ? [...data, ...data] : [];

  return (
    <div className={`marquee__group ${reverse ? "marquee-reverse" : ""}`}>
      {fullData.map((e, i) => {
        const isDuplicate = i >= data.length;
        // logic for clickable could be used for accessibility or analytics
        
        return (
          <motion.a
            key={`${e.name}-${i}`}
            href={e.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={`p-2 bg-transparent rounded flex-shrink-0`}
          >
            <div className="p-4 flex items-center justify-center">
              <img
                src={`/sponsors/${e.image}`}
                alt={e.name}
                className="h-[6vh] md:h-[10vh] grayscale-[0.25] opacity-25 hover:grayscale-0 hover:opacity-100 transition-all"
              />
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}