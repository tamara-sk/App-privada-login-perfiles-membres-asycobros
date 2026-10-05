/**
 * Las tres entradas al Círculo. Decididas: no se tratan como una decisión abierta.
 *
 * Esta es la única fuente de precios. El navegador solo envía el `slug`; el importe se
 * vuelve a leer aquí, en el servidor, antes de firmar el pago. Mantenlo así.
 *
 * Los `slug` son los que figuran en datos y facturas: nunca «Key» a secas en un cargo.
 */

export type PlanSlug = 'member_key' | 'member_secret_key' | 'member_master_key';

export type Plan = {
  slug: PlanSlug;
  name: string;
  /** Importe anual en céntimos. 0 = entrada sin coste. */
  annualAmount: number;
  /** Descuento en porcentaje. */
  discount: number;
  /** Llavecitas ganadas por cada 10 € gastados. */
  llavecitasPer10Eur: number;
  highlighted?: boolean;
};

export const PLANS: readonly Plan[] = [
  {
    slug: 'member_key',
    name: 'Key',
    annualAmount: 0,
    discount: 0,
    llavecitasPer10Eur: 3,
  },
  {
    slug: 'member_secret_key',
    name: 'Secret Key',
    annualAmount: 9900,
    discount: 10,
    llavecitasPer10Eur: 4,
    highlighted: true,
  },
  {
    slug: 'member_master_key',
    name: 'Máster Key',
    annualAmount: 39000,
    discount: 20,
    llavecitasPer10Eur: 5,
  },
] as const;

export function getPlan(slug: string): Plan | undefined {
  return PLANS.find((plan) => plan.slug === slug);
}

export function isPaidPlan(plan: Plan): boolean {
  return plan.annualAmount > 0;
}

export function planFeatures(plan: Plan): string[] {
  return [
    'Acceso a la app y al calendario de experiencias',
    ...(plan.discount > 0 ? [`${plan.discount} % de descuento`] : []),
    `${plan.llavecitasPer10Eur} Llavecitas por cada 10 €`,
  ];
}
