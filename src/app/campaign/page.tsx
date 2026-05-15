import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Check } from 'lucide-react';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: '2026年5月 ゲーミング回線 最新キャンペーン情報 | Gamer\'s Line',
  description: '各社の申し込みキャッシュバック・月額割引・工事費無料などの特典をまとめました。毎月初に更新。',
  alternates: { canonical: '/campaign' },
};

const PICKS = [
  {
    rank: '今月 No.1',
    rankColor: 'yellow' as const,
    name: 'NURO 光 2G',
    sub: 'SO-NET / 戸建て・対応マンション向け',
    cb: '75,000',
    cbLabel: 'MAX CASHBACK',
    tag: 'FPSプレイヤー支持率 No.1',
    tagColor: 'cyan' as const,
    pluses: [
      '工事費 実質無料（40,700円相当）',
      '月額 5,500円〜 / 最大2Gbps',
      '東京サーバー平均 12ms・FPS最適化',
      'SoftBankスマホ割対応（最大1,100円/月引）',
    ],
    href: '/provider/nuro',
    btnLabel: 'NURO光に申し込む',
    btnColor: 'cyan' as const,
  },
  {
    rank: '2nd PICK',
    rankColor: 'emerald' as const,
    name: 'au ひかり 1G',
    sub: 'KDDI / 戸建て向け・独自回線',
    cb: '63,000',
    cbLabel: 'MAX CASHBACK',
    tag: 'au/UQユーザーの最適解',
    tagColor: 'emerald' as const,
    pluses: [
      'au割引で実質 月4,510円〜',
      '独自回線で混雑時も安定（Ping 17ms前後）',
      '乗り換え違約金還元あり',
    ],
    href: '/provider/au-hikari',
    btnLabel: 'au ひかりに申し込む',
    btnColor: 'emerald' as const,
  },
];

const TABLE_ROWS = [
  {
    initial: 'N',
    color: 'from-cyan to-[#0099aa]',
    name: 'NURO 光 2G',
    tag: 'FTTH · 戸建/対応マンション',
    flag: 'best' as const,
    flagLabel: '最高額',
    cb: '最大 75,000円',
    cbSub: 'SO-NET特典',
    monthly: '¥5,500',
    discount: 'SB割 -1,100円/月',
    period: '開通後6ヶ月以内',
    note: '工事費実質無料',
    href: '/provider/nuro',
  },
  {
    initial: 'a',
    color: 'from-[#ff7a00] to-[#ff3d00]',
    name: 'au ひかり 1G',
    tag: 'FTTH · 戸建/マンション',
    flag: null,
    cb: '最大 63,000円',
    cbSub: 'GMOとくとくBB',
    monthly: '¥5,610',
    discount: 'au割 -1,100円/月',
    period: '開通後12ヶ月以内',
    note: '独自回線',
    href: '/provider/au-hikari',
  },
  {
    initial: 'd',
    color: 'from-[#cc0033] to-[#990022]',
    name: 'ドコモ光 1G',
    tag: 'FTTH · GMOとくとくBB',
    flag: 'new' as const,
    flagLabel: '5月増額',
    cb: '最大 52,000円',
    cbSub: '5月限定 +12,000円',
    monthly: '¥5,720',
    discount: 'docomo割 -1,100円/月',
    period: '開通後5ヶ月以内',
    note: 'v6プラス標準',
    href: '/provider/docomo-hikari',
  },
  {
    initial: 'S',
    color: 'from-[#ffd000] to-[#ff9900]',
    name: 'ソフトバンク光 1G',
    tag: 'FTTH · 戸建/マンション',
    flag: null,
    cb: '最大 50,000円',
    cbSub: 'NEXT特典',
    monthly: '¥5,720',
    discount: 'SB割 -1,100円/月',
    period: '開通後6ヶ月以内',
    note: '違約金還元あり',
    href: '/provider/softbank-hikari',
  },
  {
    initial: 'h',
    color: 'from-[#2a8fc4] to-[#1a5a8a]',
    name: 'hi-ho ひかり with games 1G',
    tag: 'FTTH · ゲーマー特化帯域',
    flag: 'trial' as const,
    flagLabel: '3ヶ月無料',
    cb: '最大 40,000円',
    cbSub: '提携代理店経由',
    monthly: '¥6,160',
    discount: '各社スマホ割対応',
    period: '開通後3ヶ月以内',
    note: 'IPoE標準',
    href: '/provider/hi-ho',
  },
  {
    initial: 'G',
    color: 'from-[#00b894] to-[#00897b]',
    name: 'GameWith光 1G',
    tag: 'FTTH · ゲーマー特化帯域',
    flag: null,
    cb: '最大 40,000円',
    cbSub: '代理店特典',
    monthly: '¥6,160',
    discount: '各社スマホ割対応',
    period: '開通後3ヶ月以内',
    note: 'Ping重視設計',
    href: '/provider/gamewith',
  },
];

