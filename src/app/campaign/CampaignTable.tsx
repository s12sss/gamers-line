'use client';

import { useState } from 'react';
import { ChevronRight, ChevronUp, ChevronDown, Info } from 'lucide-react';

type Row = {
  name: string;
  tag: string;
  ping: number;
  cb: string;
  cbNum: number;
  feature: string;
  penaltyCover: string;
  href: string;
};

const ROWS: Row[] = [
  { name: 'NURO光', tag: 'FTTH · 戸建/対応マンション', ping: 12, cb: '最大 75,000円', cbNum: 75000, feature: '工事費実質無料 / 24ヶ月月額割引', penaltyCover: '最大6万円', href: 'https://px.a8.net/svt/ejp?a8mat=4B3JAM+86PL82+2VMU+5YJRM' },
  { name: 'au ひかり', tag: 'FTTH · 戸建/マンション', ping: 17, cb: '最大 126,000円', cbNum: 126000, feature: '工事費実質無料', penaltyCover: '最大5万円', href: 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+48EZN6+42Y0+5ZMCH' },
  { name: 'eo光', tag: 'FTTH · 関西', ping: 16, cb: '—', cbNum: 0, feature: '工事費実質無料', penaltyCover: '最大6万円', href: 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+5Q0036+3IIQ+5YRHE' },
  { name: 'メガ・エッグ', tag: 'FTTH · 中国', ping: 29, cb: '最大 25,000円', cbNum: 25000, feature: '工事費実質無料 / 2年間月額割引', penaltyCover: '最大8万円', href: 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+5R6VAQ+348K+2BDR9U' },
  { name: 'ソフトバンク光', tag: 'FTTH · 戸建/マンション', ping: 17, cb: '最大 50,000円', cbNum: 50000, feature: '工事費実質無料', penaltyCover: '最大10万円', href: 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+4HXXBM+348K+1BP8ZM' },
  { name: 'ドコモ光', tag: 'FTTH · 戸建/マンション', ping: 23, cb: '最大 10,500円', cbNum: 10500, feature: '工事費dポイント還元', penaltyCover: '最大10万円相当', href: 'https://h.accesstrade.net/sp/cc?rk=0100ki0f00os5p' },
  { name: 'ビッグローブ光', tag: 'FTTH · 全国', ping: 18, cb: '最大 70,000円', cbNum: 70000, feature: '工事費実質無料 / 開通月無料', penaltyCover: '最大4万円', href: 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+4FK6WI+B4+2NBPO2' },
  { name: 'コミュファ光', tag: 'FTTH · 東海', ping: 16, cb: '最大 25,000円', cbNum: 25000, feature: '1年目月額割引あり', penaltyCover: '全額還元', href: 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+41V7ZM+42Y0+BX3J6' },
  { name: 'ピカラ光', tag: 'FTTH · 四国', ping: 20, cb: '最大 30,000円', cbNum: 30000, feature: '工事費無料 / 開通月無料', penaltyCover: 'なし', href: 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+5QLFOY+348K+1ZGG0Y' },
  { name: 'BBIQ', tag: 'FTTH · 九州', ping: 25, cb: '最大 30,000円', cbNum: 30000, feature: '工事費実質無料 / 開通月無料', penaltyCover: 'なし', href: 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+54KEB6+348K+2Z861U' },
  { name: 'hi-ho ひかり with games', tag: 'FTTH · ゲーマー特化帯域', ping: 20, cb: '—', cbNum: 0, feature: '31日間月額無料 / 初期費用0円', penaltyCover: 'なし', href: 'https://h.accesstrade.net/sp/cc?rk=0100pau800os5p' },
  { name: 'GameWith光', tag: 'FTTH · ゲーマー特化帯域', ping: 16, cb: '—', cbNum: 0, feature: '1ヶ月無料 / 転用無料', penaltyCover: 'なし', href: 'https://gamewith-hikari.gamewith.co.jp/' },
];

const TOOLTIPS: Record<string, string> = {
  'Ping': '通信の遅延時間（ms）。低いほどゲームで有利。20ms以下が理想。',
  'CB総額': 'キャッシュバックの最大受取額。申請が必要で、期限を過ぎると無効になります。',
  '他社違約金負担': '今の回線を解約する際に発生する違約金を新しい回線会社が負担してくれる上限額。',
  '主な特典': '工事費・月額割引・無料期間など、CB以外のお得な特典。',
};

type SortKey = 'ping' | 'cb' | null;
type TooltipState = { text: string; x: number; y: number } | null;

export default function CampaignTable() {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) { setSortAsc(a => !a); }
    else { setSortKey(key); setSortAsc(key === 'ping'); }
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
        ) : <span>{label}</span>}
        {tipKey && TOOLTIPS[tipKey] && (
          <button onMouseEnter={(e) => showTooltip(e, TOOLTIPS[tipKey])} onMouseLeave={() => setTooltip(null)} className="text-white/25 hover:text-cyan transition-colors">
            <Info className="w-3 h-3" />
          </button>
        )}
      </div>
    </th>
  );

  return (
    <>
      {tooltip && (
        <div className="fixed z-[9999] w-[220px] p-3 bg-[#0a0a12] border border-cyan/25 rounded-xl text-[0.72rem] text-text-muted leading-relaxed shadow-[0_0_20px_rgba(0,229,255,0.15)] pointer-events-none" style={{ left: tooltip.x - 110, top: tooltip.y }}>
          {tooltip.text}
        </div>
      )}
      <div className="border border-white/10 rounded-[20px] bg-[#050505] overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <ColHeader label="回線" />
              <ColHeader label="Ping" sortable="ping" tipKey="Ping" />
              <ColHeader label="CB総額" sortable="cb" tipKey="CB総額" />
              <ColHeader label="主な特典" tipKey="主な特典" />
              <ColHeader label="他社違約金負担" tipKey="他社違約金負担" />
              <th className="px-4 py-4" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.name} className="border-b border-white/[0.06] transition-colors hover:bg-white/[0.03] last:border-b-0">
                <td className="px-4 py-3.5">
                  <div className="font-bold text-white text-sm">{row.name}</div>
                  <div className="text-[0.62rem] text-text-muted mt-0.5 font-mono">{row.tag}</div>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className={`font-mono font-bold text-base ${row.ping <= 15 ? 'text-cyan' : row.ping <= 20 ? 'text-emerald' : 'text-text-muted'}`}>{row.ping}</span>
                  <span className="text-text-muted text-xs ml-1">ms</span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="font-heading font-bold text-base text-white">{row.cb}</div>
                </td>
                <td className="px-4 py-3.5 text-xs text-text-muted max-w-[200px]">{row.feature}</td>
                <td className="px-4 py-3.5 text-xs font-bold whitespace-nowrap">
                  {row.penaltyCover === 'なし' || row.penaltyCover === '要確認'
                    ? <span className="text-text-muted">{row.penaltyCover}</span>
                    : <span className="text-emerald">{row.penaltyCover}</span>}
                </td>
                <td className="px-4 py-3.5">
                  <a href={row.href} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-cyan border border-cyan/25 bg-cyan/[0.06] px-3 py-1.5 rounded-full hover:bg-cyan/15 transition-all whitespace-nowrap">
                    公式サイト <ChevronRight className="w-3 h-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-4 border-t border-white/10 bg-white/[0.015] text-[0.75rem] text-text-muted leading-relaxed">
          ※ 掲載金額は税込・{new Date().getFullYear()}年{new Date().getMonth() + 1}月時点の代理店特典を含みます。実際の金額・条件は申込前に各社公式サイトでご確認ください。キャッシュバックは申請期限を過ぎると無効になる場合があります。
        </div>
      </div>
    </>
  );
}
