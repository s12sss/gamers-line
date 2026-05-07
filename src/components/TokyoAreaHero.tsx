"use client";

import { motion } from 'framer-motion';
import { MapPin, Crosshair, Zap } from 'lucide-react';

export default function TokyoAreaHero() {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] bg-[#050505] overflow-hidden flex items-center justify-center border-b border-white/10">
      {/* Abstract Tokyo Map Grid / Radar Effect */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[800px] h-[800px] border border-cyan/20 rounded-full absolute animate-[spin_60s_linear_infinite]" />
        <div className="w-[600px] h-[600px] border border-cyan/10 rounded-full absolute" />
        <div className="w-[400px] h-[400px] border border-cyan/30 rounded-full absolute border-dashed" />
        
        {/* Radar Scanner Line */}
        <div className="absolute w-[400px] h-[400px] rounded-full overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-tr from-cyan/40 to-transparent origin-top-left animate-[spin_4s_linear_infinite]" />
        </div>

        {/* Abstract Wards Nodes */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute mt-[-40px] ml-[20px] w-3 h-3 bg-emerald shadow-[0_0_15px_rgba(16,185,129,0.8)] rounded-full" 
        >
          <div className="absolute top-4 left-4 text-emerald font-mono text-[10px] tracking-widest">SHINJUKU_NODE</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute mt-[60px] ml-[80px] w-4 h-4 bg-cyan shadow-[0_0_20px_rgba(0,229,255,0.8)] rounded-full flex items-center justify-center" 
        >
          <div className="w-2 h-2 bg-white rounded-full animate-ping" />
          <div className="absolute top-5 left-5 text-cyan font-mono text-[10px] tracking-widest whitespace-nowrap">AKIHABARA_HUB</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="absolute mt-[120px] ml-[-100px] w-2 h-2 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] rounded-full" 
        >
          <div className="absolute top-3 right-3 text-purple-400 font-mono text-[10px] tracking-widest">SHIBUYA_NODE</div>
        </motion.div>
      </div>

      {/* Crosshair Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan/50" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-cyan/50" />
        <Crosshair className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-cyan opacity-30" strokeWidth={0.5} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-sm font-bold tracking-widest mb-6"
        >
          <MapPin className="w-4 h-4" />
          TOKYO AREA NETWORK
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-heading text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight"
        >
          東京都の<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-emerald">最強ゲーミング回線</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-text-muted max-w-2xl mx-auto leading-relaxed text-sm sm:text-base"
        >
          東京エリア（23区・多摩地域）で利用可能な、Ping値特化型の光回線のみを厳選。
          Nuro光やauひかりなど、都内屈指のパフォーマンスを誇るプロバイダの提供状況と実測データをまとめました。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl"
        >
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="text-white font-bold font-mono">STATUS: 10Gbps COVERAGE EXCELLENT</span>
        </motion.div>
      </div>
    </div>
  );
}
