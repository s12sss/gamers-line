import Link from "next/link";
import Image from "next/image";
import Tooltip from "@/components/Tooltip";
import { Activity, ShieldCheck, Wallet, ChevronRight, Play, MapPin } from 'lucide-react';
import ispsData from "@/data/isps.json";
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

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-[120px] pb-[100px] overflow-hidden">
        {/* === CYBERPUNK BACKGROUND ELEMENTS === */}
        {/* Perspective Floor Grid */}
        <div className="absolute left-[-10%] right-[-10%] bottom-[-10%] h-[55%] pointer-events-none opacity-50"
             style={{
               backgroundImage: 'linear-gradient(rgba(0,229,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.15) 1px, transparent 1px)',
               backgroundSize: '60px 60px',
               transform: 'perspective(700px) rotateX(62deg)',
               transformOrigin: 'center top',
               WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 35%, transparent 95%)',
               maskImage: 'linear-gradient(180deg, transparent 0%, #000 35%, transparent 95%)'
             }}
        />

        {/* Diagonal Speed Streaks */}
        <div className="absolute inset-0 pointer-events-none opacity-70"
             style={{
               backgroundImage: 'repeating-linear-gradient(105deg, transparent 0px, transparent 80px, rgba(0,229,255,0.04) 80px, rgba(0,229,255,0.04) 81px, transparent 82px, transparent 180px, rgba(0,230,118,0.03) 180px, rgba(0,230,118,0.03) 181px, transparent 182px)',
               WebkitMaskImage: 'linear-gradient(105deg, transparent 0%, #000 25%, #000 75%, transparent 100%)',
               maskImage: 'linear-gradient(105deg, transparent 0%, #000 25%, #000 75%, transparent 100%)'
             }}
        />

        {/* Scanlines Overlay (Hero only) */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-80"
             style={{
               backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px)'
             }}
        />

        {/* Horizon Glow Line */}
        <div className="absolute left-0 right-0 bottom-[40%] h-[1px] pointer-events-none"
             style={{
               background: 'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.5) 30%, rgba(0,230,118,0.5) 70%, transparent 100%)',
               boxShadow: '0 0 14px rgba(0,229,255,0.7), 0 0 28px rgba(0,229,255,0.4)'
             }}
        />

        {/* HUD Brackets (Corner) */}
        <div className="absolute top-8 left-4 sm:left-8 w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-cyan/50 shadow-[-1px_-1px_8px_rgba(0,229,255,0.3)] pointer-events-none" />
        <div className="absolute top-8 right-4 sm:right-8 w-8 h-8 border-t-[1.5px] border-r-[1.5px] border-cyan/50 shadow-[1px_-1px_8px_rgba(0,229,255,0.3)] pointer-events-none" />
        <div className="absolute bottom-8 left-4 sm:left-8 w-8 h-8 border-b-[1.5px] border-l-[1.5px] border-emerald/50 shadow-[-1px_1px_8px_rgba(0,230,118,0.3)] pointer-events-none" />
        <div className="absolute bottom-8 right-4 sm:right-8 w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-emerald/50 shadow-[1px_1px_8px_rgba(0,230,118,0.3)] pointer-events-none" />

        {/* Cross Markers (Sprinkled) */}
        <div className="absolute top-[20%] left-[10%] w-[14px] h-[14px] opacity-50 pointer-events-none hidden sm:block">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-cyan/70 shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-cyan/70 shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
        </div>
        <div className="absolute top-[75%] right-[12%] w-[14px] h-[14px] opacity-40 pointer-events-none hidden sm:block">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-cyan/70 shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-cyan/70 shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
        </div>

        {/* Ambient blobs */}
        <div className="blob w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.18)_0%,transparent_70%)] -top-[100px] left-1/2 -translate-x-1/2 animate-[bloat_8s_ease-in-out_infinite]" />
        <div className="blob w-[400px] h-[350px] bg-[radial-gradient(ellipse,rgba(0,230,118,0.12)_0%,transparent_70%)] bottom-0 -right-[100px] animate-[bloat2_10s_ease-in-out_infinite_2s]" />
        <div className="blob w-[350px] h-[300px] bg-[radial-gradient(ellipse,var(--color-purple-custom)_0%,transparent_70%)] top-1/2 -left-[80px] animate-[bloat3_12s_ease-in-out_infinite_4s]" />



        <h1 className="relative z-10 font-heading text-[clamp(2.5rem,8vw,5.5rem)] font-bold tracking-tighter leading-[1.05] mb-6 animate-[fadeUp_0.6s_ease_0.1s_both]">
          そのラグ、<br />
          <span className="gradient-text">回線のせいかも。</span>
        </h1>

        <p className="relative z-10 text-[clamp(0.95rem,2vw,1.2rem)] text-text-muted max-w-[560px] leading-[1.7] mb-12 animate-[fadeUp_0.6s_ease_0.2s_both]">
          今のプレイ環境を選択するだけで、<br className="hidden sm:block" />
          あなたに本当に必要なゲーミング回線を<br className="sm:hidden" />たった30秒で無料診断
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto animate-[fadeUp_0.6s_ease_0.3s_both]">
          <Link
            href="/diagnosis"
            className="group relative inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-cyan text-black font-heading font-bold text-base transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,229,255,0.55),0_0_100px_rgba(0,229,255,0.2)] active:scale-95 overflow-hidden w-full sm:w-auto"
          >
            <span className="absolute inset-0 bg-white/25 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            <Play className="w-4 h-4 fill-black" />
            <span className="relative z-10">今すぐ無料診断をはじめる</span>
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/10 bg-white/5 text-text-muted text-[15px] font-medium transition-all hover:border-cyan/30 hover:text-text hover:bg-cyan/5 w-full sm:w-auto"
          >
            選ばれる理由
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-text-dim text-[0.7rem] tracking-widest uppercase animate-[fadeIn_1s_ease_1s_both]">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-text-dim animate-[scrollLine_2s_ease-in-out_infinite]"></div>
          scroll
        </div>
      </section>

      {/* Stats Bar */}
      <div className="relative z-10 flex flex-wrap sm:flex-nowrap justify-center border-y border-white/10 bg-cyan/5 overflow-hidden animate-[fadeUp_0.6s_ease_0.4s_both]">
        {[
          { num: "7ms", label: "BEST PING記録" },
          { num: "20件", label: "ゲーマー推奨プラン厳選" },
          { num: "30秒", label: "診断所要時間" },
          { num: "100%", label: "無料・登録不要" },
        ].map((stat, i) => (
          <div key={i} className="flex-1 min-w-[50%] sm:min-w-0 max-w-none sm:max-w-[220px] p-6 sm:p-7 text-center border-b sm:border-b-0 border-r border-white/10 last:border-r-0 even:border-r-0 sm:even:border-r [&:nth-last-child(-n+2)]:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
            <div className="font-mono text-2xl sm:text-[2rem] font-bold text-cyan drop-shadow-[0_0_20px_rgba(0,229,255,0.4)] leading-none mb-1">
              {stat.num}
            </div>
            <div className="text-xs text-text-muted tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>



      {/* Features Section */}
      <section id="features" className="relative z-10 px-4 sm:px-10 py-[60px] sm:py-[100px] max-w-[1100px] mx-auto w-full">
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase mb-3 opacity-70">
          // WHY GAMER'S LINE
        </div>
        <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight mb-[60px]">
          Gamer's Line が<br />
          <span className="gradient-text">選ばれる理由</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="group relative p-6 sm:p-9 rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(0,229,255,0.07)] hover:z-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.06),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px] pointer-events-none" />
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-cyan/10 text-cyan">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold tracking-tight mb-3">Ping値特化の評価ロジック</h3>
            <p className="text-sm text-text-muted leading-[1.7]">
              FPSや格ゲーの勝敗を分ける「<Tooltip text="データが往復する時間の遅延を示す指標。FPSでは15ms以下が理想的とされます。">実測Ping値</Tooltip>（ラグの少なさ）」を基準に、ゲーマーにとって最適な回線を最短30秒で診断。あなたの環境に最も適したストレスのない選択肢をご提案します。
            </p>
          </div>

          {/* Card 2 (Featured) */}
          <div className="group relative p-6 sm:p-9 rounded-[20px] bg-cyan/5 border border-cyan/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(0,229,255,0.07)] hover:z-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.06),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px] pointer-events-none" />
            <div className="absolute top-0 right-0 px-3.5 py-1.5 bg-cyan text-black text-[0.65rem] font-bold tracking-widest rounded-bl-xl rounded-tr-[18px]">
              NEW
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-emerald/10 text-emerald">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold tracking-tight mb-3">無駄な提案を完全ブロック</h3>
            <p className="text-sm text-text-muted leading-[1.7]">
              「おすすめされたのに、うちのマンションでは契約できなかった…」という悲劇を防ぐため、住居タイプ（<Tooltip text="マンションの共用部から各部屋まで電話線を使う配線方式。最大速度が100Mbps程度に制限されるためゲームには不向きです。">VDSL</Tooltip>など）から物理的に導入不可な回線を自動で除外します。
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative p-6 sm:p-9 rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(0,229,255,0.07)] hover:z-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.06),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px] pointer-events-none" />
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-purple-500/10 text-purple-400">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold tracking-tight mb-3">忖度なしの厳選プロバイダ</h3>
            <p className="text-sm text-text-muted leading-[1.7]">
              無数にある光回線の中から、オンラインゲームのプレイに本当に適した（Ping値が低く安定している）プロバイダだけを厳選。<Tooltip text="お使いのスマートフォンと同じキャリアの回線を選ぶことで、月額料金が毎月割引されるお得な制度です。">スマホセット割</Tooltip>にも対応し、コスパと性能を両立した回線が見つかります。
            </p>
          </div>
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
              <p className="text-[0.8rem] text-text-muted leading-relaxed">プレイジャンル・頻度・住居・キャリア・割引・重視点を選ぶだけ</p>
            </div>

            <div className="text-center px-6">
              <div className="relative z-10 w-14 h-14 rounded-full border border-cyan/25 bg-[#050508] flex items-center justify-center mx-auto mb-5 font-mono text-base font-bold text-cyan shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                <div className="absolute inset-0 rounded-full bg-cyan/10" />
                02
              </div>
              <h4 className="font-heading font-semibold text-base mb-2">AIが最適解を算出</h4>
              <p className="text-[0.8rem] text-text-muted leading-relaxed">独自スコアリングで20以上のプランからあなたに最適な3件を選出</p>
            </div>

            <div className="text-center px-6">
              <div className="relative z-10 w-14 h-14 rounded-full border border-cyan/25 bg-[#050508] flex items-center justify-center mx-auto mb-5 font-mono text-base font-bold text-cyan shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                <div className="absolute inset-0 rounded-full bg-cyan/10" />
                03
              </div>
              <h4 className="font-heading font-semibold text-base mb-2">Ping値・料金を比較</h4>
              <p className="text-[0.8rem] text-text-muted leading-relaxed">推測Ping値と実質月額料金を並べて表示。その場で申し込みも可能</p>
            </div>
          </div>
        </div>
      </section>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link href="/compare" className="group relative p-8 rounded-[20px] bg-cyan/5 border border-cyan/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(0,229,255,0.07)]">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-cyan/10 text-cyan">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold tracking-tight mb-2 group-hover:text-cyan transition-colors">回線を比較する</h3>
            <p className="text-sm text-text-muted mb-6">10Gプランやスマホセット割、提供エリアなど複数の条件で絞り込んで徹底比較。</p>
            <div className="flex items-center text-cyan text-sm font-bold font-mono tracking-widest">
              COMPARE <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link href="/provider" className="group relative p-8 rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(0,229,255,0.07)]">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-white/10 text-white">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold tracking-tight mb-2 group-hover:text-white transition-colors">プロバイダ一覧</h3>
            <p className="text-sm text-text-muted mb-6">主要なゲーミング回線の基本情報、月額料金、Ping値などを一覧で確認。</p>
            <div className="flex items-center text-white/70 text-sm font-bold font-mono tracking-widest group-hover:text-white transition-colors">
              PROVIDERS <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link href="/area" className="group relative p-8 rounded-[20px] bg-emerald/5 border border-emerald/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(0,230,118,0.07)]">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-emerald/10 text-emerald">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold tracking-tight mb-2 group-hover:text-emerald transition-colors">エリアから探す</h3>
            <p className="text-sm text-text-muted mb-6">お住まいの地域で利用できるゲーミング回線や、地域限定の強力なローカル回線をチェック。</p>
            <div className="flex items-center text-emerald text-sm font-bold font-mono tracking-widest group-hover:text-emerald transition-colors">
              COVERAGE MAP <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
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
              columns.map((column: any) => (
                <Link key={column.id} href={`/column/${column.id}`} className="group flex flex-col gap-4">
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
                      <span className="text-[0.65rem] text-cyan font-mono tracking-wider px-2 py-0.5 rounded border border-cyan/30 bg-cyan/10">
                        {column.category?.name || 'コラム'}
                      </span>
                      <span className="text-[0.7rem] text-text-muted font-mono">
                        {new Date(column.publishedAt || column.createdAt).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                    <h3 className="font-bold text-[0.95rem] leading-relaxed group-hover:text-cyan transition-colors line-clamp-2">
                      {column.title}
                    </h3>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-text-muted text-sm col-span-full">記事がありません。</p>
            )}
          </div>
        </div>
      </section>

      {/* VPN Promo Banner */}
      <section className="relative z-10 px-4 sm:px-10 py-8 bg-background border-b border-white/5">
        <div className="max-w-[1100px] mx-auto w-full">
          <Link href="/vpn" className="group relative overflow-hidden rounded-2xl bg-[#050508] border border-cyan/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 rounded-full blur-3xl group-hover:bg-cyan/20 transition-colors" />
            
            <div className="relative z-10 flex items-center gap-5">
              <div className="hidden sm:flex w-14 h-14 rounded-xl bg-gradient-to-br from-cyan to-blue-600 items-center justify-center shadow-lg shadow-cyan/20 flex-shrink-0">
                <ShieldCheck className="w-7 h-7 text-black" />
              </div>
              <div>
                <div className="text-cyan text-xs font-mono font-bold tracking-widest mb-1">SPECIAL FEATURE</div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">ゲーマーのための最強VPNガイド</h3>
                <p className="text-sm text-text-muted">回線を変えずにPingを改善・SBMM回避・DDoS対策を行う裏技</p>
              </div>
            </div>
            
            <div className="relative z-10 w-full sm:w-auto">
              <div className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-bold text-sm border border-white/10 group-hover:bg-cyan group-hover:text-black group-hover:border-cyan transition-all w-full">
                特集を見る
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
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
