# DESIGN.md — Gamer's Line / Gear Select

> このファイルは、Gamer's Line と関連ツールをAIエージェントが編集する時のデザイン仕様書です。  
> 目的は「ゲームらしい世界観」と「回線・アフィリエイトサイトとしての分かりやすさ」を両立することです。

---

## 1. Visual Theme & Atmosphere

### Gamer's Line

- **デザイン方針**: ゲーマー向けの回線診断メディア。サイバー、HUD、回線速度、Ping、比較、診断の世界観を持つ
- **密度**: LPのような演出は使うが、比較・診断・記事導線は実用的に整理する
- **キーワード**: cyber, network, fast, tactical, trustworthy
- **印象**: 黒基調にシアン/エメラルドのネオン。派手すぎるゲームUIではなく、判断しやすい情報設計を優先する

### Gear Select

- **デザイン方針**: note・バナー・買ってよかったもの用の派生ブランド。ゲーム部屋とデスク周りのギア選び
- **密度**: サムネや記事導線は視認性重視。アフィ感を前に出しすぎない
- **キーワード**: gear, setup, desk, practical, honest
- **印象**: Gamer's Lineと同じ黒/シアン基調を使いながら、Amazonや楽天の広告色を前面に出さない

---

## 2. Color Palette & Roles

### Core Colors

- **Background** (`#050508`): ページ全体の基本背景
- **Background 2** (`#080810`): セクションや深い面
- **Text Primary** (`#f0f0f8`): 主要テキスト
- **Text Muted** (`#7a7a9a`): 補足、説明、メタ情報
- **Text Dim** (`#3a3a5a`): かなり弱い情報

### Brand / Accent

- **Cyan** (`#00E5FF`): メインアクセント。CTA、リンク、選択状態、Ping/速度の強調
- **Emerald** (`#00E676`): 成功、推奨、改善、良い数値の強調
- **Purple** (`oklch(0.62 0.18 290)`): サブアクセント。バナー、タグ、グラデーション補助
- **Amber** (`#fbbf24`): 注意、キャンペーン、価格・セールの補助

### Glass

- **Glass BG** (`rgba(255,255,255,0.035)`): カード、パネル、ツール面
- **Glass Border** (`rgba(255,255,255,0.08)`): 通常ボーダー
- **Glass Border Cyan** (`rgba(0,229,255,0.25)`): 強調枠、選択中、アクティブ状態

### Affiliate Colors

- **Amazon-like Amber** (`#f59e0b`): Amazonボタンなど。バナーやブランド表現では強く出さない
- **Rakuten-like Red** (`#ef4444`): 楽天ボタンなど。楽天セール時のみ明示してよい

---

## 3. Typography Rules

### Font Stack

Next.js `next/font/google` で以下を使用する。

```css
--font-sans: var(--font-inter), sans-serif;
--font-heading: var(--font-space-grotesk), sans-serif;
--font-mono: var(--font-space-mono), monospace;
```

日本語本文では、必要に応じてTailwind/CSS側で以下のフォールバックを意識する。

```css
font-family:
  var(--font-inter),
  "Hiragino Sans",
  "Hiragino Kaku Gothic ProN",
  "Noto Sans JP",
  Meiryo,
  sans-serif;
```

### Type Roles

| Role | Size | Weight | Line Height | Letter Spacing | 用途 |
| --- | --- | --- | --- | --- | --- |
| Hero | clamp(2.5rem, 6vw, 4.4rem) | 900 | 1.08 | -0.04em | トップの大見出し。英字寄りの演出に限る |
| Section H2 | 1.5rem | 700 | 1.3 | 0 to -0.01em | セクション見出し |
| Article H2 | 1.5rem | 700 | 1.3 | 0 | 記事内見出し。日本語では詰めすぎない |
| Article H3 | 1.1rem | 700 | 1.45 | 0 | 記事内小見出し |
| Body | 0.9375rem to 1rem | 400 | 1.75 to 1.9 | 0 | 記事本文・説明文 |
| Caption | 0.75rem to 0.875rem | 500 to 700 | 1.5 | 0 to 0.05em | メタ情報、タグ |
| Mono Label | 0.65rem to 0.78rem | 700 | 1.4 | 0.1em to 0.32em | HUDラベル、英字小見出し |

