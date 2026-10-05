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
    fulfilment: 'shipped',
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
    fulfilment: 'shipped',
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
    fulfilment: 'shipped',
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
    fulfilment: 'shipped',
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
    fulfilment: 'shipped',
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
    fulfilment: 'shipped',
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
    fulfilment: 'shipped',
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
    fulfilment: 'shipped',
    accent: 'from-[#D13C5F]/15 via-transparent to-[#5ED4FF]/20',
  },
  // --- Experience packs -------------------------------------------------
  // Draft content: the names, inclusions and prices below are a working
  // proposal written to match how the rest of the shop reads. Replace them
  // with the experiences Secret Key actually delivers before this goes live.
  {
    slug: 'the-gift-of-time',
    name: 'The Gift of Time',
    category: 'experience',
    shape: 'giftcard',
    tagline: 'Ten hours of their week, handed back.',
    description:
      'Someone you love is drowning in admin. This gives them ten hours of Secret Key handling it: the bookings, the chasing, the paperwork, the errands that keep sliding to next week. They send one message and it gets done.',
    backPhrase: 'Ten hours. Yours to spend on something better.',
    frontMark: 'sk',
    priceCents: 25000,
    sizes: ['10 hours'],
    colors: [{ name: 'Midnight', hex: '#101018' }],
    material: 'Digital gift, redeemable in one block or across the year',
    fulfilment: 'digital',
    experience: {
      includes: [
        'Ten hours of Secret Key time, used however they choose',
        'An onboarding call to learn how their week runs',
        'A direct line for requests, answered the same day',
        'A written handover of everything arranged',
      ],
      validityMonths: 12,
      forWhom: 'The friend who says they have no time, and means it.',
      deliveredAs: 'A card by email within minutes, ready to forward or print.',
    },
    badge: 'Most gifted',
    featured: true,
    accent: 'from-[#5ED4FF]/25 via-transparent to-[#7782A9]/25',
  },
  {
    slug: 'the-unplanned-weekend',
    name: 'The Unplanned Weekend',
    category: 'experience',
    shape: 'giftcard',
    tagline: 'They show up. We did the rest.',
    description:
      'A weekend arranged end to end around what they enjoy: where to stay, where to eat, what to see, how to get there. They answer three questions and receive an itinerary they had to do nothing to earn.',
    backPhrase: 'Show up. It is handled.',
    frontMark: 'sk',
    priceCents: 45000,
    sizes: ['One weekend'],
    colors: [{ name: 'Midnight', hex: '#101018' }],
    material: 'Digital gift. Planning included; stays and travel billed separately',
    fulfilment: 'digital',
    experience: {
      includes: [
        'A planning call to learn what they actually enjoy',
        'Stays, tables and transport researched and booked',
        'An itinerary with everything confirmed, hour by hour',
        'Someone reachable through the whole weekend',
      ],
      validityMonths: 12,
      forWhom: 'The couple who keep postponing the trip they talk about.',
      deliveredAs: 'A card by email within minutes, ready to forward or print.',
    },
    featured: true,
    accent: 'from-[#F98324]/20 via-transparent to-[#D13C5F]/20',
  },
  {
    slug: 'the-table',
    name: 'The Table',
    category: 'experience',
    shape: 'giftcard',
    tagline: 'An evening they could not have booked.',
    description:
      'Dinner somewhere worth crossing a city for, arranged for two. We take the date and the taste, find the table, handle the booking and the details around it, and tell them where to be.',
    backPhrase: 'A table, an evening, and nothing to arrange.',
    frontMark: 'sk',
    priceCents: 18000,
    sizes: ['Table for two'],
    colors: [{ name: 'Midnight', hex: '#101018' }],
    material: 'Digital gift. Booking included; the meal billed separately',
    fulfilment: 'digital',
    experience: {
      includes: [
        'A table for two, chosen around their taste and the date',
        'The booking made and confirmed on their behalf',
        'A note to the restaurant so the evening lands right',
        'Transport arranged if they want it',
      ],
      validityMonths: 9,
      forWhom: 'The person who has everything and enjoys a good evening.',
      deliveredAs: 'A card by email within minutes, ready to forward or print.',
    },
    accent: 'from-[#D13C5F]/20 via-transparent to-[#F98324]/15',
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
  experience: 'Experiences',
};

/** Experience packs arrive by email, so a basket of them skips shipping. */
export function getExperienceProducts(): StoreProduct[] {
  return STORE_PRODUCTS.filter((product) => product.category === 'experience');
}
