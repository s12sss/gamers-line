import Link from 'next/link';
import { Suspense } from 'react';
import { Hash, Search, ChevronDown, CalendarDays } from 'lucide-react';
import { getColumnsList } from '@/libs/microcms';
import ColumnSearch from '@/components/ColumnSearch';

const SERVICE_TAGS = [
  'NURO光', 'GameWith光', 'hi-ho ひかり', 'auひかり', 'ドコモ光', 'ソフトバンク光', 
  'ビッグローブ光', 'コミュファ光', 'eo光', 'メガ・エッグ', 'ピカラ光', 'BBIQ', 'Gaming+'
];
const KNOWLEDGE_TAGS = ['回線の基礎知識', '失敗しない選び方'];
const REVIEW_TAGS = ['回線・プロバイダ比較', 'サービス実測・検証', 'ゲーミング製品レビュー', 'ルーター・周辺機器'];
const GENRE_TAGS = ['FPS / TPS', '格闘ゲーム', 'MOBA', 'MMO', 'スマホゲーム', 'その他ゲーム'];
const PLAYER_TAGS = ['プロゲーマー・ストリーマー'];
const OTHER_TAGS = ['ネットワーク設定', 'SIM・スマホ', 'お得なキャンペーン', 'VPN'];

type Props = {
  tag?: string;
  month?: string;
  q?: string;
  className?: string;
};

