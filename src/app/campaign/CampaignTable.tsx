'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronUp, ChevronDown, Info } from 'lucide-react';

type Row = {
  name: string;
  tag: string;
  ping: number;
  flag: 'best' | 'new' | 'trial' | null;
  flagLabel?: string;
  cb: string;
  cbNum: number;
  cbSub: string;
  monthlyFee: number;
  monthlyDiscount: string;
  constructionFee: string;
  receiveTime: string;
  penaltyCover: string;
  href: string;
};

const ROWS: Row[] = [
  {
    name: 'NURO光', tag: 'FTTH · 戸建/対応マンション',
    ping: 12, flag: null,
    cb: '最大 75,000円', cbNum: 75000, cbSub: 'SO-NET特典',
    monthlyFee: 5500, monthlyDiscount: '—', constructionFee: '工事費実質無料',
    receiveTime: '開通後6〜12ヶ月', penaltyCover: '最大20万円',
    href: '/provider/nuro',
  },
  {
    name: 'au ひかり', tag: 'FTTH · 戸建/マンション',
    ping: 17, flag: null,
    cb: '最大 63,000円', cbNum: 63000, cbSub: 'GMOとくとくBB',
    monthlyFee: 5610, monthlyDiscount: '—', constructionFee: '工事費実質無料',
    receiveTime: '開通後12〜24ヶ月', penaltyCover: '最大10万円',
    href: '/provider/au-hikari',
  },
  {
    name: 'ドコモ光', tag: 'FTTH · GMOとくとくBB',
    ping: 23, flag: 'new', flagLabel: '5月増額',
    cb: '最大 52,000円', cbNum: 52000, cbSub: '5月限定 +12,000円',
    monthlyFee: 5720, monthlyDiscount: '—', constructionFee: '—',
    receiveTime: '開通後5ヶ月', penaltyCover: '最大10万円',
    href: '/provider/docomo-hikari',
  },
  {
    name: 'ソフトバンク光', tag: 'FTTH · 戸建/マンション',
    ping: 17, flag: null,
    cb: '最大 50,000円', cbNum: 50000, cbSub: 'NEXT特典',
    monthlyFee: 5720, monthlyDiscount: '—', constructionFee: '—',
    receiveTime: '開通後6ヶ月', penaltyCover: '最大10万円',
    href: '/provider/softbank-hikari',
  },
  {
    name: 'hi-ho ひかり with games', tag: 'FTTH · ゲーマー特化帯域',
    ping: 20, flag: 'trial', flagLabel: '3ヶ月無料',
    cb: '最大 40,000円', cbNum: 40000, cbSub: '提携代理店経由',
    monthlyFee: 6160, monthlyDiscount: '3ヶ月無料（-¥6,160×3）', constructionFee: '—',
    receiveTime: '開通後3ヶ月', penaltyCover: 'なし',
    href: '/provider/hi-ho',
  },
  {
    name: 'GameWith光', tag: 'FTTH · ゲーマー特化帯域',
    ping: 16, flag: null,
    cb: '最大 40,000円', cbNum: 40000, cbSub: '代理店特典',
    monthlyFee: 6160, monthlyDiscount: '—', constructionFee: '—',
    receiveTime: '開通後3ヶ月', penaltyCover: 'なし',
    href: '/provider/gamewith',
  },
];

const TOOLTIPS: Record<string, string> = {
  'Ping': '通信の遅延時間（ms）。低いほどゲームで有利。20ms以下が理想。FPSなら12〜17ms帯を狙いたい。',
  'CB総額': 'キャッシュバックの最大受取額。申請が必要で、期限を過ぎると無効になります。',
  'CB受取時期': 'CB申請が可能になる時期。メールが届いたら期限内（多くは1ヶ月以内）に口座登録が必要。',
  '他社違約金負担': '今の回線を解約する際に発生する違約金を新しい回線会社が負担してくれる上限額。',
  '3年実質負担': '月額×36ヶ月 - キャッシュバック額。スマホ割・工事費は含まず。実際の負担額の目安として参照してください。',
};

type SortKey = 'ping' | 'cb' | null;
type TooltipState = { text: string; x: number; y: number } | null;

