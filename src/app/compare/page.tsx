"use client";

import Link from "next/link";
import { Play, Activity, Wallet, Zap, ShieldAlert, BadgeCent, ChevronDown, ChevronUp, ChevronRight, Gift, ChevronsUpDown } from "lucide-react";
import ispsData from "@/data/isps.json";
import { useState } from "react";
import Tooltip from "@/components/Tooltip";
import Breadcrumbs from "@/components/Breadcrumbs";
import AffiliateLink from "@/components/AffiliateLink";


export default function ComparePage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const toggleFilter = (key: string) => {
    setActiveFilters(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };
  const [sortConfig, setSortConfig] = useState<{key: 'ping' | 'price' | 'speed', direction: 'asc' | 'desc'} | null>(null);

  const handleSort = (key: 'ping' | 'price' | 'speed') => {
    let defaultDirection: 'asc' | 'desc' = key === 'speed' ? 'desc' : 'asc';
    
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === defaultDirection) {
        setSortConfig({ key, direction: defaultDirection === 'asc' ? 'desc' : 'asc' });
      } else {
        setSortConfig(null);
      }
    } else {
      setSortConfig({ key, direction: defaultDirection });
    }
  };
  
  let compareIsps = (ispsData as any[]).filter(isp => !isp.hidden).filter((isp: any) => {
    // Speed Filter
    if (activeFilters.includes('10G') && isp.max_speed_gbps < 10) return false;
    if (activeFilters.includes('1G') && isp.max_speed_gbps >= 10) return false;
    
    // Features
    if (activeFilters.includes('VDSL') && !isp.vdsl_support) return false;
    
    const isCollabo = ['hi-ho', 'gamewith', 'docomo', 'softbank', 'biglobe', 'gaming-plus'].some(id => isp.id.includes(id));
    const isIndependent = ['nuro', 'au', 'commufa', 'pikara', 'megaegg', 'eo', 'bbiq'].some(id => isp.id.includes(id));
    if (activeFilters.includes('collabo') && !isCollabo) return false;
    if (activeFilters.includes('independent') && !isIndependent) return false;

    if (activeFilters.includes('au') && !isp.mobile_discount.includes('au')) return false;
    if (activeFilters.includes('docomo') && !isp.mobile_discount.includes('docomo')) return false;
    if (activeFilters.includes('softbank') && !isp.mobile_discount.includes('softbank')) return false;
    
    // Regions
    const selectedRegions = activeFilters.filter(f => ['hokkaido', 'tohoku', 'kanto', 'chubu', 'kansai', 'chugoku', 'shikoku', 'kyushu'].includes(f));
    if (selectedRegions.length > 0) {
      const supportsSelectedRegion = selectedRegions.some(r => isp.regions.includes(r));
      if (!supportsSelectedRegion) return false;
    }

    // Service Name
    const selectedServices = activeFilters.filter(f => f.startsWith('srv_'));
    if (selectedServices.length > 0) {
      const isMatch = selectedServices.some(srv => {
        const key = srv.replace('srv_', '');
        if (key === 'local') {
          return ['commufa', 'eo', 'megaegg', 'pikara', 'bbiq'].some(b => isp.id.includes(b));
        }
        if (key === 'au') return isp.id.includes('au_hikari');
        return isp.id.includes(key);
      });
      if (!isMatch) return false;
    }
    
    return true;
  });

  if (sortConfig) {
    compareIsps.sort((a, b) => {
      let comparison = 0;
      if (sortConfig.key === 'ping') comparison = a.avg_ping_ms - b.avg_ping_ms;
      if (sortConfig.key === 'price') comparison = a.actual_monthly_fee_jpy - b.actual_monthly_fee_jpy;
      if (sortConfig.key === 'speed') comparison = a.max_speed_gbps - b.max_speed_gbps;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }

  const bestPingValue = Math.min(...compareIsps.map(isp => isp.avg_ping_ms));

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Page Header */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-4 sm:px-10 py-10 sm:py-16 border-b border-white/10">
        <Breadcrumbs items={[
          { name: 'HOME', path: '/' },
          { name: '回線比較', path: '/compare' }
        ]} />
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4 mt-4">
          // COMPARE
        </div>
        <h1 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-4">
          主要ゲーミング回線を<br />
          <span className="gradient-text">徹底比較</span>
        </h1>
        <p className="text-sm text-text-muted max-w-[500px] leading-[1.7]">
          Ping値・月額・速度・割引をすべて並べて一目比較。<br className="hidden sm:block" />
          あなたに合った回線を見つけよう。
        </p>
      </div>

      {/* Comparison Table Section */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-4 sm:px-10 py-10 sm:py-16 pb-24">
        
        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-[0.75rem] font-bold text-text-dim w-16 shrink-0">サービス名</span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'srv_nuro', label: 'NURO光' },
                { id: 'srv_gamewith', label: 'GameWith光' },
                { id: 'srv_hi-ho', label: 'hi-ho ひかり' },
                { id: 'srv_gaming-plus', label: 'Gaming+' },
                { id: 'srv_au', label: 'auひかり' },
                { id: 'srv_docomo', label: 'ドコモ光' },
                { id: 'srv_softbank', label: 'ソフトバンク光' },
                { id: 'srv_biglobe', label: 'ビッグローブ光' },
                { id: 'srv_local', label: '地域独自回線(eo等)' }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => toggleFilter(item.id)}
                  className={`px-4 py-1.5 rounded-full text-[0.75rem] font-bold transition-all ${activeFilters.includes(item.id) ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-text-muted hover:bg-white/10'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[0.75rem] font-bold text-text-dim w-16 shrink-0">速度/条件</span>
            <div className="flex flex-wrap gap-2">
              {['10G', '1G', 'VDSL', 'collabo', 'independent'].map(key => (
                <button 
                  key={key}
                  onClick={() => {
                    if (key === '10G' && activeFilters.includes('1G')) toggleFilter('1G');
                    if (key === '1G' && activeFilters.includes('10G')) toggleFilter('10G');
                    if (key === 'collabo' && activeFilters.includes('independent')) toggleFilter('independent');
                    if (key === 'independent' && activeFilters.includes('collabo')) toggleFilter('collabo');
                    toggleFilter(key);
                  }}
                  className={`px-4 py-1.5 rounded-full text-[0.75rem] font-bold transition-all ${activeFilters.includes(key) ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-text-muted hover:bg-white/10'}`}
                >
                  {key === '10G' ? '10Gプラン' : key === '1G' ? '1G・標準プラン' : key === 'VDSL' ? 'VDSL対応' : key === 'collabo' ? '光コラボ・プロバイダ' : '独自回線'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-[0.75rem] font-bold text-text-dim w-16 shrink-0">スマホ割</span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'au', label: 'au/UQ割' },
                { id: 'docomo', label: 'docomo割' },
                { id: 'softbank', label: 'SoftBank/Y!割' }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => toggleFilter(item.id)}
                  className={`px-4 py-1.5 rounded-full text-[0.75rem] font-bold transition-all ${activeFilters.includes(item.id) ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-text-muted hover:bg-white/10'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-[0.75rem] font-bold text-text-dim w-16 shrink-0">提供エリア</span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'hokkaido', label: '北海道' },
                { id: 'tohoku', label: '東北' },
                { id: 'kanto', label: '関東' },
                { id: 'chubu', label: '東海' },
                { id: 'kansai', label: '関西' },
                { id: 'chugoku', label: '中国' },
                { id: 'shikoku', label: '四国' },
                { id: 'kyushu', label: '九州' }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => toggleFilter(item.id)}
                  className={`px-4 py-1.5 rounded-full text-[0.75rem] font-bold transition-all ${activeFilters.includes(item.id) ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-text-muted hover:bg-white/10'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mb-4">
          <span className="text-[0.65rem] sm:text-[0.7rem] text-white/50 border border-white/10 px-3 py-1.5 rounded-md bg-white/5 font-mono tracking-wider">
            ※表示料金は「戸建て」の標準月額です。マンションにお住まいの場合や、各社のキャンペーン適用で実際の負担額はさらに下がります。
          </span>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="md:hidden flex items-center justify-end gap-1 mb-2 text-[0.65rem] text-cyan/70 font-mono tracking-widest animate-pulse">
          <span>SWIPE</span>
          <ChevronRight className="w-3 h-3" />
        </div>

        <div className="overflow-x-auto custom-scrollbar pb-6">
          <div className="min-w-[700px] md:min-w-[900px]">
          
          {/* Column Headers */}
          <div className="grid gap-2 mb-2" style={{ gridTemplateColumns: `200px repeat(${compareIsps.length}, minmax(180px, 1fr))` }}>
            <div className="flex items-end pb-3 pl-1 font-mono text-[0.65rem] text-white/60 tracking-[0.1em] uppercase">
              // ISP
            </div>
            {compareIsps.map((isp) => {
              const isBest = isp.avg_ping_ms === bestPingValue;
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
          <div className="grid gap-x-2" style={{ gridTemplateColumns: `200px repeat(${compareIsps.length}, minmax(180px, 1fr))` }}>
            
            {/* Ping */}
            <div className="contents group">
              <button 
                onClick={() => handleSort('ping')}
                className="flex items-center gap-2 py-3.5 px-2 pl-1 border-b border-white/5 text-[0.8rem] font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all outline-none text-left w-full cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5 opacity-50" /> <Tooltip text="データが往復する時間の遅延を示す指標。FPSでは15ms以下が理想的とされます。" position="left">平均Ping値</Tooltip>
                {sortConfig?.key === 'ping' ? (
                  sortConfig.direction === 'asc' ? <ChevronDown className="w-3.5 h-3.5 text-cyan ml-auto" /> : <ChevronUp className="w-3.5 h-3.5 text-cyan ml-auto" />
                ) : (
                  <ChevronsUpDown className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 transition-opacity ml-auto" />
                )}
              </button>
              {compareIsps.map((isp) => {
                const isBest = isp.avg_ping_ms === bestPingValue;
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
              <button 
                onClick={() => handleSort('price')}
                className="flex items-center gap-2 py-3.5 px-2 pl-1 border-b border-white/5 text-[0.8rem] font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all outline-none text-left w-full cursor-pointer"
              >
                <Wallet className="w-3.5 h-3.5 opacity-50" /> <Tooltip text="標準月額（税込）です。キャンペーンや割引適用で実際の負担額は変動します。詳細は公式サイトをご確認ください。" position="left">月額料金</Tooltip>
                {sortConfig?.key === 'price' ? (
                  sortConfig.direction === 'asc' ? <ChevronDown className="w-3.5 h-3.5 text-cyan ml-auto" /> : <ChevronUp className="w-3.5 h-3.5 text-cyan ml-auto" />
                ) : (
                  <ChevronsUpDown className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 transition-opacity ml-auto" />
                )}
              </button>
              {compareIsps.map((isp) => {
                const isBest = isp.avg_ping_ms === bestPingValue;
                return (
                  <div key={isp.id} className={`flex flex-col items-center justify-center py-2 border-b border-white/5 border-x ${isBest ? 'border-cyan/20 bg-cyan/[0.04]' : 'border-white/10 bg-white/[0.015]'} text-center gap-1`}>
                    <span className="font-mono font-bold text-[0.85rem] text-text leading-none">¥{isp.actual_monthly_fee_jpy.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            {/* Max speed */}
            <div className="contents group">
              <button 
                onClick={() => handleSort('speed')}
                className="flex items-center gap-2 py-3.5 px-2 pl-1 border-b border-white/5 text-[0.8rem] font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all outline-none text-left w-full cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 opacity-50" /> <Tooltip text="理論上の最も速い通信速度のこと。実際の速度とは異なる場合が多いです。" position="left">最大速度</Tooltip>
                {sortConfig?.key === 'speed' ? (
                  sortConfig.direction === 'desc' ? <ChevronDown className="w-3.5 h-3.5 text-cyan ml-auto" /> : <ChevronUp className="w-3.5 h-3.5 text-cyan ml-auto" />
                ) : (
                  <ChevronsUpDown className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 transition-opacity ml-auto" />
                )}
              </button>
              {compareIsps.map((isp) => {
                const isBest = isp.avg_ping_ms === bestPingValue;
                return (
                  <div key={isp.id} className={`flex items-center justify-center py-3.5 border-b border-white/5 border-x ${isBest ? 'border-cyan/20 bg-cyan/[0.03]' : 'border-white/10 bg-white/[0.01]'} text-center`}>
                    <span className="font-mono text-[0.85rem] text-cyan">{isp.max_speed_gbps} Gbps</span>
                  </div>
                );
              })}
            </div>

            {/* VDSL */}
            <div className="contents group">
              <div className="flex items-center gap-2 py-3.5 px-2 pl-1 border-b border-white/5 text-[0.8rem] font-medium text-white/70">
                <ShieldAlert className="w-3.5 h-3.5 opacity-50" /> <Tooltip text="マンションの共用部から各部屋まで電話線を使う配線方式。最大速度が100Mbps程度に制限されるためゲームには不向きです。" position="left">VDSL対応</Tooltip>
              </div>
              {compareIsps.map((isp) => {
                const isBest = isp.avg_ping_ms === bestPingValue;
                return (
                  <div key={isp.id} className={`flex items-center justify-center py-3.5 border-b border-white/5 border-x ${isBest ? 'border-cyan/20 bg-cyan/[0.04]' : 'border-white/10 bg-white/[0.015]'} text-center`}>
                    <span className={`text-[1.1rem] ${isp.vdsl_support ? 'text-emerald' : 'text-red-400'}`}>{isp.vdsl_support ? '✓' : '✕'}</span>
                  </div>
                );
              })}
            </div>

            {/* Discount (docomo/au/SB dynamically summarized or simplified. For simplicity, showing one row for mobile discount presence) */}
            {/* Discount */}
            <div className="contents group">
              <div className="flex items-center gap-2 py-3.5 px-2 pl-1 border-b border-white/5 text-[0.8rem] font-medium text-white/70">
                <BadgeCent className="w-3.5 h-3.5 opacity-50" /> スマホセット割
              </div>
              {compareIsps.map((isp) => {
                const isBest = isp.avg_ping_ms === bestPingValue;
                const discountText = isp.discounts && isp.discounts.length > 0 ? isp.discounts.map((d: any) => `${d.carrier}利用で割引`).join(', ') : '—';
                return (
                  <div key={isp.id} className={`flex items-center justify-center py-3.5 border-b border-white/5 border-x ${isBest ? 'border-cyan/20 bg-cyan/[0.03]' : 'border-white/10 bg-white/[0.01]'} text-center`}>
                    <span className={`font-mono text-[0.65rem] sm:text-[0.75rem] ${isp.discounts && isp.discounts.length > 0 ? 'text-emerald' : 'text-red-400'}`}>{discountText}</span>
                  </div>
                );
              })}
            </div>

            {/* Cashback */}
            {/*
            <div className="contents group">
              <div className="flex items-center gap-2 py-3.5 px-2 pl-1 border-b border-white/5 text-[0.8rem] font-medium text-white/70">
                <Gift className="w-3.5 h-3.5 opacity-50" /> <Tooltip text="開通後に受け取れる還元額の目安です。受取時期や適用条件は回線ごとに異なります。">キャッシュバック</Tooltip>
              </div>
              {compareIsps.map((isp) => {
                const isBest = isp.avg_ping_ms === bestPingValue;
                return (
                  <div key={isp.id} className={`flex items-center justify-center py-3.5 border-b border-white/5 border-x ${isBest ? 'border-cyan/20 bg-cyan/[0.03]' : 'border-white/10 bg-white/[0.01]'} text-center`}>
                    <span className={`font-mono text-[0.75rem] sm:text-[0.85rem] ${isp.cashback_text !== 'キャンペーンなし' ? 'text-purple-400 font-bold' : 'text-white/40'}`}>{isp.cashback_text || '—'}</span>
                  </div>
                );
              })}
            </div>
            */}

            {/* Score */}
            <div className="contents group">
              <div className="flex items-center gap-2 py-3.5 px-2 pl-1 border-b border-white/10 text-[0.8rem] font-medium text-white/70">
                <ChevronDown className="w-3.5 h-3.5 opacity-50" /> 総合スコア
              </div>
              {compareIsps.map((isp, index) => {
                const isBest = index === 0;
                const scoreColor = isp.stability_score >= 90 ? 'cyan' : isp.stability_score >= 85 ? 'emerald' : isp.stability_score >= 80 ? 'purple-400' : 'amber-500';
                const bgClass = scoreColor === 'cyan' ? 'bg-cyan' : scoreColor === 'emerald' ? 'bg-emerald' : scoreColor === 'purple-400' ? 'bg-purple-400' : 'bg-amber-500';
                const textClass = scoreColor === 'cyan' ? 'text-cyan' : scoreColor === 'emerald' ? 'text-emerald' : scoreColor === 'purple-400' ? 'text-purple-400' : 'text-amber-500';
                
                return (
                  <div key={isp.id} className={`flex items-center justify-center py-4 px-2 border-b border-white/10 border-x ${isBest ? 'border-cyan/20 bg-cyan/[0.04]' : 'border-white/10 bg-white/[0.015]'} text-center ${isBest ? 'rounded-bl-none' : index === compareIsps.length - 1 ? 'rounded-br-none' : ''}`}>
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
          <div className="grid gap-x-2 mt-2" style={{ gridTemplateColumns: `200px repeat(${compareIsps.length}, minmax(180px, 1fr))` }}>
            <div></div>
            {compareIsps.map((isp) => {
              const isBest = isp.avg_ping_ms === bestPingValue;
              return (
                <div key={isp.id} className="py-2 px-1 text-center">
                  {isp.affiliateLink !== "#" ? (
                    <div className="flex flex-col gap-1 items-center w-full">
                      <span className="text-[0.55rem] font-bold text-[#ffeb3b] tracking-tighter w-full text-center whitespace-nowrap overflow-hidden text-ellipsis">
                        ＼ {isp.cashback_text.replace('キャッシュバック', 'CB')} ／
                      </span>
                      <AffiliateLink href={isp.affiliateLink} ispName={isp.name} ispId={isp.id} className="inline-flex w-full items-center justify-center gap-1 px-1 py-2.5 rounded-lg font-heading font-bold text-[0.75rem] bg-cyan text-black transition-all hover:bg-cyan/80 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                        お申し込み
                      </AffiliateLink>
                    </div>
                  ) : (
                    <span className={`inline-flex w-full items-center justify-center gap-1 px-2 py-2.5 rounded-lg font-heading font-bold text-[0.8rem] bg-cyan/30 text-black/50 cursor-not-allowed`}>
                      準備中
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        </div>


        <p className="text-[0.72rem] text-text-dim text-center mt-10 leading-[1.7]">
          ※ Ping値は東京リージョン・VALORANTサーバーに対する第三者統計データの推計値です。実際の値はご利用環境により異なります。<br />
          総合スコアはGamer's Lineの独自算出値（Ping値60%・料金20%・安定性20%）です。
        </p>

        {/* Diag CTA */}
        <div className="mt-14 p-6 sm:p-9 rounded-[20px] border border-cyan/20 bg-cyan/[0.04] flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute -top-[40px] -right-[40px] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 text-center sm:text-left">
            <h3 className="font-heading text-[1.15rem] font-bold tracking-tight mb-1.5">
              どれが自分に合う？<span className="gradient-text">30秒で分かります</span>
            </h3>
            <p className="text-[0.83rem] text-text-muted leading-[1.5]">
              住居タイプ・キャリア・重視するポイントを入力するだけ。完全無料・登録不要。
            </p>
          </div>
          <Link
            href="/diagnosis"
            className="relative z-10 shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan to-emerald text-black font-heading font-bold text-[0.9rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(0,230,118,0.35)] w-full sm:w-auto"
          >
            <Play className="w-4 h-4 fill-black" />
            無料診断スタート
          </Link>
        </div>
      </div>
    </div>
  );
}
