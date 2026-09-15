'use client';

import { CONSENT_STORAGE_KEY, type ConsentChoice } from './config';
import { pushToDataLayer } from './events';

/** Returns the visitor's stored choice, or null when they have not decided yet. */
export function readConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch (error) {
    // Storage blocked (private mode, hardened browser).
    return null;
  }
}

/**
 * Records a consent choice and tells Google about it.
 *
 * Consent can be withdrawn as easily as it is given, which is both the legal
 * requirement and the reason the preference lives on the privacy page too.
 */
export function setConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch (error) {
    // Ignore storage failures - the choice still applies to this session.
  }

  pushToDataLayer({ event: 'consent_update', consent_choice: choice });

  // Consent Mode reads positional gtag arguments, not a named event object.
  window.dataLayer = window.dataLayer ?? [];
  (window.dataLayer as unknown as unknown[]).push([
    'consent',
    'update',
    {
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
      analytics_storage: choice,
    },
  ]);
}
