import { Resend } from 'resend';

import { createLazyClient } from '@/utils/create-lazy-client';
import { getEnvVar } from '@/utils/get-env-var';

export const resendClient = createLazyClient(() => new Resend(getEnvVar(process.env.RESEND_API_KEY, 'RESEND_API_KEY')));
