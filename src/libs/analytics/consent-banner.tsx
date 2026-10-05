'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { type ConsentChoice, isAnalyticsEnabled } from './config';
import { readConsent, setConsent } from './consent';

/**
 * Banner de consentimiento, sobrio y conectado a Google Consent Mode v2.
 *
 * El art. 22.2 de la Ley 34/2002 exige consentimiento previo para las cookies que
 * van más allá de las necesarias, y es además lo que hace que las cifras de
 * analítica se sostengan.
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
      aria-label='Preferencias de cookies'
      className='fixed inset-x-0 bottom-0 z-50 m-auto w-full max-w-3xl p-4'
    >
      <div className='flex flex-col gap-4 rounded-lg border border-zinc-800 bg-black/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-sm text-neutral-300'>
          Usamos cookies para entender qué le devuelve más tiempo al Círculo. Puedes cambiar tu elección cuando quieras
          en la{' '}
          <Link href='/cookies' className='underline underline-offset-4 hover:text-white'>
            política de cookies
          </Link>
          .
        </p>
        <div className='flex flex-shrink-0 gap-2'>
          <Button variant='outline' size='sm' onClick={() => handleChoice('denied')}>
            Solo las necesarias
          </Button>
          <Button variant='orange' size='sm' onClick={() => handleChoice('granted')}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
