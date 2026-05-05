"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Home, Smartphone, Zap, Wallet, ChevronRight, ChevronLeft, Activity, Check, MapPin, Download } from 'lucide-react';
import { UserAnswers, recommendISPs, ISP } from '@/utils/algorithm';
import ispsData from '@/data/isps.json';
import Link from 'next/link';

const isps = ispsData as ISP[];

function OptionCard({ title, desc, onClick }: { title: string, desc?: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="group relative w-full text-left p-4 sm:p-5 rounded-[14px] border border-white/5 bg-white/[0.03] transition-all duration-200 hover:border-cyan/40 hover:bg-cyan/5 hover:translate-x-1 hover:shadow-[0_0_20px_rgba(0,229,255,0.08),inset_0_0_20px_rgba(0,229,255,0.03)] overflow-hidden flex items-center gap-3.5"
    >
      {/* Scanline on hover */}
      <div className="absolute top-0 -left-full w-[60%] h-full bg-gradient-to-r from-transparent via-cyan/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_0.6s_ease_forwards]" />
      
      <div className="flex-1 relative z-10">
        <div className="font-heading font-semibold text-base text-text group-hover:text-cyan transition-colors tracking-tight mb-1">
          {title}
        </div>
        {desc && <div className="text-[0.8rem] sm:text-sm text-text-muted leading-relaxed">{desc}</div>}
      </div>
      
      <div className="text-text-dim group-hover:text-cyan group-hover:translate-x-0.5 transition-all relative z-10">
        <ChevronRight className="w-5 h-5" />
      </div>
    </button>
  );
}

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const phases = [
    'プロバイダデータを読み込み中...',
    'ハードフィルターを適用中...',
    'Pingスコアを算出中...',
    '最適解を決定中...',
  ];

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) { 
        p = 100; 
        clearInterval(interval); 
        setTimeout(onDone, 400); 
      }
      setProgress(p);
      setPhase(Math.min(3, Math.floor(p / 25)));
    }, 200);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center py-[60px] px-4 sm:px-10 gap-8 min-h-[420px]">
      {/* Animated spinner */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-cyan/10" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan animate-[spin_0.8s_linear_infinite]" />
        <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-emerald animate-[spin_1.2s_linear_infinite_reverse]" />
      </div>

      <div className="text-center w-full max-w-[320px]">
        <div className="font-mono text-xs text-cyan mb-3 tracking-wider min-h-[1.2em]">
          {phases[phase]}
        </div>
        <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-cyan to-emerald transition-all duration-200 ease-out shadow-[0_0_10px_rgba(0,229,255,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-[0.7rem] text-text-muted">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}

function ResultCard({ result, index, delay }: { result: {isp: ISP, score: number}, index: number, delay: number }) {
  const isBest = index === 0;
  const displayFee = result.isp.actual_monthly_fee_jpy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={`group relative p-5 sm:p-6 rounded-[18px] border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
        isBest 
          ? 'bg-cyan/5 border-cyan/30 hover:border-cyan/60 hover:shadow-[0_0_40px_rgba(0,229,255,0.12),0_20px_40px_rgba(0,0,0,0.3)]' 
          : 'bg-white/[0.025] border-white/10 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
      }`}
    >
      {isBest && (
        <div className="absolute top-0 right-0 px-3 sm:px-4 py-1.5 bg-cyan text-black text-[0.6rem] sm:text-[0.65rem] font-bold tracking-[0.1em] rounded-bl-[18px] rounded-tr-[16px] font-mono">
          BEST MATCH
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className={`font-mono text-[0.75rem] sm:text-[0.8rem] tracking-wider ${isBest ? 'text-cyan' : 'text-text-muted'}`}>
                #{index + 1}
              </span>
              <span className="font-heading text-[1.1rem] sm:text-[1.2rem] font-bold tracking-tight text-text group-hover:text-cyan transition-colors">
                {result.isp.name}
              </span>
              <span className="px-2 py-0.5 bg-white/5 rounded text-[0.65rem] sm:text-[0.7rem] text-text-muted font-mono border border-white/5">
                {result.isp.type}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {result.isp.tags.map(tag => (
                <span key={tag} className="px-2.5 sm:px-3 py-1 bg-cyan/10 border border-cyan/20 rounded-full text-[0.65rem] sm:text-[0.7rem] text-cyan font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Box */}
          <div className="shrink-0 p-3.5 sm:p-4 bg-black/40 rounded-[14px] border border-white/5 text-left sm:text-right w-full sm:w-auto min-w-0 sm:min-w-[160px]">
            <div className="text-[0.65rem] sm:text-[0.7rem] text-text-muted mb-2 tracking-wider">推測Ping / 実質月額</div>
            <div className="flex justify-start sm:justify-end items-baseline gap-1 mb-1">
              <Activity className="w-[14px] h-[14px] text-emerald relative top-[2px]" />
              <span className="font-mono text-2xl sm:text-3xl font-bold text-emerald drop-shadow-[0_0_20px_rgba(0,230,118,0.4)] leading-none">
                {result.isp.avg_ping_ms}
              </span>
              <span className="text-[0.7rem] sm:text-[0.75rem] text-text-muted ml-0.5">ms</span>
            </div>
            <div className="flex justify-start sm:justify-end items-baseline gap-1">
              <span className="font-mono text-xl sm:text-[1.3rem] font-bold text-text leading-none">
                ¥{displayFee.toLocaleString()}
              </span>
              <span className="text-[0.65rem] sm:text-[0.7rem] text-text-muted">/月</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link 
          href={`/out/${result.isp.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 rounded-xl border border-white/10 bg-white/5 text-text font-heading font-semibold text-[0.85rem] sm:text-[0.9rem] flex items-center justify-center gap-2 transition-all hover:bg-cyan/10 hover:border-cyan/50 hover:text-cyan mt-1 tracking-tight"
        >
          お申し込み・詳細を見る <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function DiagnosisForm() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<UserAnswers>({
    gameGenre: '',
    housingType: '',
    mobileCarrier: '',
    priority: '',
    region: '',
    requires10G: false,
  });
  const [results, setResults] = useState<{ isp: ISP, score: number }[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNext = (key: keyof UserAnswers, value: any) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    
    if (step < 6) {
      setStep(step + 1);
    } else {
      setLoading(true);
      // Loading screen handles the transition to results
    }
  };

  const handleLoadingDone = () => {
    const recommended = recommendISPs(isps, answers);
    setResults(recommended);
    setLoading(false);
    setStep(7);
  };

  const stepIcons = [null, <Gamepad2 />, <Download />, <MapPin />, <Home />, <Smartphone />, <Zap />, <Wallet />];
  const stepTitles = [null,
    '普段プレイするゲームは？',
    'ゲームの配信や、頻繁な大型アプデは？',
    'お住まいの地域は？',
    '現在の住居タイプは？',
    'お使いのスマホキャリアは？',
    '回線選びで最も重視するのは？',
  ];

  const renderStep = () => {
    if (loading) {
      return (
        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <LoadingScreen onDone={handleLoadingDone} />
        </motion.div>
      );
    }

    switch (step) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <div className="font-heading text-xl sm:text-[1.6rem] font-bold tracking-tight mb-5 sm:mb-7 flex items-center gap-3 text-text">
              <div className="w-10 h-10 rounded-[10px] bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0">
                {stepIcons[1]}
              </div>
              {stepTitles[1]}
            </div>
            <div className="flex flex-col gap-3">
              <OptionCard onClick={() => handleNext('gameGenre', 'fps')} title="FPS / 格ゲー" desc="VALORANT, APEX, スト6など — Ping値超重視" />
              <OptionCard onClick={() => handleNext('gameGenre', 'mmo')} title="MMO / MOBA" desc="FF14, LoLなど — 安定性重視" />
              <OptionCard onClick={() => handleNext('gameGenre', 'casual')} title="カジュアル / スマホ" desc="原神, スマホゲーム全般 — 料金・速度バランス" />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <div className="font-heading text-xl sm:text-[1.6rem] font-bold tracking-tight mb-5 sm:mb-7 flex items-center gap-3 text-text">
              <div className="w-10 h-10 rounded-[10px] bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0">
                {stepIcons[2]}
              </div>
              {stepTitles[2]}
            </div>
            <div className="flex flex-col gap-3">
              <OptionCard onClick={() => handleNext('requires10G', true)} title="はい" desc="PCゲームの大型アプデや、高画質配信をします" />
              <OptionCard onClick={() => handleNext('requires10G', false)} title="いいえ" desc="そこまで大容量の通信はしません（通常プラン）" />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <div className="font-heading text-xl sm:text-[1.6rem] font-bold tracking-tight mb-5 sm:mb-7 flex items-center gap-3 text-text">
              <div className="w-10 h-10 rounded-[10px] bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0">
                {stepIcons[3]}
              </div>
              {stepTitles[3]}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <OptionCard onClick={() => handleNext('region', 'hokkaido')} title="北海道" />
              <OptionCard onClick={() => handleNext('region', 'tohoku')} title="東北" />
              <OptionCard onClick={() => handleNext('region', 'kanto')} title="関東" />
              <OptionCard onClick={() => handleNext('region', 'tokai')} title="東海" />
              <OptionCard onClick={() => handleNext('region', 'kansai')} title="関西" />
              <OptionCard onClick={() => handleNext('region', 'chugoku')} title="中国" />
              <OptionCard onClick={() => handleNext('region', 'shikoku')} title="四国" />
              <OptionCard onClick={() => handleNext('region', 'kyushu')} title="九州" />
              <OptionCard onClick={() => handleNext('region', 'okinawa')} title="沖縄" />
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <div className="font-heading text-xl sm:text-[1.6rem] font-bold tracking-tight mb-5 sm:mb-7 flex items-center gap-3 text-text">
              <div className="w-10 h-10 rounded-[10px] bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0">
                {stepIcons[4]}
              </div>
              {stepTitles[4]}
            </div>
            <div className="flex flex-col gap-3">
              <OptionCard onClick={() => handleNext('housingType', 'house')} title="戸建て" desc="専用線を引ける可能性が高いです" />
              <OptionCard onClick={() => handleNext('housingType', 'mansion_optical')} title="マンション（光配線）" desc="多くの光回線が導入可能です" />
              <OptionCard onClick={() => handleNext('housingType', 'mansion_vdsl')} title="マンション（VDSL）" desc="電話線方式。一部の独自回線は導入不可" />
              <OptionCard onClick={() => handleNext('housingType', 'unknown')} title="わからない" desc="標準的な判定を行います" />
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <div className="font-heading text-xl sm:text-[1.6rem] font-bold tracking-tight mb-5 sm:mb-7 flex items-center gap-3 text-text">
              <div className="w-10 h-10 rounded-[10px] bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0">
                {stepIcons[5]}
              </div>
              {stepTitles[5]}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <OptionCard onClick={() => handleNext('mobileCarrier', 'docomo')} title="docomo" />
              <OptionCard onClick={() => handleNext('mobileCarrier', 'au')} title="au / UQ" />
              <OptionCard onClick={() => handleNext('mobileCarrier', 'softbank')} title="SoftBank / Y!" />
              <OptionCard onClick={() => handleNext('mobileCarrier', 'other')} title="格安SIM / その他" />
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <div className="font-heading text-xl sm:text-[1.6rem] font-bold tracking-tight mb-5 sm:mb-7 flex items-center gap-3 text-text">
              <div className="w-10 h-10 rounded-[10px] bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0">
                {stepIcons[6]}
              </div>
              {stepTitles[6]}
            </div>
            <div className="flex flex-col gap-3">
              <OptionCard onClick={() => handleNext('priority', 'ping')} title="とにかくラグを無くしたい" desc="料金より通信品質を最優先" />
              <OptionCard onClick={() => handleNext('priority', 'price')} title="月額料金を抑えたい" desc="安くてそこそこ遊べる回線が良い" />
              <OptionCard onClick={() => handleNext('priority', 'balance')} title="バランスよく選びたい" desc="品質も料金も妥協したくない" />
            </div>
          </motion.div>
        );
      case 7:
        return (
          <motion.div key="step7" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center mb-10 mt-4">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald/10 border border-emerald/30 flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-[0_0_30px_rgba(0,230,118,0.2)]"
              >
                <Check className="w-6 h-6 sm:w-8 sm:h-8 text-emerald" strokeWidth={3} />
              </motion.div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text mb-2">診断完了！</h2>
              <p className="text-xs sm:text-sm text-text-muted">あなたの環境・予算に最適なゲーミング回線はこちらです。</p>
            </div>

            <div className="flex flex-col gap-4 sm:gap-5">
              {results?.map((res, index) => (
                <ResultCard key={res.isp.id} result={res} index={index} delay={index * 150} />
              ))}
            </div>
            
            <p className="text-[0.65rem] sm:text-xs text-text-dim mt-8 text-center px-2 sm:px-4 leading-relaxed">
              ※本ページのPing値・実効速度は、『みんなのネット回線速度』等の第三者統計データを基に、最新数値を元に弊社が独自算出した推計値（期待値）です。ご利用環境により実際の数値は異なります。
            </p>
            
            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => {
                  setStep(1);
                  setResults(null);
                  setAnswers({ gameGenre: '', housingType: '', mobileCarrier: '', priority: '', region: '', requires10G: false });
                }}
                className="text-xs sm:text-sm text-cyan/70 hover:text-cyan underline underline-offset-4 transition-colors"
              >
                最初からやり直す
              </button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-[640px] mx-auto pt-6 sm:pt-16 pb-12 sm:pb-20">
      
      {/* Progress Bar */}
      {step < 7 && !loading && (
        <div className="mb-6 sm:mb-8 px-1 sm:px-2">
          <div className="flex justify-between items-center mb-2.5">
            {step > 1 ? (
              <button 
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1 text-[0.7rem] sm:text-[0.75rem] text-cyan hover:text-white transition-colors"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" /> 戻る
              </button>
            ) : (
              <div></div>
            )}
            <span className="font-mono text-[0.65rem] sm:text-[0.7rem] text-cyan tracking-[0.12em] uppercase">STEP {step} / 6</span>
          </div>
          <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan to-emerald shadow-[0_0_8px_rgba(0,229,255,0.6)]"
              initial={{ width: `${((step - 1) / 6) * 100}%` }}
              animate={{ width: `${(step / 6) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </div>
      )}
      
      {/* Main Card */}
      <div className="relative glass-card p-5 sm:p-10 rounded-[24px] min-h-[420px] overflow-hidden">
        {/* Ambient Glow inside card */}
        <div className="absolute top-0 right-0 w-[200px] h-[150px] sm:w-[300px] sm:h-[200px] bg-[radial-gradient(ellipse_at_100%_0%,rgba(0,229,255,0.07),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10">
          <AnimatePresence mode="wait" initial={false}>
            {renderStep()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
