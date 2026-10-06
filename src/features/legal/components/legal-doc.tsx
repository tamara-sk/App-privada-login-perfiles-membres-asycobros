import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

import { formatLastUpdated } from '@/features/legal/legal-config';

export function LegalDoc({ title, intro, children }: PropsWithChildren<{ title: string; intro?: string }>) {
  return (
    <article className='m-auto flex max-w-3xl flex-col gap-8 py-8 lg:py-16'>
      <header className='flex flex-col gap-4'>
        <Link
          href='/legal'
          className='flex w-fit items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white'
        >
          <IoArrowBack size={16} /> Información legal
        </Link>
        <h1 className='!text-3xl lg:!text-5xl'>{title}</h1>
        {intro && <p className='text-lg text-neutral-300'>{intro}</p>}
        <p className='text-sm text-neutral-400'>Última actualización: {formatLastUpdated()}</p>
      </header>
      <div className='legal-prose'>{children}</div>
    </article>
  );
}

/** Tabla de datos identificativos (art. 10 LSSI). */
export function LegalDataTable({ rows }: { rows: Array<{ label: string; value: string }> }) {
  return (
    <dl className='my-6 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 sm:grid-cols-[minmax(0,14rem)_1fr]'>
      {rows.map((row) => (
        <div key={row.label} className='contents'>
          <dt className='bg-black px-4 py-3 text-sm font-semibold text-neutral-100'>{row.label}</dt>
          <dd className='bg-black px-4 py-3 text-sm text-neutral-300'>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
