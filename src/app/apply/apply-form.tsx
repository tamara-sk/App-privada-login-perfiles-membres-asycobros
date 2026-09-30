'use client';

import { FormEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { submitApplication } from './actions';

const textareaClass =
  'flex min-h-28 w-full rounded-md bg-black px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50';

export function ApplyForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);

    startTransition(async () => {
      const result = await submitApplication({
        essence: String(form.get('essence') ?? ''),
        contribution: String(form.get('contribution') ?? ''),
        invitedBy: String(form.get('invitedBy') ?? ''),
      });

      if (result.ok) {
        router.refresh();
      } else {
        setError(result.message);
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='essence' className='text-sm font-medium'>
          ¿Quién eres en esencia, más allá de tu título y de tu lugar de residencia?
        </label>
        <textarea id='essence' name='essence' required minLength={20} maxLength={1500} className={textareaClass} />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='contribution' className='text-sm font-medium'>
          ¿Qué puedes aportar al grupo?
        </label>
        <textarea
          id='contribution'
          name='contribution'
          required
          minLength={20}
          maxLength={1500}
          className={textareaClass}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='invitedBy' className='text-sm font-medium'>
          ¿Te ha invitado alguien? Si es así, ¿quién? <span className='text-zinc-400'>(opcional)</span>
        </label>
        <Input id='invitedBy' name='invitedBy' maxLength={300} />
      </div>

      {error && (
        <p role='alert' className='text-sm text-red-400'>
          {error}
        </p>
      )}

      <Button type='submit' variant='secondary' disabled={pending} className='self-start'>
        {pending ? 'Enviando…' : 'Enviar solicitud'}
      </Button>
    </form>
  );
}
