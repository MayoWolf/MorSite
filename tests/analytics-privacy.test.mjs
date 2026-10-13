import assert from "node:assert/strict";
import test from "node:test";
import {
  sanitizeAnalyticsProperties,
  stripUrlDetails,
} from "../lib/analytics-privacy.ts";

test("fragment-link actions do not inherit private page query parameters", () => {
  const destination = new URL("#season", "https://www.team1515.com/?private_note=secret").href;
  assert.equal(stripUrlDetails(destination), "https://www.team1515.com/");
  assert.equal(stripUrlDetails("mailto:1515mortorq@gmail.com?body=private#draft"),
    "mailto:1515mortorq@gmail.com");
  assert.equal(stripUrlDetails("/leadership"), "/leadership");
});

test("SDK and custom URL properties are sanitized before capture", () => {
  const original = {
    $current_url: "https://www.team1515.com/?anything=private#secret",
    $referrer: "https://example.org/invite?invite_code=private",
    destination: "/leadership?custom_secret=private#profile",
    $set_once: { $initial_referrer: "https://example.org/?private=secret" },
    $elements: [{ tag_name: "a", attr__href: "/?private=secret#season" }],
    depth_percent: 25,
    label: "Public label #1",
  };
  const sanitized = sanitizeAnalyticsProperties(original);
  assert.equal(sanitized.$current_url, "https://www.team1515.com/");
  assert.equal(sanitized.$referrer, "https://example.org/invite");
  assert.equal(sanitized.destination, "/leadership");
  assert.equal(sanitized.$set_once.$initial_referrer, "https://example.org/");
  assert.equal(sanitized.$elements[0].attr__href, "/");
  assert.equal(sanitized.depth_percent, 25);
  assert.equal(sanitized.label, "Public label #1");
  assert.match(original.$current_url, /anything=private/);
  assert.match(original.$elements[0].attr__href, /private=secret/);
});
