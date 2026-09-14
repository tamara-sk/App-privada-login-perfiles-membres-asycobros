import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/libs/seo/metadata';

export function Logo() {
  return (
    <Link href='/' className='flex w-fit items-center gap-2'>
      <Image src='/logo.png' width={40} height={40} priority quality={90} alt={`${siteConfig.name} logo mark`} />
      <span className='font-alt text-xl text-white'>{siteConfig.name}</span>
    </Link>
  );
}
