"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, Gamepad2, AlertTriangle, CheckCircle2, ShieldCheck, Share2, ExternalLink } from 'lucide-react';
import { DetailedAnswers, DiagnosisResult, calculateDetailedDiagnosis } from '@/utils/detailedAlgorithm';
import ispsData from '@/data/isps.json';
import { ISP } from '@/utils/algorithm';

const QUESTIONS = [
  { id: 'q1_genre', title: 'Q1. よくプレイするゲームのジャンルは？（複数可）', type: 'multi', options: [{val: 'fps', label: 'FPS/TPS (VALORANT, APEX等)'}, {val: 'mmo', label: 'MMO/RPG (FF14等)'}, {val: 'fighting', label: '格闘ゲーム'}, {val: 'casual', label: 'カジュアル/その他'}] },
  { id: 'q2_frequency', title: 'Q2. プレイ頻度はどのくらいですか？', type: 'single', options: [{val: 'daily', label: 'ほぼ毎日ガッツリ'}, {val: 'weekend', label: '週末に集中して'}, {val: 'rare', label: 'たまに遊ぶ程度'}] },
  { id: 'q3_lag_annoyance', title: 'Q3. プレイ中の「ラグ」や「カクつき」は気になりますか？', type: 'single', options: [{val: 'high', label: 'ものすごく気になる（死活問題）'}, {val: 'medium', label: 'たまに気になる程度'}, {val: 'low', label: '全く気にならない'}] },
  { id: 'q4_current_line', title: 'Q4. 今のインターネット環境は？', type: 'single', options: [{val: 'optical', label: '光回線（戸建て/光配線マンション）'}, {val: 'vdsl', label: 'マンション備え付け（VDSL等）'}, {val: 'home_router', label: 'ホームルーター（置くだけWi-Fi）'}, {val: 'mobile', label: 'モバイルWi-Fi / テザリング'}] },
  { id: 'q5_connection', title: 'Q5. PCやゲーム機との接続方法は？', type: 'single', options: [{val: 'wired', label: '有線LANケーブル'}, {val: 'wifi', label: 'Wi-Fi（無線）'}, {val: 'unknown', label: 'わからない'}] },
  { id: 'q6_family', title: 'Q6. ご家族と同居していますか？', type: 'single', options: [{val: 'yes', label: 'はい（家族と同居）'}, {val: 'no', label: 'いいえ（一人暮らし）'}] },
  { id: 'q7_family_usage', title: 'Q7. 家族が同時に動画を見たりネットを使うことは多いですか？', type: 'single', options: [{val: 'high', label: 'よくある'}, {val: 'low', label: 'あまりない / 一人暮らし'}] },
  { id: 'q8_dl_stress', title: 'Q8. 大容量ゲームのDLやアプデの遅さにイライラしますか？', type: 'single', options: [{val: 'high', label: 'する（早く終わらせたい）'}, {val: 'low', label: '寝てる間にやるから気にしない'}] },
  { id: 'q9_streaming', title: 'Q9. プレイしながら動画配信（生放送）はしますか？', type: 'single', options: [{val: 'frequent', label: 'よくする'}, {val: 'sometimes', label: 'たまにする / 今後やりたい'}, {val: 'never', label: '見る専門（配信はしない）'}] },
  { id: 'q10_vc', title: 'Q10. ボイスチャット（Discord等）は使いますか？', type: 'single', options: [{val: 'frequent', label: '常に使う'}, {val: 'sometimes', label: 'たまに使う'}, {val: 'never', label: '使わない（野良メイン）'}] },
  { id: 'q11_budget_priority', title: 'Q11. 回線選びの基準を教えてください', type: 'single', options: [{val: 'spec', label: '料金より「最強の環境」を作りたい'}, {val: 'balance', label: '性能も料金もそこそこのバランス型'}, {val: 'budget', label: 'とにかく毎月の出費を安く抑えたい'}] },
  { id: 'q12_carrier', title: 'Q12. お使いのスマホキャリアは？（割引に影響します）', type: 'single', options: [{val: 'docomo', label: 'docomo (ahamo含む)'}, {val: 'au', label: 'au / UQモバイル'}, {val: 'softbank', label: 'SoftBank / Y!mobile'}, {val: 'rakuten', label: '楽天モバイル'}, {val: 'other', label: '格安SIM / その他'}] },
  { id: 'q13_contract_years', title: 'Q13. 今の回線を契約してどのくらい経ちますか？', type: 'single', options: [{val: 'over3', label: '3年以上'}, {val: '1to3', label: '1〜3年'}, {val: 'under1', label: '1年未満'}, {val: 'unknown', label: 'わからない'}] },
  { id: 'q14_router_type', title: 'Q14. Wi-Fiルーターは自前ですか？レンタルですか？', type: 'single', options: [{val: 'own', label: '自分で買った（ゲーミングルーター等）'}, {val: 'rental', label: 'プロバイダからのレンタル品'}, {val: 'unknown', label: 'わからない'}] },
  { id: 'q15_goal', title: 'Q15. 最後に、ゲームにおいて一番優先したいことは？', type: 'single', options: [{val: 'win', label: '絶対に撃ち負けたくない（勝利至上主義）'}, {val: 'enjoy', label: 'ストレスなくワイワイ楽しみたい'}, {val: 'cheap', label: 'とにかく毎月の通信費を抑えたい'}] },
];