### Japanese Text Rules

- 日本語本文は `line-height: 1.75` 以上を基本にする
- 記事本文は読みやすさ優先で、`letter-spacing` は基本 `0`
- 日本語見出しに強い負の字間を使わない。英字見出しやロゴ的表現だけに限定する
- `font-feature-settings: "palt"` はナビゲーションや短い見出しにだけ使う。本文には使わない
- 長いURLや英数字は `overflow-wrap: break-word` で崩れを防ぐ

---

## 4. Layout Principles

### Spacing Scale

4pxベースで揃える。

| Token | Value | 用途 |
| --- | --- | --- |
| XS | 4px | 細かい間隔 |
| S | 8px | アイコンとテキスト |
| M | 16px | カード内の基本余白 |
| L | 24px | コンポーネント間 |
| XL | 32px | セクション内の大きい余白 |
| XXL | 48px | セクション間 |
| XXXL | 64px+ | ヒーロー・主要セクション |

### Containers

- ページ本文: `max-width: 1200px` 前後
- 記事本文: 760px前後まで。1行が長すぎないようにする
- 比較・一覧: 横幅を使ってよいが、モバイルでは横スクロールまたはカード化する

### Responsive

- Mobile: `≤ 640px`
- Tablet: `≤ 960px`
- Desktop: `> 960px`

モバイルでは次を守る。

- タッチターゲットは最低44px
- CTAは1画面内で押しやすい幅にする
- テキストがカードやボタンからはみ出さない
- 表は横スクロールまたは要約カードにする

---

## 5. Component Styling

### Header

- 背景: `#050508` の半透明 + backdrop blur
- 高さ: 64px
- ボーダー: `border-white/10`
- ナビは「速度チェック / キャンペーン / 回線を探す / コラム / 無料診断」を基本にする
- CTAは `bg-cyan text-black` の丸ボタン
- ドロップダウンは黒い面 + 角丸 + 控えめな影

### Buttons

**Primary CTA**

- Background: `#00E5FF`
- Text: `#000000`
- Border Radius: pill または 8px
- Font Weight: 700 to 900
- Hover: opacity調整 + `translateY(-1px to -2px)`

**Secondary**

- Background: `rgba(0,229,255,0.10 to 0.15)`
- Text: `#00E5FF`
- Border: `1px solid rgba(0,229,255,0.25 to 0.35)`
- Hover: 背景を少し濃くする

**Affiliate Buttons**

- Amazon/Rakuten色はボタン内に限定する
- ページ全体やバナーのブランドカラーとしてAmazon色を使いすぎない
- 押し売り感より「選択肢」として見せる

### Cards / Panels

- Background: `var(--glass-bg)` または `rgba(0,0,0,0.3)`
- Border: `1px solid var(--glass-border)`
- Border Radius: 8px to 14px
- Padding: 16px to 28px
- Shadow: 必要最小限。ネオンの強い影を大量に重ねない
- カード内カードは避ける。入れ子にする場合は境界を弱める

### Article Body

- 本文: `0.9375rem`, `line-height: 1.85`, 色は `rgba(240,240,248,0.82)`
- H2: 下線 + 左下にシアンの短いアクセント線
- H3: 本文より明確に強いが、大きくしすぎない
- リンク: `#00E5FF` + underline
- 表: 黒い面、薄いシアン罫線、ヘッダーはmono小文字/英字ラベル
- callout: tip/check/warningは左の色線で意味を出す

### Tables

- 比較表はGamer's Lineの主力UIなので、可読性を最優先する
- ヘッダーはシアン背景の薄い面
- 数値は中央寄せ、サービス名や判断軸は左寄せ
- モバイルでは文字を詰め込みすぎず、横スクロールを許可する

