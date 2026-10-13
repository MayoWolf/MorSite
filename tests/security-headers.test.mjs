import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const exportDirectory = fileURLToPath(new URL("../out/", import.meta.url));

test("published CSP authorizes hydration and denies unrecognized inline scripts", async () => {
  const headers = await readFile(join(exportDirectory, "_headers"), "utf8");
  const policy = headers.match(/^\s+Content-Security-Policy: (.+)$/m)?.[1];
  assert.ok(policy, "The deployment must ship its generated CSP");
  const directives = new Map(policy.split(";").map((part) => {
    const [name, ...values] = part.trim().split(/\s+/);
    return [name, values];
  }));
  const scriptSources = directives.get("script-src");
  assert.ok(scriptSources.includes("'self'"));
  assert.ok(!scriptSources.includes("'unsafe-inline'"));
  assert.ok(!scriptSources.includes("'unsafe-eval'"));
  assert.deepEqual(directives.get("script-src-attr"), ["'none'"]);
  assert.deepEqual(directives.get("frame-ancestors"), ["'none'"]);
  assert.deepEqual(directives.get("object-src"), ["'none'"]);
  assert.deepEqual(directives.get("base-uri"), ["'none'"]);
  assert.deepEqual(directives.get("form-action"), ["'none'"]);
  assert.deepEqual(directives.get("frame-src"), ["https://www.youtube-nocookie.com"]);
  const hash = (code) => `'sha256-${createHash("sha256").update(code).digest("base64")}'`;
  assert.ok(!scriptSources.includes(hash("window.injected = true;")));

  let checkedScripts = 0;
  async function inspect(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        await inspect(path);
      } else if (entry.name.endsWith(".html")) {
        const html = await readFile(path, "utf8");
        // Split independently of the build's extraction pattern.
        for (const part of html.split("<script").slice(1)) {
          const endOfTag = part.indexOf(">");
          const attrs = part.slice(0, endOfTag);
          if (/\bsrc=/.test(attrs)) continue;
          const code = part.slice(endOfTag + 1, part.indexOf("</script>"));
          if (!code) continue;
          assert.ok(scriptSources.includes(hash(code)), `${entry.name} has an unauthorized inline script`);
          checkedScripts++;
        }
      }
    }
  }
  await inspect(exportDirectory);
  assert.ok(checkedScripts > 0, "Hydration script authorization was checked");
});
