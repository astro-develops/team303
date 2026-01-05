"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Nav() {
  return (
    <>
      <nav
        className={`flex justify-between px-12 py-6 items-center fixed w-full z-[50] bg-[#DBE9EE] filter font-medium justify-between text-[#000] italic tracking-wide text-sm`}
      >
        <div>
          <Image src="/assets/303.svg" alt="logo" width={120} height={80} />
        </div>
        <NavigationMenu>
          <NavigationMenuList className="space-x-8 items-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className=""
              href="../"
            >
              <NavigationMenuItem>
                Home
              </NavigationMenuItem>
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className=""
            >
            <NavigationMenuItem>
              <NavigationMenuTrigger>Team</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="hover:bg-[#008080]/25 flex transition-colors h-full w-full select-none flex-col justify-center rounded-md bg-[#008080]/15 p-6 no-underline outline-none focus:shadow-md"
                        href="/story"
                      >
                        <div className="mb-2 text-lg font-semibold">
                          Our Story
                        </div>
                        <p className="text-xs leading-tight text-muted-foreground">
                          From hardships to success and back, check out what
                          303&apos;s been able to accomplish
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/sponsors" title="Sponsors">
                    Huge thanks to our sponsors who make everything we do
                    possible.
                  </ListItem>
                  <ListItem href="/ramp" title="Ramp & Mentors">
                    Our proud team of parents and mentors, who guide us along
                    the way
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="box rounded-full"
              href="../outreach"
            >
                <NavigationMenuItem>
                  Outreach
                </NavigationMenuItem>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="box rounded-full"
              href="../contact"
            >
              <Button
                className="bg-[#008080] px-6 py-3 text-[#091314] font-bold border-none hover:bg-[#008080]/85"
                variant="outline"
              >
                <NavigationMenuItem>
                  Contact Us
                </NavigationMenuItem>
              </Button>
            </motion.a>
          </NavigationMenuList>
        </NavigationMenu>
      </nav >
    </>
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
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug font-light text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