const FAQS = [
  {
    q: 'キャッシュバックって本当にもらえる？',
    a: 'もらえます。ただし申請が必要なケースがほとんどです。多くは開通後3〜12ヶ月後にメールが届き、そこから1ヶ月以内に振込先口座を登録する流れです。申請期限を過ぎると無効になるため、申込時にカレンダーへ登録しておくのがおすすめです。',
  },
  {
    q: '工事費無料はいつまで？',
    a: 'NURO光・au ひかりなどは常時開催（終了日未定）、SoftBank光は四半期ごとの更新です。「実質無料」のため、契約期間中に解約すると残債を請求される場合があります。3年は使う前提であれば追加負担は発生しません。',
  },
  {
    q: 'セット割とキャッシュバックは併用できる？',
    a: '原則できます。スマホとのセット割（月額割引）とキャッシュバック（一括還元）は別ロジックで運用されています。ただし「乗り換え違約金還元」と「公式キャッシュバック」は片方しか選べないキャンペーンがあるため、事前確認を。',
  },
  {
    q: '今の回線の違約金が残っている場合は？',
    a: 'SoftBank光・au ひかり・NURO光は違約金還元（最大10〜20万円）のキャンペーンを実施中。現在契約中の回線の違約金請求書を提示することで、新規開通後に同額が還元されます。当サイトの乗り換えシミュレーターで損益を事前に確認できます。',
  },
];

