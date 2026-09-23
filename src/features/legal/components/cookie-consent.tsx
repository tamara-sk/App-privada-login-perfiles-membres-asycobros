'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Analytics } from '@vercel/analytics/react';

const STORAGE_KEY = 'sk-cookie-consent';
/** Evento que permite reabrir el panel desde la política de cookies. */
export const OPEN_COOKIE_SETTINGS_EVENT = 'sk:open-cookie-settings';

type Consent = 'accepted' | 'rejected';

function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch {
    return null;
  }
}

/**
 * Banner de consentimiento (art. 22.2 LSSI-CE).
 *
 * Las cookies analíticas solo se cargan tras el consentimiento expreso: el
 * componente de analítica no se monta mientras no se haya aceptado. Rechazar es
 * tan sencillo como aceptar, y la decisión puede revocarse en cualquier momento
 * desde la política de cookies.
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setIsVisible(stored === null);

    const openSettings = () => setIsVisible(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const decide = useCallback((value: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Si el almacenamiento no está disponible, la decisión aplica solo a esta sesión.
    }
    setConsent(value);
    setIsVisible(false);
  }, []);

  return (
    <>
      {consent === 'accepted' && <Analytics />}
      {isVisible && (
        <div
          role='dialog'
          aria-live='polite'
          aria-label='Configuración de cookies'
          className='fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800 bg-black/95 p-4 backdrop-blur'
        >
          <div className='m-auto flex max-w-[1440px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <p className='text-sm leading-relaxed text-neutral-300'>
              Usamos cookies propias necesarias para que la plataforma funcione y para mantener tu sesión iniciada.
              Con tu permiso, usamos además cookies de analítica para entender cómo se usa el sitio y mejorarlo. Puedes
              aceptarlas, rechazarlas o cambiar de opinión cuando quieras en la{' '}
              <Link href='/cookies' className='text-cyan-400 underline underline-offset-4 hover:text-cyan-300'>
                política de cookies
              </Link>
              .
            </p>
            <div className='flex flex-shrink-0 gap-3'>
              <Button variant='secondary' onClick={() => decide('rejected')}>
                Rechazar
              </Button>
              <Button variant='sexy' onClick={() => decide('accepted')}>
                Aceptar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Botón para revocar o modificar el consentimiento desde la política de cookies. */
export function CookieSettingsButton() {
  return (
    <Button variant='secondary' onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}>
      Cambiar mis preferencias de cookies
    </Button>
  );
}
