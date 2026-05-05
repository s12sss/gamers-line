"use client";

import { useState, useRef, useEffect } from "react";

export default function Tooltip({ text, children, className = "" }: { text: string; children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  const toggleTooltip = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isVisible) {
      setIsVisible(false);
    } else {
      showTooltip();
    }
  };

  return (
    <div 
      className={`relative inline-flex items-center group cursor-help ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onClick={toggleTooltip}
    >
      <span className="border-b border-dashed border-cyan/50 hover:border-cyan transition-colors">
        {children}
      </span>
      
      {/* Tooltip Box */}
      <div 
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[220px] sm:max-w-[280px] p-2.5 bg-[#1a1a24] border border-white/15 rounded-lg text-[0.75rem] text-white/90 leading-relaxed shadow-xl transition-all duration-200 z-50 pointer-events-none break-words whitespace-normal text-left font-sans
          ${isVisible ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-1 invisible"}
        `}
      >
        {text}
        {/* Triangle Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-[#1a1a24] drop-shadow-sm" />
      </div>
    </div>
  );
}
