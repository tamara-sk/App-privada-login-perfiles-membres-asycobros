import { redirect } from 'next/navigation';

import { getApplicationStatus } from '@/libs/supabase/membership';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

import { ApplyForm } from './apply-form';

// Textos visibles: borrador pendiente de revisión humana.
export default async function ApplyPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const status = await getApplicationStatus(supabase, user.id);

  if (status === 'approved') {
    redirect('/account');
  }

  if (status) {
    return (
      <section className='m-auto flex max-w-lg flex-col gap-4 py-16 text-center'>
        <h1>Solicitud recibida</h1>
        <p className='text-zinc-400'>
          Tu solicitud está en revisión. Cuando sea aceptada, podrás acceder con tu cuenta.
        </p>
      </section>
    );
  }

  return (
    <section className='m-auto flex max-w-lg flex-col gap-8 py-16'>
      <div className='flex flex-col gap-2'>
        <h1>Solicitud de acceso</h1>
        <p className='text-zinc-400'>
          El acceso es por aceptación. Tres preguntas, sin prisa: léelas y responde con calma.
        </p>
      </div>
      <ApplyForm />
    </section>
  );
}
