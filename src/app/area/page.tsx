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
      <div className="max-w-6xl mx-auto pt-24 px-4 mb-12">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            JAPAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-emerald">COVERAGE MAP</span>
          </h1>
          <p className="text-text-muted text-sm sm:text-base max-w-2xl mx-auto">
            日本全国のゲーミング回線インフラ状況をリアルタイムスキャン。
            10G回線の普及率や、地域限定の最強ローカル回線の存在が一目でわかります。
          </p>
        </div>
        
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
              className="bg-[#050505] border border-cyan/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.1)]"
            >
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent h-full w-full animate-[scan_4s_linear_infinite] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                  <div>
                    <div className="text-cyan font-mono text-xs tracking-widest mb-1">SCAN RESULT</div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white flex items-center gap-3">
                      <MapPin className="w-8 h-8 text-cyan" />
                      {regionData.name}エリア
                    </h2>
                  </div>
                </div>

                {/* Status Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 sm:p-5 bg-white/[0.03] border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-cyan/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_0.6s_ease_forwards]" />
                    <div className="flex items-center gap-3 relative z-10">
                      <Zap className="w-5 h-5 text-cyan" />
                      <span className="text-text font-bold">10Gプラン普及率</span>
                    </div>
                    <div className="flex items-center gap-2 relative z-10">
                      {renderStatusIcon(regionData.status.has10G)}
                      {renderStatusText(regionData.status.has10G)}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 bg-white/[0.03] border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-cyan/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_0.6s_ease_forwards]" />
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-5 h-5 rounded flex items-center justify-center bg-white/10 text-[10px] font-bold text-white shrink-0">N</div>
                      <span className="text-text font-bold">NURO光 対応状況</span>
                    </div>
                    <div className="flex items-center gap-2 relative z-10">
                      {renderStatusIcon(regionData.status.hasNuro)}
                      {renderStatusText(regionData.status.hasNuro)}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 bg-white/[0.03] border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-cyan/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_0.6s_ease_forwards]" />
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-5 h-5 rounded flex items-center justify-center bg-white/10 text-[10px] font-bold text-white shrink-0">G</div>
                      <span className="text-text font-bold">GameWith光 対応状況</span>
                    </div>
                    <div className="flex items-center gap-2 relative z-10">
                      {renderStatusIcon(regionData.status.hasGameWith)}
                      {renderStatusText(regionData.status.hasGameWith)}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 bg-white/[0.03] border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-cyan/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_0.6s_ease_forwards]" />
                    <div className="flex items-center gap-3 relative z-10">
                      <ShieldCheck className="w-5 h-5 text-purple-400" />
                      <span className="text-text font-bold">地域最強ローカル回線</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {regionData.status.localIsp ? (
                        <>
                          <ShieldCheck className="w-5 h-5 text-emerald" />
                          <span className="text-emerald font-bold">推奨：{regionData.status.localIsp}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-text-muted" />
                          <span className="text-text-muted font-bold">特になし</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Advice Box */}
                <div className="p-6 bg-cyan/5 border border-cyan/20 rounded-2xl mb-8">
                  <h3 className="text-cyan font-bold mb-2 flex items-center gap-2">
                    <span className="text-lg">💡</span> {regionData.name}のゲーマーへの総評
                  </h3>
                  <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                    {regionData.status.advice}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                  <Link 
                    href="/diagnosis" 
                    className="group relative inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-cyan text-black font-heading font-bold text-base transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,229,255,0.55),0_0_100px_rgba(0,229,255,0.2)] active:scale-95 overflow-hidden w-full sm:w-auto"
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
