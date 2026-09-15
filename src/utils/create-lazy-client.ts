/**
 * Defers construction of an SDK client until something actually uses it.
 *
 * Stripe, Supabase and Resend all read their credentials while the module is
 * being imported. Next evaluates every server module when it collects page
 * data, so one missing key turns an ordinary build into a hard failure - which
 * is how a preview deployment with no environment variables dies at
 * `Failed to collect page data for /api/webhooks` rather than at the request
 * that needed the key.
 *
 * Deferring keeps the failure loud, and moves it to where it means something:
 * the first call that genuinely needs the credential.
 */
export function createLazyClient<T extends object>(create: () => T): T {
  let instance: T | undefined;

  const resolve = () => (instance ??= create());

  return new Proxy({} as T, {
    get(_target, property) {
      const client = resolve();
      const value = Reflect.get(client as object, property);
      // Methods keep their binding to the real client, not to the proxy.
      return typeof value === 'function' ? value.bind(client) : value;
    },
    has: (_target, property) => Reflect.has(resolve() as object, property),
    getPrototypeOf: () => Reflect.getPrototypeOf(resolve() as object),
    ownKeys: () => Reflect.ownKeys(resolve() as object),
    getOwnPropertyDescriptor: (_target, property) => {
      const descriptor = Reflect.getOwnPropertyDescriptor(resolve() as object, property);
      // The proxy target is an empty object, so descriptors must stay configurable.
      return descriptor && { ...descriptor, configurable: true };
    },
  });
}
