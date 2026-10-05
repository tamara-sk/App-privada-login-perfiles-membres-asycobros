'use client';

import Link from 'next/link';
import { IoBagHandleOutline } from 'react-icons/io5';

import { useCart } from './cart-provider';

export function CartButton() {
  const { itemCount, isHydrated } = useCart();

  return (
    <Link
      href='/store/cart'
      className='relative flex items-center rounded-full p-1'
      aria-label={`Cart, ${itemCount} items`}
    >
      <IoBagHandleOutline size={24} />
      {isHydrated && itemCount > 0 && (
        <span className='absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black'>
          {itemCount}
        </span>
      )}
    </Link>
  );
}
