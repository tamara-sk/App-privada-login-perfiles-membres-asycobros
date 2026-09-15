'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import type { ConsentChoice } from './config';
import { readConsent, setConsent } from './consent';

const LABELS: Record<ConsentChoice, string> = {
  granted: 'Analytics and marketing cookies are on.',
  denied: 'Only the cookies the site needs to work are on.',
};

/** Lets a visitor see and change the consent choice they made in the banner. */
export function CookiePreferences() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setChoice(readConsent());
    setIsMounted(true);
  }, []);

  function handleChoice(next: ConsentChoice) {
    setConsent(next);
    setChoice(next);
    toast({ description: LABELS[next] });
  }

  return (
    <div className='flex flex-col gap-4 rounded-lg border border-zinc-800 bg-black p-6'>
      <div className='flex flex-col gap-1'>
        <h3 className='font-alt text-base font-semibold text-white'>Your cookie choice</h3>
        <p className='text-sm text-neutral-400'>
          {!isMounted ? 'Checking your preference...' : choice ? LABELS[choice] : 'You have not chosen yet.'}
        </p>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Button variant='orange' size='sm' onClick={() => handleChoice('granted')}>
          Accept analytics cookies
        </Button>
        <Button variant='outline' size='sm' onClick={() => handleChoice('denied')}>
          Decline analytics cookies
        </Button>
      </div>
    </div>
  );
}
