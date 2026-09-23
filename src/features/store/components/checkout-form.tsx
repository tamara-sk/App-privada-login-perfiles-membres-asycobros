'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { createStoreCheckoutAction } from '../actions/create-store-checkout-action';
import { SHIPPING_COUNTRIES } from '../shipping-countries';
import { formatPrice } from '../utils/format-price';
import { cartNeedsShipping, getShippableSubtotalCents, getShippingOptions } from '../utils/resolve-cart';

import { useCart } from './cart-provider';

const field =
  'w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-neutral-400';

export function CheckoutForm() {
  const { items, subtotalCents, isHydrated } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isHydrated) {
    return <p className='py-16 text-center text-neutral-500'>Un momento…</p>;
  }

  if (items.length === 0) {
    return (
      <div className='flex flex-col items-center gap-4 py-16 text-center'>
        <p className='text-lg text-neutral-400'>Tu carrito está vacío.</p>
        <Button variant='sexy' asChild>
          <Link href='/store'>Ver la tienda</Link>
        </Button>
      </div>
    );
  }

  const needsShipping = cartNeedsShipping(items);
  const shippingOptions = getShippingOptions(getShippableSubtotalCents(items));

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsSubmitting(true);

    const result = await createStoreCheckoutAction({
      items: items.map(({ slug, size, color, quantity }) => ({ slug, size, color, quantity })),
      details: {
        email: String(formData.get('email') ?? ''),
        name: String(formData.get('name') ?? ''),
        phone: String(formData.get('phone') ?? ''),
        shippingOptionId: String(formData.get('shippingOption') ?? ''),
        line1: String(formData.get('line1') ?? ''),
        line2: String(formData.get('line2') ?? ''),
        city: String(formData.get('city') ?? ''),
        postalCode: String(formData.get('postalCode') ?? ''),
        country: String(formData.get('country') ?? ''),
      },
    });

    // Una acción que va bien redirige, así que llegar aquí significa que algo falló.
    setIsSubmitting(false);
    setError(result.error);
  }

  return (
    <form action={handleSubmit} className='flex flex-col gap-6'>
      <fieldset className='flex flex-col gap-3'>
        <legend className='mb-2 text-sm uppercase tracking-widest text-neutral-400'>Tus datos</legend>
        <input className={field} name='name' placeholder='Nombre y apellidos' required autoComplete='name' />
        <input className={field} name='email' type='email' placeholder='Correo electrónico' required autoComplete='email' />
        <input className={field} name='phone' placeholder='Teléfono' autoComplete='tel' />
      </fieldset>

      {needsShipping && (
        <>
          <fieldset className='flex flex-col gap-3'>
            <legend className='mb-2 text-sm uppercase tracking-widest text-neutral-400'>Dirección de envío</legend>
            <input className={field} name='line1' placeholder='Calle y número' required autoComplete='address-line1' />
            <input className={field} name='line2' placeholder='Piso, puerta (opcional)' autoComplete='address-line2' />
            <div className='flex gap-3'>
              <input className={field} name='postalCode' placeholder='Código postal' required autoComplete='postal-code' />
              <input className={field} name='city' placeholder='Ciudad' required autoComplete='address-level2' />
            </div>
            <select className={field} name='country' defaultValue='ES' required autoComplete='country'>
              {SHIPPING_COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className='flex flex-col gap-2'>
            <legend className='mb-2 text-sm uppercase tracking-widest text-neutral-400'>Envío</legend>
            {shippingOptions.map((option, index) => (
              <label key={option.id} className='flex items-center gap-3 rounded-md border border-neutral-800 px-3 py-2'>
                <input type='radio' name='shippingOption' value={option.id} defaultChecked={index === 0} />
                <span className='flex-1 text-sm'>
                  {option.label} · <span className='opacity-60'>{option.description}</span>
                </span>
                <span className='text-sm'>{formatPrice(option.amountCents)}</span>
              </label>
            ))}
          </fieldset>
        </>
      )}

      <div className='flex items-center justify-between border-t border-neutral-800 pt-4'>
        <span className='text-sm uppercase tracking-widest text-neutral-400'>Subtotal</span>
        <span className='text-lg'>{formatPrice(subtotalCents)}</span>
      </div>

      {error && <p className='text-sm text-red-400'>{error}</p>}

      <Button type='submit' variant='sexy' disabled={isSubmitting}>
        {isSubmitting ? 'Abriendo el pago…' : 'Pagar con tarjeta'}
      </Button>

      <p className='text-center text-xs text-neutral-500'>
        El pago se realiza en la pasarela segura de BBVA. Los datos de tu tarjeta viajan directamente al banco.
      </p>
    </form>
  );
}
