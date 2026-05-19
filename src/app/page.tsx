import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Activity, ChevronRight, Play, ChevronDown, BarChart2, LayoutList, MapPin } from 'lucide-react';
import { getColumnsList } from "@/libs/microcms";

export const revalidate = 60; // 60 seconds ISR

export default async function Home() {
  const allColumns = await getColumnsList();
  const columns = allColumns ? allColumns.slice(0, 3) : [];
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Gamer's Line",
    url: 'https://gamers-line.jp/',
    description: 'Ping値と実質料金の最適解を導き出す、FPSゲーマー特化型の光回線・Ping改善診断メディア。',
    publisher: {
      '@type': 'Organization',
      name: "Gamer's Line 編集部",
      logo: {
        '@type': 'ImageObject',
        url: 'https://gamers-line.jp/ogp-image.png'
      }
    }
  };

  const faqs = [
    {
      q: "回線診断は本当に無料ですか？",
      a: "はい、完全無料です。個人情報の入力や会員登録なども一切不要で、何度でもご利用いただけます。"
    },
    {
      q: "スピードテストで良い結果を出すには？",
      a: "Wi-Fi（無線LAN）ではなく、Cat6以上の有線LANケーブルを使用してPCから測定することを強くおすすめします。また、バックグラウンドでの動画再生やダウンロードを停止した状態で測定してください。"
    },
    {
      q: "マンションに住んでいますが、どの回線を選べばいいですか？",
      a: "マンションの場合、建物の設備（光配線方式かVDSL方式か）によって選べる回線が異なります。当サイトの診断ツールでは、住居タイプを選択するだけでご自宅に導入可能な最適な回線をご提案します。"
    },
    {
      q: "乗り換えの際、今の回線の違約金はかかりますか？",
      a: "多くのゲーミング回線や主要プロバイダでは、乗り換え時の違約金を全額負担してくれるキャッシュバックキャンペーンを実施しています。各社の特典を活用すれば、実質負担ゼロで乗り換えることが可能です。"
    }
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-[120px] pb-[100px] overflow-hidden">
        {/* === CYBERPUNK BACKGROUND ELEMENTS === */}
        {/* Depth Core (Darken center) */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_38%_at_50%_52%,rgba(8,18,40,0.9)_0%,transparent_70%)]" />

        {/* Corner Glows (matching Twitter Card) */}
        <div className="absolute rounded-full blur-[90px] pointer-events-none w-[560px] h-[560px] left-[-220px] top-[-220px] bg-[rgba(0,229,255,0.25)]" />
        <div className="absolute rounded-full blur-[90px] pointer-events-none w-[480px] h-[480px] right-[-200px] top-[-160px] bg-[rgba(0,180,230,0.18)]" />
        <div className="absolute rounded-full blur-[90px] pointer-events-none w-[520px] h-[520px] left-[-200px] bottom-[-220px] bg-[rgba(0,230,118,0.18)]" />
        <div className="absolute rounded-full blur-[90px] pointer-events-none w-[560px] h-[560px] right-[-240px] bottom-[-240px] bg-[rgba(0,230,118,0.22)]" />
        <div className="absolute rounded-full blur-[60px] pointer-events-none w-[700px] h-[700px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(5,15,35,0.7)]" />

        {/* Flat Grid (mask center) */}
        <div className="absolute inset-0 pointer-events-none"
             style={{
               backgroundImage: 'linear-gradient(rgba(0,229,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.07) 1px, transparent 1px)',
               backgroundSize: '60px 60px',
               backgroundPosition: 'center center',
               WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, #000 80%)',
               maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, #000 80%)'
             }}
        />

        {/* Diagonal Speed Streaks */}
        <div className="absolute inset-0 pointer-events-none opacity-80"
             style={{
               backgroundImage: 'repeating-linear-gradient(105deg, transparent 0px, transparent 80px, rgba(0,229,255,0.05) 80px, rgba(0,229,255,0.05) 81px, transparent 82px, transparent 180px, rgba(0,230,118,0.04) 180px, rgba(0,230,118,0.04) 181px, transparent 182px)',
               WebkitMaskImage: 'linear-gradient(105deg, transparent 0%, #000 25%, #000 75%, transparent 100%)',
               maskImage: 'linear-gradient(105deg, transparent 0%, #000 25%, #000 75%, transparent 100%)'
             }}
        />

        {/* Accent lines */}
        <div className="absolute h-[2px] w-[280px] top-[14%] left-[-40px] -rotate-[18deg] opacity-85 pointer-events-none origin-left"
             style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.9), transparent)', boxShadow: '0 0 14px rgba(0,229,255,0.7)' }} />
        <div className="absolute h-[2px] w-[200px] top-[88%] right-[-20px] -rotate-[18deg] opacity-70 pointer-events-none origin-left"
             style={{ background: 'linear-gradient(90deg, transparent, rgba(0,230,118,0.9), transparent)', boxShadow: '0 0 14px rgba(0,230,118,0.7)' }} />

        {/* HUD Brackets (Corner) */}
        <div className="absolute top-6 left-6 w-9 h-9 border-t-[1.5px] border-l-[1.5px] border-cyan/60 shadow-[-1px_-1px_8px_rgba(0,229,255,0.3)] pointer-events-none hidden sm:block" />
        <div className="absolute top-6 right-6 w-9 h-9 border-t-[1.5px] border-r-[1.5px] border-cyan/60 shadow-[1px_-1px_8px_rgba(0,229,255,0.3)] pointer-events-none hidden sm:block" />
        <div className="absolute bottom-6 left-6 w-9 h-9 border-b-[1.5px] border-l-[1.5px] border-emerald/60 shadow-[-1px_1px_8px_rgba(0,230,118,0.3)] pointer-events-none hidden sm:block" />
        <div className="absolute bottom-6 right-6 w-9 h-9 border-b-[1.5px] border-r-[1.5px] border-emerald/60 shadow-[1px_1px_8px_rgba(0,230,118,0.3)] pointer-events-none hidden sm:block" />

        {/* Cross Markers (Sprinkled) */}
        <div className="absolute top-[18%] left-[8%] w-[14px] h-[14px] opacity-55 pointer-events-none hidden sm:block">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-cyan/70 shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-cyan/70 shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
        </div>
        <div className="absolute top-[74%] left-[6%] w-[14px] h-[14px] opacity-55 pointer-events-none hidden sm:block">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-cyan/70 shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-cyan/70 shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
        </div>
        <div className="absolute top-[22%] right-[7%] w-[14px] h-[14px] opacity-55 pointer-events-none hidden sm:block">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-cyan/70 shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-cyan/70 shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
        </div>

        {/* Vignettes & Overlays */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_45%_35%_at_50%_50%,rgba(2,4,10,0.55)_0%,transparent_70%)]" />
        
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-85"
             style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px)' }} />
             
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.55)_100%)]" />

        {/* TEXT OVERLAY */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-[18px] w-full max-w-[1200px] mx-auto animate-[fadeUp_0.6s_ease_0.1s_both]">
          
          <div className="flex items-center gap-[14px] font-mono text-[0.65rem] sm:text-[0.78rem] text-[#00E5FF] tracking-[0.32em] uppercase drop-shadow-[0_0_14px_rgba(0,229,255,0.5)]">
            <div className="w-[34px] h-[1px] bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" />
            FOR GAMERS / NETWORK MEDIA
            <div className="w-[34px] h-[1px] bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" />
          </div>

          <h1 className="font-heading font-black text-[clamp(2.5rem,6vw,4.4rem)] leading-[1.08] tracking-[-0.04em] text-white text-center drop-shadow-[0_0_24px_rgba(0,229,255,0.25)] sm:drop-shadow-[0_0_60px_rgba(0,0,0,0.6)]">
            そのラグ、<span className="bg-gradient-to-br from-[#00E5FF] to-[#00E676] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(0,229,255,0.45)]">回線</span>のせいかも。
          </h1>

          <div className="mt-2 flex items-center gap-[14px] font-heading font-bold text-[1.1rem] sm:text-[1.35rem] tracking-[-0.02em] text-white">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_14px_#00E5FF,0_0_28px_rgba(0,229,255,0.5)]" />
            <span>Gamer's <span className="text-[#00E5FF] drop-shadow-[0_0_16px_rgba(0,229,255,0.5)]">Line</span></span>
            <span className="ml-[6px] pl-[14px] border-l border-white/20 font-mono font-normal text-[0.75rem] sm:text-[0.85rem] text-[#7a7a9a] tracking-[0.12em]">
              gamers-line.jp
            </span>
          </div>
        </div>

        {/* THE HORIZON LINE & FLOOR GRID (Dynamically positioned between texts) */}
        <div className="relative w-full h-[1px] my-5 sm:my-7 flex justify-center z-0 animate-[fadeIn_1s_ease_0.3s_both]">
          {/* Horizon Glow Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] h-[1px] pointer-events-none"
               style={{
                 background: 'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.5) 30%, rgba(0,230,118,0.5) 70%, transparent 100%)',
                 boxShadow: '0 0 14px rgba(0,229,255,0.7), 0 0 28px rgba(0,229,255,0.4)'
               }}
          />
          {/* Perspective Floor Grid */}
          <div className="absolute top-[1px] left-1/2 -translate-x-1/2 w-[200vw] h-[600px] pointer-events-none opacity-55"
               style={{
                 backgroundImage: 'linear-gradient(rgba(0,229,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.18) 1px, transparent 1px)',
                 backgroundSize: '60px 60px',
                 transform: 'perspective(700px) rotateX(62deg)',
                 transformOrigin: 'center top',
                 WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 35%, transparent 95%)',
                 maskImage: 'linear-gradient(180deg, transparent 0%, #000 35%, transparent 95%)'
               }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-[1200px] mx-auto">
          {/* User's added sentence below all this */}
          <p className="text-[clamp(0.95rem,1.5vw,1.1rem)] text-gray-300 font-medium max-w-[560px] leading-[1.7] text-center animate-[fadeUp_0.6s_ease_0.2s_both]">
            あなたに本当に必要なゲーミング回線を<br className="sm:hidden" />たった30秒で無料診断
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto animate-[fadeUp_0.6s_ease_0.3s_both]">
          <Link
            href="/diagnosis"
            className="group relative inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-cyan text-black font-heading font-bold text-base transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,229,255,0.55),0_0_100px_rgba(0,229,255,0.2)] active:scale-95 overflow-hidden w-full sm:w-auto"
          >
            <span className="absolute inset-0 bg-white/25 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            <Play className="w-4 h-4 fill-black" />
            <span className="relative z-10">今すぐ無料診断をはじめる</span>
          </Link>
          <Link
            href="/speedtest"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/10 bg-white/5 text-text-muted text-[15px] font-medium transition-all hover:border-emerald/30 hover:text-text hover:bg-emerald/5 w-full sm:w-auto"
          >
            <Activity className="w-4 h-4" />
            回線速度を調べる
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
        <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-gray-400 font-medium text-[0.7rem] tracking-widest uppercase animate-[fadeIn_1s_ease_1s_both]">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-gray-400 animate-[scrollLine_2s_ease-in-out_infinite]"></div>
          scroll
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-4 sm:px-10 py-[60px] sm:py-[100px] max-w-[1100px] mx-auto w-full">
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase mb-3 opacity-70">
          // WHY GAMER'S LINE
        </div>
        <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight mb-[60px]">
          Gamer's Line が<br />
          <span className="gradient-text">選ばれる理由</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { num: '01', color: 'cyan' as const, title: '30秒で最適な回線がわかる', desc: 'プレイしているゲームやお住まいの環境を選ぶだけ。あなたに最適な回線を提案します。' },
            { num: '02', color: 'emerald' as const, title: 'ゲームにおすすめの回線を厳選', desc: 'オンラインゲームのプレイに本当に適したプロバイダだけを厳選。スマホセット割にも対応し、コスパと性能を両立した回線が見つかります。' },
            { num: '03', color: 'purple' as const, title: '攻略サイトのように比較できる', desc: 'Ping値・料金・安定性が一目でわかる比較コンテンツを完備。装備を選ぶ感覚で、自分に合った回線を探せます。' },
          ].map(({ num, color, title, desc }) => (
            <div
              key={num}
              className={`group relative flex flex-col p-6 sm:p-8 rounded-[20px] border overflow-hidden transition-all duration-300 hover:-translate-y-1
                ${color === 'cyan' ? 'border-cyan/20 bg-cyan/[0.03] hover:bg-cyan/[0.06] hover:border-cyan/40' :
                  color === 'emerald' ? 'border-emerald/20 bg-emerald/[0.03] hover:bg-emerald/[0.06] hover:border-emerald/40' :
                  'border-purple-500/20 bg-purple-500/[0.03] hover:bg-purple-500/[0.06] hover:border-purple-500/40'}`}
            >
              <div className={`absolute right-4 bottom-4 font-mono font-black text-[5rem] leading-none pointer-events-none select-none opacity-[0.05]
                ${color === 'cyan' ? 'text-cyan' : color === 'emerald' ? 'text-emerald' : 'text-purple-400'}`}>
                {num}
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <span className={`font-mono font-bold text-3xl leading-none mb-5
                  ${color === 'cyan' ? 'text-cyan/50' : color === 'emerald' ? 'text-emerald/50' : 'text-purple-400/50'}`}>
                  {num}
                </span>
                <h3 className="font-heading font-bold text-base text-white mb-2">{title}</h3>
                <p className="text-sm text-text-muted leading-[1.7] flex-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 px-4 sm:px-10 py-[60px] sm:py-[100px] bg-cyan/[0.015] border-y border-white/10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1000px] mx-auto relative">
          <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase mb-3 opacity-70">
            // HOW IT WORKS
          </div>
          <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">
            診断の流れ
          </h2>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-7 mt-[60px]">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-7 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-cyan to-emerald opacity-30" />

            <div className="text-center px-6">
              <div className="relative z-10 w-14 h-14 rounded-full border border-cyan/25 bg-[#050508] flex items-center justify-center mx-auto mb-5 font-mono text-base font-bold text-cyan shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                <div className="absolute inset-0 rounded-full bg-cyan/10" />
                01
              </div>
              <h4 className="font-heading font-semibold text-base mb-2">8つの質問に答える</h4>
              <p className="text-[0.8rem] text-text-muted leading-relaxed">遊んでいるゲームや住環境のほか、回線に求めるものなど簡単な質問に答えるだけ</p>
            </div>

            <div className="text-center px-6">
              <div className="relative z-10 w-14 h-14 rounded-full border border-cyan/25 bg-[#050508] flex items-center justify-center mx-auto mb-5 font-mono text-base font-bold text-cyan shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                <div className="absolute inset-0 rounded-full bg-cyan/10" />
                02
              </div>
              <h4 className="font-heading font-semibold text-base mb-2">AIが最適解を算出</h4>
              <p className="text-[0.8rem] text-text-muted leading-relaxed">独自スコアリングであなたの環境に最適なプロバイダを3件ピックアップ</p>
            </div>

            <div className="text-center px-6">
              <div className="relative z-10 w-14 h-14 rounded-full border border-cyan/25 bg-[#050508] flex items-center justify-center mx-auto mb-5 font-mono text-base font-bold text-cyan shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                <div className="absolute inset-0 rounded-full bg-cyan/10" />
                03
              </div>
              <h4 className="font-heading font-semibold text-base mb-2">Ping値・料金を比較</h4>
              <p className="text-[0.8rem] text-text-muted leading-relaxed">ゲームに必要な要素や月額料金を並べて表示。その場で申し込みも可能</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Banner */}
      <div className="relative z-10 px-4 sm:px-10 py-6 border-y border-white/10 bg-yellow-400/[0.02]">
        <div className="max-w-[1100px] mx-auto">
          <Link
            href="/campaign"
            className="group flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.65rem] text-yellow-400 tracking-widest uppercase shrink-0">2026年5月版</span>
              <span className="text-sm font-bold text-white">主要回線のキャッシュバック情報まとめ</span>
            </div>
            <span className="text-[0.75rem] font-bold text-yellow-400 shrink-0 group-hover:translate-x-0.5 transition-transform whitespace-nowrap">
              キャンペーン一覧 →
            </span>
          </Link>
        </div>
      </div>

            {/* Compare & Providers Section */}
      <section className="relative z-10 px-4 sm:px-10 py-[60px] sm:py-[100px] max-w-[1100px] mx-auto w-full">
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase mb-3 opacity-70">
          // COMPARE & PROVIDERS
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-[40px]">
          <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">
            主要ゲーミング回線を<br />
            <span className="gradient-text">一覧・比較する</span>
          </h2>
          <p className="text-sm text-text-muted max-w-[400px] leading-[1.7]">
            「まずはどんな回線があるか知りたい」<br className="hidden sm:block" />
            「自分で条件を絞り込んで比較したい」という方はこちら。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/compare', Icon: BarChart2, color: 'cyan' as const, title: '回線を比較する', desc: '速度・Ping・料金・10G対応・スマホ割を条件で絞り込み、複数回線を横並びで比較できます。' },
            { href: '/provider', Icon: LayoutList, color: 'white' as const, title: 'プロバイダ一覧', desc: 'Ping値・月額料金・安定性スコア・キャンペーン情報をプロバイダごとに詳しく確認できます。' },
            { href: '/area', Icon: MapPin, color: 'emerald' as const, title: 'エリアから探す', desc: '都道府県を選ぶだけで対応回線がわかります。地域ごとのおすすめ回線と各社のエリア展開を確認できます。' },
          ].map(({ href, Icon, color, title, desc }) => (
            <Link
              key={href}
              href={href}
              className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 min-h-[180px]
                ${color === 'cyan' ? 'border-cyan/20 bg-cyan/[0.03] hover:border-cyan/40 hover:bg-cyan/[0.06]' :
                  color === 'emerald' ? 'border-emerald/20 bg-emerald/[0.03] hover:border-emerald/40 hover:bg-emerald/[0.06]' :
                  'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'}`}
            >
              {/* デコレーションアイコン */}
              <Icon className={`absolute right-5 bottom-5 w-20 h-20 opacity-[0.06] pointer-events-none
                ${color === 'cyan' ? 'text-cyan' : color === 'emerald' ? 'text-emerald' : 'text-white'}`} />
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5
                ${color === 'cyan' ? 'bg-cyan/10 text-cyan' : color === 'emerald' ? 'bg-emerald/10 text-emerald' : 'bg-white/5 text-white/60'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className={`font-heading font-bold text-base text-white mb-1.5 transition-colors
                  ${color === 'cyan' ? 'group-hover:text-cyan' : color === 'emerald' ? 'group-hover:text-emerald' : ''}`}>
                  {title}
                </div>
                <div className="text-xs text-text-muted leading-relaxed">{desc}</div>
              </div>
              <div className={`flex items-center gap-1 mt-5 text-xs font-bold transition-all group-hover:translate-x-0.5
                ${color === 'cyan' ? 'text-cyan/40 group-hover:text-cyan' : color === 'emerald' ? 'text-emerald/40 group-hover:text-emerald' : 'text-white/20 group-hover:text-white/60'}`}>
                詳しく見る <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Columns Section */}
      <section className="relative z-10 px-4 sm:px-10 py-[60px] sm:py-[100px] bg-black/40 border-y border-white/10">
        <div className="max-w-[1100px] mx-auto w-full">
          <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase mb-3 opacity-70">
            // LATEST ARTICLES
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-[40px]">
            <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">
              回線選びに役立つ<br />
              <span className="gradient-text">最新コラム</span>
            </h2>
            <Link href="/column" className="inline-flex items-center gap-1 text-sm font-bold text-text-muted hover:text-cyan transition-colors">
              すべての記事を見る <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {columns.length > 0 ? (
              columns.map((column: any) => {
                const urlSlug = column.slug ? column.slug.replace(/^\//, '') : column.id;
                return (
                <Link key={column.id} href={`/column/${urlSlug}`} className="group flex flex-col gap-4">
                  <div className="relative w-full aspect-[1.91/1] rounded-2xl overflow-hidden border border-white/10">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    {column.thumbnail?.url ? (
                      <Image 
                        src={column.thumbnail.url} 
                        alt={column.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-white/20 font-heading font-bold text-xl">NO IMAGE</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[0.7rem] text-text-muted font-mono">
                        {new Date(column.publishedAt || column.createdAt).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                    <h3 className="font-bold text-[0.95rem] leading-relaxed group-hover:text-cyan transition-colors line-clamp-2">
                      {column.title}
                    </h3>
                  </div>
                </Link>
                );
              })
            ) : (
              <p className="text-text-muted text-sm col-span-full">記事がありません。</p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-4 sm:px-10 py-[60px] sm:py-[100px] bg-cyan/[0.015] border-y border-white/10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase mb-3 opacity-70 text-center">
            // FAQ
          </div>
          <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight mb-[40px] text-center">
            よくある質問
          </h2>
          
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-white/5 border border-white/10 rounded-[16px] overflow-hidden transition-all hover:border-cyan/30">
                <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer font-bold text-[0.95rem] sm:text-base text-white list-none [&::-webkit-details-marker]:hidden">
                  <span className="flex gap-3">
                    <span className="text-cyan font-mono">Q.</span>
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 ml-4 group-open:rotate-180 transition-transform duration-300">
                    <ChevronDown className="w-4 h-4 text-cyan" />
                  </div>
                </summary>
                <div className="px-5 sm:px-6 pb-6 pt-2 text-text-muted text-sm sm:text-[0.95rem] leading-[1.7] border-t border-white/5 flex gap-3">
                  <span className="text-emerald font-mono font-bold mt-0.5">A.</span>
                  <div>{faq.a}</div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 sm:px-10 py-[60px] sm:py-[80px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_50%,rgba(0,229,255,0.06),transparent_70%)] pointer-events-none" />
        <h2 className="font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight mb-4 relative z-10">
          今すぐ、<span className="gradient-text">最適な回線</span>を見つけよう
        </h2>
        <p className="text-text-muted mb-10 text-base relative z-10">
          登録不要・完全無料。30秒で診断完了。
        </p>
        <Link
          href="/diagnosis"
          className="group relative inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-cyan text-black font-heading font-bold text-base transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,229,255,0.55),0_0_100px_rgba(0,229,255,0.2)] active:scale-95 overflow-hidden w-full sm:w-auto"
        >
          <span className="absolute inset-0 bg-white/25 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
          <Play className="w-4 h-4 fill-black" />
          <span className="relative z-10">無料診断スタート</span>
        </Link>
      </section>


    </div>
  );
}

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};
