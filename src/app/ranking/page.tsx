import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function RankingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Page Header */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 sm:px-10 py-10 sm:py-16 border-b border-white/10">
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4">
          // RANKING 2025
        </div>
        <h1 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-4">
          ゲーミング回線<br />
          <span className="gradient-text">おすすめランキング</span>
        </h1>
        <p className="text-text-muted text-base max-w-[520px] leading-[1.7]">
          Ping値・実質月額・安定性を独自スコアリングで総合評価。FPSゲーマーが今すぐ契約すべき回線TOP5。
        </p>
      </div>

      {/* Filter */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 sm:px-10 py-6 flex items-center gap-2.5 flex-wrap">
        <button className="px-[18px] py-[7px] rounded-full border border-cyan/50 bg-cyan/10 text-cyan font-medium text-[0.8rem] transition-all tracking-[0.01em]">総合</button>
        <button className="px-[18px] py-[7px] rounded-full border border-white/10 text-text-muted font-medium text-[0.8rem] transition-all tracking-[0.01em] hover:border-cyan/30 hover:text-text hover:bg-cyan/5">FPS / 格ゲー特化</button>
        <button className="px-[18px] py-[7px] rounded-full border border-white/10 text-text-muted font-medium text-[0.8rem] transition-all tracking-[0.01em] hover:border-cyan/30 hover:text-text hover:bg-cyan/5">コスパ重視</button>
        <button className="px-[18px] py-[7px] rounded-full border border-white/10 text-text-muted font-medium text-[0.8rem] transition-all tracking-[0.01em] hover:border-cyan/30 hover:text-text hover:bg-cyan/5">戸建て向け</button>
        <button className="px-[18px] py-[7px] rounded-full border border-white/10 text-text-muted font-medium text-[0.8rem] transition-all tracking-[0.01em] hover:border-cyan/30 hover:text-text hover:bg-cyan/5">マンション向け</button>
      </div>

      {/* Promo */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 sm:px-10 mb-10">
        <div className="p-5 sm:p-7 rounded-[14px] border border-amber-500/20 bg-amber-500/[0.04] flex items-start sm:items-center gap-3.5">
          <svg className="shrink-0 mt-0.5 sm:mt-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p className="text-[0.85rem] text-amber-500/85 leading-[1.6]">
            <strong className="text-amber-500 font-semibold">2026年5月更新。</strong> Ping値は東京リージョンのVALORANTサーバーに対する第三者統計データの推計値です。実際の値は環境により異なります。
          </p>
        </div>
      </div>

      {/* Ranking List */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 sm:px-10 pb-[100px] flex flex-col gap-4">

        {/* #1 NURO 光 */}
        <div className="grid grid-cols-[44px_1fr] md:grid-cols-[56px_1fr_auto] gap-0 rounded-[20px] border border-cyan/25 bg-cyan/[0.04] overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(0,229,255,0.06)] animate-[fadeUp_0.5s_ease_both]">
          <div className="flex items-center justify-center py-6 bg-black/20 border-r border-white/10 font-mono text-[0.85rem] sm:text-[1.1rem] font-bold text-cyan drop-shadow-[0_0_16px_rgba(0,229,255,0.5)]">
            <div className="flex flex-col items-center gap-1">
              <span className="text-base leading-none">👑</span>
              <span>01</span>
            </div>
          </div>
          <div className="p-4 sm:p-6 md:px-7 md:py-6 flex flex-col gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-heading text-[1.1rem] sm:text-[1.3rem] font-bold tracking-tight">NURO 光</span>
              <span className="px-2.5 py-1 bg-white/5 rounded-[4px] font-mono text-[0.68rem] text-text-muted">FTTH</span>
              <span className="px-3 py-1 bg-cyan text-black rounded-full font-mono text-[0.62rem] font-bold tracking-[0.1em]">BEST PING</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">超低Ping</span>
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">独自回線</span>
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">2G/10G対応</span>
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">SB割あり</span>
            </div>
            <p className="text-[0.82rem] sm:text-[0.875rem] text-text-muted leading-[1.7] max-w-[600px]">
              ソニーネットワークコミュニケーションズが提供する独自回線。NTT網を経由しないルーティングにより、業界最低水準の平均Ping値8msを実現。FPSプレイヤーなら最優先で検討すべき回線。
            </p>
            <div className="flex gap-4 sm:gap-5 flex-wrap mt-1">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">平均Ping</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-emerald drop-shadow-[0_0_12px_rgba(0,230,118,0.4)]">8 ms</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">実質月額</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-text">¥5,200</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">最大速度</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-cyan drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">10 Gbps</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">VDSL</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-red-400">導入不可</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-center p-6 gap-2.5 border-l border-white/10 min-w-[180px]">
            <Link href="#" className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-cyan text-black font-heading font-bold text-[0.875rem] transition-all hover:-translate-y-[1px] hover:shadow-[0_0_30px_rgba(0,229,255,0.45)]">
              申し込む <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/provider" className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-white/10 text-text-muted text-[0.8rem] font-medium transition-all hover:border-cyan/30 hover:text-text hover:bg-cyan/5">
              詳細を見る
            </Link>
          </div>
        </div>

        {/* #2 au ひかり */}
        <div className="grid grid-cols-[44px_1fr] md:grid-cols-[56px_1fr_auto] gap-0 rounded-[20px] border border-emerald/15 bg-emerald/[0.02] overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-emerald/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(0,230,118,0.06)] animate-[fadeUp_0.5s_ease_both] animate-delay-[100ms]">
          <div className="flex items-center justify-center py-6 bg-black/20 border-r border-white/10 font-mono text-[0.85rem] sm:text-[1.1rem] font-bold text-emerald">
            <div className="flex flex-col items-center gap-1">
              <span>02</span>
            </div>
          </div>
          <div className="p-4 sm:p-6 md:px-7 md:py-6 flex flex-col gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-heading text-[1.1rem] sm:text-[1.3rem] font-bold tracking-tight">au ひかり</span>
              <span className="px-2.5 py-1 bg-white/5 rounded-[4px] font-mono text-[0.68rem] text-text-muted">FTTH</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">低Ping</span>
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">au割 ¥1,100</span>
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">戸建◎</span>
            </div>
            <p className="text-[0.82rem] sm:text-[0.875rem] text-text-muted leading-[1.7] max-w-[600px]">
              auユーザーならセット割で実質¥3,850〜。NURO光に次ぐ低Ping性能と安定性を誇るKDDI独自回線。戸建て利用者に特におすすめ。
            </p>
            <div className="flex gap-4 sm:gap-5 flex-wrap mt-1">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">平均Ping</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-emerald drop-shadow-[0_0_12px_rgba(0,230,118,0.4)]">15 ms</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">実質月額</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-text">¥4,950</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">最大速度</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-cyan drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">10 Gbps</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">VDSL</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-red-400">導入不可</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-center p-6 gap-2.5 border-l border-white/10 min-w-[180px]">
            <Link href="#" className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-cyan text-black font-heading font-bold text-[0.875rem] transition-all hover:-translate-y-[1px] hover:shadow-[0_0_30px_rgba(0,229,255,0.45)]">
              申し込む <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/provider" className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-white/10 text-text-muted text-[0.8rem] font-medium transition-all hover:border-cyan/30 hover:text-text hover:bg-cyan/5">
              詳細を見る
            </Link>
          </div>
        </div>

        {/* #3 ドコモ光 */}
        <div className="grid grid-cols-[44px_1fr] md:grid-cols-[56px_1fr_auto] gap-0 rounded-[20px] border border-white/10 bg-white/[0.035] overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-cyan/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(0,229,255,0.06)] animate-[fadeUp_0.5s_ease_both] animate-delay-[200ms]">
          <div className="flex items-center justify-center py-6 bg-black/20 border-r border-white/10 font-mono text-[0.85rem] sm:text-[1.1rem] font-bold text-purple-400">
            <div className="flex flex-col items-center gap-1">
              <span>03</span>
            </div>
          </div>
          <div className="p-4 sm:p-6 md:px-7 md:py-6 flex flex-col gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-heading text-[1.1rem] sm:text-[1.3rem] font-bold tracking-tight">ドコモ光</span>
              <span className="px-2.5 py-1 bg-white/5 rounded-[4px] font-mono text-[0.68rem] text-text-muted">FTTH</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">VDSL対応</span>
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">d割 ¥1,100</span>
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">全国対応</span>
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">安定性◎</span>
            </div>
            <p className="text-[0.82rem] sm:text-[0.875rem] text-text-muted leading-[1.7] max-w-[600px]">
              docomoユーザーなら最安クラス。VDSLマンションにも対応し、全国広いエリアで利用可能。平均Ping 20msは競技プレイにも十分な水準。
            </p>
            <div className="flex gap-4 sm:gap-5 flex-wrap mt-1">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">平均Ping</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-emerald drop-shadow-[0_0_12px_rgba(0,230,118,0.4)]">20 ms</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">実質月額</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-text">¥4,400</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">最大速度</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-cyan drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">1 Gbps</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">VDSL</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-emerald">対応</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-center p-6 gap-2.5 border-l border-white/10 min-w-[180px]">
            <Link href="#" className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-cyan text-black font-heading font-bold text-[0.875rem] transition-all hover:-translate-y-[1px] hover:shadow-[0_0_30px_rgba(0,229,255,0.45)]">
              申し込む <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/provider" className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-white/10 text-text-muted text-[0.8rem] font-medium transition-all hover:border-cyan/30 hover:text-text hover:bg-cyan/5">
              詳細を見る
            </Link>
          </div>
        </div>

        {/* #4 SoftBank 光 */}
        <div className="grid grid-cols-[44px_1fr] md:grid-cols-[56px_1fr_auto] gap-0 rounded-[20px] border border-white/10 bg-white/[0.035] overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-cyan/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(0,229,255,0.06)] animate-[fadeUp_0.5s_ease_both] animate-delay-[300ms]">
          <div className="flex items-center justify-center py-6 bg-black/20 border-r border-white/10 font-mono text-[0.85rem] sm:text-[1.1rem] font-bold text-text-muted">
            <div className="flex flex-col items-center gap-1">
              <span>04</span>
            </div>
          </div>
          <div className="p-4 sm:p-6 md:px-7 md:py-6 flex flex-col gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-heading text-[1.1rem] sm:text-[1.3rem] font-bold tracking-tight">SoftBank 光</span>
              <span className="px-2.5 py-1 bg-white/5 rounded-[4px] font-mono text-[0.68rem] text-text-muted">FTTH</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">VDSL対応</span>
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">SB割 ¥1,100</span>
              <span className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">コスパ◎</span>
            </div>
            <p className="text-[0.82rem] sm:text-[0.875rem] text-text-muted leading-[1.7] max-w-[600px]">
              SoftBank/Y!mobileユーザーなら実質¥3,080〜とトップクラスのコスパ。Ping値はやや高めだが、料金重視ユーザーには有力候補。
            </p>
            <div className="flex gap-4 sm:gap-5 flex-wrap mt-1">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">平均Ping</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-amber-500">22 ms</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">実質月額</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-text">¥4,180</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">最大速度</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-cyan drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">1 Gbps</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">VDSL</span>
                <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-emerald">対応</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-center p-6 gap-2.5 border-l border-white/10 min-w-[180px]">
            <Link href="#" className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-cyan text-black font-heading font-bold text-[0.875rem] transition-all hover:-translate-y-[1px] hover:shadow-[0_0_30px_rgba(0,229,255,0.45)]">
              申し込む <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/provider" className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-white/10 text-text-muted text-[0.8rem] font-medium transition-all hover:border-cyan/30 hover:text-text hover:bg-cyan/5">
              詳細を見る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
