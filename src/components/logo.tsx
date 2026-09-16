import Image from 'next/image';
import Link from 'next/link';

import { legalConfig } from '@/features/legal/legal-config';

export function Logo() {
  return (
    <Link href='/' className='flex w-fit items-center gap-2'>
      <Image
        src='/logo.png'
        width={40}
        height={40}
        priority
        quality={100}
        alt={`Logotipo de ${legalConfig.brand.name}`}
      />
      <span className='font-alt text-xl text-white'>{legalConfig.brand.name}</span>
    </Link>
  );
}
