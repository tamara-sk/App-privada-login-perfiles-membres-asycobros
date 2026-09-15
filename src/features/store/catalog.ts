import type { ShippingOption, StoreProduct } from './types';

export const STORE_CURRENCY = 'eur';

/** Free shipping threshold, in cents. Keeps average order value above one-item carts. */
export const FREE_SHIPPING_THRESHOLD_CENTS = 9000;

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'standard',
    label: 'Standard',
    description: 'Tracked delivery',
    amountCents: 590,
    minBusinessDays: 3,
    maxBusinessDays: 6,
  },
  {
    id: 'express',
    label: 'Express',
    description: 'Because some gifts have a deadline',
    amountCents: 1290,
    minBusinessDays: 1,
    maxBusinessDays: 2,
  },
];

/**
 * The Secret Key shop is deliberately small: a handful of objects that carry a
 * phrase worth reading. Front is discreet, back does the talking.
 *
 * Prices live here (in cents) and are re-read on the server at checkout time,
 * so the browser can never dictate what a customer is charged.
 */
export const STORE_PRODUCTS: StoreProduct[] = [
  {
    slug: 'the-person-behind-me-cap',
    name: 'The Person Behind Me Cap',
    category: 'headwear',
    shape: 'cap',
    tagline: 'The one everybody stops to read.',
    description:
      'Six-panel unstructured cap in heavy brushed cotton with a curved brim and a brass slider. The front carries nothing but a small tone-on-tone key. The back does the talking - for whoever is standing behind you in the queue, on the tube, at the airport.',
    backPhrase: 'To the person behind me: you are amazing, and I wish great things happen to you.',
    frontMark: 'sk',
    priceCents: 3900,
    sizes: ['One size'],
    colors: [
      { name: 'Black', hex: '#0d0d0f' },
      { name: 'Bone', hex: '#e8e2d6' },
      { name: 'Olive', hex: '#3f4434' },
    ],
    material: '100% brushed cotton twill, 280gsm',
    badge: 'Signature',
    featured: true,
    accent: 'from-[#5ED4FF]/20 via-transparent to-[#D13C5F]/20',
  },
  {
    slug: 'time-is-the-only-luxury-tee',
    name: 'Time Is The Only Luxury Tee',
    category: 'apparel',
    shape: 'tee',
    tagline: 'The house belief, worn quietly.',
    description:
      'Boxy heavyweight tee, garment dyed and pre-shrunk, with a ribbed neck that holds its shape. Discreet key at the heart, the belief printed across the shoulders.',
    backPhrase: 'Time is the only luxury.',
    frontMark: 'sk',
    priceCents: 4500,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#0d0d0f' },
      { name: 'Bone', hex: '#e8e2d6' },
      { name: 'Slate', hex: '#4a4f58' },
    ],
    material: '100% organic cotton, 240gsm',
    featured: true,
    accent: 'from-[#F98324]/20 via-transparent to-[#5ED4FF]/20',
  },
  {
    slug: 'buy-back-your-time-hoodie',
    name: 'Buy Back Your Time Hoodie',
    category: 'apparel',
    shape: 'hoodie',
    tagline: 'For the hours you decided to keep.',
    description:
      'Heavyweight brushed-back fleece with a double-layer hood, kangaroo pocket and tonal drawcords. Sized to sit generously - the kind of thing that outlives three phone upgrades.',
    backPhrase: 'Buy back your time. Spend it well.',
    frontMark: 'sk',
    priceCents: 9500,
    compareAtCents: 11000,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#0d0d0f' },
      { name: 'Ash', hex: '#8d8f94' },
      { name: 'Deep Navy', hex: '#161c2b' },
    ],
    material: 'Organic cotton / recycled poly fleece, 420gsm',
    featured: true,
    accent: 'from-[#D13C5F]/20 via-transparent to-[#7782A9]/25',
  },
  {
    slug: 'access-over-ownership-beanie',
    name: 'Access Over Ownership Beanie',
    category: 'headwear',
    shape: 'beanie',
    tagline: 'A principle you can pull down over your ears.',
    description:
      'Fine-gauge ribbed beanie with a folded cuff and a woven label. Warm, unfussy, and quietly opinionated about how to live.',
    backPhrase: 'Access over ownership.',
    frontMark: 'sk',
    priceCents: 3500,
    sizes: ['One size'],
    colors: [
      { name: 'Black', hex: '#0d0d0f' },
      { name: 'Bone', hex: '#e8e2d6' },
      { name: 'Rust', hex: '#8c4a2f' },
    ],
    material: 'Merino wool blend',
    accent: 'from-[#7782A9]/25 via-transparent to-[#5ED4FF]/20',
  },
  {
    slug: 'presence-is-the-flex-tote',
    name: 'Presence Is The Flex Tote',
    category: 'everyday',
    shape: 'tote',
    tagline: 'Carries a laptop, a swimsuit, and an argument.',
    description:
      'Structured 16oz canvas tote with reinforced handles, an inside pocket and a flat base that stands up on its own. The phrase sits on the side people see while you are busy being somewhere.',
    backPhrase: 'Presence is the flex.',
    frontMark: 'sk',
    priceCents: 2900,
    sizes: ['One size'],
    colors: [
      { name: 'Natural', hex: '#ded3bd' },
      { name: 'Black', hex: '#0d0d0f' },
    ],
    material: '16oz heavy canvas',
    accent: 'from-[#F98324]/20 via-transparent to-[#7782A9]/20',
  },
  {
    slug: 'rich-in-minutes-bottle',
    name: 'Rich In Minutes Bottle',
    category: 'everyday',
    shape: 'bottle',
    tagline: 'A different way to count wealth.',
    description:
      'Insulated stainless bottle, 600ml, double walled, matte soft-touch finish with a laser-etched phrase that will not wear off in the dishwasher. Twelve hours hot, twenty-four cold.',
    backPhrase: 'Rich in minutes.',
    frontMark: 'sk',
    priceCents: 3900,
    sizes: ['600ml'],
    colors: [
      { name: 'Matte Black', hex: '#101013' },
      { name: 'Sand', hex: '#cfc0a8' },
    ],
    material: '18/8 stainless steel, BPA free',
    accent: 'from-[#5ED4FF]/25 via-transparent to-[#F98324]/15',
  },
  {
    slug: 'where-did-your-minutes-go-journal',
    name: 'Where Did Your Minutes Go Journal',
    category: 'everyday',
    shape: 'journal',
    tagline: 'One page. One week. One honest answer.',
    description:
      'A5 hardcover journal, lay-flat binding, 160 pages of 100gsm dotted paper, with a weekly spread designed around a single question: what did this week give back to you?',
    backPhrase: 'Where did your minutes go?',
    frontMark: 'sk',
    priceCents: 2500,
    sizes: ['A5'],
    colors: [
      { name: 'Ink', hex: '#14161c' },
      { name: 'Bone', hex: '#e8e2d6' },
    ],
    material: 'Recycled board, cloth spine',
    accent: 'from-[#7782A9]/25 via-transparent to-[#D13C5F]/15',
  },
  {
    slug: 'unhurried-crew-socks',
    name: 'Unhurried Crew Socks',
    category: 'apparel',
    shape: 'socks',
    tagline: 'The smallest possible reminder.',
    description:
      'Combed cotton crew socks with a cushioned footbed and a single word knitted where only you will see it. Sold as a pair, best gifted in threes.',
    backPhrase: 'Unhurried.',
    frontMark: 'sk',
    priceCents: 1900,
    sizes: ['36-40', '41-45'],
    colors: [
      { name: 'Black', hex: '#0d0d0f' },
      { name: 'Bone', hex: '#e8e2d6' },
    ],
    material: 'Combed cotton blend',
    accent: 'from-[#D13C5F]/15 via-transparent to-[#5ED4FF]/20',
  },
];

export function getAllProducts(): StoreProduct[] {
  return STORE_PRODUCTS;
}

export function getFeaturedProducts(): StoreProduct[] {
  return STORE_PRODUCTS.filter((product) => product.featured);
}

export function getProductBySlug(slug: string): StoreProduct | undefined {
  return STORE_PRODUCTS.find((product) => product.slug === slug);
}

export const CATEGORY_LABELS: Record<StoreProduct['category'], string> = {
  headwear: 'Headwear',
  apparel: 'Apparel',
  everyday: 'Everyday',
};
