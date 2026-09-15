'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { type ConsentChoice, isAnalyticsEnabled } from './config';
import { readConsent, setConsent } from './consent';

/**
 * Minimal, on-brand consent banner wired to Google Consent Mode v2.
 * Required for EU traffic and, just as importantly, it is what makes the
 * analytics numbers defensible instead of merely present.
 */
export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isAnalyticsEnabled) return;
    if (readConsent() === null) setIsVisible(true);
  }, []);

  function handleChoice(choice: ConsentChoice) {
    setConsent(choice);
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
          We use cookies to understand what saves members the most time. You can change your mind at any time on our{' '}
          <Link href='/privacy' className='underline underline-offset-4 hover:text-white'>
            privacy page
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
