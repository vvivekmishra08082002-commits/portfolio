"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 p-4">
      <div className="max-w-5xl mx-auto glass rounded-3xl md:rounded-full px-6 py-3 flex flex-col md:flex-row items-center justify-between transition-all duration-300">
        
        <div className="flex w-full md:w-auto items-center justify-between">
          <Link href="/" className="font-bold text-lg tracking-tight">
            Vivek Mishra
          </Link>
          <div className="flex items-center gap-4 md:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <nav className={`${isMobileMenuOpen ? "flex" : "hidden"} mt-4 md:mt-0 w-full md:w-auto flex-col md:flex-row items-center gap-6 text-sm font-medium pb-4 md:pb-0`}>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="#about" className="hover:text-primary transition-colors w-full md:w-auto text-center py-2 md:py-0">
            About
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="#projects" className="hover:text-primary transition-colors w-full md:w-auto text-center py-2 md:py-0">
            Projects
          </Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="#experience" className="hover:text-primary transition-colors w-full md:w-auto text-center py-2 md:py-0">
            Experience
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
