"use client";

import Image from "next/image";
import Waves from "@/components/waves";
import { sponsors } from "@/data/sponsors.json";
import { motion } from "framer-motion";
import SponsorMarquee from "@/components/sponsorMarquee"
import { Button } from "@/components/ui/button";
import FrcKickoffToast from "@/components/frcKickoff"

export default function Home() {
    return (
        <main className="bg-[#DBE9EE] text-[#0C2B2C] m-0 p-0 overflow-x-hidden">
            <FrcKickoffToast />
            <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-0 relative z-10">
                <div className="flex flex-col lg:flex-row w-full pt-20 items-center">
                    <div className="lg:pl-30 lg:pt-30 flex flex-col gap-10 lg:gap-20 items-center lg:items-start text-center lg:text-left">
                        <Image src="/text/thetestteam.png" alt="" width={600} height={300} className="w-full max-w-[600px] h-auto" />
                        <div className="flex flex-col gap-4 items-center lg:items-start">
                            <Image src="/text/mission_statement.png" alt="" width={250} height={300} />
                            <p className="italic w-full lg:w-2/3">To inspire, motivate, and educate about FIRST, and to make STEAM an integral part of students lives and our community. We prepare members for the real world through hands-on engineering and outreach, because we believe <b className="text-[#008080]">engineering is for everyone.</b></p>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <Image src="/assets/testy_flat.svg" alt="" width={800} height={0} />
                    </div>
                </div>
            </section>

            <section
                className="min-h-[70vh] bg-fixed bg-no-repeat bg-cover bg-center relative text-white p-0 -mt-[1px] z-20"
                style={{ backgroundImage: "url('/img/anomaly2025.png')" }}
            >
                <div className="relative -top-[1px]">
                    <Waves flipVertical />
                </div>

                <div className="flex flex-col lg:flex-row gap-10 justify-center items-center py-20 px-6">
                    <div className="w-full lg:w-1/2 flex justify-center items-center p-0 hidden md:block">
                        {/* <Image src="/img/jmoney.png" width={400} height={200} alt="" className="grayscale-25 w-full max-w-[400px] h-auto" /> */}
                    </div>
                    <div className="w-full lg:w-1/2 py-10 lg:py-46 text-center lg:text-left flex flex-col items-center lg:items-start">
                        <Image src="/text/Whoarewe.png" alt="" width={450} height={100} className="max-w-full h-auto" />
                        <p className="w-full lg:w-2/3 py-6 font-light">Insert yap sess here</p>
                        <a href="../story"><button className="px-12 py-2 border-2 border-[#FFF] hover:px-14 ease-in-out duration-300">Learn More &gt; </button></a>
                    </div>
                </div>

                <svg
                    viewBox="0 0 1440 76"
                    fill="none"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-[-1px] left-0 w-full block h-12 lg:h-20 z-30"
                >
                    <path d="M0.492188 77.141L1439.31 0.867188V77.141H0.492188Z" fill="#DBE9EE" />
                </svg>
            </section>

            <section className="min-h-screen bg-[#DBE9EE] flex flex-col justify-center items-center text-white text-center lg:py-0 lg:-mt-[12rem] lg:-mb-[8rem] relative z-10">
                <Image src="/text/OurSponsors.svg" alt="" width={400} height={100} className="-rotate-[3.5deg] p-6 mb-4 w-full mt-12 max-w-[400px]" />
                <SponsorMarquee sponsors={sponsors} />
                <div className="w-full flex justify-center lg:justify-end lg:pr-10 mt-6">
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="box rounded-full -rotate-[3.5deg]"
                        href="../sponsors"
                    >
                        <Button
                            className="border-[#008080] px-10 lg:px-18 py-5 text-[#091314] text-[1rem] bg-[#FFFFFF00] hover:bg-[#00808033] border-[3px]"
                            variant="outline"
                        >
                            Check out our sponsors!
                        </Button>
                    </motion.a>
                </div>
            </section>

            <section
                className="min-h-[70vh] flex flex-col justify-center bg-fixed bg-no-repeat bg-cover bg-center relative text-white p-0 -mt-[1px] z-20"
                style={{ backgroundImage: "url('/img/brikramage.png')" }}
            >
                <svg
                    viewBox="0 0 1440 76"
                    fill="none"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-[-1px] left-0 w-full block h-12 lg:h-20 z-30"
                >
                    <path d="M1438.82 0.0001297L-0.000244141 76.2739V0.0001297H1438.82Z" fill="#DBE9EE" />
                </svg>

                <div className="flex flex-col w-full items-center text-center gap-10 justify-center py-20 lg:py-46 px-6">
                    <Image src="/text/OurCommunity.svg" alt="" width={450} height={100} className="max-w-full h-auto" />
                    <p className="w-full lg:w-2/3 py-6 font-light">someone write smth here</p>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="box rounded-sm bg-[#DBE9EE]/80 px-6 py-3 text-[#000]"
                        href="../outreach"
                    >
                        See what we do
                    </motion.a>
                </div>

                <div className="absolute left-0 w-full block bottom-0">
                    <Waves colors={["#1C6463aa", "#74B8B700", "#0D7E7Cdd", "#74B8B7"]} height={"10vh"} />
                </div>
            </section>
        </main>
    );
}