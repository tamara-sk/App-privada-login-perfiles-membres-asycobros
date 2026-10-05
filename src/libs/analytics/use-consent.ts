'use client';

import { useEffect, useState } from 'react';

import type { ConsentChoice } from './config';
import { readConsent, subscribeToConsent } from './consent';

/**
 * Current consent choice, kept in sync with the banner and the control on the
 * privacy page. Starts as null on the server and on first paint, so tags that
 * wait for permission stay dormant until the visitor has actually granted it.
 */
export function useConsent(): ConsentChoice | null {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);

  useEffect(() => {
    setChoice(readConsent());
    return subscribeToConsent(setChoice);
  }, []);

  return choice;
}
