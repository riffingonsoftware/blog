// Build-time OG image generator using Sharp to rasterize SVG templates.
// Outputs JPEGs at 1200x627 to `public/og/<slug>.jpg`.
// No external deps beyond `sharp` to keep CI/Pages simple.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.resolve(__dirname, '..', 'src', 'content', 'posts');
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'og');

const SITE_TITLE = 'Riffing on Software';
const WIDTH = 1200;
const HEIGHT = 627; // 1.91:1

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readPostsDir() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.join(POSTS_DIR, f));
}

function parseFrontmatter(content) {
  // Very small YAML frontmatter parser for title and tags.
  // Expects frontmatter at the top between --- lines.
  const result = { title: undefined, tags: [] };
  if (!content.startsWith('---')) return result;
  const end = content.indexOf('\n---', 3);
  if (end === -1) return result;
  const fm = content.slice(3, end).trim();
  const lines = fm.split(/\r?\n/);
  let inTags = false;
  for (const line of lines) {
    const l = line.trim();
    if (!inTags) {
      if (l.startsWith('title:')) {
        result.title = l.replace(/^title:\s*/, '').replace(/^"|"$/g, '').replace(/^'|'$/g, '');
      } else if (l.startsWith('tags:')) {
        // Could be inline array or start of list
        const after = l.replace(/^tags:\s*/, '');
        if (after.startsWith('[')) {
          try {
            const arr = JSON.parse(after.replace(/'/g, '"'));
            if (Array.isArray(arr)) result.tags = arr.map(String);
          } catch (_) {}
        } else {
          inTags = true;
        }
      }
    } else {
      if (l.startsWith('-')) {
        result.tags.push(l.replace(/^-\s*/, ''));
      } else if (l === '' || l.includes(':')) {
        inTags = false;
      }
    }
  }
  return result;
}

function slugFromFilename(file) {
  return path.basename(file, '.md');
}

function escapeXML(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function wrapTitle(text, maxChars = 30, maxLines = 3) {
  const words = (text || '').split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const next = line ? line + ' ' + w : w;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = w;
      if (lines.length >= maxLines - 1) break;
    } else {
      line = next;
    }
  }
  if (lines.length < maxLines && line) lines.push(line);
  if (lines.length > maxLines) return lines.slice(0, maxLines);
  return lines;
}

function svgTemplate({ title, site = SITE_TITLE }) {
  const bg1 = '#0c1425';
  const bg2 = '#081019';
  const accent = '#93c5fd'; // tailwind blue-300
  const text = '#f3f4f6'; // gray-100
  const subtext = '#d1d5db'; // gray-300
  const titleLines = wrapTitle(title || site, 34, 3).map(escapeXML);
  const lineHeight = 64;
  const startY = 275 - (titleLines.length - 1) * (lineHeight / 2);
  const titleSVG = titleLines
    .map((t, i) => `<text x="60" y="${startY + i * lineHeight}" font-size="56" font-weight="700" fill="${text}">${t}</text>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg2}"/>
      <stop offset="100%" stop-color="${bg1}"/>
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="10" stdDeviation="20" flood-color="rgba(0,0,0,0.35)"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="40" y="60" width="1120" height="507" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" filter="url(#shadow)"/>
  <text x="60" y="140" font-size="28" font-weight="600" fill="${subtext}">${escapeXML(site)}</text>
  ${titleSVG}
  <text x="60" y="560" font-size="24" fill="${accent}">${escapeXML('riffingonsoftware.com')}</text>
  <circle cx="1140" cy="100" r="10" fill="${accent}"/>
  <circle cx="1110" cy="100" r="4" fill="${accent}"/>
  <circle cx="1080" cy="100" r="2" fill="${accent}"/>
</svg>`;
}

async function generate(postFile) {
  const src = fs.readFileSync(postFile, 'utf8');
  const { title } = parseFrontmatter(src);
  const slug = slugFromFilename(postFile);
  const svg = svgTemplate({ title });
  const outPath = path.join(OUT_DIR, `${slug}.jpg`);
  const img = sharp(Buffer.from(svg));
  await img.jpeg({ quality: 85 }).toFile(outPath);
  return { slug, outPath };
}

async function main() {
  ensureDir(OUT_DIR);
  const files = readPostsDir();
  const results = [];
  // Default site OG image
  try {
    const svg = svgTemplate({ title: SITE_TITLE });
    const outPath = path.join(OUT_DIR, `default.jpg`);
    await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(outPath);
    process.stdout.write(`OG: ${path.basename(outPath)}\n`);
  } catch (e) {
    console.error('OG generation failed for default image', e);
  }
  for (const f of files) {
    try {
      const r = await generate(f);
      results.push(r);
      process.stdout.write(`OG: ${path.basename(r.outPath)}\n`);
    } catch (e) {
      console.error('OG generation failed for', f, e);
    }
  }
}

main();
