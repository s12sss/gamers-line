'use client';

import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export interface RadarStats {
  ping: number;
  stability: number;
  speed: number;
  cost: number;
  installation: number;
  benefit: number;
}

export default function ProviderRadarChart({ stats }: { stats: RadarStats }) {
  const data = [
    { subject: 'Ping値', A: stats.ping, fullMark: 5 },
    { subject: '安定度', A: stats.stability, fullMark: 5 },
    { subject: '通信速度', A: stats.speed, fullMark: 5 },
    { subject: 'コスパ', A: stats.cost, fullMark: 5 },
    { subject: '特典', A: stats.benefit, fullMark: 5 },
    { subject: '導入しやすさ', A: stats.installation, fullMark: 5 },
  ];

  const [activeTab, setActiveTab] = useState<string | null>(null);

  const explanations: Record<string, string> = {
    'Ping値': 'オンラインゲームのラグ（遅延）の少なさ。FPSや格闘ゲームなど、一瞬の反応が命となるジャンルでの重要度を表します。',
    '安定度': '夜間帯の混雑によるパケットロスや速度低下の少なさ。独自網など独立した回線であるほど高くなります。',
    '通信速度': '最大通信速度（10G対応など）のポテンシャル。大容量ゲームのダウンロードやアップデートの早さに直結します。',
    'コスパ': '月額料金の安さや、スマホとのセット割引などを総合的に加味したランニングコストの良さを表します。',
    '特典': '契約時の高額キャッシュバックや、工事費実質無料など、初期コストを相殺する還元率の高さです。',
    '導入しやすさ': '全国どこでも申し込めるか、または現在利用中の回線から工事不要（事業者変更）で簡単に乗り換えられるかを表します（数値が高いほどカンタン）。',
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-[300px] sm:h-[350px] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08),transparent_60%)] pointer-events-none" />
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data} margin={{ top: 10, right: 25, bottom: 10, left: 25 }}>
          <PolarGrid stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 'bold' }} 
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 5]} 
            tick={false} 
            axisLine={false} 
          />
          <Radar
            name="ステータス"
            dataKey="A"
            stroke="#00e5ff"
            strokeWidth={2}
            fill="url(#colorCyan)"
            fillOpacity={0.6}
            isAnimationActive={true}
          />
          <defs>
            <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#00e5ff" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
        </RadarChart>
      </ResponsiveContainer>
      </div>

      {/* Interactive Legend / Explanations */}
      <div className="mt-4 flex flex-col items-center">
        <p className="text-xs text-text-muted mb-3">各項目をタップして意味を確認</p>
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {data.map((item) => (
            <button
              key={item.subject}
              onClick={() => setActiveTab(activeTab === item.subject ? null : item.subject)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all duration-300 ${
                activeTab === item.subject 
                  ? 'bg-cyan text-black border-cyan shadow-[0_0_15px_rgba(0,229,255,0.6)] scale-105'
                  : 'bg-[#0a0a0a] text-text-muted border-white/10 hover:border-cyan/50 hover:text-white'
              }`}
            >
              {item.subject}
            </button>
          ))}
        </div>
        
        <div className={`w-full overflow-hidden transition-all duration-300 ${activeTab ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
          <div className="bg-cyan/10 border border-cyan/30 rounded-2xl p-4 text-xs sm:text-sm text-cyan-50 leading-relaxed shadow-[inset_0_0_20px_rgba(0,229,255,0.1)]">
            <strong className="block mb-1 text-cyan">{activeTab}</strong>
            {activeTab && explanations[activeTab]}
          </div>
        </div>
      </div>
    </div>
  );
}
