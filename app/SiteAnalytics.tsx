"use client";

import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { useEffect } from "react";

const scrollThresholds = [25, 50, 75, 90, 100] as const;

function capture(
  eventName: string,
  properties: Record<string, boolean | number | string>,
) {
  if (!posthog.__loaded) return;
  posthog.capture(eventName, properties);
}

export function SiteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const reachedScrollDepths = new Set<number>();
    const viewedSections = new Set<string>();

    const captureScrollDepth = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const depth =
        scrollableHeight <= 0
          ? 100
          : Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100));

      for (const threshold of scrollThresholds) {
        if (depth < threshold || reachedScrollDepths.has(threshold)) continue;
        reachedScrollDepths.add(threshold);
        capture("scroll_depth_reached", {
          depth_percent: threshold,
          page_path: pathname,
        });
      }
    };

    const captureMarkedAction = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>(
        "[data-analytics-action]",
      );
      if (!element) return;

      const action = element.dataset.analyticsAction;
      if (!action) return;

      const destination =
        element.dataset.analyticsDestination ??
        (element instanceof HTMLAnchorElement ? element.href : "on_page");

      capture("site_action", {
        action,
        destination,
        label: element.dataset.analyticsLabel ?? action,
        location: element.dataset.analyticsLocation ?? "unknown",
        page_path: pathname,
      });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = (entry.target as HTMLElement).dataset.analyticsSection;
          if (!section || viewedSections.has(section)) continue;

          viewedSections.add(section);
          capture("section_viewed", {
            page_path: pathname,
            section,
          });
          sectionObserver.unobserve(entry.target);
        }
      },
      {
        rootMargin: "-20% 0px -20% 0px",
        threshold: 0.01,
      },
    );

    const videoCleanups = Array.from(
      document.querySelectorAll<HTMLVideoElement>("video[data-analytics-video]"),
    ).map((video) => {
      const videoName = video.dataset.analyticsVideo ?? "embedded_video";
      const reachedProgress = new Set<number>();
      let started = false;

      const onPlay = () => {
        if (started) return;
        started = true;
        capture("video_started", {
          page_path: pathname,
          video: videoName,
        });
      };

      const onTimeUpdate = () => {
        if (!Number.isFinite(video.duration) || video.duration <= 0) return;
        const progress = (video.currentTime / video.duration) * 100;

        for (const threshold of [25, 50, 75] as const) {
          if (progress < threshold || reachedProgress.has(threshold)) continue;
          reachedProgress.add(threshold);
          capture("video_progress_reached", {
            page_path: pathname,
            progress_percent: threshold,
            video: videoName,
          });
        }
      };

      const onEnded = () => {
        capture("video_completed", {
          page_path: pathname,
          video: videoName,
        });
      };

      video.addEventListener("play", onPlay);
      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("ended", onEnded);

      return () => {
        video.removeEventListener("play", onPlay);
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("ended", onEnded);
      };
    });

    document
      .querySelectorAll<HTMLElement>("[data-analytics-section]")
      .forEach((section) => sectionObserver.observe(section));
    document.addEventListener("click", captureMarkedAction);
    window.addEventListener("scroll", captureScrollDepth, { passive: true });
    window.addEventListener("resize", captureScrollDepth);
    const initialScrollCheck = window.requestAnimationFrame(captureScrollDepth);

    return () => {
      window.cancelAnimationFrame(initialScrollCheck);
      document.removeEventListener("click", captureMarkedAction);
      window.removeEventListener("scroll", captureScrollDepth);
      window.removeEventListener("resize", captureScrollDepth);
      sectionObserver.disconnect();
      videoCleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return null;
}
