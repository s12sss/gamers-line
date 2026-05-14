"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

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

  const navItems = [
    {
      title: "回線を探す",
      links: [
        { name: "条件で比較する", href: "/compare" },
        { name: "回線一覧・詳細", href: "/provider" },
        { name: "エリアMAPから探す", href: "/area" },
      ]
    },
    { title: "速度チェック", href: "/speedtest" },
    {
      title: "コラム",
      links: [
        { name: "お役立ちコラム", href: "/column" },
        { name: "ゲーミングVPN特集", href: "/vpn" },
      ]
    },
    { title: "乗り換えツール", href: "/tools" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 flex justify-between items-center px-4 sm:px-10 h-16 bg-[#050508]/75 backdrop-blur-xl border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 no-underline group">
          <div className="font-heading font-bold text-lg tracking-tighter text-text">
            Gamer's <span className="text-cyan drop-shadow-[0_0_20px_rgba(0,229,255,0.6)]">Line</span>
          </div>
          <div className="text-[0.5rem] sm:text-[0.65rem] text-text-muted tracking-wider sm:tracking-widest mt-0.5 sm:mt-0.5 opacity-70 whitespace-nowrap hidden sm:block">
            | ゲーマー向け光回線診断
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <div key={item.title} className="relative group">
              {item.href ? (
                <Link 
                  href={item.href}
                  className="flex items-center gap-1 text-sm font-medium text-text-muted hover:text-text transition-colors py-4"
                >
                  {item.title}
                </Link>
              ) : (
                <>
                  <button className="flex items-center gap-1 text-sm font-medium text-text-muted hover:text-text transition-colors py-4">
                    {item.title}
                    <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="bg-[#0a0a12] border border-white/10 rounded-xl p-2 w-48 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                      {item.links?.map(link => {
                        const isActive = pathname.startsWith(link.href);
                        return (
                          <Link 
                            key={link.href} 
                            href={link.href}
                            className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                              isActive ? "bg-cyan/10 text-cyan font-bold" : "text-text-muted hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {link.name}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          <Link
            href="/diagnosis"
            className="ml-2 inline-flex items-center justify-center px-6 py-2 rounded-full bg-cyan text-black text-[0.8125rem] font-bold tracking-widest transition-all hover:opacity-90 hover:-translate-y-0.5"
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
        className={`md:hidden fixed top-16 left-0 right-0 bg-[#050508]/95 backdrop-blur-xl border-b border-white/10 z-[49] pb-6 flex flex-col overflow-y-auto max-h-[calc(100vh-4rem)] transition-all duration-200 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex flex-col pt-4 px-4 gap-6">
          {navItems.map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              {item.href ? (
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    pathname.startsWith(item.href) ? "text-cyan bg-cyan/10 font-bold" : "text-text-muted hover:text-text hover:bg-white/5"
                  }`}
                >
                  {item.title}
                </Link>
              ) : (
                <>
                  <div className="font-mono text-[0.65rem] text-cyan tracking-widest uppercase mb-1">{item.title}</div>
                  <div className="flex flex-col gap-1">
                    {item.links?.map(link => {
                      const isActive = pathname.startsWith(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                            isActive ? "text-cyan bg-cyan/10" : "text-text-muted hover:text-text hover:bg-white/5"
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="pt-2 border-t border-white/10 mt-2">
            <Link
              href="/diagnosis"
              className="flex items-center justify-center w-full py-3.5 rounded-full bg-cyan text-black font-bold text-[0.95rem] tracking-wide transition-all hover:opacity-90"
            >
              無料診断スタート
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
