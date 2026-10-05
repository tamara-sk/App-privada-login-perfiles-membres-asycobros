import Link from 'next/link';
import { IoMenu } from 'react-icons/io5';

import { AccountMenu } from '@/components/account-menu';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { getSession } from '@/features/account/controllers/get-session';
import { CartButton } from '@/features/store/components/cart-button';

import { signOut } from './(auth)/auth-actions';

const NAV_LINKS = [
  { href: '/store', label: 'Shop' },
  { href: '/pricing', label: 'Membership' },
];

export async function Navigation() {
  const session = await getSession();

  return (
    <nav className='relative flex items-center gap-6' aria-label='Main'>
      <div className='hidden items-center gap-6 lg:flex'>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className='text-sm text-neutral-300 transition-colors hover:text-white'
          >
            {link.label}
          </Link>
        ))}
      </div>

      <CartButton />

      {session ? (
        <AccountMenu signOut={signOut} />
      ) : (
        <>
          <Button variant='sexy' className='hidden flex-shrink-0 lg:flex' asChild>
            <Link href='/signup'>Get started for free</Link>
          </Button>
          <Sheet>
            <SheetTrigger className='block lg:hidden' aria-label='Open menu'>
              <IoMenu size={28} />
            </SheetTrigger>
            <SheetContent className='w-full bg-black'>
              <SheetHeader>
                <Logo />
                <SheetDescription className='flex flex-col items-start gap-6 py-8'>
                  {NAV_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} className='text-lg text-neutral-200'>
                      {link.label}
                    </Link>
                  ))}
                  <Button variant='sexy' className='flex-shrink-0' asChild>
                    <Link href='/signup'>Get started for free</Link>
                  </Button>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </>
      )}
    </nav>
  );
}
