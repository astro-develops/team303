"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#74B8B7] text-[#0C2B2C] pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tighter uppercase">Team 303</h3>
            <p className="text-sm leading-relaxed max-w-xs opacity-90">
              The T.E.S.T. Team (Technologists, Engineers, Students, and Teachers).
              Based in Bridgewater-Raritan, NJ, we are dedicated to inspiring
              the next generation of STEM leaders.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} />
              <SocialLink href="https://youtube.com" icon={<Youtube size={20} />} />
              <SocialLink href="mailto:contact@team303.com" icon={<Mail size={20} />} />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold uppercase tracking-wider">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-3 text-sm font-medium">
              <li><Link href="../" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="../outreach" className="hover:text-white transition-colors">Outreach</Link></li>
              <li><Link href="../sponsors" className="hover:text-white transition-colors">Sponsors</Link></li>
              <li><Link href="../story" className="hover:text-white transition-colors">Story</Link></li>
              <li><Link href="/ramp" className="hover:text-white transition-colors">Ramp</Link></li>
              <li><Link href="https://firstinspires.org" className="hover:text-white transition-colors">FIRST</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold uppercase tracking-wider">Location</h3>
            <div className="flex items-start gap-3 text-sm opacity-90">
              <MapPin size={18} className="mt-1 flex-shrink-0" />
              <p>
                Bridgewater-Raritan High School<br />
                600 Garretson Rd<br />
                Bridgewater, NJ 08807
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-full bg-[#0C2B2C]/10 flex items-center justify-center hover:bg-[#0C2B2C] hover:text-white transition-all duration-300"
    >
      {icon}
    </Link>
  );
}