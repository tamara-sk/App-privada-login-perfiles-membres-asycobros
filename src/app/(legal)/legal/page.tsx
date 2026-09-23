import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalDataTable } from '@/features/legal/components/legal-doc';
import { formatAddress, formatLastUpdated, legalConfig } from '@/features/legal/legal-config';
import { legalDocuments } from '@/features/legal/legal-documents';

export const metadata: Metadata = {
  title: 'Información legal | Secret Key',
  description:
    'Información general del prestador de servicios, condiciones de contratación, cancelación, devoluciones, privacidad y cookies.',
};

export default function LegalIndexPage() {
  const { company } = legalConfig;

  return (
    <div className='m-auto flex max-w-4xl flex-col gap-8 py-8 lg:py-16'>
      <header className='flex flex-col gap-4'>
        <h1 className='!text-3xl lg:!text-5xl'>Información legal</h1>
        <p className='text-lg text-neutral-300'>
          Toda la información exigida por la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información
          y de comercio electrónico, junto con las condiciones de contratación de {legalConfig.brand.name}. El acceso es
          permanente, directo y gratuito, sin necesidad de registrarse.
        </p>
        <p className='text-sm text-neutral-400'>Última actualización: {formatLastUpdated()}</p>
      </header>

      <section>
        <h2 className='mb-3 font-alt text-xl font-semibold text-white'>Titular del sitio</h2>
        <LegalDataTable
          rows={[
            { label: 'Denominación social', value: company.legalName },
            { label: 'NIF', value: company.taxId },
            { label: 'Domicilio', value: formatAddress() },
            { label: 'Correo electrónico', value: company.email },
            { label: 'Teléfono', value: company.phone },
          ]}
        />
      </section>

      <section className='flex flex-col gap-4'>
        <h2 className='font-alt text-xl font-semibold text-white'>Documentos</h2>
        <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {legalDocuments.map((doc) => (
            <li key={doc.href}>
              <Link
                href={doc.href}
                className='flex h-full flex-col gap-2 rounded-lg border border-zinc-800 bg-black p-5 transition-colors hover:border-zinc-600'
              >
                <span className='font-alt font-semibold text-white'>{doc.title}</span>
                <span className='text-sm text-neutral-400'>{doc.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
