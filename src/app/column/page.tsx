import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';
import { getColumnsList } from '@/libs/microcms';

export const revalidate = 60;

export default async function ColumnList({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const tag = searchParams?.tag as string | undefined;
  const columns = await getColumnsList(tag);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">


      {/* Page Header */}
      <div className="relative z-10 px-4 sm:px-10 py-10 sm:py-[72px] max-w-[1100px] mx-auto w-full border-b border-white/10">
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4">
          // COLUMN
        </div>
        <h1 className="font-heading text-[clamp(1.8rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] mb-4">
          ゲーマーのための<br />
          <span className="gradient-text">回線攻略ガイド</span>
        </h1>
        <p className="text-text-muted text-[0.9rem] sm:text-base max-w-[520px] leading-[1.7]">
          Ping値の仕組みからプロバイダ比較まで。勝率に直結する回線知識をすべて解説。
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="relative z-10 px-4 sm:px-10 py-4 sm:py-7 max-w-[1100px] mx-auto w-full flex items-center gap-2 sm:gap-2.5 flex-wrap">
        <Link href="/column" className={`px-[14px] sm:px-[18px] py-[6px] sm:py-[7px] rounded-full border ${!tag ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-white/10 text-text-muted hover:border-cyan/30 hover:text-text hover:bg-cyan/5'} font-medium text-[0.75rem] sm:text-[0.8rem] transition-all tracking-[0.01em]`}>すべて</Link>
        <Link href="/column?tag=FPS" className={`px-[14px] sm:px-[18px] py-[6px] sm:py-[7px] rounded-full border ${tag === 'FPS' ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-white/10 text-text-muted hover:border-cyan/30 hover:text-text hover:bg-cyan/5'} font-medium text-[0.75rem] sm:text-[0.8rem] transition-all tracking-[0.01em]`}>FPS / 格ゲー</Link>
        <Link href="/column?tag=回線の選び方" className={`px-[14px] sm:px-[18px] py-[6px] sm:py-[7px] rounded-full border ${tag === '回線の選び方' ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-white/10 text-text-muted hover:border-cyan/30 hover:text-text hover:bg-cyan/5'} font-medium text-[0.75rem] sm:text-[0.8rem] transition-all tracking-[0.01em]`}>回線の選び方</Link>
        <Link href="/column?tag=プロバイダ比較" className={`px-[14px] sm:px-[18px] py-[6px] sm:py-[7px] rounded-full border ${tag === 'プロバイダ比較' ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-white/10 text-text-muted hover:border-cyan/30 hover:text-text hover:bg-cyan/5'} font-medium text-[0.75rem] sm:text-[0.8rem] transition-all tracking-[0.01em]`}>プロバイダ比較</Link>
        <Link href="/column?tag=ニュース" className={`px-[14px] sm:px-[18px] py-[6px] sm:py-[7px] rounded-full border ${tag === 'ニュース' ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-white/10 text-text-muted hover:border-cyan/30 hover:text-text hover:bg-cyan/5'} font-medium text-[0.75rem] sm:text-[0.8rem] transition-all tracking-[0.01em]`}>ニュース</Link>
      </div>

      {/* Article Grid */}
      <div className="relative z-10 px-4 sm:px-10 pb-[60px] sm:pb-[100px] max-w-[1100px] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        
        {columns.length > 0 ? (
          columns.map((column, index) => (
            <Link 
              key={column.id} 
              href={`/column/${column.id}`} 
              className={`group flex flex-col relative rounded-[20px] border border-white/10 bg-white/[0.035] overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-cyan/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(0,229,255,0.06)] ${index === 0 ? 'md:col-span-2 sm:col-span-2' : ''}`}
            >
              <div className={`w-full ${index === 0 ? 'aspect-[16/7] md:aspect-[16/8]' : 'aspect-[16/7] sm:aspect-[16/8]'} bg-cyan/5 border-b border-white/10 flex items-center justify-center relative overflow-hidden shrink-0`}>
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_24px,rgba(255,255,255,0.015)_24px,rgba(255,255,255,0.015)_25px)]" />
                {column.thumbnail ? (
                  <img src={column.thumbnail.url} alt={column.title} className="absolute inset-0 w-full h-full object-cover z-10 opacity-80" />
                ) : (
                  <div className="font-mono text-[0.65rem] text-text-dim tracking-[0.1em] text-center leading-[1.6] z-10 p-3">NO IMAGE</div>
                )}
              </div>
              <div className="p-4 sm:p-5 md:p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2.5 mb-3.5">
                  {column.category?.[0] && (
                    <span className="px-2.5 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-[0.68rem] font-semibold tracking-[0.06em] uppercase">{column.category[0]}</span>
                  )}
                  <span className="font-mono text-[0.68rem] text-text-dim tracking-[0.05em]">{new Date(column.publishedAt).toLocaleDateString('ja-JP')}</span>
                </div>
                <h2 className="font-heading text-[1.1rem] sm:text-[1.35rem] font-bold tracking-tight leading-[1.45] mb-2.5 text-text group-hover:text-cyan transition-colors">
                  {column.title}
                </h2>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <span className="flex items-center gap-1 text-[0.78rem] font-semibold text-cyan font-heading tracking-[0.01em]">
                    続きを読む <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          /* APIが空の場合のダミーフォールバック */
          <Link href="/column/valorant-ping-guide" className="group flex flex-col relative rounded-[20px] border border-white/10 bg-white/[0.035] overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-cyan/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(0,229,255,0.06)] md:col-span-2 sm:col-span-2">
            <div className="w-full aspect-[16/7] md:aspect-[16/8] bg-cyan/5 border-b border-white/10 flex items-center justify-center relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_24px,rgba(255,255,255,0.015)_24px,rgba(255,255,255,0.015)_25px)]" />
              <div className="font-mono text-[0.65rem] text-text-dim tracking-[0.1em] text-center leading-[1.6] z-10 p-3">ヒーロービジュアル<br />Ping値グラフ / 回線比較イメージ</div>
            </div>
            <div className="p-4 sm:p-5 md:p-7 flex flex-col flex-1">
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="px-2.5 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-[0.68rem] font-semibold tracking-[0.06em] uppercase">FPS</span>
                <span className="font-mono text-[0.68rem] text-text-dim tracking-[0.05em]">2025.05.01</span>
              </div>
              <h2 className="font-heading text-[1.1rem] sm:text-[1.35rem] font-bold tracking-tight leading-[1.45] mb-2.5 text-text group-hover:text-cyan transition-colors">
                VALORANTで勝つための回線設定完全ガイド — Ping値を10ms以下にする方法 (Mock)
              </h2>
              <p className="text-[0.8rem] sm:text-[0.825rem] text-text-muted leading-[1.7] flex-1">
                microCMSで記事を作成すると、ここに一覧が表示されます。現在APIが設定されていないためダミーを表示しています。
              </p>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                <span className="flex items-center gap-1 text-[0.78rem] font-semibold text-cyan font-heading tracking-[0.01em]">
                  続きを読む <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
                </span>
              </div>
            </div>
          </Link>
        )}
        
      </div>

      {/* Sidebar CTA */}
      <div className="relative z-10 mx-4 sm:mx-10 mb-12 sm:mb-20 max-w-[1020px] lg:mx-auto p-6 sm:p-10 rounded-[20px] border border-cyan/20 bg-cyan/[0.04] flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="absolute -top-[60px] -right-[60px] w-[240px] h-[240px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
        <div className="relative z-10 text-center sm:text-left">
          <h3 className="font-heading text-[1.1rem] sm:text-[1.25rem] font-bold tracking-tight mb-1.5">
            あなたに最適な回線、<span className="gradient-text">30秒で分かります</span>
          </h3>
          <p className="text-[0.85rem] text-text-muted">
            コラムで知識をつけたら、無料診断で自分の最適解を見つけよう。登録不要・完全無料。
          </p>
        </div>
        <Link
          href="/diagnosis"
          className="relative z-10 shrink-0 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-cyan text-black font-heading font-bold text-[0.9rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] w-full sm:w-auto"
        >
          <Play className="w-4 h-4 fill-black" />
          無料診断スタート
        </Link>
      </div>


    </div>
  );
}
