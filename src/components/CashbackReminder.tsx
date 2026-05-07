"use client";

import { useState } from 'react';
import { Calendar, Bell, ExternalLink, ShieldCheck } from 'lucide-react';

export default function CashbackReminder() {
  const [provider, setProvider] = useState<string>("NURO光");
  const [contractMonth, setContractMonth] = useState<string>(
    new Date().toISOString().slice(0, 7) // YYYY-MM
  );

  // プロバイダごとのキャッシュバック受け取り時期（簡易マッピング）
  const providerWaitMonths: Record<string, number> = {
    "NURO光": 11,
    "auひかり": 10,
    "ドコモ光": 5,
    "ソフトバンク光": 5,
    "GameWith光": 3,
    "その他": 6,
  };

  const generateCalendarUrl = () => {
    const waitMonths = providerWaitMonths[provider] || 6;
    
    // 契約月から指定月数後を計算
    const date = new Date(contractMonth + "-01");
    date.setMonth(date.getMonth() + waitMonths);
    
    // YYYYMMDD形式に変換 (Googleカレンダー用)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    // 月初め（1日）に設定
    const day = "01";
    const dateString = `${year}${month}${day}`;

    const title = `⚠️ [Gamer's Line] ${provider} キャッシュバック受け取り手続き`;
    const details = `【${provider}】のキャッシュバック受け取り手続きの時期が来ました！\n\nマイページ、または指定のメールアドレス宛に案内が届いているはずです。\n期限内に忘れずに申請しましょう！\n\n■ Gamer's Line で手続き方法を確認する\nhttps://gamers-line.jp/`;

    // Google Calendar Template URL
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dateString}/${dateString}&details=${encodeURIComponent(details)}`;
  };

  return (
    <div className="bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
      {/* Cyber Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center border border-emerald/20 text-emerald">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold">キャッシュバック防具（リマインダー）</h2>
          <p className="text-sm text-text-muted">「11ヶ月後」など忘れた頃に来る手続きをGoogleカレンダーに登録します</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        {/* Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-text">申し込んだ（申し込む予定の）回線</label>
            <select 
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50"
            >
              {Object.keys(providerWaitMonths).map(p => (
                <option key={p} value={p}>{p} (約{providerWaitMonths[p]}ヶ月後)</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text">申し込み予定月</label>
            <input 
              type="month" 
              value={contractMonth}
              onChange={(e) => setContractMonth(e.target.value)}
              className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 [color-scheme:dark]"
            />
          </div>
          
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-text-muted leading-relaxed">
            <p>※個人情報やGoogleアカウント情報が当サイトに保存されることはありません。Googleカレンダーの登録画面が安全に開くだけです。</p>
          </div>
        </div>

        {/* Action Card */}
        <div className="flex flex-col">
          <div className="flex-1 bg-gradient-to-br from-[#050508] to-emerald/5 border border-emerald/20 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mb-4 border border-emerald/20">
              <Calendar className="w-8 h-8 text-emerald" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">未来の自分に通知を設定</h3>
            <p className="text-sm text-text-muted mb-6">
              指定した月の1日に、カレンダーに予定と手続きの案内を登録します。これで受け取り忘れの心配はありません。
            </p>

            <a 
              href={generateCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-black font-bold text-sm transition-all hover:bg-emerald hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 no-underline"
            >
              <Bell className="w-4 h-4" />
              Googleカレンダーに登録する
              <ExternalLink className="w-4 h-4 ml-1 opacity-50" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
