const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport large enough to fit everything
  await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 2 });
  
  const filePath = "C:\\Users\\shun\\Downloads\\Gamers Line - 10G Article Thumbnail.html";
  const html = fs.readFileSync(filePath, 'utf8');
  
  // set content directly
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  // Wait for all custom fonts to load properly
  await page.evaluate(() => document.fonts.ready);
  
  // Target the specific 1200x630 frame element
  const element = await page.$('.img-frame');
  
  const outPath = path.join(__dirname, '../public/10g-article-thumbnail-v3.png');
  await element.screenshot({ path: outPath });
  
  console.log('Saved element screenshot to:', outPath);
  await browser.close();
}

main().catch(console.error);
