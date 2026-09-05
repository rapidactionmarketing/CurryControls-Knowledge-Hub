import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { initAnalytics, trackPageview } from '@/lib/analytics';

/**
 * Starts analytics collection and records a pageview on every route change.
 *
 * Renders nothing. Its effects do not run during prerendering, so the static
 * HTML is unaffected.
 */
export function AnalyticsTracker() {
  const [location] = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    if (lastPath.current === path) return;
    lastPath.current = path;

    // The Seo component sets document.title in its own effect. Child effects
    // run first, but a frame of slack keeps this correct if that ever changes.
    const frame = requestAnimationFrame(() => {
      trackPageview(path, document.title);
    });
    return () => cancelAnimationFrame(frame);
  }, [location]);

  return null;
}
