import Link from 'next/link';
import { ChevronRight, Play, Check, X } from 'lucide-react';
import ScrollProgress from '@/components/ScrollProgress';
import '../article.css';
import { getColumnDetail } from '@/libs/microcms';
import { Metadata, ResolvingMetadata } from 'next';
import * as cheerio from 'cheerio';
import ClientArticleBody from '@/components/ClientArticleBody';

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const column = await getColumnDetail(resolvedParams.slug).catch(() => null);

  if (!column) {
    return {
      title: '記事が見つかりません | Gamer\'s Line',
    };
  }

  return {
    title: `${column.title} | Gamer's Line`,
    description: column.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...',
    openGraph: {
      title: `${column.title} | Gamer's Line`,
      description: column.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...',
      images: column.thumbnail ? [column.thumbnail.url] : [],
    },
  };
}

export default async function ColumnArticle({ params }: Props) {
  const resolvedParams = await params;
  const column = await getColumnDetail(resolvedParams.slug).catch(() => null);

  let processedContent = column?.content || '';
  const headings: { id: string; text: string }[] = [];

  if (column) {
    // cheerioの最新バージョンでは load() に { isDocument: false } を渡すことでbody/htmlの自動補完を防げます
    const $ = cheerio.load(column.content, null, false);
    $('h2').each((index, element) => {
      const id = `chapter-${index + 1}`;
      $(element).attr('id', id);
      headings.push({ id, text: $(element).text() });
    });
    processedContent = $.html();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <ScrollProgress />
      {column ? (
        <>
          {/* Article Hero */}
          <div className="relative z-10 max-w-[1000px] mx-auto px-4 sm:px-10 py-8 sm:py-16 w-full">
            <div className="flex items-center gap-2 mb-5 sm:mb-7 text-[0.7rem] sm:text-[0.78rem] text-text-dim font-mono tracking-[0.03em] flex-wrap">
              <Link href="/" className="hover:text-text-muted transition-colors">HOME</Link>
              <span className="opacity-40">/</span>
              <Link href="/column" className="hover:text-text-muted transition-colors">COLUMN</Link>
              <span className="opacity-40">/</span>
              <span className="text-text-muted uppercase">{column.title}</span>
            </div>

            <div className="flex gap-2 mb-4 sm:mb-5 flex-wrap">
              {column.category?.map(cat => (
                <span key={cat} className="px-3 py-1 rounded-full text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.06em] uppercase bg-cyan/10 text-cyan border border-cyan/20">{cat}</span>
              ))}
            </div>

            <h1 className="font-heading text-[clamp(1.5rem,4vw,2.8rem)] font-bold tracking-tight leading-[1.2] mb-5 text-wrap">
              {column.title}
            </h1>

            <div className="flex items-center gap-4 sm:gap-5 flex-wrap pb-6 sm:pb-8 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-cyan/30 to-emerald/30 border border-cyan/20 flex items-center justify-center font-mono text-[0.65rem] sm:text-[0.7rem] text-cyan font-bold">
                  GL
                </div>
                <span className="text-[0.8rem] sm:text-[0.85rem] font-semibold text-text">Gamer's Line 編集部</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="font-mono text-[0.68rem] sm:text-[0.72rem] text-text-muted tracking-[0.04em]">
                {new Date(column.publishedAt || column.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')} UPDATE
              </div>
            </div>

            {/* Hero Thumb */}
            <div className="w-full aspect-[16/7] bg-cyan/[0.03] border border-white/10 rounded-[16px] sm:rounded-[20px] my-6 sm:my-9 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_28px,rgba(255,255,255,0.012)_28px,rgba(255,255,255,0.012)_29px)]" />
              {column.thumbnail ? (
                <img src={column.thumbnail.url} alt={column.title} className="absolute inset-0 w-full h-full object-cover z-10" />
              ) : (
                <div className="relative z-10 text-center font-mono text-[0.65rem] sm:text-[0.68rem] text-text-dim tracking-[0.1em] leading-[1.7]">
                  NO IMAGE
                </div>
              )}
            </div>
          </div>

          {/* Main Content Wrapper */}
          <div className="relative z-10 max-w-[760px] mx-auto px-4 sm:px-10 pb-20 sm:pb-24 w-full article-body">
            
            {/* 目次（TOC） */}
            {headings.length > 0 && (
              <nav className="mb-14 p-7 px-8 rounded-2xl border border-cyan/15 bg-cyan/[0.04] relative overflow-hidden" aria-label="目次">
                <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-cyan to-emerald rounded-l-sm" />
                <div className="flex items-center gap-2 font-mono text-[0.7rem] text-cyan tracking-widest uppercase mb-4">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  目次
                </div>
                <ol className="flex flex-col gap-2 m-0 p-0 list-none">
                  {headings.map((heading, i) => (
                    <li key={heading.id} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-cyan/50 text-[0.65rem] shrink-0">
                        {i + 1 < 10 ? `0${i + 1}` : i + 1}
                      </span>
                      <a 
                        href={`#${heading.id}`} 
                        className="text-[0.875rem] text-text-muted hover:text-cyan transition-colors leading-[1.4] no-underline"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* 記事本文 */}
            <ClientArticleBody content={processedContent} />

            {/* Diagnosis CTA Inline */}
            <div className="my-10 sm:my-14 p-6 sm:p-9 rounded-[20px] border border-cyan/20 bg-cyan/[0.04] flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
              <div className="absolute -top-[40px] -right-[40px] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
              <div className="relative z-10 text-center sm:text-left">
                <h3 className="font-heading text-[1.1rem] sm:text-[1.15rem] font-bold tracking-tight !mt-0 !mb-1.5 !text-text">
                  あなたに最適な回線を診断
                </h3>
                <p className="text-[0.8rem] sm:text-[0.83rem] text-text-muted leading-[1.5] !m-0">
                  エリアや住居タイプを入力するだけで、ベストな回線を提案します。
                </p>
              </div>
              <Link
                href="/diagnosis"
                className="relative z-10 shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cyan !text-black font-heading font-bold text-[0.85rem] sm:text-[0.9rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(0,229,255,0.35)] w-full sm:w-auto !no-underline"
              >
                <Play className="w-4 h-4 fill-black" />
                無料診断スタート
              </Link>
            </div>

          </div>
        </>
      ) : (
        /* モックデータ（フォールバック） */
        <>
          {/* Article Hero */}
          <div className="relative z-10 max-w-[1000px] mx-auto px-4 sm:px-10 py-8 sm:py-16 w-full">
            <div className="flex items-center gap-2 mb-5 sm:mb-7 text-[0.7rem] sm:text-[0.78rem] text-text-dim font-mono tracking-[0.03em] flex-wrap">
              <Link href="/" className="hover:text-text-muted transition-colors">HOME</Link>
              <span className="opacity-40">/</span>
              <Link href="/column" className="hover:text-text-muted transition-colors">COLUMN</Link>
              <span className="opacity-40">/</span>
              <span className="text-text-muted">VALORANT PING GUIDE</span>
            </div>

            <div className="flex gap-2 mb-4 sm:mb-5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.06em] uppercase bg-cyan/10 text-cyan border border-cyan/20">FPS</span>
              <span className="px-3 py-1 rounded-full text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.06em] uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20">回線の選び方</span>
            </div>

            <h1 className="font-heading text-[clamp(1.5rem,4vw,2.8rem)] font-bold tracking-tight leading-[1.2] mb-5 text-wrap">
              VALORANTで勝つための<br />
              <span className="gradient-text">回線設定完全ガイド</span> — Ping値を10ms以下にする方法
            </h1>

            <div className="flex items-center gap-4 sm:gap-5 flex-wrap pb-6 sm:pb-8 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-cyan/30 to-emerald/30 border border-cyan/20 flex items-center justify-center font-mono text-[0.65rem] sm:text-[0.7rem] text-cyan font-bold">
                  GL
                </div>
                <span className="text-[0.8rem] sm:text-[0.85rem] font-semibold text-text">Gamer's Line 編集部</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="font-mono text-[0.68rem] sm:text-[0.72rem] text-text-muted tracking-[0.04em]">2025.05.01 UPDATE</div>
            </div>

            {/* Hero Thumb */}
            <div className="w-full aspect-[16/7] bg-cyan/[0.03] border border-white/10 rounded-[16px] sm:rounded-[20px] my-6 sm:my-9 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_28px,rgba(255,255,255,0.012)_28px,rgba(255,255,255,0.012)_29px)]" />
              <div className="relative z-10 text-center font-mono text-[0.65rem] sm:text-[0.68rem] text-text-dim tracking-[0.1em] leading-[1.7]">
                ヒーロービジュアル<br />Ping値グラフ / 回線比較イメージ
              </div>
            </div>
          </div>

          {/* Main Content Wrapper */}
          <div className="relative z-10 max-w-[760px] mx-auto px-4 sm:px-10 pb-20 sm:pb-24 w-full article-body">
            
            {/* TOC */}
            <div className="mb-10 sm:mb-14 p-5 sm:p-8 rounded-[16px] border border-cyan/15 bg-cyan/[0.04] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-cyan to-emerald rounded-l-[3px]" />
              <div className="flex items-center gap-2 font-mono text-[0.7rem] text-cyan tracking-[0.15em] uppercase mb-4 font-bold">
                CONTENTS
              </div>
              <ol className="toc-list">
                <li><a href="#section-1" className="text-[0.8rem] sm:text-[0.875rem] text-text-muted hover:text-cyan transition-colors leading-[1.4]">なぜVALORANTにおいてPing値が「命」なのか</a></li>
                <li><a href="#section-2" className="text-[0.8rem] sm:text-[0.875rem] text-text-muted hover:text-cyan transition-colors leading-[1.4]">まずは自分の「Ping値」と「パケットロス」を正確に測る</a></li>
                <li><a href="#section-3" className="text-[0.8rem] sm:text-[0.875rem] text-text-muted hover:text-cyan transition-colors leading-[1.4]">ルーターとLANケーブルを見直す（今すぐできる対策）</a></li>
                <li><a href="#section-4" className="text-[0.8rem] sm:text-[0.875rem] text-text-muted hover:text-cyan transition-colors leading-[1.4]">プロバイダ・回線を乗り換える（根本的な解決策）</a></li>
              </ol>
            </div>

            <h2 id="section-1">なぜVALORANTにおいてPing値が「命」なのか</h2>
            <p>
              VALORANTやAPEXなどのタクティカルシューターにおいて、<strong>「Ping値（応答速度）」は勝敗を分ける最も重要な要素</strong>です。
              どんなにエイム練習をしても、回線のラグがあれば「撃ち負ける」という理不尽な状況が発生します。
            </p>

            {/* Stat Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 my-6 sm:my-8">
              <div className="p-4 sm:p-5 rounded-[14px] border border-white/10 bg-white/[0.035] text-center">
                <div className="font-mono text-[1.75rem] sm:text-[2rem] font-bold leading-none mb-1.5 text-cyan drop-shadow-[0_0_16px_rgba(0,229,255,0.4)]">10ms</div>
                <div className="text-[0.7rem] sm:text-[0.75rem] text-text-muted leading-[1.4]">プロ・競技シーンの<br />理想的なPing値</div>
              </div>
              <div className="p-4 sm:p-5 rounded-[14px] border border-white/10 bg-white/[0.035] text-center">
                <div className="font-mono text-[1.75rem] sm:text-[2rem] font-bold leading-none mb-1.5 text-emerald drop-shadow-[0_0_16px_rgba(0,230,118,0.4)]">15ms</div>
                <div className="text-[0.7rem] sm:text-[0.75rem] text-text-muted leading-[1.4]">快適にプレイできる<br />合格ライン</div>
              </div>
              <div className="p-4 sm:p-5 rounded-[14px] border border-white/10 bg-white/[0.035] text-center">
                <div className="font-mono text-[1.75rem] sm:text-[2rem] font-bold leading-none mb-1.5 text-purple-400 drop-shadow-[0_0_16px_rgba(167,139,250,0.4)]">30ms+</div>
                <div className="text-[0.7rem] sm:text-[0.75rem] text-text-muted leading-[1.4]">撃ち負けが発生し始める<br />要改善ライン</div>
              </div>
            </div>

            {/* Tip Callout */}
            <div className="my-6 sm:my-8 p-5 sm:p-6 rounded-[14px] relative overflow-hidden bg-cyan/5 border border-cyan/15">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-cyan rounded-l-[3px]" />
              <div className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-[0.15em] uppercase mb-2.5 flex items-center gap-1.5 font-bold text-cyan">
                TIP: パケットロス（Packet Loss）にも注意
              </div>
              <p className="text-[0.8rem] sm:text-[0.875rem] leading-[1.75] text-cyan/85 !m-0">
                Ping値が低くても、パケットロス（データの欠損）が発生していると「弾抜け」や「瞬間移動」が起きます。VALORANTの設定からネットワーク統計を表示し、パケットロスが0%で安定しているか確認しましょう。
              </p>
            </div>

            <h2 id="section-4">プロバイダ・回線を乗り換える（根本的な解決策）</h2>
            <p>
              LANケーブルやルーターを変えてもPing値が下がらない場合、原因は「大元の光回線」や「マンションの配線方式（VDSL等）」にあります。
              この場合、回線そのものを乗り換えるのが唯一の解決策です。
            </p>
            
            {/* Comparison Table */}
            <div className="overflow-x-auto my-6 sm:my-8 rounded-[16px] border border-white/10">
              <table className="article-table min-w-[500px] sm:min-w-[600px]">
                <thead>
                  <tr>
                    <th>回線名</th>
                    <th>平均Ping値</th>
                    <th>独自回線</th>
                    <th>おすすめ度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="row-best">
                    <td>
                      NURO光
                      <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 bg-cyan/10 border border-cyan/25 rounded-full font-mono text-[0.55rem] sm:text-[0.6rem] text-cyan tracking-[0.08em] font-bold ml-1.5">BEST</span>
                    </td>
                    <td className="font-mono font-bold text-emerald">11.5ms</td>
                    <td><Check className="w-4 h-4 text-emerald mx-auto" /></td>
                    <td className="font-mono text-cyan font-bold tracking-widest text-base sm:text-lg">SS</td>
                  </tr>
                  <tr>
                    <td>auひかり</td>
                    <td className="font-mono font-bold text-emerald">14.2ms</td>
                    <td><Check className="w-4 h-4 text-emerald mx-auto" /></td>
                    <td className="font-mono text-text font-bold tracking-widest text-base sm:text-lg">S</td>
                  </tr>
                  <tr>
                    <td>ドコモ光</td>
                    <td className="font-mono font-bold text-amber-500">18.5ms</td>
                    <td><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                    <td className="font-mono text-text font-bold tracking-widest text-base sm:text-lg">A</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Diagnosis CTA Inline */}
            <div className="my-10 sm:my-14 p-6 sm:p-9 rounded-[20px] border border-cyan/20 bg-cyan/[0.04] flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
              <div className="absolute -top-[40px] -right-[40px] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
              <div className="relative z-10 text-center sm:text-left">
                <h3 className="font-heading text-[1.1rem] sm:text-[1.15rem] font-bold tracking-tight !mt-0 !mb-1.5 !text-text">
                  あなたに最適な回線を診断
                </h3>
                <p className="text-[0.8rem] sm:text-[0.83rem] text-text-muted leading-[1.5] !m-0">
                  エリアや住居タイプを入力するだけで、ベストな回線を提案します。
                </p>
              </div>
              <Link
                href="/diagnosis"
                className="relative z-10 shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cyan text-black font-heading font-bold text-[0.85rem] sm:text-[0.9rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(0,229,255,0.35)] w-full sm:w-auto !no-underline"
              >
                <Play className="w-4 h-4 fill-black" />
                無料診断スタート
              </Link>
            </div>

          </div>
        </>
      )}


    </div>
  );
}
