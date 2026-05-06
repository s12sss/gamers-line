const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function main() {
  const inputPath = process.argv[2];
  
  if (!inputPath || !fs.existsSync(inputPath)) {
    console.error("エラー: HTMLファイルのパスが指定されていないか、存在しません。");
    process.exit(1);
  }

  console.log(`[処理開始] HTMLファイル: ${inputPath}`);

  // Determine output path (same directory, same name, .png extension)
  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const basename = path.basename(inputPath, ext);
  const outputPath = path.join(dir, `${basename}.png`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to accommodate any size (we screenshot the element anyway)
  await page.setViewport({ width: 1600, height: 1200, deviceScaleFactor: 2 }); // @2x 高画質
  
  const html = fs.readFileSync(inputPath, 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  // Wait for fonts
  await page.evaluate(() => document.fonts.ready);
  
  // Look for .img-frame (Gamers Line thumbnail wrapper) or fallback to body
  let element = await page.$('.img-frame');
  if (!element) {
    console.log(".img-frame クラスが見つかりませんでした。ページ全体をスクリーンショットします。");
    element = await page.$('body');
  }
  
  await element.screenshot({ path: outputPath });
  
  console.log(`\n[成功] 画像化が完了しました！`);
  console.log(`保存先: ${outputPath}\n`);
  
  await browser.close();
}

main().catch(err => {
  console.error("エラーが発生しました:", err);
  process.exit(1);
});
