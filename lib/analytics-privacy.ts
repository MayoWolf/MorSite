const urlProperties = new Set([
  "$current_url",
  "$referrer",
  "$initial_current_url",
  "$initial_referrer",
  "destination",
  "href",
  "attr__href",
]);

export function stripUrlDetails(value: string): string {
  return value.split(/[?#]/, 1)[0];
}

// Cover SDK URL properties and nested autocapture attributes without changing
// unrelated values or mutating the SDK's original event.
export function sanitizeAnalyticsProperties(
  properties: Record<string, unknown>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(properties).map(([key, value]) => {
      if (typeof value === "string" && urlProperties.has(key)) {
        return [key, stripUrlDetails(value)];
      }
      if (Array.isArray(value)) {
        return [key, value.map((item) =>
          item !== null && typeof item === "object" && !Array.isArray(item)
            ? sanitizeAnalyticsProperties(item as Record<string, unknown>)
            : item,
        )];
      }
      if (value !== null && typeof value === "object") {
        return [key, sanitizeAnalyticsProperties(value as Record<string, unknown>)];
      }
      return [key, value];
    }),
  );
}
