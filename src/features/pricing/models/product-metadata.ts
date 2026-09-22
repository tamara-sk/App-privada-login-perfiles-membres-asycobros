import z from 'zod';

export const priceCardVariantSchema = z.enum(['basic', 'pro', 'enterprise']);

/**
 * Metadatos configurados en cada producto de Stripe.
 *
 * `features` es una lista de beneficios separados por `|`, de forma que los
 * planes de membresía se editan desde Stripe sin tocar el código. Ejemplo:
 *
 *   features: "Acceso a la comunidad|2 experiencias al trimestre|Concierge por email"
 */
export const productMetadataSchema = z
  .object({
    price_card_variant: priceCardVariantSchema,
    features: z.string().optional(),
  })
  .transform((data) => ({
    priceCardVariant: data.price_card_variant,
    features: data.features
      ? data.features
          .split('|')
          .map((feature) => feature.trim())
          .filter(Boolean)
      : [],
  }));

export type ProductMetadata = z.infer<typeof productMetadataSchema>;
export type PriceCardVariant = z.infer<typeof priceCardVariantSchema>;
