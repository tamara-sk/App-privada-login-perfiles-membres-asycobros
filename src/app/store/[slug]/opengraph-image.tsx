import { ImageResponse } from 'next/og';

import { getProductBySlug, STORE_CURRENCY } from '@/features/store/catalog';
import { formatPrice } from '@/features/store/utils/format-price';
import { siteConfig } from '@/libs/seo/metadata';

export const alt = 'Secret Key shop';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Per-product social card. A shared image makes every product link look the
 * same in a message or a feed; this one carries the phrase, which is the part
 * that makes somebody click.
 */
export default async function ProductOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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
          padding: '72px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 12, textTransform: 'uppercase', opacity: 0.55 }}>
          {siteConfig.name}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1000 }}>
          <div
            style={{
              display: 'flex',
              fontSize: product && product.backPhrase.length > 48 ? 54 : 72,
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {product ? product.backPhrase : 'Words worth wearing.'}
          </div>
          {product && (
            <div style={{ display: 'flex', fontSize: 30, opacity: 0.7 }}>
              {product.name} — {formatPrice(product.priceCents, STORE_CURRENCY.toUpperCase())}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', fontSize: 24, opacity: 0.5 }}>secretkey.vip</div>
      </div>
    ),
    size
  );
}
