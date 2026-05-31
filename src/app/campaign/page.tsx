import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Info } from 'lucide-react';
import CampaignTable from './CampaignTable';
import SwitchingSimulator from '@/components/SwitchingSimulator';
import CashbackReminder from '@/components/CashbackReminder';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  const now = new Date();
  return {
    title: `${now.getFullYear()}年${now.getMonth() + 1}月 ゲーミング回線 最新キャンペーン情報`,
    description: '各社の申し込みキャッシュバック・月額割引・工事費無料などの特典をまとめました。毎月初に更新。',
    alternates: { canonical: '/campaign' },
  };
}

const CB_TYPES = [
  {
    num: '01',
    color: 'cyan' as const,
    title: '一括キャッシュバック型',
    desc: '申し込み・開通後、指定の時期にメールで申請URLが届く。口座を登録すると数万円が一括振込される。最も金額が大きいが、申請を忘れると無効になる。期間・金額は回線・代理店によって異なる。',
    point: '申請期限を忘れないようメモ必須',
  },
  {
    num: '02',
    color: 'emerald' as const,
    title: '月額割引・無料期間型',
    desc: '一定期間、月額料金が無料または割引される。自動適用のため手続き不要。ただし割引期間が終わると通常料金に戻るため、期間終了後の月額を事前に確認しておくこと。',
    point: '割引終了後の月額を必ず確認',
  },
  {
    num: '03',
    color: 'purple' as const,
    title: '他社違約金負担型',
    desc: '今の回線を解約する際に発生する違約金を新しい回線会社が肩代わりしてくれる。上限額があり、一括キャッシュバックとの併用不可なケースが多い。解約金が高額な場合はこちらが有利になることもある。',
    point: '一括キャッシュバックとの併用条件を要確認',
  },
];

const FAQS = [
  {
    q: 'キャッシュバックって本当にもらえる？',
    a: 'もらえます。ただし申請が必要なケースがほとんどです。多くは開通後3〜12ヶ月後にメールが届き、そこから1ヶ月以内に振込先口座を登録する流れです。申請期限を過ぎると無効になるため、申込時にカレンダーへ登録しておくのがおすすめです。',
  },
  {
    q: 'キャッシュバックはどうやって申請する？',
    a: '基本的な流れは①申し込み→②開通→③指定時期にメールが届く→④メール内のURLから口座情報を登録→⑤振込、です。代理店によってはLINEや専用フォームからの申請になる場合もあります。申請URLの有効期限は短い（1〜2ヶ月）ことが多いため、メールを見逃さないように注意してください。',
  },
  {
    q: '申請メールが届かなかった場合はどうする？',
    a: 'まず迷惑メールフォルダを確認してください。それでも見当たらない場合は、申し込みをした代理店や回線会社のサポートに問い合わせてください。申請期限が過ぎていても、証明できる場合は対応してもらえるケースがあります。申込時に代理店名と申込番号を控えておくと安心です。',
  },
  {
    q: '代理店経由と公式直申込みで違いはある？',
    a: 'キャッシュバック金額が代理店経由の方が高いケースが多いです。理由は代理店が独自のキャンペーンを上乗せしているためです。ただし代理店によってサポートの質が異なるため、大手代理店（GMOとくとくBBなど実績のあるところ）を選ぶのがおすすめです。当サイトの「詳細」リンクは信頼できる代理店へ誘導しています。',
  },
  {
    q: '工事費無料はいつまで？',
    a: 'NURO光・au ひかりなどは常時開催（終了日未定）、SoftBank光は四半期ごとの更新です。「実質無料」のため、契約期間中に解約すると残債を請求される場合があります。3年は使う前提であれば追加負担は発生しません。',
  },
  {
    q: '開通工事の立ち合いは必要？どれくらいかかる？',
    a: '戸建ての場合は屋外・屋内での工事があるため、立ち合いが必要です。所要時間は2〜3時間が目安です。マンションで建物内に光配線が既設の場合は、短時間（30分〜1時間程度）で完了することもあります。申し込みから開通まで1〜3ヶ月かかる場合があるため、引っ越しなどのスケジュールに余裕を持って申し込むことを推奨します。',
  },
  {
    q: 'セット割とキャッシュバックは併用できる？',
    a: '原則できます。スマホとのセット割（月額割引）とキャッシュバック（一括還元）は別ロジックで運用されています。ただし「乗り換え違約金還元」と「公式キャッシュバック」は片方しか選べないキャンペーンがあるため、事前確認を。',
  },
  {
    q: '今の回線の違約金が残っている場合は？',
    a: 'SoftBank光・au ひかり・NURO光は違約金還元（最大10〜20万円）のキャンペーンを実施中。現在契約中の回線の違約金請求書を提示することで、新規開通後に同額が還元されます。当サイトの乗り換えシミュレーターで損益を事前に確認できます。',
  },
  {
    q: '審査に落ちることはある？',
    a: 'あります。主な理由は、過去の未払いや携帯電話の分割払い残債などの信用情報です。光回線は割賦契約（分割払い）を含む場合があり、そのため信用審査が行われます。審査に落ちた場合は、分割払い不要なプランや審査基準が異なる回線（NURO光など）を検討してみてください。',
  },
  {
    q: 'マンション住まいでも申し込める？',
    a: '多くの回線はマンションでも対応しています。ただし建物の配線方式（光配線 or VDSL）によって選べる回線が変わります。光配線であればほとんどの回線が利用可能ですが、VDSLの場合はNURO光など一部回線は利用不可です。申し込み前に住所入力で提供エリア・建物対応状況を必ず確認してください。',
  },
];