export default function CampaignTable() {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(a => !a);
    } else {
      setSortKey(key);
      setSortAsc(key === 'ping');
    }
  };

  const showTooltip = (e: React.MouseEvent, text: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({ text, x: rect.left + rect.width / 2, y: rect.bottom + 8 });
  };

  const sorted = [...ROWS].sort((a, b) => {
    if (!sortKey) return 0;
    return sortKey === 'ping'
      ? (sortAsc ? a.ping - b.ping : b.ping - a.ping)
      : (sortAsc ? a.cbNum - b.cbNum : b.cbNum - a.cbNum);
  });

  const ColHeader = ({ label, sortable, tipKey }: { label: string; sortable?: SortKey; tipKey?: string }) => (
    <th className="text-left px-4 py-4 font-mono text-[0.65rem] text-cyan tracking-widest uppercase whitespace-nowrap">
      <div className="flex items-center gap-1.5">
        {sortable ? (
          <button onClick={() => handleSort(sortable)} className="flex items-center gap-1 hover:text-white transition-colors">
            {label}
            {sortKey === sortable
              ? (sortAsc ? <ChevronUp className="w-3 h-3 text-cyan" /> : <ChevronDown className="w-3 h-3 text-cyan" />)
              : <ChevronUp className="w-3 h-3 opacity-20" />}
          </button>
        ) : (
          <span>{label}</span>
        )}
        {tipKey && TOOLTIPS[tipKey] && (
          <button
            onMouseEnter={(e) => showTooltip(e, TOOLTIPS[tipKey])}
            onMouseLeave={() => setTooltip(null)}
            className="text-white/25 hover:text-cyan transition-colors"
          >
            <Info className="w-3 h-3" />
          </button>
        )}
      </div>
    </th>
  );

  return (
    <>
      {/* Fixed tooltip - not clipped by any overflow */}
      {tooltip && (
        <div
          className="fixed z-[9999] w-[220px] p-3 bg-[#0a0a12] border border-cyan/25 rounded-xl text-[0.72rem] text-text-muted leading-relaxed shadow-[0_0_20px_rgba(0,229,255,0.15)] pointer-events-none"
          style={{ left: tooltip.x - 110, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}

      <div className="border border-white/10 rounded-[20px] bg-[#050505] overflow-hidden">
        {/* モバイル スクロールヒント */}
        <div className="sm:hidden flex items-center justify-center gap-2 py-2.5 border-b border-white/10 bg-white/[0.02]">
          <span className="text-[0.65rem] text-text-muted font-mono tracking-wider">← スクロールして確認 →</span>
        </div>
        <div className="overflow-x-auto custom-scrollbar pb-2">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <ColHeader label="回線" />
                <ColHeader label="Ping" sortable="ping" tipKey="Ping" />
                <ColHeader label="CB総額" sortable="cb" tipKey="CB総額" />
                <ColHeader label="月額割引 / 工事費" />
                <ColHeader label="CB受取時期" tipKey="CB受取時期" />
                <ColHeader label="他社違約金負担" tipKey="他社違約金負担" />
                <ColHeader label="3年実質負担" tipKey="3年実質負担" />
                <th className="px-4 py-4" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.name} className="border-b border-white/[0.06] transition-colors hover:bg-white/[0.03] last:border-b-0">
                  <td className="px-4 py-4">
                    <div className="font-bold text-white flex items-center gap-2 flex-wrap">
                      {row.name}
                      {row.flag === 'new' && <span className="text-[0.6rem] font-bold border border-yellow-400/40 text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded">{row.flagLabel}</span>}
                      {row.flag === 'trial' && <span className="text-[0.6rem] font-bold border border-emerald/40 text-emerald bg-emerald/10 px-1.5 py-0.5 rounded">{row.flagLabel}</span>}
                    </div>
                    <div className="text-[0.65rem] text-text-muted mt-0.5 font-mono">{row.tag}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`font-mono font-bold text-base ${row.ping <= 15 ? 'text-cyan' : row.ping <= 20 ? 'text-emerald' : 'text-text-muted'}`}>
                      {row.ping}
                    </span>
                    <span className="text-text-muted text-xs ml-1">ms</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-heading font-bold text-base text-white">{row.cb}</div>
                    <div className="text-[0.65rem] text-text-muted mt-0.5">{row.cbSub}</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-text-muted">
                    <div>{row.monthlyDiscount}</div>
                    <div className={row.constructionFee !== '—' ? 'text-emerald mt-0.5' : 'mt-0.5'}>{row.constructionFee}</div>
                  </td>
                  <td className="px-4 py-4 text-text-muted text-xs whitespace-nowrap">{row.receiveTime}</td>
                  <td className="px-4 py-4 text-xs font-bold whitespace-nowrap">
                    {row.penaltyCover === 'なし'
                      ? <span className="text-text-muted">なし</span>
                      : <span className="text-emerald">{row.penaltyCover}</span>}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-mono font-bold text-sm text-white">
                      {((row.monthlyFee * 36) - row.cbNum).toLocaleString()}円
                    </div>
                    <div className="text-[0.65rem] text-text-muted mt-0.5">月額×36 - CB</div>
                  </td>
                  <td className="px-4 py-4">
                    <Link href={row.href} className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-cyan border border-cyan/25 bg-cyan/[0.06] px-3 py-1.5 rounded-full hover:bg-cyan/15 transition-all whitespace-nowrap">
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
    </>
  );
}
