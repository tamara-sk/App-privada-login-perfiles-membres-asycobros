import type { Metadata } from 'next';

import { CartContents } from '@/features/store/components/cart-contents';
import { constructMetadata } from '@/libs/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Your bag',
  description: 'Review your Secret Key shop order before checkout.',
  path: '/store/cart',
  noIndex: true,
});

export default function CartPage() {
  return (
    <div className='flex flex-col gap-8 py-8 lg:py-16'>
      <h1>Your bag</h1>
      <CartContents />
    </div>
  );
}
