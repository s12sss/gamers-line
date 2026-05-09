const puppeteer = require('puppeteer');
const path = require('path');
const os = require('os');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // 元の画像に近いアスペクト比・幅になるようにViewportを調整
  await page.setViewport({ width: 850, height: 900, deviceScaleFactor: 2 });

  const fileUrl = 'file:///C:/Users/shun/Downloads/nordvpn_ping_comparison.html';
  console.log('Navigating to', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  console.log('Waiting for fonts...');
  await page.evaluateHandle('document.fonts.ready');
  
  // 綺麗に切り抜くためにbodyの余白と背景を削除
  await page.addStyleTag({ content: 'body { margin: 0 !important; background: transparent !important; }' });
  
  await new Promise(r => setTimeout(r, 1000));

  // The main container is the first div
  const element = await page.$('div');
  if (!element) {
    console.error('Element not found!');
    await browser.close();
    process.exit(1);
  }

  const outputPath = path.join(os.homedir(), 'Downloads', 'nordvpn_ping_comparison_hd.png');
  console.log('Taking screenshot...');
  // Omit background so we just get the div itself perfectly cropped
  await element.screenshot({ path: outputPath, omitBackground: true });
  console.log('Saved successfully to', outputPath);

  await browser.close();
})();
