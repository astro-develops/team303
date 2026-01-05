"use client";

import outreachData from "@/data/outreach.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// Define the interface for an outreach item
interface OutreachItem {
  id: string;
  title: string;
  description: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" as const
    } 
  },
};

const highlightIds = ["charlie", "mstdc", "steamweek"];

// Cast the JSON data to our interface
const allInitiatives: OutreachItem[] = [
  ...outreachData.mentoring,
  ...outreachData.steam_outreach,
  ...outreachData.community_service,
];

const highlights = allInitiatives.filter((item) => highlightIds.includes(item.id));

function HighlightSection() {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="mb-20 space-y-24"
    >
      {highlights.map((item, index) => (
        <motion.div
          key={item.id}
          variants={cardVariants}
          className={cn(
            "flex flex-col gap-10 lg:items-center",
            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
          )}
        >
          <div className="relative aspect-video scale-90 w-full flex-1 overflow-hidden rounded-2xl bg-white/20 shadow-xl border border-[#008080]/20">
            <Image src={`/outreach/${item.id}.png`} alt={item.title} fill className="object-cover"/>
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold md:text-4xl text-[#0C2B2C]">
              {item.title}
            </h2>
            <p className="text-md leading-relaxed text-[#0C2B2C]">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Fixed the any[] type here
function InitiativeGrid({ items }: { items: OutreachItem[] }) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={cardVariants}>
          <Card className="flex flex-col h-full rounded-2xl border-2 border-[#008080]/10 bg-[#008080]/10 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md hover:border-[#008080]/30">
            <CardHeader>
              <CardTitle className="leading-snug text-[#008080] text-xl">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col space-y-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#DBE9EE]">
                <Image src={`/outreach/${item.id}.png`} alt={item.title} fill className="object-cover"/>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-[#0C2B2C]/80">
                {item.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function InitiativesPage() {
  return (
    <main className="min-h-screen bg-[#DBE9EE] text-[#0C2B2C] pb-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full justify-center pt-36"
      >
        <Image src="text/Outreach.svg" alt="" width={400} height={100} />
      </motion.div>

      <section className="mx-auto max-w-7xl p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16 text-center"
        >
          <p className="mx-auto max-w-2xl text-md text-[#0C2B2C]/80 font-light">
            Team 303’s initiatives extend beyond competition robotics. We work
            to make STEAM accessible, inclusive, and impactful through
            mentorship, global outreach, and community service.
          </p>
        </motion.div>

        <HighlightSection />

        <div className="mt-20">
          <Tabs defaultValue="mentoring" className="w-full">
            <div className="mb-10 flex justify-center">
              <TabsList className="flex h-auto flex-wrap justify-center gap-4 bg-transparent p-0">
                {["mentoring", "steam", "community"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-full border-[2px] border-[#008080] bg-transparent px-8 py-2 text-base font-medium text-[#0C2B2C] transition-all hover:bg-[#008080]/10 data-[state=active]:bg-[#008080] data-[state=active]:text-white uppercase tracking-wide"
                  >
                    {tab === "steam" ? "STEAM Outreach" : tab === "community" ? "Community & Service" : "Mentoring"}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="mentoring">
              <InitiativeGrid items={outreachData.mentoring} />
            </TabsContent>
            <TabsContent value="steam">
              <InitiativeGrid items={outreachData.steam_outreach} />
            </TabsContent>
            <TabsContent value="community">
              <InitiativeGrid items={outreachData.community_service} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}