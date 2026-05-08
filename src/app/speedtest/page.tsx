"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Download, Zap, Trophy, ChevronRight, Share2, AlertTriangle, RefreshCw } from 'lucide-react';
import ispsData from '@/data/isps.json';
import Link from 'next/link';

type Tier = 'GOD' | 'MASTER' | 'DIAMOND' | 'GOLD' | 'SILVER' | 'BRONZE';

interface TestResult {
  ping: number;
  speed: number;
  tier: Tier;
}

interface RankingEntry {
  id: string;
  name: string;
  isp: string;
  ping: number;
  speed: number;
  tier: Tier;
  date: string;
}

const TIER_COLORS = {
  GOD: 'text-[#ffeb3b] drop-shadow-[0_0_15px_rgba(255,235,59,0.8)]',
  MASTER: 'text-[#e040fb] drop-shadow-[0_0_15px_rgba(224,64,251,0.8)]',
  DIAMOND: 'text-[#00e5ff] drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]',
  GOLD: 'text-[#ffd700]',
  SILVER: 'text-[#c0c0c0]',
  BRONZE: 'text-[#cd7f32]'
};

export default function SpeedTestPage() {
  const [status, setStatus] = useState<'IDLE' | 'TESTING_PING' | 'TESTING_SPEED' | 'RESULT'>('IDLE');
  const [progress, setProgress] = useState(0);
  const [ping, setPing] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [result, setResult] = useState<TestResult | null>(null);
  
  const [name, setName] = useState('');
  const [selectedIsp, setSelectedIsp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [rankings, setRankings] = useState<RankingEntry[]>([]);

  // 階級判定ロジック
  const calculateTier = (pingResult: number, speedResult: number): Tier => {
    if (pingResult <= 10 && speedResult >= 500) return 'GOD';
    if (pingResult <= 20 && speedResult >= 300) return 'MASTER';
    if (pingResult <= 30 && speedResult >= 200) return 'DIAMOND';
    if (pingResult <= 40 && speedResult >= 100) return 'GOLD';
    if (pingResult <= 60 && speedResult >= 50) return 'SILVER';
    return 'BRONZE';
  };

  const runTest = async () => {
    setStatus('TESTING_PING');
    setProgress(0);
    setResult(null);
    setHasSubmitted(false);

    // 1. Ping測定 (複数回平均)
    let totalPing = 0;
    const pingSamples = 5;
    for (let i = 0; i < pingSamples; i++) {
      const start = performance.now();
      await fetch('/api/ping?t=' + Date.now(), { cache: 'no-store' }).catch(() => {});
      const end = performance.now();
      totalPing += (end - start);
      setPing(Math.round(totalPing / (i + 1)));
      setProgress(((i + 1) / pingSamples) * 30);
      await new Promise(resolve => setTimeout(resolve, 100)); // インターバル
    }
    const finalPing = Math.round(totalPing / pingSamples);

    setStatus('TESTING_SPEED');
    // 2. 速度測定 (1MBダウンロード複数回)
    let totalSpeed = 0;
    const speedSamples = 3;
    for (let i = 0; i < speedSamples; i++) {
      const start = performance.now();
      const res = await fetch('/api/speed?t=' + Date.now(), { cache: 'no-store' }).catch(() => null);
      if (res) {
        await res.text(); // データ読み込み完了まで待つ
        const end = performance.now();
        const durationSec = (end - start) / 1000;
        const mbps = (1 * 8) / durationSec; // 1MB * 8bits / sec
        totalSpeed += mbps;
        setSpeed(Math.round(totalSpeed / (i + 1)));
      }
      setProgress(30 + ((i + 1) / speedSamples) * 70);
    }
    const finalSpeed = Math.round(totalSpeed / speedSamples);

    const tier = calculateTier(finalPing, finalSpeed);
    setResult({ ping: finalPing, speed: finalSpeed, tier });
    setStatus('RESULT');
  };

  const fetchRankings = async () => {
    try {
      const res = await fetch('/api/ranking');
      const data = await res.json();
      if (data.rankings) {
        setRankings(data.rankings);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  const submitScore = async () => {
    if (!name.trim() || !result) return;
    setIsSubmitting(true);
    try {
      await fetch('/api/ranking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          isp: selectedIsp,
          ping: result.ping,
          speed: result.speed,
          tier: result.tier
        })
      });
      setHasSubmitted(true);
      fetchRankings(); // ランキング再取得
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareOnX = () => {
    if (!result) return;
    const text = `Gamer's Lineで回線速度を測定しました！\n\n📶 Ping: ${result.ping}ms\n🚀 ダウンロード: ${result.speed}Mbps\n🏆 私の階級は【${result.tier}】でした！\n\nあなたの回線ランクは？\n#GamersLine #回線ランクマスター\n`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20">
      {/* Header */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 sm:px-10 pt-10 pb-8 sm:pt-16 sm:pb-12 overflow-hidden">
        <div className="absolute -top-[60px] -right-[80px] w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.08),transparent_70%)] blur-[40px] pointer-events-none" />
        <div className="relative z-10 font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4">
          // CONNECTION RANK MASTER
        </div>
        <h1 className="relative z-10 font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-4">
          回線ランク<br />
          <span className="gradient-text">測定＆リーダーボード</span>
        </h1>
        <p className="relative z-10 text-sm text-text-muted max-w-[520px] leading-[1.7]">
          ブラウザ上でPingとダウンロード速度を簡易測定し、ゲーマー階級を判定します。上位を目指してランキングに挑戦しましょう。
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 mb-16">
        {/* Test Section */}
        <div className="bg-[#0a0a12] border border-white/10 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          {status !== 'RESULT' && (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              
              {/* Circular Meter */}
              <div className="relative w-48 h-48 mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                  <motion.circle 
                    cx="50" cy="50" r="45" fill="none" stroke="#00e5ff" strokeWidth="4"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progress) / 100}
                    className="transition-all duration-300 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {status === 'IDLE' ? (
                    <Zap className="w-12 h-12 text-cyan opacity-50 mb-2" />
                  ) : (
                    <>
                      <span className="font-mono text-3xl font-bold text-white">
                        {status === 'TESTING_PING' ? ping : speed}
                      </span>
                      <span className="font-mono text-[0.65rem] text-cyan uppercase tracking-widest mt-1">
                        {status === 'TESTING_PING' ? 'Ping (ms)' : 'Down (Mbps)'}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {status === 'IDLE' ? (
                <button 
                  onClick={runTest}
                  className="px-10 py-4 bg-cyan text-black font-heading font-bold text-lg rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                >
                  <Activity className="w-5 h-5" /> 測定スタート
                </button>
              ) : (
                <div className="font-mono text-sm text-cyan animate-pulse flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {status === 'TESTING_PING' ? 'Pingを測定中...' : 'ダウンロード速度を測定中...'}
                </div>
              )}
            </div>
          )}

          <AnimatePresence>
            {status === 'RESULT' && result && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-[300px]"
              >
                <div className="font-mono text-[0.8rem] text-text-muted tracking-widest mb-2 uppercase">あなたの階級</div>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                  className={`font-heading text-5xl sm:text-7xl font-black mb-8 tracking-tighter ${TIER_COLORS[result.tier]}`}
                >
                  {result.tier}
                </motion.h2>

                <div className="grid grid-cols-2 gap-4 sm:gap-8 w-full max-w-md mb-10">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center">
                    <Activity className="w-5 h-5 text-emerald mb-2" />
                    <span className="font-mono text-2xl font-bold text-white">{result.ping} <span className="text-sm text-text-muted">ms</span></span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center">
                    <Download className="w-5 h-5 text-cyan mb-2" />
                    <span className="font-mono text-2xl font-bold text-white">{result.speed} <span className="text-sm text-text-muted">Mbps</span></span>
                  </div>
                </div>

                {/* ブロンズ・シルバーの場合の強い導線 */}
                {(result.tier === 'BRONZE' || result.tier === 'SILVER') && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 mb-10 w-full max-w-md text-left">
                    <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                      <AlertTriangle className="w-5 h-5" /> 致命的なラグが発生している可能性があります
                    </div>
                    <p className="text-sm text-text/80 mb-4">
                      このPing値ではFPSなどの競技ゲームで明確に不利になります。環境の改善、またはゲーマー専用回線への乗り換えを強くおすすめします。
                    </p>
                    <Link href="/provider/hi-ho" className="inline-flex items-center justify-center w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors">
                      ラグを解消する最強回線を見る
                    </Link>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <button onClick={shareOnX} className="flex-1 py-3.5 bg-black border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" /> 結果をXでシェア
                  </button>
                  <button onClick={runTest} className="py-3.5 px-6 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors">
                    再測定
                  </button>
                </div>

                {/* ランキング登録フォーム */}
                {!hasSubmitted ? (
                  <div className="mt-12 pt-10 border-t border-white/10 w-full max-w-md text-left">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-[#ffd700]" /> ランキングに登録する</h3>
                    <div className="space-y-4">
                      <div>
                        <input 
                          type="text" placeholder="プレイヤー名（最大20文字）" maxLength={20}
                          value={name} onChange={(e) => setName(e.target.value)}
                          className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                        />
                      </div>
                      <div>
                        <select 
                          value={selectedIsp} onChange={(e) => setSelectedIsp(e.target.value)}
                          className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-cyan focus:outline-none appearance-none"
                        >
                          <option value="">利用している回線を選択（任意）</option>
                          <option value="不明/その他">不明/その他</option>
                          {ispsData.map(isp => (
                            <option key={isp.id} value={isp.name}>{isp.name}</option>
                          ))}
                        </select>
                      </div>
                      <button 
                        onClick={submitScore} disabled={isSubmitting || !name.trim()}
                        className="w-full py-3 bg-cyan text-black font-bold rounded-lg hover:bg-cyan/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? '登録中...' : 'スコアを登録する'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-12 pt-10 border-t border-white/10 w-full max-w-md text-center text-emerald font-bold flex items-center justify-center gap-2">
                    <Activity className="w-5 h-5" /> ランキングへの登録が完了しました！
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-cyan" /> トッププレイヤー (Top 50)
        </h2>
        
        <div className="bg-[#0a0a12] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 font-mono text-[0.7rem] text-white/50 tracking-widest uppercase font-normal">Rank</th>
                  <th className="px-6 py-4 font-mono text-[0.7rem] text-white/50 tracking-widest uppercase font-normal">Player</th>
                  <th className="px-6 py-4 font-mono text-[0.7rem] text-white/50 tracking-widest uppercase font-normal">Ping</th>
                  <th className="px-6 py-4 font-mono text-[0.7rem] text-white/50 tracking-widest uppercase font-normal">Speed</th>
                  <th className="px-6 py-4 font-mono text-[0.7rem] text-white/50 tracking-widest uppercase font-normal">Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rankings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-text-muted text-sm">
                      データがありません。最初のチャレンジャーになりましょう！
                    </td>
                  </tr>
                ) : (
                  rankings.map((entry, idx) => (
                    <tr key={entry.id || idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <span className={`font-mono font-bold text-lg ${idx === 0 ? 'text-[#ffd700]' : idx === 1 ? 'text-[#c0c0c0]' : idx === 2 ? 'text-[#cd7f32]' : 'text-white/50'}`}>
                          #{idx + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-white mb-0.5">{entry.name}</div>
                        <div className="text-[0.65rem] text-text-muted bg-white/5 px-2 py-0.5 rounded-full inline-block truncate max-w-[150px]">{entry.isp}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <Activity className={`w-3.5 h-3.5 ${entry.ping <= 15 ? 'text-emerald' : 'text-text-muted'}`} />
                          <span className={`font-mono font-bold ${entry.ping <= 15 ? 'text-emerald' : 'text-white'}`}>{entry.ping} <span className="text-[0.65rem] text-white/50 font-sans">ms</span></span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-white">{entry.speed} <span className="text-[0.65rem] text-white/50 font-sans">Mbps</span></span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-mono text-sm font-bold ${TIER_COLORS[entry.tier] || 'text-white'}`}>
                          {entry.tier}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
