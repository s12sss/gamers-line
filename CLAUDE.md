# Gamer's Line Project Handover Document (for Claude)

This document is intended for Claude or any other AI assistant taking over the development and maintenance of the "Gamer's Line" project. It contains the project's architecture, design philosophy, and recent implementations.

## 1. Project Overview
**Gamer's Line** は、FPS/TPS/MMOゲーマー向けの光回線・Ping改善に特化したアフィリエイトメディアです。
単なる記事メディアではなく、インタラクティブな「回線診断ツール」や「スピードテスト」を備えた高機能なWebアプリケーションとして機能します。

## 2. Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS Modules (`src/app/globals.css`)
- **Animations**: Framer Motion (多用しています)
- **Icons**: Lucide React
- **CMS**: MicroCMS (コラム記事用)
- **Thumbnail Generation**: Puppeteer (Node.js script for automated OGP image generation)

## 3. Design Philosophy (IMPORTANT)
サイト全体を**「サイバーパンク・ダークモード」**で統一しています。
ClaudeがUIを追加・修正する場合は、以下のデザインルールを厳守してください。
- **Colors**: 背景は深い黒 (`#0a0a12` または `bg-background`)。アクセントカラーとしてCyan (`#00E5FF`) と Emerald (`#00E676`) を多用。
- **Aesthetics**: Glassmorphism (半透明背景 + ぼかし)、発光エフェクト (drop-shadow)、グリッド線、スキャンラインなどの装飾を使い、「ハッカーライク・ゲーマーライク」なリッチなUIを維持すること。単純なベタ塗りは避けてください。
- **Typography**: 英数字には `Space Grotesk` や `Space Mono` を使用し、和文には `Noto Sans JP` 等のモダンなフォントを適用。

## 4. Key Directory Structure
- `/src/app`: App Routerベースのページ群。
  - `/`: トップページ（Hero, 診断CTA, FAQ, VPN誘導）
  - `/diagnosis`: 回線診断ツール（対話型UI）
  - `/speedtest`: スピードテストツール（ダミーアニメーションを用いたリッチなUI）
  - `/compare`, `/ranking`: 回線比較・ランキングページ
  - `/area`: 地方別マップ
  - `/area/[prefecture]`: **【重要】47都道府県別のSEO特化自動生成ページ (SSG)**
  - `/column`: MicroCMS連携のコラム一覧・詳細
- `/src/components`: 再利用可能なUIコンポーネント（Breadcrumbs, InteractiveJapanMapなど）
- `/src/data`: 静的データ（`isps.json` 等）
- `/src/utils`: ロジック、型定義、データ連携用関数（`prefectureData.ts`, `algorithm.ts`）

## 5. SEO & Structured Data (JSON-LD)
Gamer's LineはSEOに極めて強く最適化されています。ページを追加する際は、既存のスキーマ構造を壊さないように注意してください。
- **WebSite / FAQPage**: `/page.tsx` (トップページ)
- **SoftwareApplication**: `/diagnosis`, `/speedtest` (ツールとしてGoogleに認識させるため)
- **BreadcrumbList**: `src/components/Breadcrumbs.tsx` を用いて、`/column`, `/compare`, `/area/[prefecture]` 等ほぼ全ページに実装済み。
- **Article**: `/column/[slug]`

## 6. Thumbnail Generation Pipeline
- `extract_images_v2.js` などのスクリプトを使用し、Puppeteer経由でローカルのHTMLファイル（ユーザーがデザインしたバナー用HTML）から高画質のPNG画像を自動切り出しするフローが存在します。
- 出力先は `public/images/columns/` 等。

## 7. Next Steps / Pending Tasks
以下の施策が今後有効であると前任のAI(Antigravity)とユーザー間で合意されています。
1. **ゲーム特化型LPの作成**: 「VALORANT 回線」「スト6 回線」など、特定のゲームタイトルに特化した記事やランディングページの投下。
2. **ハードウェアアフィリエイトの拡充**: Amazonアソシエイト等を用いた「おすすめゲーミングルーター」「Cat6A LANケーブル」の紹介ページの作成（`/gear` など）。
3. **コラム記事の拡充**: MicroCMS経由での「10Gプラン/Proプラン比較」「MMO向け回線」等の記事公開（画像は生成済み）。

---
**To Claude:**
ユーザーの指示は非常に的確で、アフィリエイトやUI/UXに対する高い感度を持っています。
常に「SEOの観点」と「ゲーマーがアガるサイバーパンクなUI」の2軸を意識して、最高のコードを提供してください。Good luck!