### Diagnosis / Tools

- 入力・選択肢はゲームUI風にしてよいが、判断が迷わないことを優先する
- 選択中はシアン枠、推奨/良い結果はエメラルド
- 結果画面では「なぜその回線なのか」をタグ、安定度、Ping目安で補足する

### Maps / Radar Charts

- ただの装飾にしない
- 地域、回線候補、Ping、安定度、料金などの判断と連動しているように見せる
- 色はシアン/エメラルド/アンバーを用途ごとに固定する

---

## 6. Motion & Effects

使ってよいもの。

- grid background
- scanline
- HUD corner brackets
- subtle glow
- hover translate
- fade up

注意するもの。

- 装飾だけの大きな光の塊を増やしすぎない
- テキストの上に強い光や線を重ねない
- 動きは判断を邪魔しない速度にする
- 重要CTAはアニメーションより視認性を優先する

---

## 7. Content & UX Rules

### Gamer's Line

- 目的は「ゲーマーが自分に合う回線を選べること」
- 速度だけでなく、Ping、安定性、エリア、開通期間、料金、キャンペーンを比較する
- 最終導線は無料診断、回線比較、キャンペーン、各回線詳細
- PR/アフィリエイト感を出しすぎず、判断材料として見せる

### Gear Select

- 目的は「ゲーム部屋とデスク周りを少しずつ良くすること」
- Amazonは表に出しすぎない。表現は「ギア特集」「買ってよかったもの」「レビュー」にする
- バナー署名は `ギアセレクト` を基本にする

---

## 8. Do's and Don'ts

### Do

- 黒背景でも文字コントラストを確保する
- 日本語本文は広めの行間にする
- CTAは1画面内で何を押すべきか分かるようにする
- 比較表と診断結果は、見た目より判断しやすさを優先する
- シアンは「主導線」、エメラルドは「良い結果/改善」、アンバーは「注意/キャンペーン」に寄せる
- ゲーム感はHUD、グリッド、線、数字、monoラベルで出す

### Don't

- 日本語本文に強い負のletter-spacingを使わない
- 全部をネオンにしない
- カードを増やしすぎて情報の優先順位を失わせない
- ただの装飾セクションを増やさない
- CTAを複数並べすぎて迷わせない
- Amazon/Rakuten色をブランドカラーのように使わない
- 記事一覧で「コラム」など分かりきったタグを乱用しない
- 文字がボタンやカードからはみ出す状態を放置しない

---

## 9. Agent Prompt Guide

### Quick Reference

```text
Service: Gamer's Line
Theme: dark cyber network media for gamers
Background: #050508
Text: #f0f0f8
Muted Text: #7a7a9a
Primary Accent: #00E5FF
Positive Accent: #00E676
Warning/Campaign: #fbbf24
Glass BG: rgba(255,255,255,0.035)
Glass Border: rgba(255,255,255,0.08)
Font Sans: Inter + Japanese fallback
Font Heading: Space Grotesk
Font Mono: Space Mono
Body Line Height: 1.75-1.9
Article Body: 0.9375rem / line-height 1.85
CTA: cyan background, black text
```

### When Editing UI

AIエージェントは以下を確認してから実装する。

1. この変更は回線選び、診断、比較、記事導線のどれを強くするのか
2. 主CTAは1つに絞れているか
3. モバイルで文字が収まるか
4. 日本語の行間が狭すぎないか
5. 装飾が判断を邪魔していないか

### Prompt Example

```text
Gamer's LineのDESIGN.mdに従って、回線比較カードを改善してください。
- 黒背景、glass card、シアン/エメラルドアクセントを使用
- 日本語本文はline-height 1.75以上
- CTAは無料診断か詳細ページのどちらか1つを主役にする
- モバイルで文字がはみ出さないようにする
- 装飾より判断しやすさを優先する
```

