"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#flashovanie", label: "Flashovanie" },
    { href: "#motorola", label: "Motorola" },
    { href: "#odin-samsung", label: "Odin" },
    { href: "#diagnostika", label: "Diagnostika" },
    { href: "#nastroje", label: "Nástroje" },
    { href: "#zdielanie", label: "Zdieľanie" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
            <span className="text-zinc-950 font-bold text-xl">FD</span>
          </div>
          <span className="font-semibold text-xl tracking-tight">Flash Diagnostics Hub</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-emerald-400 transition-colors">
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/JVVMEDIA/flash-diagnostics-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-sm transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-800 px-6 py-4 bg-zinc-950">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="block py-3 text-lg" onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}