export default function CampaignPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const monthPadded = String(month).padStart(2, '0');

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* Hero */}
      <section className="relative px-4 sm:px-10 pt-12 pb-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_30%_30%,rgba(0,229,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_40%_at_80%_70%,rgba(0,230,118,0.07),transparent_60%)]" />

        <div className="relative max-w-[1100px] mx-auto grid sm:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <Breadcrumbs items={[{ name: 'HOME', path: '/' }, { name: 'キャンペーン', path: '/campaign' }]} />
            <div className="font-mono text-[0.65rem] text-cyan tracking-[0.25em] uppercase opacity-70 mb-4 mt-4">
              CAMPAIGN INFO
            </div>
            <h1 className="font-heading font-black text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] tracking-tight mb-5">
              {year}年{month}月<br />
              <span className="bg-gradient-to-br from-cyan to-emerald bg-clip-text text-transparent">
                最新キャンペーン情報
              </span>
            </h1>
            <p className="text-text-muted text-sm sm:text-base leading-[1.8] max-w-[480px]">
              各社の申し込みキャッシュバック・月額割引・工事費無料などの特典をまとめました。<strong className="text-white">毎月初に更新。</strong>
            </p>
          </div>

          <div className="hidden sm:flex justify-center">
            <div className="border border-cyan/25 rounded-[20px] bg-cyan/[0.04] shadow-[0_0_60px_rgba(0,229,255,0.12)] px-8 py-6 text-center">
              <div className="font-mono text-[0.65rem] text-cyan tracking-[0.3em] uppercase mb-1">THIS MONTH</div>
              <div className="font-mono font-bold leading-none text-white" style={{ fontSize: 'clamp(6rem,10vw,9rem)', textShadow: '0 0 40px rgba(0,229,255,0.3)' }}>
                {monthPadded}
                <span className="text-2xl text-cyan align-top ml-1">/{year}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CB基礎知識 */}
      <section className="px-4 sm:px-10 py-16 sm:py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-mono text-[0.65rem] text-cyan tracking-[0.25em] uppercase opacity-70 mb-3">
            BASICS · キャッシュバックとは
          </div>
          <h2 className="font-heading font-bold text-[clamp(1.6rem,4vw,2.5rem)] tracking-tight mb-3">
            申し込む前に知っておく<span className="bg-gradient-to-r from-cyan to-emerald bg-clip-text text-transparent">3つのパターン</span>
          </h2>
          <p className="text-text-muted text-sm leading-[1.8] mb-10 max-w-[540px]">
            「キャッシュバック」と一口に言っても仕組みが違います。<br />
            パターンを把握しておかないと受け取り忘れや損をするケースがあります。
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {CB_TYPES.map(({ num, color, title, desc, point }) => (
              <div
                key={num}
                className={`relative flex flex-col p-6 rounded-[20px] border overflow-hidden
                  ${color === 'cyan' ? 'border-cyan/20 bg-cyan/[0.03]' :
                    color === 'emerald' ? 'border-emerald/20 bg-emerald/[0.03]' :
                    'border-purple-500/20 bg-purple-500/[0.03]'}`}
              >
                <div className={`absolute right-4 bottom-4 font-mono font-black text-[5rem] leading-none pointer-events-none select-none opacity-[0.05]
                  ${color === 'cyan' ? 'text-cyan' : color === 'emerald' ? 'text-emerald' : 'text-purple-400'}`}>
                  {num}
                </div>
                <span className={`font-mono font-bold text-3xl leading-none mb-5
                  ${color === 'cyan' ? 'text-cyan/50' : color === 'emerald' ? 'text-emerald/50' : 'text-purple-400/50'}`}>
                  {num}
                </span>
                <h3 className="font-heading font-bold text-base text-white mb-3">{title}</h3>
                <p className="text-sm text-text-muted leading-[1.7] flex-1 mb-4">{desc}</p>
                <div className={`text-[0.7rem] font-bold px-3 py-1.5 rounded-lg inline-block
                  ${color === 'cyan' ? 'bg-cyan/10 text-cyan' : color === 'emerald' ? 'bg-emerald/10 text-emerald' : 'bg-purple-500/10 text-purple-400'}`}>
                  ⚠ {point}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="px-4 sm:px-10 py-16 sm:py-20 max-w-[1100px] mx-auto">
        <div className="font-mono text-[0.65rem] text-cyan tracking-[0.25em] uppercase opacity-70 mb-3">
          FULL LIST
        </div>
        <h2 className="font-heading font-bold text-[clamp(1.6rem,4vw,2.5rem)] tracking-tight mb-3">
          <span className="bg-gradient-to-r from-cyan to-emerald bg-clip-text text-transparent">キャンペーン</span>早見表
        </h2>
        <p className="text-text-muted text-sm mb-2">キャッシュバック額はネットのみ契約でもらえる最大額。詳細は公式ページで確認してください。</p>
        <p className="text-text-muted text-sm mb-8">列ヘッダーのクリックでPing・キャッシュバック額のソートができます。<Info className="inline w-3 h-3 mb-0.5 ml-1 text-white/30" />マークで用語の説明を表示。</p>
        <CampaignTable />
      </section>

      {/* Tools */}
      <section className="px-4 sm:px-10 py-16 sm:py-20 border-y border-white/10">
        <div className="max-w-[1100px] mx-auto mb-10">
          <div className="font-mono text-[0.65rem] text-cyan tracking-[0.25em] uppercase opacity-70 mb-3">
            SUPPORT TOOLS
          </div>
          <h2 className="font-heading font-bold text-[clamp(1.6rem,4vw,2.5rem)] tracking-tight mb-3">
            乗り換えを<span className="bg-gradient-to-r from-cyan to-emerald bg-clip-text text-transparent">サポートするツール</span>
          </h2>
          <p className="text-text-muted text-sm leading-[1.8] max-w-[560px]">
            今すぐ乗り換えるべきか損益を計算できるシミュレーターと、キャッシュバックの受け取り忘れを防ぐリマインダーを用意しました。
          </p>
        </div>
        <div className="max-w-[1400px] mx-auto grid xl:grid-cols-[1.3fr_1fr] gap-6 items-start">
          <SwitchingSimulator hideProviderLink />
          <CashbackReminder />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-10 py-16 sm:py-20 border-y border-white/10 bg-cyan/[0.015]">
        <div className="max-w-[800px] mx-auto">
          <div className="font-mono text-[0.65rem] text-cyan tracking-[0.25em] uppercase opacity-70 mb-3">
            FAQ
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

      {/* Diagnosis CTA */}
      <section className="relative px-4 sm:px-10 py-20 sm:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(0,229,255,0.08),transparent_70%)]" />
        <div className="relative z-10 max-w-[600px] mx-auto">
          <div className="font-mono text-[0.65rem] text-cyan tracking-[0.25em] uppercase opacity-70 mb-4">NEXT STEP</div>
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
