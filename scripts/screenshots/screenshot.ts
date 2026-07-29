/**
 * Portfolio hero screenshot generator
 * ------------------------------------
 * Takes the live project URLs from `lib/data.ts` (the same file the site
 * itself renders from) and produces cropped "hero" screenshots
 * (viewport-only, not full page) for use as portfolio card thumbnails.
 *
 * This intentionally reads straight from lib/data.ts rather than keeping a
 * second, hand-maintained URL list — add a project once, in one place, and
 * both the site and this script pick it up.
 *
 * Output is WebP (not JPEG/PNG) — smaller file size at equal visual
 * quality, with universal browser support, which matters here since these
 * load as portfolio card thumbnails on first paint.
 *
 * Usage:
 *   npm run shots
 */

import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { projects, type Project } from "../../lib/data";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- Sanity check on import --------------------------------------------
// If this ever logs "undefined" for liveUrl on a project that clearly has
// one set in lib/data.ts, it means this script resolved a *different*
// data.ts than the one you're editing (a stale build artifact, a second
// copy of the file elsewhere in the repo, or a path-alias/tsconfig issue
// making "../../lib/data" resolve somewhere unexpected). This check fails
// fast with the actual resolved path and object shape instead of silently
// producing "undefined" three steps later inside the Puppeteer loop.
const dataModulePath = fileURLToPath(new URL("../../lib/data.ts", import.meta.url));
if (!Array.isArray(projects) || projects.length === 0) {
  console.error(
    `✗ "projects" import is empty or not an array.\n` +
      `  Resolved lib/data.ts from: ${dataModulePath}\n` +
      `  Check that this is the file you're editing, and that it still exports "projects".`
  );
  process.exit(1);
}
const missingLiveUrl = projects.filter((p) => typeof p.liveUrl === "undefined");
if (missingLiveUrl.length > 0) {
  console.error(
    `✗ ${missingLiveUrl.length} project(s) resolved with liveUrl === undefined: ` +
      `${missingLiveUrl.map((p) => p.slug).join(", ")}\n` +
      `  Resolved lib/data.ts from: ${dataModulePath}\n` +
      `  If lib/data.ts clearly sets liveUrl for these projects, this script is\n` +
      `  importing a stale or duplicate copy of the file — check for another\n` +
      `  data.ts elsewhere in the repo, or a build cache (.next, dist) shadowing it.`
  );
  process.exit(1);
}

// --- Settings ----------------------------------------------------------
const OUTPUT_DIR = path.join(__dirname, "..", "..", "public", "projects");
const VIEWPORT = { width: 1440, height: 900 }; // hero crop size (16:10-ish)
const WAIT_AFTER_LOAD_MS = 2500; // let GSAP/entrance animations settle
const DEVICE_SCALE_FACTOR = 2; // retina-quality output
const IMAGE_TYPE = "webp" as const; // ~25-35% smaller than JPEG at equal visual quality; universal browser support
const IMAGE_QUALITY = 82; // 0-100, webp compression quality

/** Derive the output filename from each project's `image` path in lib/data.ts,
 *  so the script writes exactly where Work.tsx expects to find it. Also
 *  guards against a mismatched extension in lib/data.ts (e.g. if a project
 *  entry still says .jpg) by forcing the actual written file to match
 *  IMAGE_TYPE, since that's what Puppeteer will actually produce. */
function outputFilenameFor(project: Project): string {
  const base = path.basename(project.image, path.extname(project.image));
  return `${base}.${IMAGE_TYPE}`;
}

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const targets = projects.filter((p) => p.liveUrl && p.liveUrl !== "#");
  const skipped = projects.filter((p) => !p.liveUrl || p.liveUrl === "#");

  if (skipped.length) {
    console.log(
      `Skipping ${skipped.length} project(s) with no live URL yet: ${skipped
        .map((p) => p.slug)
        .join(", ")}`
    );
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const project of targets) {
    const page = await browser.newPage();
    await page.setViewport({
      ...VIEWPORT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
    });

    try {
      if (!project.liveUrl) {
        throw new Error("liveUrl is falsy at capture time — see the import sanity check above.");
      }
      console.log(`Capturing ${project.slug} → ${project.liveUrl}`);
      await page.goto(project.liveUrl, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      // Give hero animations (GSAP loaders, fade-ins) time to finish
      await new Promise((r) => setTimeout(r, WAIT_AFTER_LOAD_MS));

      const outputPath = path.join(OUTPUT_DIR, outputFilenameFor(project));
      await page.screenshot({
        path: outputPath as `${string}.webp`,
        type: IMAGE_TYPE,
        quality: IMAGE_QUALITY,
        fullPage: false, // hero/viewport only, not the whole scrolling page
      });

      console.log(`  ✓ saved ${outputPath}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`  ✗ failed for ${project.slug}: ${message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("\nDone. Restart `next dev` (or rebuild) to pick up the new images.");
}

run();
