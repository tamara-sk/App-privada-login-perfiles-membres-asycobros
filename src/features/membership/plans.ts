/**
 * Las entradas al Círculo según el canon del 27 de octubre de 2026.
 *
 * Esta es la única fuente de precios. El navegador solo envía el `slug`; el importe se
 * vuelve a leer aquí, en el servidor, antes de firmar el pago. Mantenlo así.
 *
 * Los `slug` son los que figuran en datos y facturas: nunca «Key» a secas en un cargo.
 *
 * Decidido: quien entra con Secret Key promo (99 €) renueva a 220 €/año al cumplir su año,
 * es decir, a finales de 2027.
 *
 * Abierto, a la espera de Tamara (no se inventa aquí): mensual de Secret Key antes de enero, descuentos de miembro, acciones de Llavecitas y
 * nombre de la capa alta de Wisdom Key. El cobro mensual y la renovación automática esperan
 * el pago por referencia de BBVA.
 */

export type PlanSlug = 'member_key' | 'member_secret_key' | 'member_master_key';

export type Plan = {
  slug: PlanSlug;
  name: string;
  /** Importe anual en céntimos que se cobra ahora. 0 = entrada sin coste. */
  readonly annualAmount: number;
  /** Multiplicador de Llavecitas por la misma acción: Key 0,1×, Secret Key 2×, Master Key 5×. */
  llavecitasMultiplier: number;
  highlighted?: boolean;
};

/** Última hora del precio de temporada de Secret Key: 31 dic 2026, 23:59 en Madrid (CET, UTC+1). */
export const SECRET_KEY_PROMO_ENDS_AT = Date.parse('2026-12-31T23:59:59+01:00');

/** Desde el 1 ene 2027 la entrada a Secret Key es de 220 €/año (o 20 €/mes cuando BBVA habilite el pago por referencia). */
export const SECRET_KEY_REGULAR_ANNUAL_AMOUNT = 22000;
export const SECRET_KEY_REGULAR_MONTHLY_AMOUNT = 2000;

const SECRET_KEY_PROMO_ANNUAL_AMOUNT = 9900;

/** Wisdom Key se concede por solicitud de acceso: se muestra, sin botón de pago. */
export const WISDOM_KEY = { name: 'Wisdom Key', annualAmount: 430000 } as const;

export const MASTER_KEY_MONTHLY_AMOUNT = 39000;

/** Cada Llavecita vale 0,10 €. */
export const LLAVECITA_VALUE_EUR = 0.1;

export const PLANS: readonly Plan[] = [
  {
    slug: 'member_key',
    name: 'Key',
    annualAmount: 0,
    llavecitasMultiplier: 0.1,
  },
  {
    slug: 'member_secret_key',
    name: 'Secret Key',
    // El precio de temporada se aplica solo hasta la fecha de cierre; después rige el de 2027.
    get annualAmount() {
      return Date.now() <= SECRET_KEY_PROMO_ENDS_AT ? SECRET_KEY_PROMO_ANNUAL_AMOUNT : SECRET_KEY_REGULAR_ANNUAL_AMOUNT;
    },
    llavecitasMultiplier: 2,
    highlighted: true,
  },
  {
    slug: 'member_master_key',
    name: 'Master Key',
    annualAmount: 250000,
    llavecitasMultiplier: 5,
  },
] as const;

export function getPlan(slug: string): Plan | undefined {
  return PLANS.find((plan) => plan.slug === slug);
}

export function isPaidPlan(plan: Plan): boolean {
  return plan.annualAmount > 0;
}

export function isSecretKeyPromoOpen(): boolean {
  return Date.now() <= SECRET_KEY_PROMO_ENDS_AT;
}

function formatMultiplier(value: number): string {
  return `${String(value).replace('.', ',')}×`;
}

export function planFeatures(plan: Plan): string[] {
  return [
    'Acceso a la app y al calendario de experiencias',
    `Llavecitas ${formatMultiplier(plan.llavecitasMultiplier)} por la misma acción`,
  ];
}
