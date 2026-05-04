import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ispsData from '@/data/isps.json';
import { ISP } from '@/utils/algorithm';

const isps = ispsData as ISP[];

export default function RankingPage() {
  // 総合ランキングとして、単純にPing順に並べ替える（仮）
  const rankedISPs = [...isps].sort((a, b) => a.avg_ping_ms - b.avg_ping_ms);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-4 sm:px-10 h-16 bg-[#050508]/75 backdrop-blur-xl border-b border-white/10">
        <Link href="/" className="font-heading font-bold text-lg tracking-tighter text-text no-underline">
          Gamer's <span className="text-cyan drop-shadow-[0_0_20px_rgba(0,229,255,0.6)]">Line</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-8">
          <Link href="/ranking" className="hidden sm:block text-text text-sm font-medium transition-colors">ランキング</Link>
          <Link href="#" className="hidden sm:block text-text-muted text-sm font-medium hover:text-text transition-colors">比較する</Link>
          <Link href="/column" className="hidden sm:block text-text-muted text-sm font-medium hover:text-text transition-colors">コラム</Link>
          
          <Link href="/diagnosis" className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-cyan/25 bg-cyan/10 text-cyan text-xs font-bold tracking-widest uppercase transition-all hover:bg-cyan/20 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:border-cyan/50">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)] animate-[pulse-dot_2s_ease-in-out_infinite]"></span>
            <span className="hidden sm:inline">無料診断</span>
            <span className="sm:hidden">DIAGNOSIS</span>
          </Link>
        </nav>
      </header>

      {/* Page Header */}
      <div className="relative z-10 px-4 sm:px-10 py-10 sm:py-[72px] max-w-[1100px] mx-auto w-full border-b border-white/10">
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4">
          // RANKING
        </div>
        <h1 className="font-heading text-[clamp(1.8rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] mb-4">
          ゲーミング回線<br />
          <span className="gradient-text">総合ランキング</span>
        </h1>
        <p className="text-text-muted text-[0.9rem] sm:text-base max-w-[520px] leading-[1.7]">
          最新の計測データをもとに、Ping値・通信速度・月額料金の観点から本当に勝てる回線を厳選しました。
        </p>
      </div>

      {/* Ranking List */}
      <div className="relative z-10 px-4 sm:px-10 py-[60px] max-w-[900px] mx-auto w-full flex flex-col gap-6">
        {rankedISPs.map((isp, index) => (
          <div key={isp.id} className={`p-6 sm:p-8 rounded-[20px] border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${index === 0 ? 'bg-cyan/5 border-cyan/30 shadow-[0_0_40px_rgba(0,229,255,0.1)]' : 'bg-white/[0.025] border-white/10 hover:border-white/20'}`}>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-heading font-bold text-lg ${index === 0 ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.5)]' : index === 1 ? 'bg-white/20 text-white' : index === 2 ? 'bg-[#b87333]/30 text-[#e6a87c]' : 'bg-white/5 text-text-muted'}`}>
                    {index + 1}
                  </div>
                  <h2 className="font-heading text-2xl font-bold tracking-tight">{isp.name}</h2>
                  <span className="px-2.5 py-1 bg-white/5 rounded text-[0.7rem] text-text-muted font-mono border border-white/5">
                    {isp.type}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {isp.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-cyan/10 border border-cyan/20 rounded-full text-[0.75rem] text-cyan font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-text-muted leading-relaxed max-w-[480px]">
                  {index === 0 && '圧倒的なPing値でFPSプレイヤーに最適。提供エリア内であれば真っ先に検討すべき回線です。'}
                  {index === 1 && '全国対応で安定した品質。独自回線が引けない場合でも高いパフォーマンスを発揮します。'}
                  {index >= 2 && 'スマホセット割などを活用すれば、コストパフォーマンスが非常に高い回線です。'}
                </p>
              </div>

              {/* Stats & CTA Box */}
              <div className="w-full sm:w-[240px] shrink-0 flex flex-col gap-4">
                <div className="p-4 bg-black/40 rounded-[14px] border border-white/5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.7rem] text-text-muted tracking-wider">推測Ping</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-2xl font-bold text-emerald drop-shadow-[0_0_15px_rgba(0,230,118,0.3)]">{isp.avg_ping_ms}</span>
                      <span className="text-[0.7rem] text-text-muted">ms</span>
                    </div>
                  </div>
                  <div className="w-full h-px bg-white/5" />
                  <div className="flex items-center justify-between">
                    <span className="text-[0.7rem] text-text-muted tracking-wider">実質月額</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-lg font-bold text-text">¥{isp.actual_monthly_fee_jpy.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/out/${isp.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl border border-cyan/30 bg-cyan/10 text-cyan font-heading font-semibold text-[0.9rem] flex items-center justify-center gap-2 transition-all hover:bg-cyan/20 hover:border-cyan/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] tracking-tight"
                >
                  公式サイトを見る <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-3 px-4 sm:px-10 py-7 sm:py-10 border-t border-white/10 text-center sm:text-left mt-auto">
        <Link href="/" className="font-heading font-bold text-base tracking-tighter text-text no-underline">
          Gamer's <span className="text-cyan drop-shadow-[0_0_20px_rgba(0,229,255,0.6)]">Line</span>
        </Link>
        <p className="text-[0.75rem] text-text-dim">
          © 2026 Gamer's Line. 掲載情報はアフィリエイトリンクを含む場合があります。
        </p>
      </footer>
    </div>
  );
}
