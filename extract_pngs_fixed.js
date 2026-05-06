const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 4000, deviceScaleFactor: 2 });
  
  console.log("Navigating to file...");
  // ユーザー指定の元のファイル
  await page.goto('file:///C:/Users/shun/Downloads/site%20(2)/Gamers%20Line%20-%20Router%20Tips%20Article%20Images.html', { waitUntil: 'networkidle0' });
  
  await new Promise(r => setTimeout(r, 3000));
  
  console.log("Finding .img-frame elements...");
  // 見切れている下部の要素を非表示にする
  await page.addStyleTag({ content: '.chart-conclusion { display: none !important; }' });
  
  const frames = await page.$$('.img-frame');
  
  if (frames.length === 0) {
    console.log("No frames found!");
  } else {
    console.log(`Found ${frames.length} frames! Extracting the first 2...`);
    const limit = Math.min(frames.length, 2);
    for (let i = 0; i < limit; i++) {
      const handle = frames[i];
      const destPath = `C:/Users/shun/Downloads/Router_Tips_HQ_${i + 1}.png`;
      // PNG形式で保存（背景は透明にしない）
      await handle.screenshot({ path: destPath, type: 'png' });
      console.log(`Saved ${destPath}`);
    }
  }
  
  await browser.close();
  console.log("Done!");
})();
