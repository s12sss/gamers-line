const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log("Starting browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport large enough, deviceScaleFactor 2 for high-res
  await page.setViewport({ width: 1400, height: 4000, deviceScaleFactor: 2 });
  
  const fileUrl = 'file:///C:/Users/shun/Downloads/Gamers%20Line%20-%20Pro%20Plan%20and%20MMO%20Article%20Images.html';
  console.log(`Navigating to ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  
  const frames = await page.$$('.img-frame');
  console.log(`Found ${frames.length} frames.`);
  
  const names = [
    'article_pro_thumb.png',
    'article_pro_compare.png',
    'article_mmo_thumb.png',
    'article_mmo_compare.png'
  ];
  
  const outDir = path.join(__dirname, 'public', 'images', 'columns');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const outPath = path.join(outDir, names[i]);
    await frame.screenshot({ path: outPath });
    console.log(`Saved ${outPath}`);
  }
  
  await browser.close();
  console.log("Done.");
})();
