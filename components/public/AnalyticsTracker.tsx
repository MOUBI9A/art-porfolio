'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface AnalyticsTrackerProps {
  profileId: string;
  projectId?: string;
}

export default function AnalyticsTracker({ profileId, projectId }: AnalyticsTrackerProps) {
  const pathname = usePathname();
  const trackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Prevent double tracking in dev/strict mode or when path hasn't changed
    if (trackedPath.current === pathname) return;

    const trackView = async () => {
      try {
        await fetch('/api/v1/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profile_id: profileId,
            project_id: projectId,
            page_path: pathname,
            referrer: document.referrer,
          }),
        });
        trackedPath.current = pathname;
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    // Delay slightly to ensure page is loaded and not a bounce immediately? 
    // Or just track immediately.
    const timer = setTimeout(trackView, 1000);

    return () => clearTimeout(timer);
  }, [pathname, profileId, projectId]);

  return null; // This is a headless component
}
