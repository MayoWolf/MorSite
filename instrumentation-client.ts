import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const apiHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
const productionHosts = new Set(["team1515.com", "www.team1515.com"]);
const debugEnabled = process.env.NEXT_PUBLIC_POSTHOG_DEBUG === "true";
const shouldInitialize =
  Boolean(projectToken) &&
  (productionHosts.has(window.location.hostname) || debugEnabled);

if (shouldInitialize && projectToken) {
  posthog.init(projectToken, {
    api_host: apiHost,
    ui_host: apiHost.includes("eu.i.posthog.com")
      ? "https://eu.posthog.com"
      : "https://us.posthog.com",
    defaults: "2026-05-30",
    capture_pageview: "history_change",
    capture_pageleave: true,
    disable_capture_url_hashes: true,
    capture_dead_clicks: true,
    capture_exceptions: true,
    capture_heatmaps: true,
    capture_performance: {
      network_timing: true,
      web_vitals: true,
    },
    autocapture: {
      dom_event_allowlist: ["click"],
      element_allowlist: ["a", "button"],
    },
    person_profiles: "never",
    respect_dnt: true,
    mask_all_text: true,
    mask_personal_data_properties: true,
    custom_personal_data_properties: [
      "auth",
      "code",
      "email",
      "name",
      "phone",
      "token",
    ],
    disable_surveys: true,
    session_recording: {
      blockSelector: "img, video, iframe",
      maskAllInputs: true,
      maskTextSelector: "*",
      recordBody: false,
      recordHeaders: false,
      recordCrossOriginIframes: false,
      maskCapturedNetworkRequestFn(request) {
        if (request.name) {
          request.name = request.name.split("?")[0];
        }
        return request;
      },
    },
    loaded(client) {
      client.register({
        analytics_schema: "mortorq-2026-08",
        site: "team1515.com",
      });
    },
  });
}
