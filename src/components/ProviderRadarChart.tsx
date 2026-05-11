'use client';

import React from 'react';
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
    { subject: '手軽さ', A: stats.installation, fullMark: 5 },
  ];

  return (
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
  );
}
