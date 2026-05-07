"use client";

import { motion } from 'framer-motion';

export type TokyoZone = '23ku' | 'tama' | null;

interface InteractiveTokyoMapProps {
  selectedZone: TokyoZone;
  onZoneSelect: (zone: TokyoZone) => void;
}

export default function InteractiveTokyoMap({ selectedZone, onZoneSelect }: InteractiveTokyoMapProps) {
  return (
    <div className="relative w-full aspect-[2/1] min-h-[300px] bg-[#050505] overflow-hidden rounded-3xl border border-white/10 flex items-center justify-center p-4">
      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,229,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent h-full w-full animate-[scan_4s_linear_infinite]" />

      {/* SVG Map Container */}
      <div className="relative w-full max-w-[800px] aspect-[2/1]">
        <svg viewBox="0 0 800 400" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          <defs>
            <linearGradient id="cyber-gradient-23ku" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 229, 255, 0.4)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.4)" />
            </linearGradient>
            <linearGradient id="cyber-gradient-tama" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.4)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.4)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Tama Area (West Tokyo) */}
          <motion.path
            d="M 50,200 L 120,120 L 300,100 L 400,140 L 420,250 L 350,320 L 180,300 L 80,260 Z"
            fill={selectedZone === 'tama' ? 'url(#cyber-gradient-tama)' : 'rgba(255,255,255,0.02)'}
            stroke={selectedZone === 'tama' ? '#a855f7' : 'rgba(255,255,255,0.2)'}
            strokeWidth={selectedZone === 'tama' ? 3 : 1}
            filter={selectedZone === 'tama' ? 'url(#glow)' : ''}
            className="cursor-pointer transition-colors duration-300 hover:fill-purple-500/20 hover:stroke-purple-400"
            onClick={() => onZoneSelect(selectedZone === 'tama' ? null : 'tama')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          />

          {/* 23 Wards Area (East Tokyo) */}
          <motion.path
            d="M 400,140 L 520,130 L 650,180 L 680,260 L 580,330 L 460,340 L 420,250 Z"
            fill={selectedZone === '23ku' ? 'url(#cyber-gradient-23ku)' : 'rgba(255,255,255,0.02)'}
            stroke={selectedZone === '23ku' ? '#00e5ff' : 'rgba(255,255,255,0.2)'}
            strokeWidth={selectedZone === '23ku' ? 3 : 1}
            filter={selectedZone === '23ku' ? 'url(#glow)' : ''}
            className="cursor-pointer transition-colors duration-300 hover:fill-cyan/20 hover:stroke-cyan"
            onClick={() => onZoneSelect(selectedZone === '23ku' ? null : '23ku')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          />

          {/* Labels & Markers */}
          <g className="pointer-events-none">
            {/* Tama Label */}
            <circle cx="220" cy="200" r="4" fill={selectedZone === 'tama' ? '#fff' : '#a855f7'} />
            <circle cx="220" cy="200" r="12" fill="none" stroke={selectedZone === 'tama' ? '#fff' : '#a855f7'} strokeWidth="1" opacity="0.5" className="animate-ping" />
            <text x="240" y="205" fill={selectedZone === 'tama' ? '#fff' : '#a855f7'} className="font-mono text-sm font-bold tracking-widest" filter={selectedZone === 'tama' ? 'url(#glow)' : ''}>TAMA_AREA</text>
            <text x="240" y="225" fill={selectedZone === 'tama' ? '#e2e8f0' : '#94a3b8'} className="text-xs">多摩地域（市部）</text>

            {/* 23 Wards Label */}
            <circle cx="530" cy="230" r="4" fill={selectedZone === '23ku' ? '#fff' : '#00e5ff'} />
            <circle cx="530" cy="230" r="12" fill="none" stroke={selectedZone === '23ku' ? '#fff' : '#00e5ff'} strokeWidth="1" opacity="0.5" className="animate-ping" />
            <text x="550" y="235" fill={selectedZone === '23ku' ? '#fff' : '#00e5ff'} className="font-mono text-sm font-bold tracking-widest" filter={selectedZone === '23ku' ? 'url(#glow)' : ''}>TOKYO_23_WARDS</text>
            <text x="550" y="255" fill={selectedZone === '23ku' ? '#e2e8f0' : '#94a3b8'} className="text-xs">東京23区</text>
          </g>
        </svg>

        {/* Floating UI Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          <div className="px-3 py-1 bg-black/60 border border-white/10 rounded-md backdrop-blur-md">
            <span className="text-xs text-text-muted font-mono">MAP:</span>
            <span className="text-xs font-bold text-white ml-2">TOKYO METROPOLIS</span>
          </div>
          <div className="px-3 py-1 bg-black/60 border border-white/10 rounded-md backdrop-blur-md">
            <span className="text-xs text-text-muted font-mono">STATUS:</span>
            <span className="text-xs font-bold text-emerald ml-2 animate-pulse">LIVE</span>
          </div>
        </div>

        {/* Instruction */}
        {!selectedZone && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/80 border border-cyan/30 rounded-full backdrop-blur-md pointer-events-none"
          >
            <p className="text-sm text-cyan font-bold flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan"></span>
              </span>
              地図上のエリアをクリックして回線を検索
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
