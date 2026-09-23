'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoGithub, IoLogoGoogle } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { ActionResponse } from '@/types/action-response';

const titleMap = {
  login: 'Accede a tu cuenta de Secret Key',
  signup: 'Solicita tu acceso a Secret Key',
} as const;

export function AuthUI({
  mode,
  signInWithOAuth,
  signInWithEmail,
}: {
  mode: 'login' | 'signup';
  signInWithOAuth: (provider: 'github' | 'google') => Promise<ActionResponse>;
  signInWithEmail: (email: string) => Promise<ActionResponse>;
}) {
  const [pending, setPending] = useState(false);
  const [emailFormOpen, setEmailFormOpen] = useState(false);

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const form = event.target as HTMLFormElement;
    const email = form['email'].value;
    const response = await signInWithEmail(email);

    if (response?.error) {
      toast({
        variant: 'destructive',
        description: 'No hemos podido completar la autenticación. Vuelve a intentarlo.',
      });
    } else {
      toast({
        description: `Para continuar, pulsa el enlace que hemos enviado a: ${email}`,
      });
    }

    form.reset();
    setPending(false);
  }

  async function handleOAuthClick(provider: 'google' | 'github') {
    setPending(true);
    const response = await signInWithOAuth(provider);

    if (response?.error) {
      toast({
        variant: 'destructive',
        description: 'No hemos podido completar la autenticación. Vuelve a intentarlo.',
      });
      setPending(false);
    }
  }

  return (
    <section className='mt-16 flex w-full flex-col gap-16 rounded-lg bg-black p-10 px-4 text-center'>
      <div className='flex flex-col gap-4'>
        <Image src='/logo.png' width={80} height={80} alt='' className='m-auto' />
        <h1 className='text-lg'>{titleMap[mode]}</h1>
      </div>
      <div className='flex flex-col gap-4'>
        <button
          className='flex items-center justify-center gap-2 rounded-md bg-cyan-500 py-4 font-medium text-black transition-all hover:bg-cyan-400 disabled:bg-neutral-700'
          onClick={() => handleOAuthClick('google')}
          disabled={pending}
        >
          <IoLogoGoogle size={20} />
          Continuar con Google
        </button>
        <button
          className='flex items-center justify-center gap-2 rounded-md bg-fuchsia-500 py-4 font-medium text-black transition-all hover:bg-fuchsia-400 disabled:bg-neutral-700'
          onClick={() => handleOAuthClick('github')}
          disabled={pending}
        >
          <IoLogoGithub size={20} />
          Continuar con GitHub
        </button>

        <Collapsible open={emailFormOpen} onOpenChange={setEmailFormOpen}>
          <CollapsibleTrigger asChild>
            <button
              className='text-neutral6 flex w-full items-center justify-center gap-2 rounded-md bg-zinc-900 py-4 font-medium transition-all hover:bg-zinc-800 disabled:bg-neutral-700 disabled:text-black'
              disabled={pending}
            >
              Continuar con correo electrónico
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='mt-[-2px] w-full rounded-b-md bg-zinc-900 p-8'>
              <form onSubmit={handleEmailSubmit}>
                <Input
                  type='email'
                  name='email'
                  placeholder='Tu correo electrónico'
                  aria-label='Tu correo electrónico'
                  autoFocus
                />
                <div className='mt-4 flex justify-end gap-2'>
                  <Button type='button' onClick={() => setEmailFormOpen(false)}>
                    Cancelar
                  </Button>
                  <Button variant='secondary' type='submit'>
                    Enviar
                  </Button>
                </div>
              </form>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      {mode === 'signup' && (
        <span className='text-neutral5 m-auto max-w-sm text-sm'>
          Al continuar, aceptas nuestros{' '}
          <Link href='/terminos-y-condiciones' className='underline'>
            términos y condiciones
          </Link>{' '}
          y nuestra{' '}
          <Link href='/privacidad' className='underline'>
            política de privacidad
          </Link>
          .
        </span>
      )}
    </section>
  );
}
