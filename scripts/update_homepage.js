const fs = require('fs');
const path = './src/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Image import
if (!content.includes('import Image from "next/image";')) {
  content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport Image from "next/image";');
}

// 2. Add data fetching to Home
const homeSig = 'export default async function Home() {';
if (!content.includes('const { contents: columns } = await getColumnsList')) {
  content = content.replace(homeSig, `${homeSig}\n  const { contents: columns } = await getColumnsList({ limit: 3 }).catch(() => ({ contents: [] }));`);
}

// 3. Insert sections before CTA
const ctaSection = '{/* CTA Section */}';
const newSections = `      {/* Compare & Providers Section */}
      <section className="relative z-10 px-4 sm:px-10 py-[60px] sm:py-[100px] max-w-[1100px] mx-auto w-full">
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase mb-3 opacity-70">
          // COMPARE & PROVIDERS
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-[40px]">
          <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">
            主要ゲーミング回線を<br />
            <span className="gradient-text">一覧・比較する</span>
          </h2>
          <p className="text-sm text-text-muted max-w-[400px]">
            「まずはどんな回線があるか知りたい」「自分で条件を絞り込んで比較したい」という方はこちら。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              ラグを解決する<br />
              <span className="gradient-text">最新コラム</span>
            </h2>
            <Link href="/column" className="inline-flex items-center gap-1 text-sm font-bold text-text-muted hover:text-cyan transition-colors">
              すべての記事を見る <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {columns.length > 0 ? (
              columns.map((column: any) => (
                <Link key={column.id} href={\`/column/\${column.id}\`} className="group flex flex-col gap-4">
                  <div className="relative w-full aspect-[1.91/1] rounded-2xl overflow-hidden border border-white/10">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    {column.eyecatch?.url ? (
                      <Image 
                        src={column.eyecatch.url} 
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

      `;

if (!content.includes('COMPARE & PROVIDERS')) {
  content = content.replace(ctaSection, newSections + ctaSection);
}

fs.writeFileSync(path, content);
console.log("Updated page.tsx with new sections!");
