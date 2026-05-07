"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "比較する", href: "/compare" },
    { name: "回線一覧", href: "/provider" },
    { name: "エリアMAP", href: "/area" },
    { name: "コラム", href: "/column" },
  ];

  const mobileNavLinks = [
    ...navLinks,
  ];

  return (
    <>
      <header className="sticky top-0 z-50 flex justify-between items-center px-4 sm:px-10 h-16 bg-[#050508]/75 backdrop-blur-xl border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 no-underline group">
          <div className="font-heading font-bold text-lg tracking-tighter text-text">
            Gamer's <span className="text-cyan drop-shadow-[0_0_20px_rgba(0,229,255,0.6)]">Line</span>
          </div>
          <div className="text-[0.5rem] sm:text-[0.65rem] text-text-muted tracking-wider sm:tracking-widest mt-0.5 sm:mt-0.5 opacity-70 whitespace-nowrap">
            | ゲーマー向け光回線診断・比較メディア
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-text" : "text-text-muted hover:text-text"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/diagnosis"
            className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-cyan text-black text-[0.8125rem] font-bold tracking-widest transition-all hover:opacity-90 hover:-translate-y-0.5"
          >
            無料診断
          </Link>
        </nav>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 bg-transparent border-none cursor-pointer p-1 rounded-lg transition-colors hover:bg-white/5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="メニュー"
        >
          <span className={`block w-5 h-[1.5px] rounded-sm transition-all duration-250 origin-center ${isOpen ? "translate-y-[6.5px] rotate-45 bg-cyan" : "bg-text-muted"}`}></span>
          <span className={`block w-5 h-[1.5px] rounded-sm transition-all duration-250 origin-center ${isOpen ? "opacity-0 scale-x-0" : "bg-text-muted"}`}></span>
          <span className={`block w-5 h-[1.5px] rounded-sm transition-all duration-250 origin-center ${isOpen ? "-translate-y-[6.5px] -rotate-45 bg-cyan" : "bg-text-muted"}`}></span>
        </button>
      </header>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 bg-[#050508]/95 backdrop-blur-xl border-b border-white/10 z-[49] pb-4 flex flex-col transition-all duration-200 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex flex-col pt-2">
          {mobileNavLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-6 py-3.5 text-base font-medium border-b border-white/5 transition-colors ${
                  isActive ? "text-text bg-white/5" : "text-text-muted hover:text-text hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/diagnosis"
            className="mt-3 mx-4 flex items-center justify-center py-3 rounded-full bg-cyan text-black font-semibold text-[0.9rem] tracking-wide transition-all hover:opacity-90"
          >
            無料診断スタート
          </Link>
        </div>
      </div>
    </>
  );
}
