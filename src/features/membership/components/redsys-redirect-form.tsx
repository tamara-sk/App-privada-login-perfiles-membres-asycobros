'use client';

import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import type { RedirectPaymentForm } from '@/libs/redsys/payment';

/** Envía el formulario firmado a Redsys en cuanto carga la página. */
export function RedsysRedirectForm({ form }: { form: RedirectPaymentForm }) {
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    ref.current?.submit();
  }, []);

  return (
    <form ref={ref} action={form.action} method='POST' className='flex flex-col items-center gap-6'>
      {Object.entries(form.fields).map(([name, value]) => (
        <input key={name} type='hidden' name={name} value={value} />
      ))}
      <p className='text-zinc-400'>Te llevamos a la pasarela segura de BBVA…</p>
      <Button type='submit' variant='sexy'>
        Continuar al pago
      </Button>
    </form>
  );
}
