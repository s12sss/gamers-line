"use client";

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight === 0) return;
      setProgress((totalScroll / windowHeight) * 100);
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-cyan to-emerald z-[200] shadow-[0_0_8px_rgba(0,229,255,0.6)] transition-all duration-100 ease-linear"
      style={{ width: `${progress}%` }}
    />
  );
}
