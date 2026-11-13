// Build-time OG image generator using Sharp to rasterize SVG templates.
// Outputs JPEGs at 1200x627 to `public/og/<slug>.jpg`.
// No external deps beyond `sharp` to keep CI/Pages simple.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.resolve(__dirname, "..", "src", "content", "posts");
const OUT_DIR = path.resolve(__dirname, "..", "public", "og");

const SITE_TITLE = "Riffing on Software";
const DOMAIN = "riffingonsoftware.com";
const WIDTH = 1200;
const HEIGHT = 627; // 1.91:1

function readPostsDir() {
  const out = [];
  /** @param {string} dir */
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(p);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        out.push(p);
      }
    }
  }
  walk(POSTS_DIR);
  return out;
}

function parseFrontmatter(content) {
  // Very small YAML frontmatter parser.
  // Expects frontmatter at the top between --- lines.
  const result = {
    title: undefined,
    description: undefined,
    tags: [],
    heroImage: undefined,
    draft: false,
  };
  if (!content.startsWith("---")) return result;
  const end = content.indexOf("\n---", 3);
  if (end === -1) return result;
  const fm = content.slice(3, end).trim();
  const lines = fm.split(/\r?\n/);
  let inTags = false;
  for (const line of lines) {
    const l = line.trim();
    if (!inTags) {
      const strVal = (raw) => raw.replace(/^"|"$/g, "").replace(/^'|'$/g, "");
      if (l.startsWith("title:")) {
        result.title = strVal(l.replace(/^title:\s*/, ""));
      } else if (l.startsWith("description:")) {
        result.description = strVal(l.replace(/^description:\s*/, ""));
      } else if (l.startsWith("draft:")) {
        result.draft = l.replace(/^draft:\s*/, "") === "true";
      } else if (l.startsWith("heroImage:")) {
        result.heroImage = strVal(l.replace(/^heroImage:\s*/, ""));
      } else if (l.startsWith("tags:")) {
        // Could be inline array or start of list
        const after = l.replace(/^tags:\s*/, "");
        if (after.startsWith("[")) {
          try {
            const arr = JSON.parse(after.replace(/'/g, '"'));
            if (Array.isArray(arr)) result.tags = arr.map(String);
          } catch (_) {}
        } else {
          inTags = true;
        }
      }
    } else {
      if (l.startsWith("-")) {
        result.tags.push(l.replace(/^-\s*/, ""));
      } else if (l === "" || l.includes(":")) {
        inTags = false;
      }
    }
  }
  return result;
}

// Approximates the github-slugger id Astro's glob loader gives each entry.
// The build-output test fails if a published post's image name drifts from its page.
function slugFromFilename(file) {
  const base = path.basename(file);
  const name = base.toLowerCase() === "index.md" ? path.basename(path.dirname(file)) : path.basename(file, ".md");
  return name
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s/g, "-");
}

function escapeXML(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function wrapText(text, maxChars, maxLines) {
  const lines = [];
  for (const w of (text || "").split(/\s+/).filter(Boolean)) {
    const last = lines.at(-1);
    if (last !== undefined && (last + " " + w).length <= maxChars) {
      lines[lines.length - 1] = last + " " + w;
    } else {
      lines.push(w);
    }
  }
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] += "…";
  }
  return lines;
}

/**
 * Bold Editorial template — designed for full-bleed hero compositing.
 * When `hasHero` is true the background is transparent (hero goes underneath).
 * When false a dark gradient fills the background as fallback.
 */
