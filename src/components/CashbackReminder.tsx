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
      
      <div className="pb-5 mb-6 border-b border-white/10 relative z-10">
        <div className="font-mono text-[0.62rem] text-cyan tracking-[0.2em] uppercase mb-2 opacity-80">
          TOOL 02 · CASHBACK REMINDER
        </div>
        <h2 className="font-heading text-xl font-bold text-white mb-1">キャッシュバックリマインダー</h2>
        <p className="text-sm text-text-muted">「数ヶ月後」に来る手続きを忘れないよう、Googleカレンダーに登録します。</p>
      </div>

      <div className="flex flex-col gap-5 relative z-10">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-muted tracking-wider uppercase">キャッシュバックの条件・やること</label>
          <textarea
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
            placeholder="例：〇〇のマイページで口座情報を登録する"
            rows={3}
            className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-text-muted tracking-wider uppercase">手続きの予定日（メールが届く日など）</label>
          <input
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 [color-scheme:dark]"
          />
        </div>

        <a
          href={generateCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-black font-bold text-sm transition-all hover:bg-emerald hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] hover:-translate-y-0.5 no-underline"
        >
          <Bell className="w-4 h-4" />
          Googleカレンダーに登録する
          <ExternalLink className="w-4 h-4 ml-1 opacity-50" />
        </a>

        <p className="text-xs text-text-muted leading-relaxed">
          ※個人情報・Googleアカウント情報は当サイトに一切保存されません。ボタンを押すと、Google公式の登録画面が新しいタブで開くだけです。
        </p>
      </div>
    </div>
  );
}
