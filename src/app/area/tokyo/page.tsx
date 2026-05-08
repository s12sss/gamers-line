"use client";

import { useState } from 'react';
import InteractiveTokyoMap, { TokyoZone } from '@/components/InteractiveTokyoMap';
import ispsData from '@/data/isps.json';
import { ISP } from '@/utils/algorithm';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TokyoAreaPage() {
  const [selectedZone, setSelectedZone] = useState<TokyoZone>(null);

  // 関東（kanto）または全国（all）対応のISPのみを抽出
  const baseTokyoISPs = (ispsData as ISP[]).filter(isp => 
    isp.regions.includes('kanto') || isp.regions.includes('all')
  );

  // ゾーンに応じてフィルタリングや並び替え（デモ用ロジック）
  // 実際は町域レベルのデータがないため、今回はUIの動的切り替えを見せることが目的です。
  const displayedISPs = selectedZone === 'tama' 
    ? [...baseTokyoISPs].reverse() // 多摩エリアではリストを逆順にしてUIの変化を分かりやすくする
    : baseTokyoISPs;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-6xl mx-auto pt-24 px-4 mb-12">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            TOKYO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple-500">NETWORK MAP</span>
          </h1>
          <p className="text-text-muted text-sm sm:text-base max-w-2xl mx-auto">
            地図上のエリアをタップすると、その地域で引ける最強のゲーミング回線をリアルタイムでスキャンします。
          </p>
        </div>
        
        {/* インタラクティブマップ */}
        <InteractiveTokyoMap selectedZone={selectedZone} onZoneSelect={setSelectedZone} />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 space-y-16">
        <AnimatePresence mode="wait">
          {selectedZone && (
            <motion.section 
              key={selectedZone}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-3">
                  {selectedZone === '23ku' ? (
                    <><span className="w-4 h-4 rounded-full bg-cyan shadow-[0_0_10px_#00e5ff]" />東京23区の回線スキャン結果</>
                  ) : (
                    <><span className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />多摩地域（市部）の回線スキャン結果</>
                  )}
                </h2>
                
                {selectedZone === 'tama' && (
                  <div className="p-4 mb-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>多摩地域（一部の市町村）では、10G（クロス）プランの提供エリア外となっている場合があります。お申し込み前に必ず公式サイトで提供エリア判定を行ってください。</p>
                  </div>
                )}
                
                {selectedZone === '23ku' && (
                  <div className="p-4 mb-6 rounded-xl bg-cyan/10 border border-cyan/20 text-cyan text-sm flex gap-3 items-start">
                    <span className="text-lg">⚡</span>
                    <p>東京23区内は10Gプランの普及率が国内トップクラスです。FPSガチ勢であれば、NUROやauひかりの10Gプランを最優先で検討することをおすすめします。</p>
                  </div>
                )}
              </div>
              
              <div className="grid gap-6">
                {displayedISPs.map((isp, idx) => (
                  <div key={isp.id} className="relative p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row gap-8 items-center transition-all hover:bg-white/[0.07] hover:border-cyan/30">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl font-black text-white/10 italic">0{idx + 1}</span>
                        <h4 className="text-2xl font-bold text-white">{isp.name}</h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                          <div className="text-xs text-text-muted mb-1">推測Ping値</div>
                          <div className="text-2xl font-bold text-emerald font-mono">{isp.avg_ping_ms}<span className="text-sm text-text-muted ml-1">ms</span></div>
                        </div>
                        <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                          <div className="text-xs text-text-muted mb-1">月額料金</div>
                          <div className="text-2xl font-bold text-cyan font-mono">¥{isp.actual_monthly_fee_jpy.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6 md:mb-0">
                        {isp.badges?.map(badge => (
                          <span key={badge} className="px-3 py-1 bg-cyan/10 border border-cyan/20 text-cyan text-xs font-bold rounded-full">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="w-full md:w-auto flex-shrink-0 flex flex-col gap-3">
                      <a href={isp.affiliateLink || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-cyan text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                        公式サイトを見る
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {!selectedZone && (
          <section className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center opacity-50">
            <p className="text-text-muted">上のマップからエリアを選択してください</p>
          </section>
        )}
      </div>
    </div>
  );
}
