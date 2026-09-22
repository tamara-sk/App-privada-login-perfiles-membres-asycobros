import Stripe from 'stripe';

import { createLazyClient } from '@/utils/create-lazy-client';
import { getEnvVar } from '@/utils/get-env-var';

export const stripeAdmin = createLazyClient(
  () =>
    new Stripe(getEnvVar(process.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY'), {
      // https://github.com/stripe/stripe-node#configuration
      apiVersion: '2023-10-16',
      // Register this as an official Stripe plugin.
      // https://stripe.com/docs/building-plugins#setappinfo
      appInfo: {
        name: 'Secret Key',
        version: '0.1.0',
      },
    })
);
