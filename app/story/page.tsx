"use client";

import { useRef } from "react";
import historyData from "@/data/events.json";
import { cn } from "@/lib/utils";
import Image from "next/image";
import DiamondGrid from "@/components/DiamondGrid";
import Waves from "@/components/waves";
import { motion, Variants, useScroll, useSpring } from "framer-motion";

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HistoryPage() {
  const lineContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: lineContainerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen bg-[#DBE9EE] text-[#0C2B2C]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex w-full justify-center pt-36"
      >
        <Image src="text/OurStory.svg" alt="History" width={400} height={100} />
      </motion.div>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <p className="text-center pb-12">Put smth here</p>
        <div ref={lineContainerRef} className="relative">

          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#008080]/10 hidden md:block" />
          <motion.div
            style={{
              scaleY,
              originY: 0
            }}
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#008080] hidden md:block z-10"
          />

          <div className="space-y-20 md:space-y-32">
            {historyData.story.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={event.id}
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-x-8 md:gap-x-16 relative",
                    !isEven ? "md:flex-row-reverse" : ""
                  )}
                >
                  <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full md:w-1/2 group p-4 md:p-16"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-3xl border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                      <div className="absolute inset-0 bg-[#0C2B2C]/10 z-10" />
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Central Dot
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center z-20">
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-20% 0px -20% 0px" }} 
                        className="w-5 h-5 rounded-full bg-[#008080] border-4 border-[#DBE9EE] shadow-[0_0_15px_rgba(0,128,128,0.3)]" 
                      />
                  </div> */}

                  <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full md:w-1/2 space-y-4"
                  >
                    <h2 className="text-2xl md:text-4xl font-bold text-[#0C2B2C]">
                      {event.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-[#0C2B2C]/80 font-light">
                      {event.text}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section
        className="bg-fixed bg-no-repeat bg-cover w-full bg-center relative text-white p-0"
        style={{ backgroundImage: "url('/img/robots.png')" }}
      >
        <DiamondGrid />
        <div className="relative bottom-0 left-0 w-full block">
          <Waves colors={["#1C6463aa", "#74B8B700", "#0D7E7Cdd", "#74B8B7"]} height={"10vh"} />
        </div>
      </section>
    </main>
  );
}