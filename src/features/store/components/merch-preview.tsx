import { cn } from '@/utils/cn';

import type { MerchShape, StoreProduct } from '../types';

/**
 * Print-mockup preview. There is no photography yet, so each product is drawn:
 * the silhouette sits behind the print as a watermark and the phrase is typeset
 * the way it is printed - discreet on the front, unmissable on the back.
 */
const SHAPE_PATHS: Record<MerchShape, string> = {
  cap: 'M45 118c0-42 22-68 52-68s52 26 52 68H45zm-2 0h112c20 0 34 7 34 15s-14 15-34 15H43a15 15 0 010-30z',
  beanie:
    'M34 118c0-41 20-66 46-66s46 25 46 66H34zm-8 0h124a8 8 0 018 8v26a8 8 0 01-8 8H26a8 8 0 01-8-8v-26a8 8 0 018-8z',
  tee: 'M66 22h68l38 24-16 34-18-10v92a8 8 0 01-8 8H70a8 8 0 01-8-8V70l-18 10-16-34 38-24z',
  hoodie:
    'M64 26h72l38 26-16 36-16-9v95a8 8 0 01-8 8H66a8 8 0 01-8-8V79l-16 9-16-36 38-26zm22-4c0 12 6 20 14 20s14-8 14-20',
  tote: 'M44 66h112v100a8 8 0 01-8 8H52a8 8 0 01-8-8V66zm28 0V48a28 28 0 0156 0v18',
  bottle: 'M84 20h32v22l10 16v130a10 10 0 01-10 10H84a10 10 0 01-10-10V58l10-16V20z',
  journal: 'M46 28h96a10 10 0 0110 10v124a10 10 0 01-10 10H46V28zm0 0a10 10 0 00-10 10v124a10 10 0 0010 10',
  socks: 'M62 24h34v76l34 30a30 30 0 01-42 42L58 140a24 24 0 01-8-18V24z',
};

export function MerchPreview({
  product,
  view = 'back',
  colorHex,
  className,
}: {
  product: StoreProduct;
  view?: 'front' | 'back';
  colorHex?: string;
  className?: string;
}) {
  const fill = colorHex ?? product.colors[0].hex;
  const isLightGarment = isLight(fill);
  const inkClass = isLightGarment ? 'text-black/80' : 'text-white/90';

  return (
    <div
      className={cn(
        'relative isolate flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950',
        className
      )}
    >
      <div className={cn('absolute inset-0 bg-gradient-to-br', product.accent)} aria-hidden />

      <svg viewBox='0 0 200 200' className='absolute inset-0 h-full w-full p-6' aria-hidden focusable='false'>
        <path
          d={SHAPE_PATHS[product.shape]}
          fill={fill}
          fillOpacity={0.9}
          stroke='currentColor'
          strokeOpacity={0.25}
          strokeWidth={2}
          className='text-white'
        />
      </svg>

      <div className='relative z-10 flex h-full w-full items-center justify-center px-6 py-10 text-center'>
        {view === 'back' ? (
          <p
            className={cn(
              'max-w-[85%] font-alt font-semibold uppercase leading-tight tracking-tight',
              inkClass,
              product.backPhrase.length > 40 ? 'text-[11px] sm:text-xs lg:text-sm' : 'text-sm sm:text-base lg:text-lg'
            )}
          >
            {product.backPhrase}
          </p>
        ) : (
          <span className={cn('font-alt text-xs lowercase tracking-[0.5em] opacity-70', inkClass)}>
            {product.frontMark}
          </span>
        )}
      </div>

      <span className='absolute bottom-3 right-3 z-10 rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[10px] uppercase tracking-widest text-neutral-300 backdrop-blur'>
        {view}
      </span>
    </div>
  );
}

/** Rough perceived-luminance check so the print stays readable on pale garments. */
function isLight(hex: string) {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) return false;

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}
