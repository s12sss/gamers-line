"use client";

import { useState } from 'react';
import { Calculator, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SwitchingSimulator() {
  const [currentFee, setCurrentFee] = useState<number>(5000);
  const [penaltyFee, setPenaltyFee] = useState<number>(10000);
  const [monthsLeft, setMonthsLeft] = useState<number>(5);
  const [newFee, setNewFee] = useState<number>(4500);
  const [cashback, setCashback] = useState<number>(40000);

  // A: 今すぐ乗り換えるパターンのコスト（更新月までの期間で計算）
  // = 違約金 + (新しい月額 * 残り月数) - キャッシュバック
  const costIfSwitchNow = penaltyFee + (newFee * monthsLeft) - cashback;

  // B: 更新月まで待つパターンのコスト
  // = 現在の月額 * 残り月数
  const costIfWait = currentFee * monthsLeft;

  // 差額（プラスなら乗り換えた方がお得、マイナスなら待った方がお得）
  const diff = costIfWait - costIfSwitchNow;
  const isSwitchBetter = diff > 0;

  return (
    <div className="bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
      {/* Cyber Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center border border-cyan/20 text-cyan">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold">乗り換え損益シミュレーター</h2>
          <p className="text-sm text-text-muted">違約金を払ってでも今すぐ乗り換えるべきか判定します</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-5">
            <h3 className="text-sm font-bold text-text mb-4 border-b border-white/10 pb-2">現在の契約状況</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs text-text-muted">現在の月額料金</label>
                <span className="text-sm font-mono text-cyan">{currentFee.toLocaleString()}円</span>
              </div>
              <input type="range" min="2000" max="10000" step="100" value={currentFee} onChange={(e) => setCurrentFee(Number(e.target.value))} className="w-full accent-cyan" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs text-text-muted">解約違約金・工事費残債</label>
                <span className="text-sm font-mono text-cyan">{penaltyFee.toLocaleString()}円</span>
              </div>
              <input type="range" min="0" max="50000" step="1000" value={penaltyFee} onChange={(e) => setPenaltyFee(Number(e.target.value))} className="w-full accent-cyan" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs text-text-muted">更新月（違約金0円）までの残り月数</label>
                <span className="text-sm font-mono text-cyan">{monthsLeft}ヶ月</span>
              </div>
              <input type="range" min="1" max="24" step="1" value={monthsLeft} onChange={(e) => setMonthsLeft(Number(e.target.value))} className="w-full accent-cyan" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-5">
            <h3 className="text-sm font-bold text-text mb-4 border-b border-white/10 pb-2">乗り換え先の予定</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs text-text-muted">乗り換え先の月額料金</label>
                <span className="text-sm font-mono text-emerald">{newFee.toLocaleString()}円</span>
              </div>
              <input type="range" min="2000" max="10000" step="100" value={newFee} onChange={(e) => setNewFee(Number(e.target.value))} className="w-full accent-emerald" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs text-text-muted">予想キャッシュバック額</label>
                <span className="text-sm font-mono text-emerald">{cashback.toLocaleString()}円</span>
              </div>
              <input type="range" min="0" max="100000" step="5000" value={cashback} onChange={(e) => setCashback(Number(e.target.value))} className="w-full accent-emerald" />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col">
          <div className="flex-1 bg-[#050508] border border-cyan/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan to-emerald" />
            
            <div className="text-center mb-8">
              <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] mb-2 uppercase">SYSTEM VERDICT</div>
              {isSwitchBetter ? (
                <>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 whitespace-nowrap tracking-tight">今すぐ乗り換えた方がお得！</h3>
                  <p className="text-sm text-text-muted">違約金を払っても、キャッシュバックと月額差額で回収できます。</p>
                </>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 whitespace-nowrap tracking-tight">更新月まで待つのが無難です</h3>
                  <p className="text-sm text-text-muted">現在の条件では、今すぐ乗り換えるとトータルで損になります。</p>
                </>
              )}
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 mb-6 flex flex-col items-center justify-center">
              <div className="text-xs text-text-muted mb-1">更新月までのトータル差額</div>
              <div className={`font-mono text-4xl sm:text-5xl font-bold drop-shadow-lg ${isSwitchBetter ? 'text-cyan' : 'text-red-400'}`}>
                {isSwitchBetter ? '+' : ''}{diff.toLocaleString()} <span className="text-base text-text-muted font-sans">円</span>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">今すぐ乗り換えた場合の{monthsLeft}ヶ月の負担</span>
                <span className="font-mono text-white">{costIfSwitchNow.toLocaleString()}円</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">待った場合の{monthsLeft}ヶ月の負担</span>
                <span className="font-mono text-white">{costIfWait.toLocaleString()}円</span>
              </div>
            </div>

            {isSwitchBetter && (
              <Link href="/provider" className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-cyan text-black font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:-translate-y-0.5 no-underline">
                <CheckCircle2 className="w-5 h-5" />
                乗り換え先プロバイダを探す
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            {!isSwitchBetter && (
              <div className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 text-text-muted text-sm border border-white/10 cursor-not-allowed">
                <AlertTriangle className="w-5 h-5" />
                更新月まで待機推奨
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
