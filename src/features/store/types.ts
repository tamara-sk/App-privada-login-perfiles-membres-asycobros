export type StoreCategory = 'headwear' | 'apparel' | 'everyday' | 'experience';

/** Silhouette used by the product preview canvas. */
export type MerchShape =
  | 'cap'
  | 'beanie'
  | 'tee'
  | 'hoodie'
  | 'tote'
  | 'bottle'
  | 'journal'
  | 'socks'
  | 'giftcard';

/** How an order line reaches the person who bought it. */
export type Fulfilment = 'shipped' | 'digital';

/** Extra detail carried by an experience pack. */
export type ExperienceDetails = {
  /** What the recipient actually gets, line by line. */
  includes: string[];
  /** How long the gift stays redeemable. */
  validityMonths: number;
  /** Who it suits, in one line. */
  forWhom: string;
  /** How it arrives: a card to forward, a call to book. */
  deliveredAs: string;
};

export type StoreColor = {
  name: string;
  /** Used by the product preview to tint the garment. */
  hex: string;
};

export type StoreProduct = {
  slug: string;
  name: string;
  category: StoreCategory;
  shape: MerchShape;
  tagline: string;
  description: string;
  /** The statement people actually read - printed large on the back. */
  backPhrase: string;
  /** Discreet front mark. Small, low contrast, tone-on-tone. */
  frontMark: string;
  priceCents: number;
  compareAtCents?: number;
  sizes: string[];
  colors: StoreColor[];
  material: string;
  /** Shipped goods collect an address at checkout; digital gifts skip it. */
  fulfilment: Fulfilment;
  /** Present on experience packs only. */
  experience?: ExperienceDetails;
  badge?: string;
  featured?: boolean;
  /** Tailwind gradient stops used by the preview canvas. */
  accent: string;
};

export type CartItem = {
  slug: string;
  size: string;
  color: string;
  quantity: number;
};

/** A cart line resolved against the server-side catalog - never trust client prices. */
export type ResolvedCartItem = CartItem & {
  product: StoreProduct;
  lineTotalCents: number;
};

export type ShippingOption = {
  id: string;
  label: string;
  description: string;
  amountCents: number;
  minBusinessDays: number;
  maxBusinessDays: number;
};
