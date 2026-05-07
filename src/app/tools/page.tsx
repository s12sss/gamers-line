import { Metadata } from 'next';
import SwitchingSimulator from '@/components/SwitchingSimulator';
import CashbackReminder from '@/components/CashbackReminder';
import { PenTool } from 'lucide-react';

export const metadata: Metadata = {
  title: '回線乗り換え支援ツール | Gamer\'s Line',
  description: '違約金とキャッシュバックを天秤にかける乗り換え損益シミュレーターと、キャッシュバック受け取り忘れ防止のためのGoogleカレンダーリマインダーツール。',
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pt-24 pb-20">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-10">
        
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shadow-[0_0_15px_rgba(0,229,255,0.15)]">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
                回線乗り換え<span className="gradient-text">支援ツール</span>
              </h1>
            </div>
          </div>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-[600px]">
            「違約金を払っても今すぐ乗り換えた方がいいのか？」「キャッシュバックの受け取り忘れが怖い」といった乗り換え時の不安を解消するためのツール群です。
          </p>
        </div>

        {/* Tools Container */}
        <div className="space-y-12">
          <section>
            <SwitchingSimulator />
          </section>
          
          <section>
            <CashbackReminder />
          </section>
        </div>

      </div>
    </div>
  );
}
