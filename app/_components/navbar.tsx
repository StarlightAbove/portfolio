"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import  TypedLogo from "@/app/_components/logo"
import { Home, BookOpen, Sparkle, Shuffle, FileUser } from 'lucide-react';
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  {
    path: "/",
    name: "Home",
    icon: <Home />,
  },
  {
    path: "/cv",
    name: "CV",
    icon: <FileUser />
  },
  {
    path: "/project",
    name: "Projects",
    icon: <BookOpen />
  },
  {
    path: "/blog",
    name: "Blog",
    icon: <Sparkle />
  },
  {
    path: "/blep",
    name: "Bits and Bobs",
    icon: <Shuffle />
  },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [hoveredPath, setHoveredPath] = useState(pathname);

  return (
    <nav className="pt-8 px-12 flex justify-between items-center">
     <ul className="flex relative justify-end items-center gap-6">
        {navItems.map((eachItem) => (
          <li key={eachItem.path}>
            <Link
              href={eachItem.path}
              key={eachItem.path}
              className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in flex items-center justify-center ${
                isActive(eachItem.path) ? "text-black-100" : "text-zinc-400"
              }`}
              onMouseOver={() => setHoveredPath(eachItem.path)}
              onMouseLeave={() => setHoveredPath(pathname)}
            >
              <span className = "relative z-10">{eachItem.icon}</span>
              {eachItem.path === hoveredPath && (
                <motion.div
                  layoutId="navbar"
                  className="absolute z-0 inset-0 bg-[var(--color-green)] rounded-full"
                  transition={{
                    type: "spring",
                    bounce: 0.05,
                    stiffness: 150,
                    damping: 15,
                    duration: 0.3,
                  }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;