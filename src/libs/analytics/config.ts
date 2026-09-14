/**
 * Central tracking configuration.
 *
 * Every id is optional: when an id is missing the matching script is simply not
 * injected, so the site keeps working in local development and in previews
 * without polluting production analytics.
 */
export const analyticsConfig = {
  /** Google Tag Manager container id, e.g. `GTM-XXXXXXX`. */
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  /** GA4 measurement id, e.g. `G-XXXXXXXXXX`. Only injected directly when GTM is absent. */
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  /** Meta (Facebook/Instagram) pixel id. */
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  /** Google Ads conversion id, e.g. `AW-XXXXXXXXX`. */
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
} as const;

/** Name of the cookie/localStorage key holding the visitor's consent choice. */
export const CONSENT_STORAGE_KEY = 'sk-consent-v1';

export type ConsentChoice = 'granted' | 'denied';

export const isAnalyticsEnabled =
  Boolean(analyticsConfig.gtmId) || Boolean(analyticsConfig.gaMeasurementId) || Boolean(analyticsConfig.metaPixelId);
