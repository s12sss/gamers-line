const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log("Navigating to file...");
  await page.goto('file:///C:/Users/shun/Downloads/Gamers%20Line%20-%20Article%20Images.html', { waitUntil: 'networkidle0' });
  
  // Wait a bit for React to render
  await new Promise(r => setTimeout(r, 3000));
  
  console.log("Finding SVG elements...");
  // Some Artifacts wrap SVGs in a container. We'll find all SVGs.
  const svgHandles = await page.$$('svg');
  
  if (svgHandles.length === 0) {
    console.log("No SVGs found!");
  } else {
    console.log(`Found ${svgHandles.length} SVGs! Extracting...`);
    for (let i = 0; i < svgHandles.length; i++) {
      const handle = svgHandles[i];
      const destPath = `C:/Users/shun/Downloads/GamerLine_Thumbnail_${i + 1}.png`;
      await handle.screenshot({ path: destPath, omitBackground: true });
      console.log(`Saved ${destPath}`);
    }
  }
  
  await browser.close();
  console.log("Done!");
})();
