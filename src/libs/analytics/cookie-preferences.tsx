'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import type { ConsentChoice } from './config';
import { readConsent, setConsent } from './consent';

const LABELS: Record<ConsentChoice, string> = {
  granted: 'Las cookies de analítica y marketing están activas.',
  denied: 'Están activas solo las cookies necesarias para que el sitio funcione.',
};

/** Permite ver y cambiar la elección de consentimiento hecha en el banner. */
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
        <h3 className='font-alt text-base font-semibold text-white'>Tu elección sobre las cookies</h3>
        <p className='text-sm text-neutral-400'>
          {!isMounted
            ? 'Comprobando tu preferencia…'
            : choice
            ? LABELS[choice]
            : 'Tu elección queda registrada en cuanto pulses una de las dos opciones.'}
        </p>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Button variant='orange' size='sm' onClick={() => handleChoice('granted')}>
          Aceptar las cookies de analítica
        </Button>
        <Button variant='outline' size='sm' onClick={() => handleChoice('denied')}>
          Mantener solo las necesarias
        </Button>
      </div>
    </div>
  );
}
