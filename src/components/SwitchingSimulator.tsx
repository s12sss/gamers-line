"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function SwitchingSimulator({ hideProviderLink }: { hideProviderLink?: boolean } = {}) {
  const [currentFee, setCurrentFee] = useState<number>(5000);
  const [penaltyFee, setPenaltyFee] = useState<number>(10000);
  const [monthsLeft, setMonthsLeft] = useState<number>(5);
  const [newFee, setNewFee] = useState<number>(4500);
  const [cashback, setCashback] = useState<number>(40000);
  const [penaltyCover, setPenaltyCover] = useState<number>(0);

  const effectivePenalty = Math.max(0, penaltyFee - penaltyCover);
  const costIfSwitchNow = effectivePenalty + (newFee * monthsLeft) - cashback;
  const costIfWait = currentFee * monthsLeft;
  const diff = costIfWait - costIfSwitchNow;
  const isSwitchBetter = diff > 0;

  return (
    <div className="bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">

      {/* Header */}
      <div className="pb-5 border-b border-white/10">
        <div className="font-mono text-[0.62rem] text-cyan tracking-[0.2em] uppercase mb-2 opacity-80">
          TOOL 01 · SWITCH ROI SIMULATOR
        </div>
        <h2 className="font-heading text-xl font-bold text-white mb-1">乗り換え損益シミュレーター</h2>
        <p className="text-sm text-text-muted">違約金を払ってでも今すぐ乗り換えるべきか、自動判定します。</p>
      </div>

      {/* Inputs - 2 column */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* 現在の契約状況 */}
        <div className="space-y-5">
          <h3 className="font-mono text-[0.65rem] text-text-muted tracking-widest uppercase pb-2 border-b border-white/10">
            現在の契約状況
          </h3>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">現在の月額料金</span>
              <span className="font-mono text-cyan">{currentFee.toLocaleString()}円</span>
            </div>
            <input type="range" min="2000" max="10000" step="100" value={currentFee} onChange={(e) => setCurrentFee(Number(e.target.value))} className="w-full accent-cyan" />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">解約違約金・工事費残債</span>
              <span className="font-mono text-cyan">{penaltyFee.toLocaleString()}円</span>
            </div>
            <input type="range" min="0" max="50000" step="1000" value={penaltyFee} onChange={(e) => setPenaltyFee(Number(e.target.value))} className="w-full accent-cyan" />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">更新月までの残り月数</span>
              <span className="font-mono text-cyan">{monthsLeft}ヶ月</span>
            </div>
            <input type="range" min="1" max="24" step="1" value={monthsLeft} onChange={(e) => setMonthsLeft(Number(e.target.value))} className="w-full accent-cyan" />
          </div>
        </div>

        {/* 乗り換え先 */}
        <div className="space-y-5">
          <h3 className="font-mono text-[0.65rem] text-text-muted tracking-widest uppercase pb-2 border-b border-white/10">
            乗り換え先
          </h3>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">乗り換え先の月額料金</span>
              <span className="font-mono text-emerald">{newFee.toLocaleString()}円</span>
            </div>
            <input type="range" min="2000" max="10000" step="100" value={newFee} onChange={(e) => setNewFee(Number(e.target.value))} className="w-full accent-emerald" />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">予想キャッシュバック額</span>
              <span className="font-mono text-emerald">{cashback.toLocaleString()}円</span>
            </div>
            <input type="range" min="0" max="100000" step="5000" value={cashback} onChange={(e) => setCashback(Number(e.target.value))} className="w-full accent-emerald" />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">他社違約金負担（新回線の還元額）</span>
              <span className="font-mono text-emerald">{penaltyCover.toLocaleString()}円</span>
            </div>
            <input type="range" min="0" max="200000" step="10000" value={penaltyCover} onChange={(e) => setPenaltyCover(Number(e.target.value))} className="w-full accent-emerald" />
          </div>
        </div>
      </div>

      {/* Verdict - full width */}
      <div className={`rounded-xl p-5 border-l-4 ${
        isSwitchBetter
          ? 'border-emerald bg-emerald/[0.05] border border-emerald/20'
          : 'border-red-400 bg-red-500/[0.04] border border-red-500/15'
      }`}>
        <div className={`font-mono text-[0.62rem] tracking-[0.2em] uppercase mb-2 ${isSwitchBetter ? 'text-emerald' : 'text-red-400'}`}>
          SYSTEM VERDICT
        </div>
        <h3 className="font-heading font-bold text-lg text-white mb-1">
          {isSwitchBetter ? '今すぐ乗り換えた方がお得。' : '更新月まで待つのが無難。'}
        </h3>
        <p className="text-sm text-text-muted mb-4">
          {isSwitchBetter
            ? '違約金を払っても、キャッシュバックと月額差額で十分回収できます。'
            : '現在の条件では、今すぐ乗り換えるとトータルで損になります。'}
        </p>
        <div className={`font-mono font-bold text-3xl sm:text-4xl mb-4 ${isSwitchBetter ? 'text-emerald' : 'text-red-400'}`}>
          {isSwitchBetter ? '+' : ''}{diff.toLocaleString()}<span className="text-base text-text-muted font-sans ml-1">円</span>
        </div>
        <div className="flex justify-between text-xs text-text-muted pt-3 border-t border-white/[0.08]">
          <span>今すぐ乗換 / {monthsLeft}ヶ月: <span className="font-mono text-white">¥{costIfSwitchNow.toLocaleString()}</span></span>
          <span>待つ / {monthsLeft}ヶ月: <span className="font-mono text-white">¥{costIfWait.toLocaleString()}</span></span>
        </div>
        {isSwitchBetter && !hideProviderLink && (
          <Link href="/provider" className="group mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan text-black font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:-translate-y-0.5 no-underline">
            <CheckCircle2 className="w-4 h-4" />
            乗り換え先プロバイダを探す
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
        {!isSwitchBetter && (
          <div className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 text-text-muted text-sm border border-white/10 cursor-not-allowed">
            <AlertTriangle className="w-4 h-4" />
            更新月まで待機推奨
          </div>
        )}
      </div>
    </div>
  );
}
