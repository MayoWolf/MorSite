import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

test("exports a complete Netlify-ready site", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

  assert.match(html, /<title>MorTorq — FRC Team 1515<\/title>/);
  assert.match(html, /We build/);
  assert.match(html, /BIOCORE/);
  assert.match(html, /Back in the finals/);
  assert.match(html, /mortorq-2026-recap\.mp4/);
  assert.match(html, /1515mortorq@gmail\.com/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("ships core icons, manifest, media, and Netlify config", async () => {
  await Promise.all([
    access(new URL("public/favicon.ico", projectRoot)),
    access(new URL("public/icon.png", projectRoot)),
    access(new URL("public/apple-touch-icon.png", projectRoot)),
    access(new URL("public/site.webmanifest", projectRoot)),
    access(new URL("public/images/team-2026.webp", projectRoot)),
    access(new URL("public/images/hero-2026.webp", projectRoot)),
    access(new URL("public/images/workshop-2026.webp", projectRoot)),
    access(new URL("public/images/field-action-2026.webp", projectRoot)),
    access(new URL("public/images/biocore-2027.webp", projectRoot)),
    access(new URL("public/media/mortorq-2026-recap.mp4", projectRoot)),
    access(new URL("netlify.toml", projectRoot)),
  ]);
});
