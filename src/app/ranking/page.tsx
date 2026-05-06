import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ispsData from "@/data/isps.json";

export default function RankingPage() {
  // Sort ISPs by ping (ascending)
  const rankedIsps = [...ispsData].sort((a, b) => a.avg_ping_ms - b.avg_ping_ms);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Page Header */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 sm:px-10 py-10 sm:py-16 border-b border-white/10">
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4">
          // RANKING
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
        {rankedIsps.map((isp, index) => {
          const rank = index + 1;
          const isFirst = rank === 1;
          const isSecond = rank === 2;
          
          let borderColorClass = "border-white/10";
          let bgColorClass = "bg-white/[0.035]";
          let hoverBorderClass = "hover:border-cyan/30";
          let shadowClass = "hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(0,229,255,0.06)]";
          let rankColorClass = "text-text-muted";
          
          if (isFirst) {
            borderColorClass = "border-cyan/25";
            bgColorClass = "bg-cyan/[0.04]";
            rankColorClass = "text-cyan drop-shadow-[0_0_16px_rgba(0,229,255,0.5)]";
          } else if (isSecond) {
            borderColorClass = "border-emerald/15";
            bgColorClass = "bg-emerald/[0.02]";
            hoverBorderClass = "hover:border-emerald/30";
            shadowClass = "hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(0,230,118,0.06)]";
            rankColorClass = "text-emerald";
          }

          return (
            <div key={isp.id} className={`grid grid-cols-[44px_1fr] md:grid-cols-[56px_1fr_auto] gap-0 rounded-[20px] border ${borderColorClass} ${bgColorClass} overflow-hidden backdrop-blur-md transition-all duration-300 ${hoverBorderClass} hover:-translate-y-1 ${shadowClass} animate-[fadeUp_0.5s_ease_both]`} style={{ animationDelay: `${index * 100}ms` }}>
              <div className={`flex items-center justify-center py-6 bg-black/20 border-r border-white/10 font-mono text-[0.85rem] sm:text-[1.1rem] font-bold ${rankColorClass}`}>
                <div className="flex flex-col items-center gap-1">
                  {isFirst && <span className="text-base leading-none">👑</span>}
                  <span>0{rank}</span>
                </div>
              </div>
              <div className="p-4 sm:p-6 md:px-7 md:py-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-heading text-[1.1rem] sm:text-[1.3rem] font-bold tracking-tight">{isp.name}</span>
                  <span className="px-2.5 py-1 bg-white/5 rounded-[4px] font-mono text-[0.68rem] text-text-muted">FTTH</span>
                  {isp.badges.map(badge => (
                    <span key={badge} className="px-3 py-1 bg-cyan text-black rounded-full font-mono text-[0.62rem] font-bold tracking-[0.1em]">{badge}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {isp.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.7rem] text-cyan font-medium">{tag}</span>
                  ))}
                </div>
                <p className="text-[0.82rem] sm:text-[0.875rem] text-text-muted leading-[1.7] max-w-[600px]">
                  {isp.description}
                </p>
                <div className="flex gap-4 sm:gap-5 flex-wrap mt-1">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">平均Ping</span>
                    <span className={`font-mono text-[0.95rem] sm:text-[1.1rem] font-bold ${isp.avg_ping_ms <= 15 ? 'text-emerald drop-shadow-[0_0_12px_rgba(0,230,118,0.4)]' : isp.avg_ping_ms <= 20 ? 'text-cyan' : 'text-amber-500'}`}>{isp.avg_ping_ms} ms</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">実質月額</span>
                    <span className="font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-text">¥{isp.actual_monthly_fee_jpy.toLocaleString()}〜</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">最大速度</span>
                    <span className={`font-mono text-[0.95rem] sm:text-[1.1rem] font-bold text-cyan ${isp.max_speed_gbps >= 10 ? 'drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]' : ''}`}>{isp.max_speed_gbps} Gbps</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.08em] uppercase">VDSL</span>
                    <span className={`font-mono text-[0.95rem] sm:text-[1.1rem] font-bold ${isp.vdsl_support ? 'text-emerald' : 'text-red-400'}`}>{isp.vdsl_support ? '対応' : '導入不可'}</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex flex-col justify-center p-6 gap-2.5 border-l border-white/10 min-w-[180px]">
                {isp.affiliateLink !== "#" ? (
                  <div className="flex flex-col gap-1 items-center w-full">
                    <span className="text-[0.65rem] font-bold text-[#ffeb3b] tracking-tight bg-black/40 px-2 py-0.5 rounded-full border border-[#ffeb3b]/30 shadow-[0_0_10px_rgba(255,235,59,0.1)] w-full text-center whitespace-nowrap overflow-hidden text-ellipsis">
                      ＼ {isp.cashback_text} ／
                    </span>
                    <a href={isp.affiliateLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-cyan text-black font-heading font-bold text-[0.875rem] transition-all hover:bg-cyan/80 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                      お申し込みはこちら <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : (
                  <span className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-cyan/30 text-black/50 font-heading font-bold text-[0.875rem] cursor-not-allowed">
                    準備中 <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  </span>
                )}
                <Link href={isp.detailLink} className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-white/10 text-text-muted text-[0.8rem] font-medium transition-all hover:border-cyan/30 hover:text-text hover:bg-cyan/5">
                  詳細を見る
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
