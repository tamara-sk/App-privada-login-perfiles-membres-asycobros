import z from 'zod';

export const priceCardVariantSchema = z.enum(['basic', 'pro', 'enterprise']);

/**
 * Metadata carried by each Stripe product, describing what a membership tier
 * actually gives a member. Edit the values in `stripe-fixtures.json` and re-run
 * the fixture command; the webhook syncs them into Supabase from there.
 *
 * Everything here is stated in the currency that matters to Secret Key: hours.
 */
export const productMetadataSchema = z
  .object({
    price_card_variant: priceCardVariantSchema,
    /** Hours of Secret Key time each month. Omit for the bespoke tier. */
    hours_included: z.string().optional(),
    /** How quickly a request gets an answer. */
    response_time: z.string(),
    /** Depth of access to tables, rooms, seats and introductions. */
    access_level: z.enum(['standard', 'priority', 'bespoke']),
    /** Guest passes to member experiences each year. Omit for unlimited. */
    guest_passes: z.string().optional(),
  })
  .transform((data) => ({
    priceCardVariant: data.price_card_variant,
    hoursIncluded: data.hours_included ? parseInt(data.hours_included) : ('unlimited' as const),
    responseTime: data.response_time,
    accessLevel: data.access_level,
    guestPasses: data.guest_passes ? parseInt(data.guest_passes) : ('unlimited' as const),
  }));

export type ProductMetadata = z.infer<typeof productMetadataSchema>;
export type PriceCardVariant = z.infer<typeof priceCardVariantSchema>;