function svgTemplate({ title, description, tags = [], hasHero = false }) {
  const accent = "#93c5fd"; // tailwind blue-300

  const titleLines = wrapText(title || SITE_TITLE, 30, 2).map(escapeXML);
  const descLines = description ? wrapText(description, 55, 2).map(escapeXML) : [];

  // Stack text upward from the tag row (y 505-537) so nothing overlaps.
  const lastDescY = tags.length ? 480 : 530;
  const descY = lastDescY - (descLines.length - 1) * 28;
  const lastTitleY = descLines.length ? descY - 40 : lastDescY;
  const titleY = lastTitleY - (titleLines.length - 1) * 60;

  const titleSVG = titleLines
    .map(
      (t, i) =>
        `<text x="60" y="${titleY + i * 60}" font-size="52" font-weight="800" font-family="sans-serif" fill="#ffffff" letter-spacing="-1">${t}</text>`,
    )
    .join("\n");

  const descSVG = descLines
    .map(
      (t, i) =>
        `<text x="60" y="${descY + i * 28}" font-size="20" font-family="sans-serif" fill="rgba(255,255,255,0.75)">${t}</text>`,
    )
    .join("\n");

  let tagX = 60;
  let tagSVG = "";
  for (const t of tags) {
    const w = t.length * 10 + 24;
    if (tagX + w > WIDTH - 60) break;
    tagSVG += `
        <rect x="${tagX}" y="505" width="${w}" height="32" rx="16" fill="rgba(147,197,253,0.2)" stroke="${accent}" stroke-width="1"/>
        <text x="${tagX + w / 2}" y="526" font-size="16" font-family="sans-serif" fill="${accent}" text-anchor="middle">${escapeXML(t)}</text>`;
    tagX += w + 12;
  }

  const fallbackBg = hasHero
    ? ""
    : `<defs>
    <linearGradient id="fallback" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#081019"/>
      <stop offset="100%" stop-color="#0c1425"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#fallback)"/>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  ${fallbackBg}
  <defs>
    <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="35%" stop-color="rgba(0,0,0,0.15)"/>
      <stop offset="100%" stop-color="rgba(8,16,25,0.92)"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#overlay)"/>
  <rect x="0" y="0" width="${WIDTH}" height="4" fill="${accent}"/>
  <text x="60" y="50" font-size="18" font-weight="600" font-family="sans-serif" fill="rgba(255,255,255,0.6)">${escapeXML(DOMAIN)}</text>
  ${titleSVG}
  ${descSVG}
  ${tagSVG}
  <rect x="60" y="558" width="80" height="4" rx="2" fill="${accent}"/>
</svg>`;
}

function resolveHeroPath(hero, baseDir) {
  if (!hero || typeof hero !== "string") return undefined;
  const p = hero.replace(/^\"|\"$/g, "").replace(/^'|'$/g, "");
  if (p.startsWith("/")) {
    // Absolute from site root -> look under public
    return path.resolve(__dirname, "..", "public", p.slice(1));
  }
  // Relative path -> resolve from the markdown file directory
  if (baseDir) {
    return path.resolve(baseDir, p);
  }
  return path.resolve(__dirname, "..", p);
}

async function generate(postFile) {
  const src = fs.readFileSync(postFile, "utf8");
  const { title, description, tags, heroImage, draft } = parseFrontmatter(src);
  if (draft) return;
  const slug = slugFromFilename(postFile);
  const heroAbs = resolveHeroPath(heroImage, path.dirname(postFile));
  const hasHero = heroAbs && fs.existsSync(heroAbs);
  const svg = svgTemplate({ title, description, tags, hasHero });
  const outPath = path.join(OUT_DIR, `${slug}.jpg`);
  const overlaySvg = await sharp(Buffer.from(svg)).png().toBuffer();

  if (hasHero) {
    // Hero as full-bleed background, SVG overlay on top
    const heroBg = await sharp(heroAbs).resize({ width: WIDTH, height: HEIGHT, fit: "cover" }).png().toBuffer();
    await sharp(heroBg)
      .composite([{ input: overlaySvg, left: 0, top: 0 }])
      .jpeg({ quality: 85 })
      .toFile(outPath);
  } else {
    // No hero — SVG includes its own dark gradient background
    await sharp(overlaySvg).jpeg({ quality: 85 }).toFile(outPath);
  }
  process.stdout.write(`OG: ${path.basename(outPath)}\n`);
}

async function main() {
  // Start clean so images for deleted, renamed, or re-drafted posts don't ship.
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const svg = svgTemplate({ title: SITE_TITLE, hasHero: false });
  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(path.join(OUT_DIR, "default.jpg"));
  for (const f of readPostsDir()) {
    await generate(f);
  }
}

await main();
