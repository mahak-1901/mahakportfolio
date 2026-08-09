import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir =
  'C:/Users/asd/.cursor/projects/c-Users-asd-Downloads-project-bolt-sb1-5xgahoze-1-project/assets';
const dest = path.join(__dirname, '..', 'src', 'assets', 'about-illustration.png');

const files = fs
  .readdirSync(srcDir)
  .filter((n) => n.includes('Screenshot_2026-04-04_012753') && n.endsWith('.png'))
  .map((n) => ({
    n,
    t: fs.statSync(path.join(srcDir, n)).mtimeMs,
    rb: n.includes('removebg-preview') ? 1 : 0
  }))
  .sort((a, b) => b.rb - a.rb || b.t - a.t);

if (!files.length) {
  const any = fs.readdirSync(srcDir).filter((n) => n.endsWith('.png'));
  console.error('No 012753 png. Available:', any.slice(0, 3));
  process.exit(1);
}

const pick = files[0].n;
fs.copyFileSync(path.join(srcDir, pick), dest);
console.log('Copied', pick);
