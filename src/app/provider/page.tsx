"use client";
import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";
import ispsData from "@/data/isps.json";
import { useState } from "react";
import Tooltip from "@/components/Tooltip";
import { PROVIDER_DETAILS } from "@/data/providerDetails";

export default function ProviderPage() {
  const [speedFilter, setSpeedFilter] = useState<'all' | '10g' | '1g'>('all');
  
  // Create a filtered version of ispsData
  const filteredIsps = ispsData.filter(isp => {
    if (speedFilter === 'all') return true;
    if (speedFilter === '10g') return isp.max_speed_gbps >= 10;
    if (speedFilter === '1g') return isp.max_speed_gbps < 10;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Page Header */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 sm:px-10 pt-10 pb-8 sm:pt-16 sm:pb-12 overflow-hidden">
        <div className="absolute -top-[60px] -right-[80px] w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.08),transparent_70%)] blur-[40px] pointer-events-none" />
        <div className="relative z-10 font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4">
          // PROVIDER FEATURE
        </div>
        <h1 className="relative z-10 font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-4">
          光回線別<br />
          <span className="gradient-text">徹底特集</span>
        </h1>
        <p className="text-sm text-text-muted max-w-[500px] leading-[1.7]">
          各回線の特徴・強み・弱みをゲーマー目線で深堀り。<br className="hidden sm:block" />
          申し込み前に必ず確認すべき情報を網羅。
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto w-full px-4 sm:px-10">
        <div className="h-px w-full bg-white/10" />
      </div>

      {/* ISP List Section */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 sm:px-10 pt-10 sm:pt-12 pb-24 flex flex-col gap-8">
        
        <div className="flex flex-col gap-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">主要プロバイダ詳細一覧</h2>
          
          {/* Tabs */}
          <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar pt-2">
            <button 
              onClick={() => setSpeedFilter('all')} 
              className={`relative px-6 py-3 font-bold text-sm transition-all whitespace-nowrap overflow-hidden ${speedFilter === 'all' ? 'text-cyan bg-[#0a0a12] rounded-t-lg border-t border-x border-cyan/30 -mb-px z-10' : 'text-text-muted hover:text-white hover:bg-white/5 rounded-t-lg border-t border-x border-transparent'}`}
            >
              {speedFilter === 'all' && <div className="absolute inset-0 bg-cyan/10 pointer-events-none" />}
              <span className="relative z-10">すべて</span>
              {speedFilter === 'all' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan shadow-[0_0_10px_rgba(0,229,255,0.8)] z-20" />}
            </button>
            <button 
              onClick={() => setSpeedFilter('10g')} 
              className={`relative px-6 py-3 font-bold text-sm transition-all whitespace-nowrap overflow-hidden ${speedFilter === '10g' ? 'text-cyan bg-[#0a0a12] rounded-t-lg border-t border-x border-cyan/30 -mb-px z-10' : 'text-text-muted hover:text-white hover:bg-white/5 rounded-t-lg border-t border-x border-transparent'}`}
            >
              {speedFilter === '10g' && <div className="absolute inset-0 bg-cyan/10 pointer-events-none" />}
              <span className="relative z-10">10Gプラン</span>
              {speedFilter === '10g' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan shadow-[0_0_10px_rgba(0,229,255,0.8)] z-20" />}
            </button>
            <button 
              onClick={() => setSpeedFilter('1g')} 
              className={`relative px-6 py-3 font-bold text-sm transition-all whitespace-nowrap overflow-hidden ${speedFilter === '1g' ? 'text-cyan bg-[#0a0a12] rounded-t-lg border-t border-x border-cyan/30 -mb-px z-10' : 'text-text-muted hover:text-white hover:bg-white/5 rounded-t-lg border-t border-x border-transparent'}`}
            >
              {speedFilter === '1g' && <div className="absolute inset-0 bg-cyan/10 pointer-events-none" />}
              <span className="relative z-10">1G・標準プラン</span>
              {speedFilter === '1g' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan shadow-[0_0_10px_rgba(0,229,255,0.8)] z-20" />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-end mb-4">
          <span className="text-[0.65rem] sm:text-[0.7rem] text-white/50 border border-white/10 px-3 py-1.5 rounded-md bg-white/5 font-mono tracking-wider">
            ※表示料金は「戸建て」の標準月額です。マンションにお住まいの場合や、各社のキャンペーン適用で実際の負担額はさらに下がります。
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {filteredIsps.map((isp, index) => {
            const isFirst = index === 0;
            const borderClass = isFirst ? 'border-cyan/25' : 'border-white/10';
            const bgClass = isFirst ? 'bg-cyan/[0.03]' : 'bg-white/[0.035]';
            const shadowClass = isFirst ? 'hover:shadow-[0_24px_64px_rgba(0,0,0,0.4),0_0_30px_rgba(0,229,255,0.07)]' : 'hover:shadow-[0_24px_64px_rgba(0,0,0,0.4),0_0_30px_rgba(255,255,255,0.05)]';
            
            return (
              <div key={isp.id} className={`flex flex-col rounded-[24px] border ${borderClass} ${bgClass} transition-all duration-300 hover:border-cyan/30 hover:-translate-y-1 ${shadowClass} animate-[fadeUp_0.5s_ease_both]`} style={{ animationDelay: `${index * 100}ms` }}>
                <div className="p-7 sm:p-8 pb-6 border-b border-white/10 relative">
                  {isFirst && (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(0,229,255,0.1),transparent_60%)] rounded-t-[24px] pointer-events-none" />
                  )}
                  {!isFirst && (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(255,255,255,0.03),transparent_60%)] rounded-t-[24px] pointer-events-none" />
                  )}
                  
                  <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <div className="font-heading text-[1.4rem] sm:text-[1.5rem] font-bold tracking-tight leading-tight break-keep">{isp.name}</div>
                      <div className="text-[0.75rem] text-text-muted">{isp.providerName}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {isp.badges && isp.badges.map(badge => (
                        <span key={badge} className={`px-3 py-1 rounded-full font-mono text-[0.6rem] font-bold tracking-[0.1em] whitespace-nowrap ${isFirst ? 'bg-cyan text-black' : 'bg-cyan/10 text-cyan border border-cyan/25'}`}>{badge}</span>
                      ))}
                      {!isp.vdsl_support && (
                        <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-mono text-[0.6rem] font-bold tracking-[0.1em] whitespace-nowrap">VDSL 不可</span>
                      )}
                    </div>
                  </div>

                  <div className="relative z-10 flex gap-6 flex-wrap mt-6">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase"><Tooltip text="データが往復する時間の遅延を示す指標。FPSでは15ms以下が理想的とされます。">平均Ping</Tooltip></span>
                      <span className={`font-mono font-bold text-[1.3rem] leading-none ${isp.avg_ping_ms <= 15 ? 'text-emerald drop-shadow-[0_0_14px_rgba(0,230,118,0.4)]' : isp.avg_ping_ms <= 20 ? 'text-cyan' : 'text-amber-500'}`}>{isp.avg_ping_ms} ms</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase"><Tooltip text="月額料金に加えて、初期費用やキャッシュバックなどを全て含めて月割にした、本当の月額料金です。">実質月額</Tooltip></span>
                      <span className="font-mono font-bold text-[1.3rem] leading-none text-text">¥{isp.actual_monthly_fee_jpy.toLocaleString()}〜</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase"><Tooltip text="理論上の最も速い通信速度のこと。実際の速度とは異なる場合が多いです。">最大速度</Tooltip></span>
                      <span className={`font-mono font-bold text-[1.3rem] leading-none text-cyan ${isp.max_speed_gbps >= 10 ? 'drop-shadow-[0_0_14px_rgba(0,229,255,0.4)]' : ''}`}>{isp.max_speed_gbps} Gbps</span>
                    </div>
                    {/*
                    {isp.cashback_text && isp.cashback_text !== "キャンペーンなし" && (
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase"><Tooltip text="開通後に受け取れる還元額の目安です。受取時期や適用条件は回線ごとに異なります。">キャッシュバック</Tooltip></span>
                        <span className="font-mono font-bold text-[1.1rem] leading-none text-purple-400 drop-shadow-[0_0_14px_rgba(192,132,252,0.4)]">{isp.cashback_text}</span>
                      </div>
                    )}
                    */}
                    {isp.discounts && isp.discounts.length > 0 && (
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[0.65rem] text-white/75 tracking-[0.05em] uppercase">{isp.discounts[0].carrier}利用で</span>
                        <span className="font-mono font-bold text-[1.3rem] leading-none text-emerald drop-shadow-[0_0_14px_rgba(0,230,118,0.4)]">-¥{isp.discounts[0].amount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 p-6 sm:p-8 pt-6 flex flex-col gap-5">
                  <p className="text-[0.875rem] text-text/90 leading-[1.75]">
                    {isp.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-emerald mb-1">// メリット</div>
                      {isp.pros && isp.pros.map((pro, i) => (
                        <div key={i} className="flex items-start gap-2 text-[0.82rem] text-text/80 leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />{pro}</div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-red-400 mb-1">// デメリット</div>
                      {isp.cons && isp.cons.map((con, i) => (
                        <div key={i} className="flex items-start gap-2 text-[0.82rem] text-text/80 leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />{con}</div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {isp.tags.map(tag => (
                      <span key={tag} className="px-[11px] py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.72rem] text-cyan font-medium">{tag}</span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                    {isp.affiliateLink !== "#" ? (
                      <div className="flex flex-col gap-1 items-center flex-1">
                        <span className="text-[0.65rem] font-bold text-[#ffeb3b] tracking-tight bg-black/40 px-2 py-0.5 rounded-full border border-[#ffeb3b]/30 shadow-[0_0_10px_rgba(255,235,59,0.1)] w-full text-center whitespace-nowrap overflow-hidden text-ellipsis">
                          ＼ {isp.cashback_text} ／
                        </span>
                        <a href={isp.affiliateLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-gradient-to-r from-cyan to-emerald text-black font-heading font-bold text-[0.875rem] transition-all hover:shadow-[0_0_15px_rgba(0,230,118,0.4)]">
                          お申し込みはこちら <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ) : (
                      <span className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-cyan/30 text-black/50 font-heading font-bold text-[0.875rem] cursor-not-allowed">
                        準備中 <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                      </span>
                    )}
                    {/* 評判・詳細ページへのリンク */}
                    {Object.keys(PROVIDER_DETAILS).includes(isp.id.split('_')[0]) && (
                      <Link href={`/provider/${isp.id.split('_')[0]}`} className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border border-white/10 text-text-muted font-medium text-[0.825rem] transition-all hover:border-cyan/30 hover:text-text hover:bg-cyan/5 flex-1">
                        評判・詳細を見る
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* Diag CTA */}
        <div className="mt-14 p-6 sm:p-10 rounded-[20px] border border-cyan/20 bg-cyan/[0.04] flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
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
            className="relative z-10 shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan to-emerald text-black font-heading font-bold text-[0.9rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(0,230,118,0.35)] w-full sm:w-auto"
          >
            <Play className="w-4 h-4 fill-black" />
            無料診断スタート
          </Link>
        </div>

      </div>
    </div>
  );
}
