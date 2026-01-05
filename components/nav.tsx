"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react"; // Icons for mobile

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Nav() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/outreach", label: "Outreach" },
  ];

  const teamSubLinks = [
    { href: "/story", title: "Our Story", description: "From hardships to success and back." },
    { href: "/sponsors", title: "Sponsors", description: "Huge thanks to our sponsors." },
    { href: "/ramp", title: "Ramp & Mentors", description: "Our proud team of parents and mentors." },
  ];

  return (
    <nav className="fixed w-full z-[50] bg-[#DBE9EE] px-6 md:px-12 py-4 md:py-6 flex justify-between items-center font-medium italic tracking-wide text-sm">
      {/* Logo */}
      <Link href="/" className="z-[51]">
        <Image src="/assets/303.svg" alt="logo" width={100} height={60} className="md:w-[120px]" />
      </Link>

      {/* --- DESKTOP MENU --- */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="space-x-8">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="hover:text-[#008080] transition-colors">
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent italic">Team</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="hover:bg-[#008080]/25 flex transition-colors h-full w-full select-none flex-col justify-center rounded-md bg-[#008080]/15 p-6 no-underline outline-none"
                        href="/story"
                      >
                        <div className="mb-2 text-lg font-semibold not-italic">Our Story</div>
                        <p className="text-xs leading-tight text-muted-foreground not-italic">
                          Check out what 303&apos;s been able to accomplish.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {teamSubLinks.slice(1).map((link) => (
                    <ListItem key={link.href} href={link.href} title={link.title}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/outreach" legacyBehavior passHref>
                <NavigationMenuLink className="hover:text-[#008080] transition-colors">
                  Outreach
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Button asChild className="bg-[#008080] px-6 py-2 text-[#091314] font-bold border-none hover:bg-[#008080]/85 rounded-sm h-auto">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* --- MOBILE MENU --- */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-[#008080]">
              <Menu size={52} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#DBE9EE] border-[#008080]/20 w-[300px]">
            <SheetHeader className="text-left">
              <SheetTitle>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-6 mt-12 text-md italic px-4">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex justify-between items-center">
                Home 
              </Link>

              <div className="space-y-6">
                {teamSubLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <Link href="/outreach" onClick={() => setIsOpen(false)} className="flex justify-between items-center">
                Outreach 
              </Link>

              <Link href="/contact" onClick={() => setIsOpen(false)} className="flex justify-between items-center">Contact Us </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#008080]/5 focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none not-italic">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug font-light text-muted-foreground not-italic">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";