export default function DetailedDiagnosisForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<DetailedAnswers>>({ q1_genre: [] });
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Auto scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSingleSelect = (id: string, val: string) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
    setTimeout(() => {
      handleNext();
    }, 300); // Small delay to show selection effect
  };

  const handleMultiSelect = (id: string, val: string) => {
    setAnswers(prev => {
      const current = prev[id as keyof DetailedAnswers] as string[] || [];
      if (current.includes(val)) {
        return { ...prev, [id]: current.filter(item => item !== val) };
      } else {
        return { ...prev, [id]: [...current, val] };
      }
    });
  };

  const calculateResult = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const diagnosis = calculateDetailedDiagnosis(answers as DetailedAnswers, ispsData as ISP[]);
      setResult(diagnosis);
      setIsCalculating(false);
    }, 2000); // Fake calculation delay for effect
  };

  const handleShare = () => {
    if (!result) return;
    const text = `私のゲーマータイプは【${result.type.name}】でした！\n\n診断のアドバイス：\n${result.advice[0].substring(0, 50)}...\n\nゲーマーのためのガチ環境診断 👇\n#ゲーマーズライン\n`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://gamers-line.jp/diagnosis/pro')}`;
    window.open(url, '_blank');
  };

  if (isCalculating) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="w-16 h-16 border-4 border-cyan/20 border-t-cyan rounded-full animate-spin mb-6"></div>
        <div className="font-heading font-bold text-xl text-text animate-pulse">環境を完全解析中...</div>
        <div className="text-sm text-text-muted mt-2">15項目のデータからボトルネックを特定しています</div>
      </div>
    );
  }

  if (result) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-12 pb-20"
      >
        {/* Type Result */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-sm font-bold tracking-widest mb-6">
            <ShieldCheck className="w-4 h-4" />
            解析完了
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">あなたのゲーマータイプは...</h2>
          
          <div className="relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan/30 via-purple-500/30 to-emerald/30 blur-xl opacity-50 z-0"></div>
            <div className="relative z-10 bg-[#0a0a0f] rounded-[22px] p-8 sm:p-12 border border-white/5 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 blur-[100px] rounded-full"></div>
              
              <div className="text-6xl mb-6">{result.type.icon}</div>
              <div className="text-cyan text-sm font-bold tracking-widest mb-2">{result.type.catchphrase}</div>
              <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6">{result.type.name}</h3>
              <p className="text-text-muted leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
                {result.type.description}
              </p>

              <button 
                onClick={handleShare}
                className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1DA1F2] text-white font-bold transition-transform hover:scale-105 shadow-[0_0_20px_rgba(29,161,242,0.3)]"
              >
                <Share2 className="w-5 h-5" />
                結果をXでシェアする
              </button>
            </div>
          </div>
        </div>

        {/* Advice Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold border-b border-white/10 pb-4 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            環境改善のガチアドバイス
          </h3>
          <div className="grid gap-4">
            {result.advice.map((adv, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500/50"></div>
                <p className="text-text leading-relaxed text-[0.95rem]">{adv}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended ISP */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-3">あなたに最適な究極の光回線</h3>
            <p className="text-text-muted text-sm">あなたのプレイ環境・スマホ・居住地から導き出されたベストアンサーです。</p>
          </div>
          
          <div className="grid gap-6">
            {result.recommendedISPs.map((rec, idx) => (
              <div key={rec.isp.id} className="relative p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row gap-8 items-center transition-all hover:bg-white/[0.07] hover:border-cyan/30">
                {idx === 0 && (
                  <div className="absolute -top-4 -left-4 px-6 py-2 bg-gradient-to-r from-cyan to-blue-500 text-black font-bold tracking-widest text-sm rounded-full shadow-[0_0_20px_rgba(0,229,255,0.4)] z-10 transform -rotate-6">
                    BEST MATCH
                  </div>
                )}
                
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-black text-white/10 italic">0{idx + 1}</span>
                    <h4 className="text-2xl font-bold text-white">{rec.isp.name}</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-xs text-text-muted mb-1">推測Ping値</div>
                      <div className="text-2xl font-bold text-emerald font-mono">{rec.isp.avg_ping_ms}<span className="text-sm text-text-muted ml-1">ms</span></div>
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-xs text-text-muted mb-1">実質月額</div>
                      <div className="text-2xl font-bold text-cyan font-mono">¥{rec.isp.actual_monthly_fee_jpy.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6 md:mb-0">
                    {rec.isp.badges?.map(badge => (
                      <span key={badge} className="px-3 py-1 bg-cyan/10 border border-cyan/20 text-cyan text-xs font-bold rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-auto flex-shrink-0 flex flex-col gap-3">
                  <a href={rec.isp.affiliateLink || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-cyan text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                    公式サイトを見る
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  const currentQ = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex justify-between text-xs text-text-muted mb-2 font-mono">
          <span>STEP {step + 1}</span>
          <span>15</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-cyan shadow-[0_0_10px_rgba(0,229,255,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-8 leading-relaxed">
            {currentQ.title}
          </h2>

          <div className="space-y-3">
            {currentQ.type === 'single' ? (
              currentQ.options.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSingleSelect(currentQ.id, opt.val)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                    answers[currentQ.id as keyof DetailedAnswers] === opt.val
                      ? 'bg-cyan/10 border-cyan text-white shadow-[0_0_20px_rgba(0,229,255,0.15)]'
                      : 'bg-white/5 border-white/10 text-text-muted hover:bg-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="font-medium">{opt.label}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    answers[currentQ.id as keyof DetailedAnswers] === opt.val ? 'border-cyan bg-cyan' : 'border-white/20 group-hover:border-white/40'
                  }`}>
                    {answers[currentQ.id as keyof DetailedAnswers] === opt.val && <div className="w-2 h-2 bg-black rounded-full" />}
                  </div>
                </button>
              ))
            ) : (
              // Multi select
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = (answers[currentQ.id as keyof DetailedAnswers] as string[] || []).includes(opt.val);
                  return (
                    <button
                      key={opt.val}
                      onClick={() => handleMultiSelect(currentQ.id, opt.val)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                        isSelected
                          ? 'bg-cyan/10 border-cyan text-white shadow-[0_0_20px_rgba(0,229,255,0.15)]'
                          : 'bg-white/5 border-white/10 text-text-muted hover:bg-white/10 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span className="font-medium">{opt.label}</span>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        isSelected ? 'border-cyan bg-cyan' : 'border-white/20 group-hover:border-white/40'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-black" />}
                      </div>
                    </button>
                  );
                })}
                <button 
                  onClick={handleNext}
                  disabled={(answers[currentQ.id as keyof DetailedAnswers] as string[] || []).length === 0}
                  className="w-full mt-6 py-4 rounded-xl bg-cyan text-black font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-cyan/90"
                >
                  次へ進む
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex justify-start">
        {step > 0 && (
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors px-4 py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            前の質問に戻る
          </button>
        )}
      </div>
    </div>
  );
}
