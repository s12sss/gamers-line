import Link from "next/link";
import { Play, ChevronRight } from "lucide-react";

export default function ProviderPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Page Header */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 sm:px-10 py-10 sm:py-16 border-b border-white/10 overflow-hidden">
        <div className="absolute -top-[60px] -right-[80px] w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.08),transparent_70%)] blur-[40px] pointer-events-none" />
        <div className="relative z-10 font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4">
          // PROVIDER FEATURE
        </div>
        <h1 className="relative z-10 font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-4">
          プロバイダ別<br />
          <span className="gradient-text">徹底特集</span>
        </h1>
        <p className="relative z-10 text-text-muted text-base max-w-[520px] leading-[1.7]">
          各プロバイダの特徴・強み・弱みをゲーマー目線で深堀り。申し込み前に必ず確認すべき情報を網羅。
        </p>
      </div>

      {/* Provider Grid */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 sm:px-10 py-12 sm:py-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* NURO 光 */}
          <div className="rounded-[24px] border border-cyan/25 bg-cyan/[0.03] overflow-hidden transition-all duration-300 hover:border-cyan/30 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,0,0,0.4),0_0_30px_rgba(0,229,255,0.07)] animate-[fadeUp_0.5s_ease_both]">
            <div className="p-7 sm:p-8 pb-6 border-b border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(0,229,255,0.1),transparent_60%)] pointer-events-none" />
              
              <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <div className="font-heading text-[1.5rem] font-bold tracking-tight">NURO 光</div>
                  <div className="text-[0.8rem] text-text-muted">ソニーネットワークコミュニケーションズ</div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-cyan text-black font-mono text-[0.6rem] font-bold tracking-[0.1em] whitespace-nowrap">BEST PING</span>
                  <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-mono text-[0.6rem] font-bold tracking-[0.1em] whitespace-nowrap">VDSL 不可</span>
                </div>
              </div>

              <div className="relative z-10 flex gap-6 flex-wrap mt-6">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.6rem] text-text-dim tracking-[0.1em] uppercase">平均Ping</span>
                  <span className="font-mono font-bold text-[1.3rem] leading-none text-emerald drop-shadow-[0_0_14px_rgba(0,230,118,0.4)]">8 ms</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.6rem] text-text-dim tracking-[0.1em] uppercase">実質月額</span>
                  <span className="font-mono font-bold text-[1.3rem] leading-none text-text">¥5,200</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.6rem] text-text-dim tracking-[0.1em] uppercase">最大速度</span>
                  <span className="font-mono font-bold text-[1.3rem] leading-none text-cyan drop-shadow-[0_0_14px_rgba(0,229,255,0.4)]">10 Gbps</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.6rem] text-text-dim tracking-[0.1em] uppercase">SB割引</span>
                  <span className="font-mono font-bold text-[1.3rem] leading-none text-emerald drop-shadow-[0_0_14px_rgba(0,230,118,0.4)]">¥500</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 pt-6 flex flex-col gap-5">
              <p className="text-[0.875rem] text-text-muted leading-[1.75]">
                NTT網を介さない独自の光ファイバーインフラにより、業界最低水準のPing値を実現。特に東京・大阪の都市部における安定性は他の追随を許さない。10Gbpsプランはゲーム・4K配信を同時にこなしても帯域不足にならない余裕がある。
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-emerald mb-1">// メリット</div>
                  <div className="flex items-start gap-2 text-[0.82rem] text-text-muted leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />業界最低Ping値（平均8ms）</div>
                  <div className="flex items-start gap-2 text-[0.82rem] text-text-muted leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />独自回線で安定性が高い</div>
                  <div className="flex items-start gap-2 text-[0.82rem] text-text-muted leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />2G/10Gbpsプランあり</div>
                  <div className="flex items-start gap-2 text-[0.82rem] text-text-muted leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />SoftBankユーザーに割引</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-red-400 mb-1">// デメリット</div>
                  <div className="flex items-start gap-2 text-[0.82rem] text-text-muted leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />VDSLマンション不可</div>
                  <div className="flex items-start gap-2 text-[0.82rem] text-text-muted leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />提供エリアがやや限定的</div>
                  <div className="flex items-start gap-2 text-[0.82rem] text-text-muted leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />工事に時間がかかる場合あり</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-[11px] py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.72rem] text-cyan font-medium">超低Ping</span>
                <span className="px-[11px] py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.72rem] text-cyan font-medium">独自回線</span>
                <span className="px-[11px] py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.72rem] text-cyan font-medium">10Gbps対応</span>
                <span className="px-[11px] py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.72rem] text-cyan font-medium">FPS最適</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                <Link href="#" className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-cyan text-black font-heading font-bold text-[0.875rem] transition-all hover:-translate-y-px hover:shadow-[0_0_32px_rgba(0,229,255,0.45)]">
                  申し込む <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/column/valorant-ping-guide" className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border border-white/10 text-text-muted font-medium text-[0.825rem] transition-all hover:border-cyan/30 hover:text-text hover:bg-cyan/5">
                  詳細コラムを読む
                </Link>
              </div>
            </div>
          </div>

          {/* au ひかり */}
          <div className="rounded-[24px] border border-white/10 bg-white/[0.035] overflow-hidden transition-all duration-300 hover:border-cyan/30 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,0,0,0.4),0_0_30px_rgba(0,229,255,0.07)] animate-[fadeUp_0.5s_ease_both] animate-delay-[100ms]">
            <div className="p-7 sm:p-8 pb-6 border-b border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(0,229,255,0.06),transparent_60%)] pointer-events-none" />
              
              <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <div className="font-heading text-[1.5rem] font-bold tracking-tight">au ひかり</div>
                  <div className="text-[0.8rem] text-text-muted">KDDI株式会社</div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-cyan/10 text-cyan border border-cyan/25 font-mono text-[0.6rem] font-bold tracking-[0.1em] whitespace-nowrap">au 割対応</span>
                  <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-mono text-[0.6rem] font-bold tracking-[0.1em] whitespace-nowrap">VDSL 不可</span>
                </div>
              </div>

              <div className="relative z-10 flex gap-6 flex-wrap mt-6">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.6rem] text-text-dim tracking-[0.1em] uppercase">平均Ping</span>
                  <span className="font-mono font-bold text-[1.3rem] leading-none text-emerald drop-shadow-[0_0_14px_rgba(0,230,118,0.4)]">15 ms</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.6rem] text-text-dim tracking-[0.1em] uppercase">実質月額</span>
                  <span className="font-mono font-bold text-[1.3rem] leading-none text-text">¥4,950</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.6rem] text-text-dim tracking-[0.1em] uppercase">最大速度</span>
                  <span className="font-mono font-bold text-[1.3rem] leading-none text-cyan drop-shadow-[0_0_14px_rgba(0,229,255,0.4)]">10 Gbps</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.6rem] text-text-dim tracking-[0.1em] uppercase">au割引</span>
                  <span className="font-mono font-bold text-[1.3rem] leading-none text-emerald drop-shadow-[0_0_14px_rgba(0,230,118,0.4)]">¥1,100</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 pt-6 flex flex-col gap-5">
              <p className="text-[0.875rem] text-text-muted leading-[1.75]">
                KDDIが展開する独自光回線。auスマホとのセット割で実質¥3,850〜と大幅に割安になる。Ping値もNURO光に次ぐ低水準で、戸建て住まいのauユーザーには最有力候補。
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-emerald mb-1">// メリット</div>
                  <div className="flex items-start gap-2 text-[0.82rem] text-text-muted leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />auユーザーは大幅割引</div>
                  <div className="flex items-start gap-2 text-[0.82rem] text-text-muted leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />低Ping（平均15ms）</div>
                  <div className="flex items-start gap-2 text-[0.82rem] text-text-muted leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />10Gbpsプランあり</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-red-400 mb-1">// デメリット</div>
                  <div className="flex items-start gap-2 text-[0.82rem] text-text-muted leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />VDSLマンション不可</div>
                  <div className="flex items-start gap-2 text-[0.82rem] text-text-muted leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />auユーザー以外は割引なし</div>
                  <div className="flex items-start gap-2 text-[0.82rem] text-text-muted leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />提供エリアに制限あり</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-[11px] py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.72rem] text-cyan font-medium">低Ping</span>
                <span className="px-[11px] py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.72rem] text-cyan font-medium">au割対応</span>
                <span className="px-[11px] py-1 bg-cyan/10 border border-cyan/15 rounded-full text-[0.72rem] text-cyan font-medium">戸建て向け</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                <Link href="#" className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-cyan text-black font-heading font-bold text-[0.875rem] transition-all hover:-translate-y-px hover:shadow-[0_0_32px_rgba(0,229,255,0.45)]">
                  申し込む <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/column" className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border border-white/10 text-text-muted font-medium text-[0.825rem] transition-all hover:border-cyan/30 hover:text-text hover:bg-cyan/5">
                  詳細コラムを読む
                </Link>
              </div>
            </div>
          </div>

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
            className="relative z-10 shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-cyan text-black font-heading font-bold text-[0.9rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(0,229,255,0.35)] w-full sm:w-auto"
          >
            <Play className="w-4 h-4 fill-black" />
            無料診断スタート
          </Link>
        </div>

      </div>
    </div>
  );
}
