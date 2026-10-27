/**
 * Las cuatro entradas al Círculo. Decididas: no se tratan como una decisión abierta.
 *
 * Fuente: SK Master Context v4 (Notion, 25 oct 2026, cerrado la noche del 26 oct), que
 * sustituye a todo lo anterior, incluido el catálogo del 19 oct.
 *
 * Esta es la única fuente de precios. El navegador solo envía el `slug`; el importe se
 * vuelve a leer aquí, en el servidor, antes de firmar el pago. Mantenlo así.
 *
 * Los `slug` son los que figuran en datos y facturas: nunca «Key» a secas en un cargo.
 *
 * Los tiers de facilitadores, venues y sponsors, y el pack SK Ads, viven en `partners.ts`.
 */

export type PlanSlug = 'member_key' | 'member_secret_key' | 'member_master_key' | 'member_wisdom_key';

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
  /**
   * Opción mensual en céntimos, cuando existe. Se registra aquí, pero el cobro mensual
   * necesita «pago por referencia» en el TPV de BBVA: hoy solo se cobra el anual.
   */
  monthlyAmount?: number;
  /** Ritmo al que se ganan Llavecitas por la misma acción (Key = 0,1×). */
  llavecitasRate: number | null;
  /** Lo que incluye, en afirmativo. */
  features: readonly string[];
  highlighted?: boolean;
};

export const PLANS: readonly Plan[] = [
  {
    slug: 'member_key',
    name: 'Key',
    annualAmount: 0,
    llavecitasRate: 0.1,
    features: ['Entrada al ecosistema y a la app', 'Precio público en experiencias'],
  },
  {
    slug: 'member_secret_key',
    name: 'Secret Key',
    // 99 € es el precio de esta temporada: para quien entra antes del 1 de enero de 2027.
    annualAmount: 9900,
    priceSchedule: [{ from: '2027-01-01T00:00:00+01:00', annualAmount: 22000 }],
    monthlyAmount: 2000,
    llavecitasRate: 2,
    features: [
      'Precio de miembro en experiencias y SK Store',
      'Acumula Llavecitas a ritmo 2×',
      'Secret Circle de tu chapter',
    ],
    highlighted: true,
  },
  {
    slug: 'member_master_key',
    name: 'Master Key',
    annualAmount: 250000,
    monthlyAmount: 39000,
    llavecitasRate: 5,
    features: [
      'Todo lo de Secret Key',
      'Una experiencia de capa alta en un SKWR (Miami, Bali u otro)',
      'Dos experiencias de un día en el chapter que elijas',
      'Llavecitas a ritmo 5×',
    ],
  },
  {
    slug: 'member_wisdom_key',
    name: 'Wisdom Key',
    annualAmount: 430000,
    llavecitasRate: null,
    features: ['Todo lo de Master Key', 'La capa alta de dos SKWR al año', 'Seguimiento personal durante doce meses'],
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
  return [...plan.features];
}
