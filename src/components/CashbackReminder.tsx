"use client";

import { useState } from 'react';
import { Calendar, Bell, ExternalLink, ShieldCheck } from 'lucide-react';

export default function CashbackReminder() {
  const [taskDetails, setTaskDetails] = useState<string>("プロバイダのマイページから口座情報を登録する");
  const [scheduledDate, setScheduledDate] = useState<string>("");

  const generateCalendarUrl = () => {
    // 日付が未入力の場合は今日の日付をセット
    const dateStr = scheduledDate ? scheduledDate.replace(/-/g, "") : new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const title = `⚠️ [Gamer's Line] キャッシュバック受け取り手続き`;
    const details = `キャッシュバック受け取り手続きの時期が来ました！\n\n【やること】\n${taskDetails}\n\n期限内に忘れずに申請しましょう！\n\n■ Gamer's Line で手続き方法を確認する\nhttps://gamers-line.jp/`;

    // Google Calendar Template URL (終日予定として登録)
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dateStr}/${dateStr}&details=${encodeURIComponent(details)}`;
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
          <h2 className="font-heading text-xl font-bold">キャッシュバックリマインダー</h2>
          <p className="text-sm text-text-muted">「数ヶ月後」など忘れた頃に来る手続きをGoogleカレンダーに登録します</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        {/* Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-text">キャッシュバックの条件・やること</label>
            <textarea 
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
              placeholder="例：〇〇のマイページで口座情報を登録する"
              rows={3}
              className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text">手続きの予定日（メールが届く日など）</label>
            <input 
              type="date" 
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
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
              指定した日付でカレンダーに予定を登録します。これで受け取り忘れの心配はありません。
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
