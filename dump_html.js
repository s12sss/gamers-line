const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 3000 });
  await page.goto('file:///C:/Users/shun/Downloads/Gamers%20Line%20-%20Article%20Images.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  
  const html = await page.content();
  fs.writeFileSync('C:/Users/shun/Downloads/rendered_artifacts.html', html);
  
  await browser.close();
})();