export default function CampaignPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* Hero */}
      <section className="relative px-4 sm:px-10 pt-12 pb-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_30%_30%,rgba(0,229,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_40%_at_80%_70%,rgba(0,230,118,0.07),transparent_60%)]" />

        <div className="relative max-w-[1100px] mx-auto grid sm:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <div className="font-mono text-[0.65rem] text-cyan tracking-[0.25em] uppercase opacity-70 mb-4">
              // CAMPAIGN INFO
            </div>
            <h1 className="font-heading font-black text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] tracking-tight mb-5">
              2026年5月<br />
              <span className="bg-gradient-to-br from-cyan to-emerald bg-clip-text text-transparent">
                最新キャンペーン情報
              </span>
            </h1>
            <p className="text-text-muted text-sm sm:text-base leading-[1.8] max-w-[480px]">
              各社の申し込みキャッシュバック・月額割引・工事費無料などの特典をまとめました。<strong className="text-white">毎月初に更新。</strong>
            </p>
          </div>

          {/* Month deco */}
          <div className="hidden sm:flex justify-center">
            <div className="border border-cyan/25 rounded-[20px] bg-cyan/[0.04] shadow-[0_0_60px_rgba(0,229,255,0.12)] px-8 py-6 text-center">
              <div className="font-mono text-[0.65rem] text-cyan tracking-[0.3em] uppercase mb-1">// THIS MONTH</div>
              <div className="font-mono font-bold leading-none text-white" style={{ fontSize: 'clamp(6rem,10vw,9rem)', textShadow: '0 0 40px rgba(0,229,255,0.3)' }}>
                05
                <span className="text-2xl text-cyan align-top ml-1">/2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Picks */}
      <section className="px-4 sm:px-10 py-16 sm:py-20 max-w-[1100px] mx-auto">
        <div className="font-mono text-[0.65rem] text-cyan tracking-[0.25em] uppercase opacity-70 mb-3">
          // TOP PICK · 今月のイチオシ
        </div>
        <h2 className="font-heading font-bold text-[clamp(1.6rem,4vw,2.5rem)] tracking-tight mb-3">
          5月だけの<span className="bg-gradient-to-r from-cyan to-emerald bg-clip-text text-transparent">最強条件</span>を狙う。
        </h2>
        <p className="text-text-muted text-sm leading-[1.8] mb-10 max-w-[560px]">
          各社のキャンペーンを比較した結果、5月特に条件が良い回線をピックアップ。
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {PICKS.map((pick) => (
            <article
              key={pick.name}
              className={`relative p-8 rounded-[24px] border ${
                pick.rankColor === 'yellow'
                  ? 'border-cyan/25 bg-gradient-to-b from-cyan/[0.06] to-white/[0.02] shadow-[0_0_60px_rgba(0,229,255,0.12)]'
                  : 'border-white/10 bg-white/[0.025]'
              }`}
            >
              {/* Rank badge */}
              <div className={`absolute -top-3.5 left-7 px-3 py-1 rounded-full text-[0.7rem] font-bold tracking-wider ${
                pick.rankColor === 'yellow'
                  ? 'bg-[#ffeb3b] text-[#1a1500] shadow-[0_0_20px_rgba(255,235,59,0.4)]'
                  : 'bg-emerald/15 text-emerald border border-emerald/40'
              }`}>
                {pick.rank}
              </div>

              <div className="font-mono text-[0.65rem] tracking-wider mb-3 mt-1" style={{ color: pick.tagColor === 'cyan' ? 'var(--cyan)' : 'var(--emerald)' }}>
                {pick.tag}
              </div>

              <h3 className="font-heading font-bold text-2xl mb-1">{pick.name}</h3>
              <p className="text-text-muted text-xs mb-4">{pick.sub}</p>

              <div className="mb-1">
                <span className={`font-heading font-black text-[clamp(2rem,5vw,3.2rem)] leading-none bg-gradient-to-br bg-clip-text text-transparent ${
                  pick.rankColor === 'yellow' ? 'from-cyan to-emerald' : 'from-emerald to-[#4ade80]'
                }`}>
                  {pick.cb}
                </span>
                <span className="text-base text-white ml-1">円</span>
              </div>
              <div className={`font-mono text-[0.75rem] tracking-widest mb-5 ${pick.rankColor === 'yellow' ? 'text-cyan' : 'text-emerald'}`}>
                ▸ {pick.cbLabel}
              </div>

              <ul className="flex flex-col gap-2.5 mb-7">
                {pick.pluses.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-white">
                    <Check className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href={pick.href}
                  className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-heading font-bold text-sm transition-all hover:-translate-y-0.5 ${
                    pick.btnColor === 'cyan'
                      ? 'bg-cyan text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]'
                      : 'bg-emerald text-black hover:shadow-[0_0_30px_rgba(0,230,118,0.5)]'
                  }`}
                >
                  {pick.btnLabel} <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href={pick.href} className="text-sm text-text-muted hover:text-white transition-colors">
                  詳細を見る →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* All Campaign Table */}
      <section className="px-4 sm:px-10 pb-16 sm:pb-20 max-w-[1100px] mx-auto">
        <div className="font-mono text-[0.65rem] text-cyan tracking-[0.25em] uppercase opacity-70 mb-3">
          // FULL LIST · 全社一覧
        </div>
        <h2 className="font-heading font-bold text-[clamp(1.6rem,4vw,2.5rem)] tracking-tight mb-10">
          全社のキャンペーン<span className="bg-gradient-to-r from-cyan to-emerald bg-clip-text text-transparent">早見表</span>
        </h2>

        <div className="border border-white/10 rounded-[20px] bg-[#050505] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="text-left px-5 py-4 font-mono text-[0.65rem] text-cyan tracking-widest uppercase">回線</th>
                  <th className="text-left px-5 py-4 font-mono text-[0.65rem] text-cyan tracking-widest uppercase">キャッシュバック</th>
                  <th className="text-left px-5 py-4 font-mono text-[0.65rem] text-cyan tracking-widest uppercase">月額</th>
                  <th className="text-left px-5 py-4 font-mono text-[0.65rem] text-cyan tracking-widest uppercase">スマホ割</th>
                  <th className="text-left px-5 py-4 font-mono text-[0.65rem] text-cyan tracking-widest uppercase">CB期限</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr key={row.name} className={`border-b border-white/[0.06] transition-colors hover:bg-white/[0.03] last:border-b-0 ${i === 0 ? 'bg-cyan/[0.04]' : ''}`}>
                    <td className={`px-5 py-4 ${i === 0 ? 'border-l-2 border-cyan' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-[10px] bg-gradient-to-br ${row.color} flex items-center justify-center font-heading font-bold text-base text-white shrink-0`}>
                          {row.initial}
                        </div>
                        <div>
                          <div className="font-bold text-white flex items-center gap-2 flex-wrap">
                            {row.name}
                            {row.flag === 'best' && <span className="text-[0.6rem] font-bold bg-cyan text-black px-1.5 py-0.5 rounded">{row.flagLabel}</span>}
                            {row.flag === 'new' && <span className="text-[0.6rem] font-bold border border-yellow-400/40 text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded">{row.flagLabel}</span>}
                            {row.flag === 'trial' && <span className="text-[0.6rem] font-bold border border-emerald/40 text-emerald bg-emerald/10 px-1.5 py-0.5 rounded">{row.flagLabel}</span>}
                          </div>
                          <div className="text-[0.65rem] text-text-muted mt-0.5 font-mono">{row.tag}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className={`font-heading font-bold text-base ${i === 0 ? 'text-cyan drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]' : 'text-white'}`}>
                        {row.cb}
                      </div>
                      <div className="text-[0.65rem] text-text-muted mt-0.5">{row.cbSub}</div>
                    </td>
                    <td className="px-5 py-4 font-mono font-bold text-white">{row.monthly}</td>
                    <td className="px-5 py-4 text-text-muted text-xs">{row.discount}</td>
                    <td className="px-5 py-4 text-text-muted text-xs whitespace-nowrap">{row.period}</td>
                    <td className="px-5 py-4">
                      <Link
                        href={row.href}
                        className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-cyan border border-cyan/25 bg-cyan/[0.06] px-3 py-1.5 rounded-full hover:bg-cyan/15 transition-all whitespace-nowrap"
                      >
                        詳細 <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 border-t border-white/10 bg-white/[0.015] text-[0.75rem] text-text-muted leading-relaxed">
            ※ 掲載金額は税込・2026年5月時点の代理店特典を含みます。実際の金額・条件は申込前に各社公式サイトでご確認ください。キャッシュバックは申請期限を過ぎると無効になる場合があります。
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-10 py-16 sm:py-20 border-y border-white/10 bg-cyan/[0.015]">
        <div className="max-w-[800px] mx-auto">
          <div className="font-mono text-[0.65rem] text-cyan tracking-[0.25em] uppercase opacity-70 mb-3">
            // FAQ
          </div>
          <h2 className="font-heading font-bold text-[clamp(1.6rem,4vw,2.5rem)] tracking-tight mb-10">
            申し込み前に<span className="bg-gradient-to-r from-cyan to-emerald bg-clip-text text-transparent">確認したい</span>こと。
          </h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group border border-white/10 bg-white/[0.03] rounded-2xl overflow-hidden hover:border-cyan/25 transition-colors">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-bold text-sm text-white">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-cyan shrink-0">Q.</span>
                    {faq.q}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-200">
                    <ChevronRight className="w-3.5 h-3.5 text-cyan rotate-90" />
                  </div>
                </summary>
                <div className="px-6 pb-5 pt-1 text-text-muted text-sm leading-[1.8] border-t border-white/5 flex gap-3">
                  <span className="font-mono text-emerald font-bold mt-0.5 shrink-0">A.</span>
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Tools CTA */}
      <section className="px-4 sm:px-10 py-12 border-b border-white/10">
        <div className="max-w-[1100px] mx-auto">
          <Link href="/tools" className="group flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan/20 hover:bg-white/[0.04] transition-all">
            <div>
              <div className="font-mono text-[0.65rem] text-cyan tracking-widest uppercase mb-2">// SUPPORT TOOLS</div>
              <div className="font-heading font-bold text-lg text-white mb-1">乗り換え前に損益をチェック</div>
              <p className="text-text-muted text-sm">違約金とCBを天秤にかける損益シミュレーター・CB受け取り忘れ防止リマインダー</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-cyan shrink-0 group-hover:translate-x-0.5 transition-transform">
              ツールを使う <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* Diagnosis CTA */}
      <section className="relative px-4 sm:px-10 py-20 sm:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(0,229,255,0.08),transparent_70%)]" />
        <div className="relative z-10 max-w-[600px] mx-auto">
          <div className="font-mono text-[0.65rem] text-cyan tracking-[0.25em] uppercase opacity-70 mb-4">// NEXT STEP</div>
          <h2 className="font-heading font-bold text-[clamp(1.8rem,4vw,2.8rem)] tracking-tight mb-4">
            どの回線が自分に合うか<br />
            <span className="bg-gradient-to-r from-cyan to-emerald bg-clip-text text-transparent">迷っているなら。</span>
          </h2>
          <p className="text-text-muted text-sm leading-[1.8] mb-8">
            ゲームジャンル・地域・住居タイプを選ぶだけ。<br />30秒・登録不要で最適な回線を提案します。
          </p>
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-cyan text-black font-heading font-bold text-base transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(0,229,255,0.5)]"
          >
            今すぐ無料診断をはじめる <ChevronRight className="w-5 h-5" />
          </Link>
          <div className="flex justify-center gap-6 mt-5 text-xs text-text-muted">
            <span>✓ 完全無料</span>
            <span>✓ 個人情報不要</span>
            <span>✓ 約30秒</span>
          </div>
        </div>
      </section>

    </div>
  );
}
