import { PROVIDER_DETAILS } from '@/data/providerDetails';
import ispsData from '@/data/isps.json';
import Link from 'next/link';
import { ArrowLeft, Zap, ShieldCheck, Check, X, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProviderDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const detail = PROVIDER_DETAILS[resolvedParams.slug];

  if (!detail) {
    notFound();
  }

  // 代表プランの基本スペックを取得
  const mainIsp = ispsData.find((isp) => isp.id === detail.mainIspId);
  
  if (!mainIsp) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-cyan selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.08)_0%,transparent_60%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-24 pb-20 relative z-10">
        <Link href="/provider" className="inline-flex items-center gap-2 text-text-muted hover:text-cyan mb-8 transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> 比較一覧に戻る
        </Link>

        {/* Hero Header */}
        <div className="mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan/30 bg-cyan/10 text-xs font-bold text-cyan tracking-widest mb-6">
            PROVIDER ANALYSIS
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight">
            {detail.name}
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-relaxed">
            {detail.catchphrase}
          </h2>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed max-w-3xl">
            {detail.heroDescription}
          </p>
        </div>

        {/* Spec Radar / Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-text-muted text-xs font-bold tracking-widest mb-2 font-mono">AVG PING</div>
            <div className="text-4xl font-black text-cyan drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              {mainIsp.avg_ping_ms}<span className="text-lg text-text-muted ml-1">ms</span>
            </div>
          </div>
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-text-muted text-xs font-bold tracking-widest mb-2 font-mono">MAX SPEED</div>
            <div className="text-4xl font-black text-emerald drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              {mainIsp.max_speed_gbps}<span className="text-lg text-text-muted ml-1">Gbps</span>
            </div>
          </div>
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-text-muted text-xs font-bold tracking-widest mb-2 font-mono">MONTHLY FEE</div>
            <div className="text-3xl font-black text-purple-400">
              <span className="text-sm mr-1">実質</span>{mainIsp.actual_monthly_fee_jpy.toLocaleString()}<span className="text-lg text-text-muted ml-1">円</span>
            </div>
          </div>
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-text-muted text-xs font-bold tracking-widest mb-2 font-mono">STABILITY</div>
            <div className="text-4xl font-black text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              {mainIsp.stability_score}<span className="text-lg text-text-muted ml-1">/100</span>
            </div>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-emerald/5 border border-emerald/20 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-emerald mb-6 flex items-center gap-2">
              <Check className="w-6 h-6" /> メリット
            </h3>
            <ul className="space-y-4">
              {mainIsp.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-3 text-text-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-2" />
                  <span className="leading-relaxed">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
              <X className="w-6 h-6" /> 注意点・デメリット
            </h3>
            <ul className="space-y-4">
              {mainIsp.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-3 text-text-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2" />
                  <span className="leading-relaxed">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Body Content */}
        <div className="bg-[#050505] border border-white/10 rounded-3xl p-6 sm:p-12 mb-16 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {detail.bodyContent}
        </div>

        {/* Bottom CTA */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-cyan/20 to-emerald/20 border border-cyan/30 p-8 sm:p-12 text-center group">
          <div className="absolute inset-0 bg-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 relative z-10">
            {detail.name} でラグのない世界へ
          </h2>
          <p className="text-[#ffeb3b] font-bold text-sm sm:text-base mb-8 drop-shadow-md relative z-10">
            ＼ {mainIsp.cashback_text} ／
          </p>
          <a
            href={mainIsp.affiliateLink !== "#" ? mainIsp.affiliateLink : "#"}
            target={mainIsp.affiliateLink !== "#" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-cyan text-black font-black text-lg sm:text-xl rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] relative z-10"
          >
            {detail.name}の公式サイトへ進む
            <ChevronRight className="w-6 h-6" />
          </a>
          {mainIsp.affiliateLink === "#" && (
            <p className="text-sm text-text-muted mt-4">※現在リンク準備中です</p>
          )}
        </div>

      </div>
    </div>
  );
}
