const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });

  const fileUrl = 'file:///C:/Users/shun/Downloads/Gamers%20Line%20-%20Twitter%20Card%20BG%20(1).html';
  console.log('Navigating to', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  console.log('Waiting for fonts...');
  await page.evaluateHandle('document.fonts.ready');
  // Wait an extra second for gradients and blends to render properly
  await new Promise(r => setTimeout(r, 1000));

  const element = await page.$('.bg-frame');
  if (!element) {
    console.error('.bg-frame not found!');
    await browser.close();
    process.exit(1);
  }

  const outputPath = path.join(__dirname, 'src', 'app', 'opengraph-image.png');
  console.log('Taking screenshot...');
  await element.screenshot({ path: outputPath });
  console.log('Saved successfully to', outputPath);

  await browser.close();
})();
