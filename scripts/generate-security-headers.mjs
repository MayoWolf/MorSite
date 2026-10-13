import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const exportDirectory = new URL("../out/", import.meta.url);
const hashes = new Set();
let htmlCount = 0;

async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await inspect(path);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlCount++;
      const html = await readFile(path, "utf8");
      for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
        if (/\bsrc\s*=/i.test(match[1]) || !match[2]) continue;
        const digest = createHash("sha256").update(match[2], "utf8").digest("base64");
        hashes.add(`'sha256-${digest}'`);
      }
    }
  }
}

await inspect(fileURLToPath(exportDirectory));
if (!htmlCount || !hashes.size) {
  throw new Error("Static HTML and inline script hashes are required before publishing.");
}

// A union covers clean URLs, .html aliases, and the custom 404 at arbitrary paths.
// Next.js hydration scripts are authorized by exact content, never unsafe-inline.
const assets = "https://us-assets.i.posthog.com https://eu-assets.i.posthog.com";
const policy = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].sort().join(" ")} ${assets}`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' https://us.i.posthog.com https://eu.i.posthog.com ${assets}`,
  "frame-src https://www.youtube-nocookie.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

await writeFile(
  new URL("_headers", exportDirectory),
  `# Generated from the static export; regenerate with npm run build.\n/*\n  Content-Security-Policy: ${policy}\n`,
);
console.log(`Generated CSP for ${htmlCount} HTML files with ${hashes.size} inline script hashes.`);
