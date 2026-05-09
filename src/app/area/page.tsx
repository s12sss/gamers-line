"use client";

import { useState } from 'react';
import InteractiveJapanMap from '@/components/InteractiveJapanMap';
import { REGION_COVERAGE, RegionId } from '@/utils/regionData';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, XCircle, Zap, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JapanCoveragePage() {
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>(null);

  const regionData = selectedRegion ? REGION_COVERAGE[selectedRegion] : null;

  const renderStatusIcon = (status: 'AVAILABLE' | 'COVERED' | 'LIMITED' | 'UNAVAILABLE') => {
    switch (status) {
      case 'AVAILABLE':
      case 'COVERED':
        return <ShieldCheck className="w-5 h-5 text-emerald" />;
      case 'LIMITED':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'UNAVAILABLE':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const renderStatusText = (status: 'AVAILABLE' | 'COVERED' | 'LIMITED' | 'UNAVAILABLE') => {
    switch (status) {
      case 'AVAILABLE': return <span className="text-emerald font-bold">提供エリア内</span>;
      case 'COVERED': return <span className="text-emerald font-bold">提供エリア内</span>;
      case 'LIMITED': return <span className="text-yellow-500 font-bold">一部エリア対応</span>;
      case 'UNAVAILABLE': return <span className="text-red-500 font-bold">エリア外</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Page Header */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 sm:px-10 pt-10 pb-8 sm:pt-16 sm:pb-12 overflow-hidden">
        <div className="absolute -top-[60px] -right-[80px] w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.08),transparent_70%)] blur-[40px] pointer-events-none" />
        <div className="relative z-10 font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4">
          // AREA COVERAGE
        </div>
        <h1 className="relative z-10 font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-4">
          エリアから<br />
          <span className="gradient-text">対応回線を探す</span>
        </h1>
        <p className="relative z-10 text-sm text-text-muted max-w-[520px] leading-[1.7]">
          あなたの街で使える10Gプランや、地域限定の強力なローカル回線をマップから一発でチェックできます。
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto w-full px-4 sm:px-10 mb-8 sm:mb-12">
        <div className="h-px w-full bg-white/10" />
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-12">
        
        {/* インタラクティブマップ */}
        <InteractiveJapanMap selectedRegion={selectedRegion} onRegionSelect={setSelectedRegion} />
      </div>
      
      <div className="max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {regionData ? (
            <motion.section 
              key={selectedRegion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-black border border-white/10 hover:border-cyan/30 transition-colors duration-300 rounded-[20px] p-6 sm:p-8 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4">
                  <h2 className="font-heading text-[1.4rem] sm:text-[1.5rem] font-bold tracking-tight leading-tight flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan" />
                    {regionData.name}エリア
                  </h2>
                </div>

                {/* Status Grid */}
                <div className="flex gap-6 sm:gap-10 flex-wrap mt-2 mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase">NURO光 対応状況</span>
                    <div className="flex items-center gap-1.5 font-bold text-[1.1rem]">
                      {renderStatusIcon(regionData.status.hasNuro)}
                      {renderStatusText(regionData.status.hasNuro)}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase">GameWith光 対応状況</span>
                    <div className="flex items-center gap-1.5 font-bold text-[1.1rem]">
                      {renderStatusIcon(regionData.status.hasGameWith)}
                      {renderStatusText(regionData.status.hasGameWith)}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase">hi-ho ひかり 対応状況</span>
                    <div className="flex items-center gap-1.5 font-bold text-[1.1rem]">
                      {renderStatusIcon(regionData.status.hasHiHo)}
                      {renderStatusText(regionData.status.hasHiHo)}
                    </div>
                  </div>
                </div>

                {/* Advice Box */}
                <div className="border-t border-white/10 pt-6 mt-6 mb-8">
                  <div className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-cyan mb-2">// 総評</div>
                  <p className="text-[0.875rem] text-text/90 leading-[1.75]">
                    {regionData.status.advice}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                  <Link 
                    href="/diagnosis" 
                    className="group relative inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-cyan to-emerald text-black font-heading font-bold text-base transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,230,118,0.55),0_0_100px_rgba(0,230,118,0.2)] active:scale-95 overflow-hidden w-full sm:w-auto"
                  >
                    <span className="absolute inset-0 bg-white/25 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                    あなたの環境に最適な回線を診断する
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.section>
          ) : (
            <section className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center opacity-50">
              <p className="text-text-muted">上のマップからスキャンしたい地方を選択してください</p>
            </section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
