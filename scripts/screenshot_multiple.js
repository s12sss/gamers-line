const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function main() {
  const filePath = process.argv[2];
  
  if (!filePath || !fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    return;
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // High res viewport
  await page.setViewport({ width: 1600, height: 2000, deviceScaleFactor: 2 });
  
  const html = fs.readFileSync(filePath, 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  
  // Find all .img-frame elements
  let elements = await page.$$('.img-frame');
  
  if (elements.length === 0) {
      console.log("No .img-frame found. Falling back to body.");
      elements = await page.$$('body');
  }
  
  console.log(`Found ${elements.length} images to extract.`);
  
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, path.extname(filePath));
  
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const outPath = path.join(dir, `${baseName}_${i + 1}.png`);
    await el.screenshot({ path: outPath });
    console.log(`Saved: ${outPath}`);
  }
  
  await browser.close();
}

main().catch(console.error);
