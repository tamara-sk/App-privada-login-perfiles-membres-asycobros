/**
 * Las tres entradas al Círculo. Decididas: no se tratan como una decisión abierta.
 *
 * Esta es la única fuente de precios. El navegador solo envía el `slug`; el importe se
 * vuelve a leer aquí, en el servidor, antes de firmar el pago. Mantenlo así.
 *
 * Los `slug` son los que figuran en datos y facturas: nunca «Key» a secas en un cargo.
 *
 * Decisión de Tamara, 27 de octubre de 2026: Key 0 €; Secret Key 99 €/año hasta el 31 de
 * enero de 2027 y 390 €/año desde el 1 de febrero de 2027; Master Key 1.200 €/año.
 */

export type PlanSlug = 'member_key' | 'member_secret_key' | 'member_master_key';

export type Plan = {
  slug: PlanSlug;
  name: string;
  /** Importe anual en céntimos. 0 = entrada sin coste. */
  annualAmount: number;
  /**
   * Importes por fecha, del más antiguo al más reciente. Cada tramo rige desde `from`
   * (instante ISO con zona horaria de Madrid). Antes del primero rige `annualAmount`.
   */
  priceSchedule?: readonly { from: string; annualAmount: number }[];
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
    priceSchedule: [{ from: '2027-02-01T00:00:00+01:00', annualAmount: 39000 }],
    discount: 10,
    llavecitasPer10Eur: 4,
    highlighted: true,
  },
  {
    slug: 'member_master_key',
    name: 'Master Key',
    annualAmount: 120000,
    discount: 20,
    llavecitasPer10Eur: 5,
  },
] as const;

export function getPlan(slug: string): Plan | undefined {
  return PLANS.find((plan) => plan.slug === slug);
}

/** Importe anual en céntimos que rige en la fecha indicada (por defecto, ahora). */
export function annualAmountAt(plan: Plan, at: Date = new Date()): number {
  let amount = plan.annualAmount;

  for (const step of plan.priceSchedule ?? []) {
    if (at.getTime() >= new Date(step.from).getTime()) {
      amount = step.annualAmount;
    }
  }

  return amount;
}

/** Siguiente cambio de importe todavía por llegar, si existe. */
export function nextPriceStep(plan: Plan, at: Date = new Date()) {
  return plan.priceSchedule?.find((step) => new Date(step.from).getTime() > at.getTime());
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
