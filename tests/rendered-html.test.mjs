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
  assert.match(html, /gathered with the competition crowd/);
  assert.match(html, /href="\/leadership"[^>]*>[^<]*Meet the leads/);
  assert.match(html, /data-analytics-section="home_hero"/);
  assert.match(html, /data-analytics-action="sponsor_interest"/);
  assert.match(html, /data-analytics-video="2026_finals_recap"/);
  assert.match(html, /1515mortorq@gmail\.com/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("exports the leadership directory", async () => {
  const html = await readFile(
    new URL("../out/leadership.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<title>Leadership \| MorTorq<\/title>/);
  assert.match(html, /The people/);
  assert.match(html, /Wolf Nazari/);
  assert.match(html, /Peter Shabani/);
  assert.match(html, /Sophie Hong/);
  assert.match(html, /Isabel Lo/);
  assert.match(html, /Arianna/);
  assert.match(html, /Henry Goldman/);
  assert.match(html, /Edward Titov/);
  assert.match(html, /To be announced/);
  assert.match(html, /Assistant Electrical Lead/);
  assert.match(html, /Portrait coming soon/);
  assert.match(html, /data-analytics-section="leadership_hero"/);
  assert.match(html, /data-analytics-section="leadership_profile_wolf_nazari"/);
  assert.doesNotMatch(html, /The directory is growing|Real portraits\. Real stories/);

  const desktopOrder = [
    "Wolf Nazari",
    "Sophie Hong",
    "Henry Goldman",
    "Arianna",
    "Peter Shabani",
    "Isabel Lo",
    "Edward Titov",
    "To be announced",
  ];
  let previousIndex = -1;

  for (const name of desktopOrder) {
    const nameIndex = html.indexOf(name);
    assert.ok(nameIndex > previousIndex, `${name} is out of grid order`);
    previousIndex = nameIndex;
  }
});

test("ships core icons, manifest, media, and Netlify config", async () => {
  await Promise.all([
    access(new URL("public/favicon.ico", projectRoot)),
    access(new URL("public/icon.png", projectRoot)),
    access(new URL("public/apple-touch-icon.png", projectRoot)),
    access(new URL("public/site.webmanifest", projectRoot)),
    access(new URL("public/images/team-2026.webp", projectRoot)),
    access(new URL("public/images/hero-2026.webp", projectRoot)),
    access(new URL("public/images/celebration-2026.webp", projectRoot)),
    access(new URL("public/images/team-2023.webp", projectRoot)),
    access(new URL("public/images/field-action-2026.webp", projectRoot)),
    access(new URL("public/images/biocore-2027.webp", projectRoot)),
    access(new URL("public/media/mortorq-2026-recap.mp4", projectRoot)),
    access(new URL("netlify.toml", projectRoot)),
  ]);
});

test("configures anonymous PostHog analytics with maximum replay masking", async () => {
  const analytics = await readFile(
    new URL("../instrumentation-client.ts", import.meta.url),
    "utf8",
  );

  assert.match(analytics, /cookieless_mode:\s*"always"/);
  assert.match(analytics, /person_profiles:\s*"never"/);
  assert.match(analytics, /respect_dnt:\s*true/);
  assert.match(analytics, /disable_capture_url_hashes:\s*true/);
  assert.match(analytics, /mask_all_text:\s*true/);
  assert.match(analytics, /mask_personal_data_properties:\s*true/);
  assert.match(analytics, /maskAllInputs:\s*true/);
  assert.match(analytics, /maskTextSelector:\s*"\*"/);
  assert.match(analytics, /blockSelector:\s*"img, video, iframe"/);
  assert.match(analytics, /capture_pageleave:\s*true/);
  assert.match(analytics, /capture_heatmaps:\s*true/);
});