export default async function ColumnSidebar({ tag, month, q, className = '' }: Props) {
  const allColumns = await getColumnsList().catch(() => []);

  // 存在するカテゴリ（タグ）の抽出
  const activeCategories = new Set<string>();
  allColumns.forEach(c => {
    c.category?.forEach(cat => activeCategories.add(cat));
  });

  const activeServiceTags = SERVICE_TAGS.filter(t => activeCategories.has(t));
  const activeKnowledgeTags = KNOWLEDGE_TAGS.filter(t => activeCategories.has(t));
  const activeReviewTags = REVIEW_TAGS.filter(t => activeCategories.has(t));
  const activeGenreTags = GENRE_TAGS.filter(t => activeCategories.has(t));
  const activePlayerTags = PLAYER_TAGS.filter(t => activeCategories.has(t));
  const activeOtherTags = OTHER_TAGS.filter(t => activeCategories.has(t));

  // 月別アーカイブの集計
  const archiveMap = new Map<string, { label: string; count: number }>();
  allColumns.forEach(c => {
    if (!c.publishedAt) return;
    const date = new Date(c.publishedAt);
    const filterKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = `${date.getFullYear()}年${date.getMonth() + 1}月`;
    
    if (archiveMap.has(filterKey)) {
      archiveMap.get(filterKey)!.count += 1;
    } else {
      archiveMap.set(filterKey, { label, count: 1 });
    }
  });
  const archives = Array.from(archiveMap.entries()).sort((a, b) => b[0].localeCompare(a[0]));

  return (
    <div className={`flex flex-col gap-6 lg:gap-8 ${className}`}>
      {/* Mobile Accordion */}
      <details className="lg:hidden group bg-white/5 border border-white/10 rounded-[20px] overflow-hidden">
        <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer font-bold text-[0.85rem] text-white hover:bg-white/10 transition-colors list-none [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <Search className="w-4 h-4 text-cyan" /> 記事を検索・絞り込み
          </span>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="p-4 sm:p-5 pt-0 flex flex-col gap-6 border-t border-white/10 mt-1">
          {/* Search Box */}
          <div>
            <h3 className="text-[0.8rem] font-bold tracking-wider text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-cyan rounded-full"></span> 記事を検索
            </h3>
            <Suspense fallback={<div className="h-10 w-full bg-white/5 rounded-full animate-pulse"></div>}>
              <ColumnSearch />
            </Suspense>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-5 pt-2">
            {activeServiceTags.length > 0 && (
              <div>
                <h3 className="text-[0.75rem] font-bold tracking-wider text-white/80 mb-2.5 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-cyan" /> サービス名
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeServiceTags.map(t => (
                    <Link key={t} href={`/column?tag=${t}`} className={`px-3 py-1.5 rounded-md text-[0.7rem] font-medium transition-all ${tag === t ? 'bg-cyan/20 text-cyan border border-cyan/50' : 'bg-white/5 text-text-muted border border-white/5 hover:bg-white/10 hover:text-white'}`}>
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {activeKnowledgeTags.length > 0 && (
              <div>
                <h3 className="text-[0.75rem] font-bold tracking-wider text-white/80 mb-2.5 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-cyan" /> 基礎知識・選び方
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeKnowledgeTags.map(t => (
                    <Link key={t} href={`/column?tag=${t}`} className={`px-3 py-1.5 rounded-md text-[0.7rem] font-medium transition-all ${tag === t ? 'bg-cyan/20 text-cyan border border-cyan/50' : 'bg-white/5 text-text-muted border border-white/5 hover:bg-white/10 hover:text-white'}`}>
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {activeReviewTags.length > 0 && (
              <div>
                <h3 className="text-[0.75rem] font-bold tracking-wider text-white/80 mb-2.5 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-cyan" /> 検証・レビュー
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeReviewTags.map(t => (
                    <Link key={t} href={`/column?tag=${t}`} className={`px-3 py-1.5 rounded-md text-[0.7rem] font-medium transition-all ${tag === t ? 'bg-cyan/20 text-cyan border border-cyan/50' : 'bg-white/5 text-text-muted border border-white/5 hover:bg-white/10 hover:text-white'}`}>
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {activeGenreTags.length > 0 && (
              <div>
                <h3 className="text-[0.75rem] font-bold tracking-wider text-white/80 mb-2.5 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-cyan" /> ゲームジャンル
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeGenreTags.map(t => (
                    <Link key={t} href={`/column?tag=${t}`} className={`px-3 py-1.5 rounded-md text-[0.7rem] font-medium transition-all ${tag === t ? 'bg-cyan/20 text-cyan border border-cyan/50' : 'bg-white/5 text-text-muted border border-white/5 hover:bg-white/10 hover:text-white'}`}>
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {activePlayerTags.length > 0 && (
              <div>
                <h3 className="text-[0.75rem] font-bold tracking-wider text-white/80 mb-2.5 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-cyan" /> プロゲーマー・ストリーマー
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activePlayerTags.map(t => (
                    <Link key={t} href={`/column?tag=${t}`} className={`px-3 py-1.5 rounded-md text-[0.7rem] font-medium transition-all ${tag === t ? 'bg-cyan/20 text-cyan border border-cyan/50' : 'bg-white/5 text-text-muted border border-white/5 hover:bg-white/10 hover:text-white'}`}>
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {activeOtherTags.length > 0 && (
              <div>
                <h3 className="text-[0.75rem] font-bold tracking-wider text-white/80 mb-2.5 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-cyan" /> トレンド・その他
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeOtherTags.map(t => (
                    <Link key={t} href={`/column?tag=${t}`} className={`px-3 py-1.5 rounded-md text-[0.7rem] font-medium transition-all ${tag === t ? 'bg-cyan/20 text-cyan border border-cyan/50' : 'bg-white/5 text-text-muted border border-white/5 hover:bg-white/10 hover:text-white'}`}>
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Archives */}
            {archives.length > 0 && (
              <div className="pt-2 border-t border-white/5 mt-2">
                <h3 className="text-[0.75rem] font-bold tracking-wider text-white/80 mb-2.5 flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-cyan" /> 月別アーカイブ
                </h3>
                <div className="flex flex-col gap-1.5">
                  {archives.map(([key, data]) => (
                    <Link key={key} href={`/column?month=${key}`} className={`flex items-center justify-between px-3 py-2 rounded-md text-[0.75rem] font-medium transition-all ${month === key ? 'bg-cyan/10 text-cyan border border-cyan/30' : 'bg-white/[0.02] text-text-muted hover:bg-white/5 hover:text-white border border-transparent'}`}>
                      <span>{data.label}</span>
                      <span className="font-mono text-[0.65rem] bg-white/10 px-2 py-0.5 rounded-full text-white/70">{data.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Clear Filter */}
            {(tag || q || month) && (
              <div className="pt-2">
                <Link href="/column" className="inline-block text-center w-full py-2.5 rounded-lg text-[0.75rem] font-bold text-white bg-white/10 hover:bg-white/20 transition-colors">
                  絞り込みを解除
                </Link>
              </div>
            )}
          </div>
        </div>
      </details>

      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex flex-col gap-8">
        {/* Search Box */}
        <div className="p-5 rounded-[20px] bg-white/[0.02] border border-white/10">
          <h3 className="text-sm font-bold tracking-wider text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-cyan rounded-full"></span> 記事を検索
          </h3>
          <Suspense fallback={<div className="h-10 w-full bg-white/5 rounded-full animate-pulse"></div>}>
            <ColumnSearch />
          </Suspense>
        </div>

        {/* Tags */}
        <div className="p-5 rounded-[20px] bg-white/[0.02] border border-white/10 flex flex-col gap-6">
          {activeServiceTags.length > 0 && (
            <div>
              <h3 className="text-[0.8rem] font-bold tracking-wider text-white/80 mb-3 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-cyan" /> サービス名
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeServiceTags.map(t => (
                  <Link key={t} href={`/column?tag=${t}`} className={`px-3 py-1.5 rounded-md text-[0.7rem] font-medium transition-all ${tag === t ? 'bg-cyan/20 text-cyan border border-cyan/50' : 'bg-white/5 text-text-muted border border-white/5 hover:bg-white/10 hover:text-white'}`}>
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {activeKnowledgeTags.length > 0 && (
            <div>
              <h3 className="text-[0.8rem] font-bold tracking-wider text-white/80 mb-3 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-cyan" /> 基礎知識・選び方
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeKnowledgeTags.map(t => (
                  <Link key={t} href={`/column?tag=${t}`} className={`px-3 py-1.5 rounded-md text-[0.7rem] font-medium transition-all ${tag === t ? 'bg-cyan/20 text-cyan border border-cyan/50' : 'bg-white/5 text-text-muted border border-white/5 hover:bg-white/10 hover:text-white'}`}>
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {activeReviewTags.length > 0 && (
            <div>
              <h3 className="text-[0.8rem] font-bold tracking-wider text-white/80 mb-3 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-cyan" /> 検証・レビュー
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeReviewTags.map(t => (
                  <Link key={t} href={`/column?tag=${t}`} className={`px-3 py-1.5 rounded-md text-[0.7rem] font-medium transition-all ${tag === t ? 'bg-cyan/20 text-cyan border border-cyan/50' : 'bg-white/5 text-text-muted border border-white/5 hover:bg-white/10 hover:text-white'}`}>
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {activeGenreTags.length > 0 && (
            <div>
              <h3 className="text-[0.8rem] font-bold tracking-wider text-white/80 mb-3 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-cyan" /> ゲームジャンル
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeGenreTags.map(t => (
                  <Link key={t} href={`/column?tag=${t}`} className={`px-3 py-1.5 rounded-md text-[0.7rem] font-medium transition-all ${tag === t ? 'bg-cyan/20 text-cyan border border-cyan/50' : 'bg-white/5 text-text-muted border border-white/5 hover:bg-white/10 hover:text-white'}`}>
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {activePlayerTags.length > 0 && (
            <div>
              <h3 className="text-[0.8rem] font-bold tracking-wider text-white/80 mb-3 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-cyan" /> プロゲーマー・ストリーマー
              </h3>
              <div className="flex flex-wrap gap-2">
                {activePlayerTags.map(t => (
                  <Link key={t} href={`/column?tag=${t}`} className={`px-3 py-1.5 rounded-md text-[0.7rem] font-medium transition-all ${tag === t ? 'bg-cyan/20 text-cyan border border-cyan/50' : 'bg-white/5 text-text-muted border border-white/5 hover:bg-white/10 hover:text-white'}`}>
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {activeOtherTags.length > 0 && (
            <div>
              <h3 className="text-[0.8rem] font-bold tracking-wider text-white/80 mb-3 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-cyan" /> トレンド・その他
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeOtherTags.map(t => (
                  <Link key={t} href={`/column?tag=${t}`} className={`px-3 py-1.5 rounded-md text-[0.7rem] font-medium transition-all ${tag === t ? 'bg-cyan/20 text-cyan border border-cyan/50' : 'bg-white/5 text-text-muted border border-white/5 hover:bg-white/10 hover:text-white'}`}>
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Archives */}
          {archives.length > 0 && (
            <div className="pt-2 border-t border-white/5 mt-2">
              <h3 className="text-[0.8rem] font-bold tracking-wider text-white/80 mb-3 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-cyan" /> 月別アーカイブ
              </h3>
              <div className="flex flex-col gap-2">
                {archives.map(([key, data]) => (
                  <Link key={key} href={`/column?month=${key}`} className={`flex items-center justify-between px-3 py-2.5 rounded-md text-[0.8rem] font-medium transition-all ${month === key ? 'bg-cyan/10 text-cyan border border-cyan/30' : 'bg-white/[0.02] text-text-muted hover:bg-white/5 hover:text-white border border-transparent'}`}>
                    <span>{data.label}</span>
                    <span className="font-mono text-[0.7rem] bg-white/10 px-2.5 py-0.5 rounded-full text-white/70">{data.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Clear Filter */}
          {(tag || q || month) && (
            <div className="pt-2">
              <Link href="/column" className="inline-block text-center w-full py-2.5 rounded-lg text-[0.75rem] font-bold text-white bg-white/10 hover:bg-white/20 transition-colors">
                絞り込みを解除
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
