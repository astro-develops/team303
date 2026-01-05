import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Carlito } from "next/font/google";
import Nav from "@/components/nav"
import Footer from "@/components/footer"
import { Toaster } from "sonner"

const calibri = Carlito({ weight: ["400", "700"], subsets: ["latin"] });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team 303",
  description: "First Robotics Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${calibri.className} antialiased bg-[#DBE9EE]`}
      >
        <Toaster closeButton />

        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}

//${geistSans.variable} ${geistMono.variable} 