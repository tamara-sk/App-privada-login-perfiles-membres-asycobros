'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { CONSENT_STORAGE_KEY, type ConsentChoice, isAnalyticsEnabled } from './config';
import { pushToDataLayer } from './events';

function updateGoogleConsent(choice: ConsentChoice) {
  pushToDataLayer({
    event: 'consent_update',
    consent_choice: choice,
  });

  // Consent Mode reads positional gtag arguments, not a named event object.
  if (typeof window !== 'undefined') {
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
}

/**
 * Minimal, on-brand consent banner wired to Google Consent Mode v2.
 * Required for EU traffic and, just as importantly, it is what makes the
 * analytics numbers defensible instead of merely present.
 */
export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isAnalyticsEnabled) return;

    try {
      const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored !== 'granted' && stored !== 'denied') setIsVisible(true);
    } catch (error) {
      // Storage blocked (private mode, hardened browser): stay silent rather than nagging.
    }
  }, []);

  function handleChoice(choice: ConsentChoice) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch (error) {
      // Ignore storage failures - the choice still applies to this session.
    }

    updateGoogleConsent(choice);
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <div
      role='dialog'
      aria-live='polite'
      aria-label='Cookie preferences'
      className='fixed inset-x-0 bottom-0 z-50 m-auto w-full max-w-3xl p-4'
    >
      <div className='flex flex-col gap-4 rounded-lg border border-zinc-800 bg-black/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-sm text-neutral-300'>
          We use cookies to understand what saves members the most time.{' '}
          <Link href='/privacy' className='underline underline-offset-4 hover:text-white'>
            Privacy policy
          </Link>
          .
        </p>
        <div className='flex flex-shrink-0 gap-2'>
          <Button variant='outline' size='sm' onClick={() => handleChoice('denied')}>
            Decline
          </Button>
          <Button variant='orange' size='sm' onClick={() => handleChoice('granted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
