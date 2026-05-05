"use client";

import { useState, useRef } from "react";

export default function Tooltip({ text, children, className = "" }: { text: string; children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'center' | 'left' | 'right'>('center');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const tooltipWidth = 240; 
      if (rect.left < tooltipWidth / 2) {
        setPosition('left');
      } else if (window.innerWidth - rect.right < tooltipWidth / 2) {
        setPosition('right');
      } else {
        setPosition('center');
      }
    }
    
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

  const getPositionClasses = () => {
    if (position === 'left') return "left-0 translate-x-0";
    if (position === 'right') return "right-0 translate-x-0";
    return "left-1/2 -translate-x-1/2";
  };

  const getArrowClasses = () => {
    if (position === 'left') return "left-4 translate-x-0";
    if (position === 'right') return "right-4 translate-x-0";
    return "left-1/2 -translate-x-1/2";
  };

  return (
    <div 
      ref={containerRef}
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
        className={`absolute bottom-full ${getPositionClasses()} mb-2 w-max max-w-[240px] sm:max-w-[280px] p-2.5 bg-[#1a1a24] border border-white/15 rounded-lg text-[0.75rem] text-white/90 leading-relaxed shadow-xl transition-all duration-200 z-50 pointer-events-none break-words whitespace-normal text-left font-sans
          ${isVisible ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-1 invisible"}
        `}
      >
        {text}
        {/* Triangle Arrow */}
        <div className={`absolute top-full ${getArrowClasses()} -mt-px border-[6px] border-transparent border-t-[#1a1a24] drop-shadow-sm`} />
      </div>
    </div>
  );
}
