'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { trackScrollDepth } from './events';

const MILESTONES = [25, 50, 75, 100] as const;

/**
 * Reports how far down each page people actually read, as GA4 `scroll_depth`
 * events. Clarity draws the picture; these numbers make it filterable and
 * comparable per page, per campaign, per device.
 */
export function ScrollDepthTracker() {
  const pathname = usePathname();
  const reached = useRef<Set<number>>(new Set());

  useEffect(() => {
    reached.current = new Set();

    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent =
        scrollable > 0 ? ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100 : 100;

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !reached.current.has(milestone)) {
          reached.current.add(milestone);
          trackScrollDepth({ percent: milestone, path: pathname });
        }
      }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname]);

  return null;
}
