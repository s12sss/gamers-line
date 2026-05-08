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
    <div className="min-h-screen bg-background text-foreground font-sans pb-20">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-10">
        
        {/* Page Header */}
        <div className="relative z-10 w-full pt-10 pb-8 sm:pt-16 sm:pb-12 overflow-hidden">
          <div className="absolute -top-[60px] -right-[80px] w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.08),transparent_70%)] blur-[40px] pointer-events-none" />
          <div className="relative z-10 font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4">
            // SUPPORT TOOLS
          </div>
          <h1 className="relative z-10 font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-4">
            回線乗り換え<br />
            <span className="gradient-text">支援ツール</span>
          </h1>
          <p className="text-sm text-text-muted max-w-[500px] leading-[1.7]">
            回線検討に役立つ便利ツール群です。<br className="hidden sm:block" />
            今後も順次追加予定。
          </p>
        </div>

        <div className="w-full mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <a href="#simulator" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-text-muted hover:text-white hover:border-cyan/50 hover:bg-cyan/5 transition-all">
              ↓ 乗り換え損益シミュレーター
            </a>
            <a href="#reminder" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-text-muted hover:text-white hover:border-emerald/50 hover:bg-emerald/5 transition-all">
              ↓ キャッシュバックリマインダー
            </a>
          </div>
        </div>

        {/* Tools Container */}
        <div className="space-y-16">
          <section id="simulator" className="scroll-mt-24">
            <SwitchingSimulator />
          </section>
          
          <section id="reminder" className="scroll-mt-24">
            <CashbackReminder />
          </section>
        </div>

      </div>
    </div>
  );
}
