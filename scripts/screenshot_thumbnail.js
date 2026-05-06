const puppeteer = require('puppeteer');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to the standard thumbnail size 1200x630
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  
  const fileUri = 'file:///' + 'C:/Users/shun/Downloads/Gamers Line - 10G Article Thumbnail.html'.replace(/\\/g, '/');
  console.log('Loading:', fileUri);
  await page.goto(fileUri, { waitUntil: 'networkidle0' });
  
  const outPath = path.join(__dirname, '../public/10g-article-thumbnail.png');
  await page.screenshot({ path: outPath });
  
  console.log('Saved screenshot to:', outPath);
  await browser.close();
}

main().catch(console.error);
