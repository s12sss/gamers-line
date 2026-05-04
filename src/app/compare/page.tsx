import Link from "next/link";
import { Play, Activity, Wallet, Zap, ShieldAlert, BadgeCent, ChevronDown } from "lucide-react";
import ispsData from "@/data/isps.json";

export default function ComparePage() {
  // Use first 5 ISPs for comparison to fit the design
  const compareIsps = ispsData.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Page Header */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-4 sm:px-10 py-10 sm:py-16 border-b border-white/10">
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4">
          // COMPARE
        </div>
        <h1 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-4">
          主要5回線を<br />
          <span className="gradient-text">徹底比較</span>
        </h1>
        <p className="text-text-muted text-base max-w-[520px] leading-[1.7]">
          Ping値・月額・速度・割引をすべて並べて一目比較。あなたに合った回線を見つけよう。
        </p>
      </div>

      {/* Comparison Table Section */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-4 sm:px-10 py-10 sm:py-16 pb-24 overflow-x-auto">
        <div className="min-w-[700px] md:min-w-[900px]">
          
          {/* Column Headers */}
          <div className="grid grid-cols-[200px_repeat(5,1fr)] gap-2 mb-2">
            <div className="flex items-end pb-3 pl-1 font-mono text-[0.65rem] text-text-dim tracking-[0.1em] uppercase">
              // ISP
            </div>
            {compareIsps.map((isp, index) => {
              const isBest = index === 0;
              return (
                <div key={isp.id} className={`relative p-5 rounded-t-[16px] border ${isBest ? 'border-cyan/30 bg-cyan/5' : 'border-white/10 bg-white/5'} border-b-0 text-center`}>
                  {isBest && (
                    <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 px-3 py-[3px] bg-cyan text-black font-mono text-[0.58rem] font-bold tracking-[0.1em] rounded-b-lg whitespace-nowrap">
                      BEST PING
                    </div>
                  )}
                  <div className="font-heading font-bold text-[0.95rem] mb-1">{isp.name}</div>
                  <div className="font-mono text-[0.6rem] text-text-dim">FTTH / {isp.type}</div>
                </div>
              );
            })}
          </div>

          {/* Table Body */}
          <div className="grid grid-cols-[200px_repeat(5,1fr)] gap-x-2">
            
            {/* Ping */}
            <div className="contents group">
              <div className="flex items-center gap-2 py-3.5 px-2 pl-1 border-b border-white/5 text-[0.8rem] font-medium text-text-muted">
                <Activity className="w-3.5 h-3.5 opacity-50" /> 平均Ping値
              </div>
              {compareIsps.map((isp, index) => {
                const isBest = index === 0;
                const pingColor = isp.avg_ping_ms <= 15 ? 'text-emerald drop-shadow-[0_0_10px_rgba(0,230,118,0.4)]' : isp.avg_ping_ms <= 20 ? 'text-cyan drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]' : 'text-amber-500';
                return (
                  <div key={isp.id} className={`flex items-center justify-center py-3.5 border-b border-white/5 border-x ${isBest ? 'border-cyan/20 bg-cyan/[0.03]' : 'border-white/10 bg-white/[0.01]'} text-center`}>
                    <span className={`font-mono font-bold text-base ${pingColor}`}>{isp.avg_ping_ms} ms</span>
                  </div>
                );
              })}
            </div>

            {/* Price */}
            <div className="contents group">
              <div className="flex items-center gap-2 py-3.5 px-2 pl-1 border-b border-white/5 text-[0.8rem] font-medium text-text-muted">
                <Wallet className="w-3.5 h-3.5 opacity-50" /> 実質月額
              </div>
              {compareIsps.map((isp, index) => {
                const isBest = index === 0;
                return (
                  <div key={isp.id} className={`flex items-center justify-center py-3.5 border-b border-white/5 border-x ${isBest ? 'border-cyan/20 bg-cyan/[0.04]' : 'border-white/10 bg-white/[0.015]'} text-center`}>
                    <span className="font-mono font-bold text-[0.95rem] text-text">¥{isp.actual_monthly_fee_jpy.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            {/* Max speed */}
            <div className="contents group">
              <div className="flex items-center gap-2 py-3.5 px-2 pl-1 border-b border-white/5 text-[0.8rem] font-medium text-text-muted">
                <Zap className="w-3.5 h-3.5 opacity-50" /> 最大速度
              </div>
              {compareIsps.map((isp, index) => {
                const isBest = index === 0;
                return (
                  <div key={isp.id} className={`flex items-center justify-center py-3.5 border-b border-white/5 border-x ${isBest ? 'border-cyan/20 bg-cyan/[0.03]' : 'border-white/10 bg-white/[0.01]'} text-center`}>
                    <span className="font-mono text-[0.85rem] text-cyan">{isp.max_speed_gbps} Gbps</span>
                  </div>
                );
              })}
            </div>

            {/* VDSL */}
            <div className="contents group">
              <div className="flex items-center gap-2 py-3.5 px-2 pl-1 border-b border-white/5 text-[0.8rem] font-medium text-text-muted">
                <ShieldAlert className="w-3.5 h-3.5 opacity-50" /> VDSL対応
              </div>
              {compareIsps.map((isp, index) => {
                const isBest = index === 0;
                return (
                  <div key={isp.id} className={`flex items-center justify-center py-3.5 border-b border-white/5 border-x ${isBest ? 'border-cyan/20 bg-cyan/[0.04]' : 'border-white/10 bg-white/[0.015]'} text-center`}>
                    <span className={`text-[1.1rem] ${isp.vdsl_support ? 'text-emerald' : 'text-red-400'}`}>{isp.vdsl_support ? '✓' : '✕'}</span>
                  </div>
                );
              })}
            </div>

            {/* Discount (docomo/au/SB dynamically summarized or simplified. For simplicity, showing one row for mobile discount presence) */}
            <div className="contents group">
              <div className="flex items-center gap-2 py-3.5 px-2 pl-1 border-b border-white/5 text-[0.8rem] font-medium text-text-muted">
                <BadgeCent className="w-3.5 h-3.5 opacity-50" /> スマホセット割
              </div>
              {compareIsps.map((isp, index) => {
                const isBest = index === 0;
                const discountText = isp.discounts.length > 0 ? isp.discounts.map(d => `${d.carrier}割`).join(', ') : '—';
                return (
                  <div key={isp.id} className={`flex items-center justify-center py-3.5 border-b border-white/5 border-x ${isBest ? 'border-cyan/20 bg-cyan/[0.03]' : 'border-white/10 bg-white/[0.01]'} text-center`}>
                    <span className={`font-mono text-[0.8rem] ${isp.discounts.length > 0 ? 'text-emerald' : 'text-red-400'}`}>{discountText}</span>
                  </div>
                );
              })}
            </div>

            {/* Score */}
            <div className="contents group">
              <div className="flex items-center gap-2 py-3.5 px-2 pl-1 border-b border-white/10 text-[0.8rem] font-medium text-text-muted">
                <ChevronDown className="w-3.5 h-3.5 opacity-50" /> 総合スコア
              </div>
              {compareIsps.map((isp, index) => {
                const isBest = index === 0;
                const scoreColor = isp.stability_score >= 90 ? 'cyan' : isp.stability_score >= 85 ? 'emerald' : isp.stability_score >= 80 ? 'purple-400' : 'amber-500';
                const bgClass = scoreColor === 'cyan' ? 'bg-cyan' : scoreColor === 'emerald' ? 'bg-emerald' : scoreColor === 'purple-400' ? 'bg-purple-400' : 'bg-amber-500';
                const textClass = scoreColor === 'cyan' ? 'text-cyan' : scoreColor === 'emerald' ? 'text-emerald' : scoreColor === 'purple-400' ? 'text-purple-400' : 'text-amber-500';
                
                return (
                  <div key={isp.id} className={`flex items-center justify-center py-4 px-2 border-b border-white/10 border-x ${isBest ? 'border-cyan/20 bg-cyan/[0.04]' : 'border-white/10 bg-white/[0.015]'} text-center ${isBest ? 'rounded-bl-none' : index === 4 ? 'rounded-br-none' : ''}`}>
                    <div className="flex flex-col items-center gap-1 w-full px-2">
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${bgClass}`} style={{ width: `${isp.stability_score}%` }}></div>
                      </div>
                      <span className={`font-mono text-[0.75rem] font-bold ${textClass}`}>{isp.stability_score}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* CTA Row */}
          <div className="grid grid-cols-[200px_repeat(5,1fr)] gap-x-2 mt-2">
            <div></div>
            {compareIsps.map((isp, index) => {
              const isBest = index === 0;
              return (
                <div key={isp.id} className="py-3 px-2 text-center">
                  <Link href={isp.affiliateLink} className={`inline-flex w-full items-center justify-center gap-1 px-2 py-2.5 rounded-lg font-heading font-bold text-[0.8rem] transition-all ${isBest ? 'bg-cyan text-black hover:-translate-y-px hover:shadow-[0_0_28px_rgba(0,229,255,0.4)]' : 'border border-white/10 bg-transparent text-text-muted hover:border-cyan/30 hover:text-text hover:bg-cyan/5'}`}>
                    申し込む
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="text-[0.72rem] text-text-dim text-center mt-10 leading-[1.7]">
            ※ Ping値は東京リージョン・VALORANTサーバーに対する第三者統計データの推計値です。実際の値はご利用環境により異なります。<br />
            総合スコアはGamer's Lineの独自算出値（Ping値60%・料金20%・安定性20%）です。
          </p>

          {/* Diag CTA */}
          <div className="mt-14 mx-4 sm:mx-0 p-6 sm:p-9 rounded-[20px] border border-cyan/20 bg-cyan/[0.04] flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
            <div className="absolute -top-[40px] -right-[40px] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
            <div className="relative z-10 text-center sm:text-left">
              <h3 className="font-heading text-[1.15rem] font-bold tracking-tight mb-1.5">
                どれが自分に合う？<span className="gradient-text">30秒で分かります</span>
              </h3>
              <p className="text-[0.83rem] text-text-muted leading-[1.5]">
                住居タイプ・キャリア・予算を入力するだけ。完全無料・登録不要。
              </p>
            </div>
            <Link
              href="/diagnosis"
              className="relative z-10 shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cyan text-black font-heading font-bold text-[0.9rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(0,229,255,0.35)] w-full sm:w-auto"
            >
              <Play className="w-4 h-4 fill-black" />
              無料診断スタート
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
