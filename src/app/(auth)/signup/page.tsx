import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { getMembership } from '@/features/membership/controllers/get-membership';

import { signInWithEmail, signInWithOAuth } from '../auth-actions';
import { AuthUI } from '../auth-ui';

export default async function SignUp() {
  const session = await getSession();
  const membership = await getMembership();

  if (session && membership) {
    redirect('/account');
  }

  if (session && !membership) {
    redirect('/pricing');
  }

  return (
    <section className='py-xl m-auto flex h-full max-w-lg items-center'>
      <AuthUI mode='signup' signInWithOAuth={signInWithOAuth} signInWithEmail={signInWithEmail} />
    </section>
  );
}
