"use client";

import Image from "next/image";
import { sponsors } from "@/data/sponsors.json";
import { motion, Variants } from "framer-motion";
import Waves from "@/components/waves";

type SponsorTier = "platinum" | "gold" | "silver" | "bronze";

interface Sponsor {
  name: string;
  image: string;
  url: string;
  tier: SponsorTier;
}

const TIER_ORDER: SponsorTier[] = [
  "platinum",
  "gold",
  "silver",
  "bronze",
];

const TIER_FLEX: Record<SponsorTier, string> = {
  platinum: "gap-10",
  gold: "gap-8",
  silver: "gap-6",
  bronze: "gap-4 opacity-80",
};

const tierVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      bounce: 0.3,
      duration: 0.8,
      staggerChildren: 0.08,
    },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};


export default function SponsorsPage() {
  const allSponsors = sponsors.all as Sponsor[];

  const grouped: Record<SponsorTier, Sponsor[]> = {
    platinum: [],
    gold: [],
    silver: [],
    bronze: [],
  };

  for (const sponsor of allSponsors) {
    grouped[sponsor.tier].push(sponsor);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#DBE9EE]">
    <section className="flex flex-col items-center px-8 py-36 gap-24 text-[#0C2B2C]">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center flex flex-col items-center max-w-3xl space-y-6"
      >
        <Image src="text/OurSponsors.svg" alt="" width={500} height={100} className="max-w-[300px] md:max-w-[500px]" />
        <p className="text-sm text-[#0C2B2C]">
          Team 303 would not be possible without the generous support of our
          sponsors. Thank you for helping us inspire the next generation of
          engineers.
        </p>
      </motion.section>

      {TIER_ORDER.map((tier) => {
        const list = grouped[tier];
        if (!list.length) return null;

        return (
          <motion.section
            key={tier}
            variants={tierVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-6xl flex flex-col gap-10"
          >
            <h2 className="text-3xl font-semibold capitalize text-center">
              {tier} Sponsors
            </h2>

            <motion.div
              className={`flex flex-wrap justify-center items-center ${TIER_FLEX[tier]}`}
            >
              {list.map((sponsor) => (
                <motion.a
                  key={sponsor.name}
                  variants={logoVariants}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:scale-105"
                >
                  <Image
                    src={`/sponsors/${sponsor.image}`}
                    alt={sponsor.name}
                    width={220}
                    height={120}
                    className="object-contain"
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.section>
        );
      })}
    </section>
      <div className="relative bottom-0 left-0 w-full">
        <Waves
          colors={["#1C6463aa", "#74B8B700", "#0D7E7Cdd", "#74B8B7"]}
          height={"10vh"}
        />
      </div>
      </main>
  );
}
