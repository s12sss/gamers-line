# Gamer's Line サムネイル制作用プロンプト集

実際のゲームのスクリーンショットを使用すると、プレイしていないゲームの記事を作る際の手間や、著作権的な問題が発生しやすいです。
ここでは、「DALL-EなどのAI画像生成」を使う方法と、「ClaudeにクリーンなSVGデザインを作らせる」方法の2つを紹介します。

---

## 方法1. Claude Artifacts を使った「AI感のない」シンプルデザイン（推奨）
**用途:** DALL-Eのような「いかにもAI生成」なテカテカした画像が嫌な場合。フラットでクリーンなデザイン。
**特徴:** Claudeに「SVG（ベクター画像）」としてデザインを書かせ、プレビュー画面（Artifacts）をそのままスクショして使う方法です。これが一番手軽で綺麗です。

**プロンプト（Claude 3.5 Sonnet用）:**
```text
あなたはプロのWebデザイナーです。
「Gamer's Line」というゲーマー向け光回線比較サイトの、記事用サムネイル画像をSVG形式（1200x630）で作成してください。

【要件】
- DALL-Eのような写真風・3D風ではなく、クリーンでミニマルな「フラットデザイン」「サイバーUI風」にすること。
- 背景色は深い黒（#0A0A0F）ベース。
- アクセントカラーとしてシアン（#00E5FF）を使用すること。
- 中央に大きく以下のテキストを配置してください：
  「Ping値を下げる最強の設定」
- フォントはゴシック体風の太字で、読みやすくすること。
- 背景には、うっすらとサイバー空間を連想させる幾何学模様（ドットグリッドや、斜めのラインなど）を配置すること。
- 画像として出力（プレビュー）できるように、完全なSVGコードを書いてください。
```
*(※このプロンプトをClaudeに投げると、右側の画面に綺麗なデザインが表示されるので、それをそのままスクショするかダウンロードして使えます！テキスト部分は記事に合わせて書き換えてください。)*

---

## 方法2. DALL-E 3 / Midjourney を使ったリッチな背景生成
**用途:** 速度感や迫力のある背景画像を作り、その上にCanvaで文字を乗せる運用。

**プロンプト例（ゲーミングルーター / 回線速度）:**
```text
A highly detailed, ultra-realistic cyberpunk gaming room setup. Focus on a high-end gaming router with glowing neon blue and magenta lights emitting digital data streams. The background features a blurred ultra-wide gaming monitor displaying an abstract fast-paced sci-fi interface. Dark atmosphere, moody neon lighting, 8k resolution, photorealistic, no text. --ar 16:9
```

**プロンプト例（抽象的なサイバー空間）:**
```text
Abstract cyberpunk background with flowing digital data lines and glowing neon grids in deep black, cyan, and electric blue colors. High-tech network concept, dark and sleek design, perfect for a thumbnail background. Plenty of negative space in the center for text insertion. 8k, ultra-detailed, no text. --ar 16:9
```
