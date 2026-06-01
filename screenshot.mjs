import puppeteer from 'puppeteer';
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT  = path.dirname(fileURLToPath(import.meta.url));
const DIR   = path.join(ROOT, 'temporary screenshots');
const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? '-' + process.argv[3] : '';

if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

let n = 1;
while (fs.existsSync(path.join(DIR, `screenshot-${n}${label}.png`))) n++;
const out = path.join(DIR, `screenshot-${n}${label}.png`);

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 800));
// Force-reveal all scroll-animated sections for screenshot
await page.evaluate(() => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
});
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: out, fullPage: true });
await browser.close();

console.log('Screenshot saved:', out);
