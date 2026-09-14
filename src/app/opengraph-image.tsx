import { ImageResponse } from 'next/og';

import { siteConfig } from '@/libs/seo/metadata';

export const alt = `${siteConfig.name} - ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Social preview card, generated at the edge so it never drifts from the brand
 * copy. Next picks this up for every route that does not define its own image.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0b0b0d 0%, #18181b 55%, #26212a 100%)',
          padding: '80px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 12, textTransform: 'uppercase', opacity: 0.6 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: 'flex', fontSize: 92, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
          {siteConfig.tagline}
        </div>
        <div style={{ display: 'flex', fontSize: 30, opacity: 0.7, maxWidth: 900 }}>
          A time optimization and extraordinary access ecosystem.
        </div>
      </div>
    ),
    size
  );
}
