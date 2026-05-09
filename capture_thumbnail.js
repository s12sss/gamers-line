const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });

  const fileUrl = 'file:///C:/Users/shun/Downloads/nordvpn_thumbnail.html';
  console.log('Navigating to', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  console.log('Waiting for fonts...');
  await page.evaluateHandle('document.fonts.ready');
  // Wait an extra second for animations and blends to render properly
  await new Promise(r => setTimeout(r, 1000));

  const element = await page.$('.frame');
  if (!element) {
    console.error('.frame not found!');
    await browser.close();
    process.exit(1);
  }

  const os = require('os');
  const outputPath = path.join(os.homedir(), 'Downloads', 'nordvpn_thumbnail_hd.png');
  console.log('Taking screenshot...');
  await element.screenshot({ path: outputPath });
  console.log('Saved successfully to', outputPath);

  await browser.close();
})();
