# MorTorq — FRC Team 1515

The 2026 website for Beverly Hills High School's FIRST Robotics Competition
team. Built with React, TypeScript, and Next.js, then statically exported for
Netlify.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The development listener binds to `127.0.0.1`. `npm start` is a local development
alias; production hosting serves the static `out` directory.

## Validation

```bash
npm run lint
npm test
npm audit --omit=dev
```

## Netlify

Connect the repository to Netlify. The included `netlify.toml` runs the
production build and publishes the generated `out` directory automatically.

The build generates `out/_headers` with a Content Security Policy that hashes
the exported inline scripts. It allows the local application, PostHog assets
and ingest, and the existing YouTube embeds, blocks other script origins and
unrecognized inline scripts, and prevents framing, object embeds, base-tag
changes, and form submission. Inline styles remain allowed for React image
layout. `netlify.toml` also configures HSTS and a legacy frame-denial header.
Regenerate the headers with every build; adding a resource origin requires a
deliberate policy update in `scripts/generate-security-headers.mjs`. Serve the
generated `_headers` on other hosts as equivalent HTTP response headers.

## PostHog analytics

The site includes privacy-conscious PostHog product analytics, Web Analytics,
heatmaps, Web Vitals, and session replay. Tracking initializes only on
`team1515.com` and `www.team1515.com`; local and deploy-preview traffic is
ignored unless debug mode is explicitly enabled.

1. Create a PostHog Cloud project and copy its **project token**. Do not use a
   personal API key.
2. In Netlify, add these production environment variables and redeploy:

   ```text
   NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=phc_your_project_token
   NEXT_PUBLIC_POSTHOG_HOST=/tq
   ```

   The included Netlify rules proxy `/tq` to the US PostHog ingest and asset
   hosts. This keeps analytics traffic first-party and makes collection more
   reliable in browsers with tracking protection, without requiring DNS
   changes. Update all three proxy targets if the project moves to EU Cloud.

For an intentional local analytics test, place the project token in
`.env.local`, use `NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com`, and add
`NEXT_PUBLIC_POSTHOG_DEBUG=true`. Never set the debug variable in Netlify
production.

The integration records anonymous pageviews/page-leaves, section views, scroll
depth, key site actions, gallery interactions, local-video progress, dead
clicks, heatmaps, Web Vitals, browser errors, and replay. Replay masks every
text node and input, removes query strings, and blocks images, videos, and
iframes. Product analytics masks element text and common personal-data query
parameters and respects Do Not Track. Application filtering removes query strings
and fragments from standard page/referrer URL properties, nested anchor
attributes, custom action destinations, and replay request names before
transmission. The site never
calls `posthog.identify()` or creates person profiles. It uses PostHog's
standard browser storage to keep anonymous visitor and session activity
connected; IP retention and GeoIP enrichment follow the project's PostHog
settings.

Useful dashboard events include `site_action`, `section_viewed`,
`scroll_depth_reached`, `video_started`, `video_progress_reached`, and
`video_completed`. PostHog also supplies `$pageview`, `$pageleave`,
`$autocapture`, and Web Vitals events.

## Dependency maintenance

Use `npm ci` for reproducible installs. Dependabot checks npm dependencies weekly.
The security update was checked on October 13, 2026: the production dependency
audit is clean. The full audit still reports the unpatched
[braces recursion advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)
through the development-only Next ESLint/fast-glob/micromatch chain. It processes
maintainer-controlled lint patterns, is absent from production dependencies, and
has no published upstream fix. Do not run `npm audit fix --force` to downgrade
the Next ESLint configuration across major versions. Recheck the full audit when
updating tooling and remove this note when a compatible upstream fix is available.

## Media sources

- 2026 team photo: Beverly Hills Unified School District
- 2026 competition, pit, workshop, and celebration photography: MorTorq's
  team-supplied media library
- 2026 33-second finals recap: MorTorq's team-supplied media library,
  optimized and self-hosted for the web
- Full-match footage: official FIRST event webcast on YouTube
- Team mark: existing MorTorq site and matching team-supplied logo
- BIOCORE artwork: official FIRST season brand resources

Credits and direct source links are included on the site.
# MorSite
