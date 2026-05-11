import type { Metadata } from "next";
import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';
import { getColumnsList } from '@/libs/microcms';
import Breadcrumbs from '@/components/Breadcrumbs';

export const revalidate = 60;

import ColumnSidebar from '@/components/ColumnSidebar';

export default async function ColumnList({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const tag = params.tag as string | undefined;
  const q = params.q as string | undefined;
  const month = params.month as string | undefined;
  
  // Get all columns to check total count, and filtered columns for display
  const allColumns = await getColumnsList();

  // ----------------------------------------------------
  // 絞り込み処理
  // ----------------------------------------------------
  let displayColumns = allColumns;
  if (tag) {
    displayColumns = displayColumns.filter(c => c.category?.includes(tag));
  }
  if (month) {
    displayColumns = displayColumns.filter(c => {
      const date = new Date(c.publishedAt);
      const filterKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return filterKey === month;
    });
  }
  if (q) {
    const query = q.toLowerCase();
    displayColumns = displayColumns.filter(c => 
      c.title.toLowerCase().includes(query) || 
      (c.content && c.content.toLowerCase().includes(query))
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">


      {/* Page Header */}
      <div className="relative z-10 px-4 sm:px-10 py-10 sm:py-[72px] max-w-[1100px] mx-auto w-full border-b border-white/10">
        <Breadcrumbs items={[
          { name: 'HOME', path: '/' },
          { name: 'コラム記事', path: '/column' }
        ]} />
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4 mt-4">
          // COLUMN
        </div>
        <h1 className="relative z-10 font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-4">
          ゲーマーのための<br />
          <span className="gradient-text">回線攻略ガイド</span>
        </h1>
        <p className="text-text-muted text-[0.9rem] sm:text-base max-w-[520px] leading-[1.7]">
          Ping値の仕組みからプロバイダ比較まで。勝率に直結する回線知識をすべて解説。
        </p>
      </div>

      {/* 2-Column Layout */}
      <div className="relative z-10 px-4 sm:px-10 pb-[60px] sm:pb-[100px] max-w-[1350px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-8">
        
        {/* Main Content (Articles Grid) */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-white tracking-wide">
              {q ? `「${q}」の検索結果` : month ? `「${month.replace('-', '年')}月」の記事一覧` : tag ? `「${tag}」の記事一覧` : '最新の記事一覧'}
              <span className="ml-3 text-sm text-text-muted font-mono bg-white/5 px-2 py-0.5 rounded-full">{displayColumns.length}件</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {displayColumns.length > 0 ? (
              displayColumns.map((column, index) => {
                const urlSlug = column.slug ? column.slug.replace(/^\//, '') : column.id;
                return (
                <Link 
                  key={column.id} 
                  href={`/column/${urlSlug}`} 
                  className={`group flex flex-col relative rounded-[20px] border border-white/10 bg-white/[0.035] overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-cyan/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(0,229,255,0.06)] ${index === 0 ? 'sm:col-span-2' : ''}`}
                >
                  <div className={`w-full ${index === 0 ? 'aspect-[16/8] xl:aspect-[24/11]' : 'aspect-[16/8]'} bg-cyan/5 border-b border-white/10 flex items-center justify-center relative overflow-hidden shrink-0`}>
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_24px,rgba(255,255,255,0.015)_24px,rgba(255,255,255,0.015)_25px)]" />
                    {column.thumbnail ? (
                      <img src={column.thumbnail.url} alt={column.title} className="absolute inset-0 w-full h-full object-cover z-10 opacity-80" />
                    ) : (
                      <div className="font-mono text-[0.65rem] text-text-dim tracking-[0.1em] text-center leading-[1.6] z-10 p-3">NO IMAGE</div>
                    )}
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
                      {column.category?.map(cat => (
                        <span key={cat} className="px-2.5 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-[0.68rem] font-semibold tracking-[0.06em] uppercase">{cat}</span>
                      ))}
                      <span className="font-mono text-[0.68rem] text-text-dim tracking-[0.05em] ml-auto">{new Date(column.publishedAt).toLocaleDateString('ja-JP')}</span>
                    </div>
                    <h2 className="font-heading text-[1.05rem] font-bold tracking-tight leading-[1.45] mb-2.5 text-text group-hover:text-cyan transition-colors">
                      {column.title}
                    </h2>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                      <span className="flex items-center gap-1 text-[0.78rem] font-semibold text-cyan font-heading tracking-[0.01em]">
                        続きを読む <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
                      </span>
                    </div>
                  </div>
                </Link>
                );
              })
            ) : (
              /* APIが空の場合のダミーフォールバック */
              <div className="col-span-1 sm:col-span-2 py-10 text-center border border-white/10 border-dashed rounded-2xl bg-white/[0.01]">
                <p className="text-text-muted text-sm">記事が見つかりませんでした。</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6 order-first lg:order-last">
          <ColumnSidebar tag={tag} month={month} q={q} />
        </div>
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
          className="relative z-10 shrink-0 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan to-emerald text-black font-heading font-bold text-[0.9rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,230,118,0.5)] w-full sm:w-auto"
        >
          <Play className="w-4 h-4 fill-black" />
          無料診断スタート
        </Link>
      </div>


    </div>
  );
}

export const metadata: Metadata = {
  alternates: {
    canonical: '/column',
  },
};
