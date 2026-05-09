const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 4000, deviceScaleFactor: 2 });
  
  console.log("Navigating to file...");
  await page.goto('file:///C:/Users/shun/Downloads/Gamers%20Line%20-%20Pro%20Plan%20and%20MMO%20Article%20Images%20(2).html', { waitUntil: 'networkidle0' });
  
  await new Promise(r => setTimeout(r, 3000));
  
  console.log("Finding .img-frame elements...");
  
  const frames = await page.$$('.img-frame');
  const filenames = [
    'article_pro_thumb.png',
    'article_pro_compare.png',
    'article_mmo_thumb.png',
    'article_mmo_compare.png'
  ];
  
  if (frames.length === 0) {
    console.log("No frames found!");
  } else {
    console.log(`Found ${frames.length} frames! Extracting...`);
    for (let i = 0; i < frames.length; i++) {
      if (i >= filenames.length) break;
      const handle = frames[i];
      const destPath = `C:/Users/shun/.gemini/antigravity/scratch/gamers-line/public/images/columns/${filenames[i]}`;
      await handle.screenshot({ path: destPath, type: 'png' });
      console.log(`Saved ${destPath}`);
    }
  }
  
  await browser.close();
  console.log("Done!");
})();
