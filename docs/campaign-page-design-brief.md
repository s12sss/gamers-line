# /campaign ページ デザイン指示書
> Claude Design / v0 等に貼り付けて使う

---

## サイト概要

**Gamer's Line**（gamers-line.jp）
オンラインゲーマー向け光回線比較・診断メディア。FPS特化でPing値・安定性を軸に回線を評価する。

---

## デザインシステム（既存サイトとの統一）

### カラー
```
Background:   #050508（ほぼ黒）
Surface:      #0a0a12（カード背景）
Accent 1:     #00E5FF（シアン）   ← メインアクセント
Accent 2:     #00E676（エメラルド）← サブアクセント
Text:         #ffffff
Text Muted:   #7a7a9a
Border:       rgba(255,255,255,0.08)
```

### フォント
- **見出し**: font-heading（tracking-tight, font-black）
- **数値・ラベル**: font-mono（tracking-widest, uppercase）
- **本文**: font-sans

### 共通スタイルルール
- 角丸: `rounded-2xl`〜`rounded-[24px]`
- カードは `border border-white/10 bg-white/[0.03]` ベース
- アクセントカラーのグロー: `drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]`
- セクション区切りは `border-y border-white/10`
- モノスペースの小ラベルで `// SECTION NAME` 形式のアイキャッチ

---

## ページ構成：`/campaign`

### 目的
毎月更新するキャンペーン情報一覧ページ。
固定URLで運用し、情報を月次で上書きする（コラムではなくツール）。

---

### セクション 1: ヒーロー

```
// CAMPAIGN INFO
2026年5月 最新キャンペーン情報          ← 大見出し（月次更新）
各社の申し込みキャッシュバック・特典をまとめました  ← サブコピー

[バッジ] 毎月更新  [バッジ] 2026.05.15 確認済み
```

**デザイン指示**
- 背景にシアン〜エメラルドの薄いグラデーション（radial-gradient）
- 「5月」の数字を大きくモノスペースで配置（デコレーション的に）
- バッジは `border border-cyan/30 bg-cyan/10 text-cyan` スタイル

---

### セクション 2: 今月のイチオシ（1〜2社）

各回線の「今月だけ」の強みをハイライトするカード。

```
┌─────────────────────────────┐
│ 🏆 今月のおすすめ            │
│                              │
│  NURO光                      │
│  最大75,000円キャッシュバック │
│  ＋ 工事費実質無料           │
│                              │
│  [申し込みはこちら →]        │
└─────────────────────────────┘
```

**デザイン指示**
- シアンのボーダーグロー
- 左上に「今月No.1」バッジ（yellow #ffeb3b）
- CTAボタンは `bg-cyan text-black font-black rounded-full`

---

### セクション 3: 全社キャンペーン一覧表

| 回線名 | キャッシュバック | キャンペーン料金 | CB受取条件 | 特記事項 |
|--------|----------------|----------------|-----------|---------|
| NURO光 | 最大75,000円 | 月額5,500円 | 開通後6ヶ月 | 工事費無料 |
| hi-ho光 | 最大40,000円 | 月額6,160円 | 開通後3ヶ月 | スマホ割対応 |
| ... | ... | ... | ... | ... |

**デザイン指示**
- テーブルは `border border-white/10` のダークテーマ
- ヘッダー行は `bg-white/5`
- 最高CB行はシアンでハイライト
- スマホでは横スクロール対応（`overflow-x-auto`）
- 各行末に `[詳細 →]` リンク（プロバイダページへ）

---

### セクション 4: キャンペーンの選び方ガイド

```
Q. キャッシュバックって本当にもらえる？
A. 申し込み後〇ヶ月以内に申請が必要です。各社条件を確認してください。

Q. 工事費無料はいつまで？
Q. セット割とCBは併用できる？
```

**デザイン指示**
- FAQ形式、`<details>` アコーディオン
- 既存サイトのFAQセクションと同じスタイルを踏襲

---

### セクション 5: 診断CTA（既存コンポーネント流用）

```
「どの回線が自分に合うか迷ってる？」
[今すぐ無料診断スタート →]
```

- ページ下部に必ず配置
- 既存ホームのCTAセクションと同デザイン

---

## 実装メモ（エンジニア向け）

- **更新頻度**: 月1回（月初1〜3日）
- **データソース**: `docs/campaign_template.csv` から転記
- **ISRキャッシュ**: `revalidate = 86400`（24時間）
- **canonical**: `/campaign`（固定）
- **OGP**: タイトルに月を含める（`2026年5月 ゲーミング回線 最新キャンペーン`）
- **構造化データ**: FAQPage JSON-LD

---

## 参考：既存ページのコンポーネント例

```tsx
// セクション見出しパターン
<div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase mb-3 opacity-70">
  // CAMPAIGN INFO
</div>
<h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">
  2026年5月 <span className="gradient-text">最新キャンペーン</span>
</h2>

// カードパターン
<div className="bg-[#050505] border border-white/10 rounded-3xl p-6 sm:p-10">
  ...
</div>

// CTAボタンパターン
<Link href="/diagnosis"
  className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-cyan text-black font-heading font-bold">
  今すぐ無料診断をはじめる
</Link>
```
