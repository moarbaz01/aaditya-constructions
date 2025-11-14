"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Home, Info, FileText, Phone, Menu, X } from "lucide-react";
import { ContestContext } from "../contexts/ContestContext";

const navLinks = [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "About",
    path: "/about",
    icon: Info,
  },
  {
    label: "Terms",
    path: "/terms",
    icon: FileText,
  },
];

export default function Header() {
  const context = useContext(ContestContext);
  const openModal = context?.openModal || (() => {});
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed md:top-4 top-0 w-full z-50 transition-all duration-300 ease-out">
      <div className="max-w-7xl mx-auto border md:rounded-full shadow-sm border-gray-50 bg-white/20 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        >
          <span className="text-base sm:text-lg font-bold gradient-text">
            Aaditya BuildCons
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.label}
                href={item.path}
                className="relative text-sm font-medium text-gray-700 hover:text-accent-violet transition-colors duration-300 group flex items-center gap-2"
              >
                <IconComponent className="w-4 h-4" />
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-violet to-accent-violet-dark group-hover:w-full transition-all duration-300"></span>
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {context && (
            <button
              onClick={() => openModal()}
              className="px-5 py-2 rounded-xl bg-gradient-to-r  from-accent-violet to-accent-violet-dark text-white font-semibold transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-violet-500/30 active:scale-95 text-sm"
            >
              Join Contest
            </button>
          )}
        </div>

        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200/30 px-4 py-6 space-y-4 animate-fade-in shadow-lg">
          {navLinks.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.label}
                href={item.path}
                onClick={closeMenu}
                className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-accent-violet hover:translate-x-2 transition-all duration-300 py-2"
              >
                <IconComponent className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
          {context && (
            <div className="pt-2">
              <button
                onClick={() => {
                  closeMenu();
                  openModal();
                }}
                className="w-full px-5 py-3 rounded-xl bg-gradient-to-r  from-accent-violet to-accent-violet-dark text-white font-semibold transition-all duration-300 ease-out active:scale-95 text-base shadow-lg flex items-center justify-center"
              >
                Join Contest
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
