"use client";

import { motion } from 'framer-motion';
import { RegionId } from '@/utils/regionData';

interface InteractiveJapanMapProps {
  selectedRegion: RegionId | null;
  onRegionSelect: (region: RegionId | null) => void;
}

export default function InteractiveJapanMap({ selectedRegion, onRegionSelect }: InteractiveJapanMapProps) {
  // サイバーパンク風のローポリゴン日本地図データ
  const regions: { id: RegionId; name: string; path: string; center: { x: number, y: number } }[] = [
    { id: 'hokkaido', name: '北海道', path: 'M 600,50 L 750,50 L 800,150 L 650,200 L 550,150 Z', center: { x: 670, y: 120 } },
    { id: 'tohoku', name: '東北', path: 'M 550,170 L 650,220 L 600,350 L 500,350 Z', center: { x: 575, y: 260 } },
    { id: 'kanto', name: '関東', path: 'M 520,360 L 600,360 L 580,460 L 500,460 Z', center: { x: 550, y: 410 } },
    { id: 'chubu', name: '中部', path: 'M 420,300 L 520,300 L 490,450 L 390,400 Z', center: { x: 450, y: 360 } },
    { id: 'kansai', name: '関西', path: 'M 320,350 L 410,320 L 380,450 L 290,400 Z', center: { x: 350, y: 380 } },
    { id: 'chugoku', name: '中国', path: 'M 180,350 L 310,350 L 280,400 L 150,400 Z', center: { x: 230, y: 375 } },
    { id: 'shikoku', name: '四国', path: 'M 220,420 L 320,420 L 280,480 L 180,480 Z', center: { x: 250, y: 450 } },
    { id: 'kyushu', name: '九州・沖縄', path: 'M 80,400 L 160,400 L 130,550 L 30,550 Z', center: { x: 95, y: 475 } },
  ];

  return (
    <div className="relative w-full min-h-[450px] sm:aspect-video sm:min-h-[400px] bg-[#050505] overflow-hidden rounded-[20px] sm:rounded-3xl border border-white/10 flex items-center justify-center p-4 pt-16 sm:p-4">
      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,229,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent h-full w-full animate-[scan_4s_linear_infinite]" />

      {/* SVG Map Container */}
      <div className="relative w-full h-full max-w-[800px] flex items-center justify-center">
        <svg viewBox="0 0 850 600" preserveAspectRatio="xMidYMid meet" className="w-full max-h-full drop-shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          <defs>
            <linearGradient id="cyber-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 229, 255, 0.4)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.4)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {regions.map((region) => {
            const isSelected = selectedRegion === region.id;
            return (
              <g key={region.id}>
                <motion.path
                  d={region.path}
                  fill={isSelected ? 'url(#cyber-gradient)' : 'rgba(255,255,255,0.03)'}
                  stroke={isSelected ? '#00e5ff' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={isSelected ? 3 : 1}
                  filter={isSelected ? 'url(#glow)' : ''}
                  className="cursor-pointer transition-colors duration-300 hover:fill-cyan/20 hover:stroke-cyan"
                  onClick={() => onRegionSelect(isSelected ? null : region.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ originX: region.center.x / 850, originY: region.center.y / 600 }}
                />
                <circle 
                  cx={region.center.x} 
                  cy={region.center.y} 
                  r="3" 
                  fill={isSelected ? '#fff' : '#00e5ff'} 
                  className="pointer-events-none"
                />
                <text 
                  x={region.center.x + 8} 
                  y={region.center.y + 6} 
                  fill={isSelected ? '#fff' : '#94a3b8'} 
                  className="font-bold text-[20px] pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  filter={isSelected ? 'url(#glow)' : ''}
                >
                  {region.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating UI Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          <div className="px-3 py-1 bg-black/60 border border-white/10 rounded-md backdrop-blur-md">
            <span className="text-xs text-text-muted font-mono">MAP:</span>
            <span className="text-xs font-bold text-white ml-2">JAPAN REGIONS</span>
          </div>
          <div className="px-3 py-1 bg-black/60 border border-white/10 rounded-md backdrop-blur-md">
            <span className="text-xs text-text-muted font-mono">STATUS:</span>
            {selectedRegion ? (
              <span className="text-xs font-bold text-emerald ml-2">SELECTED</span>
            ) : (
              <span className="text-xs font-bold text-white ml-2">WAITING</span>
            )}
          </div>
        </div>

        {/* Instruction overlay removed for better map visibility */}
      </div>
    </div>
  );
}
