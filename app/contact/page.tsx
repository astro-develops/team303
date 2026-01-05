"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Waves from "@/components/waves";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#DBE9EE]">
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-12 lg:py-24 gap-12">
        
        <div className="w-full lg:w-1/2 px-4 z-10 text-center lg:text-left">
          <Image 
            src="/text/Contact.svg" 
            alt="Contact" 
            width={500} 
            height={300} 
            className="mb-8 lg:mb-16 mx-auto lg:mx-0 w-full max-w-[300px] md:max-w-[500px]"
          />
          <p className="text-base md:text-lg text-gray-700 mb-6 max-w-md mx-auto lg:mx-0">
            Have questions? Reach out and our team will get back to you quickly.
          </p>

          <div className="space-y-2 text-gray-800 text-sm md:text-base">
            <p><b>Email:</b> team303@frc.com</p>
            <p><b>Phone:</b> (555) 123-4567</p>
            <p><b>Location:</b> Bridgewater-Raritan High School</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
            className="relative w-full max-w-[350px] md:max-w-[520px] aspect-[4/5] drop-shadow-xl"
          >
            <Image
              src="/img/contact.png"
              alt=""
              fill
              className="object-cover rounded-2xl shadow-lg"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
            className="absolute -bottom-10 lg:bottom-20 left-1/2 lg:left-0 transform -translate-x-1/2 lg:-translate-x-1/4 hidden sm:block drop-shadow-2xl"
          >
            <Image
              src="/img/303.png"
              alt=""
              width={400}
              height={100}
              className="rounded-2xl shadow-lg w-[200px] md:w-[300px] lg:w-[400px]"
            />
          </motion.div>          
        </div>

      </section>

      <div className="absolute bottom-0 left-0 w-full">
        <Waves
          colors={["#1C6463aa", "#74B8B700", "#0D7E7Cdd", "#74B8B7"]}
          height={"10vh"}
        />
      </div>
    </main>
  );
}