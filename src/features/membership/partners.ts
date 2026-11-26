/**
 * Una sola escalera de cuatro tiers para miembros, facilitadores, venues y sponsors
 * (`docs/canon.md`).
 *
 * La comisión es lo que Secret Key retiene de cada venta hecha a través de SK, según el
 * tier de quien vende. Nunca baja del 10 %. Las comisiones de partner y las condiciones
 * de miembro son sistemas separados.
 *
 * Todo partner entra cediendo al Círculo al menos una experiencia o beneficio de
 * cortesía, canjeable con Llavecitas. Importes en céntimos.
 */

export type PartnerTier = {
  name: 'Key' | 'Secret Key' | 'Master Key' | 'Wisdom Key';
  /** Cuota anual de partner. Wisdom Key la sustituye por el pack SK Ads. */
  annualFee: number | null;
  /** Porcentaje que retiene Secret Key de cada venta. */
  commissionPercent: number;
};

export const PARTNER_TIERS: readonly PartnerTier[] = [
  { name: 'Key', annualFee: 0, commissionPercent: 30 },
  { name: 'Secret Key', annualFee: 29000, commissionPercent: 20 },
  { name: 'Master Key', annualFee: 89000, commissionPercent: 15 },
  { name: 'Wisdom Key', annualFee: null, commissionPercent: 10 },
] as const;

/** Pack SK Ads: agente, CRM, bots, cuenta de GHL y automatizaciones. Es el Wisdom Key de partner. */
export const SK_ADS_PACKS = [
  { name: 'Essential', monthlyAmount: 15000, setupAmount: 99700 },
  { name: 'Growth', monthlyAmount: 25000, setupAmount: 199700 },
  { name: 'Signature', monthlyAmount: 35000, setupAmount: 299700 },
] as const;

/** Agente de IA adicional, por mes. */
export const SK_ADS_EXTRA_AGENT_MONTHLY = 15000;

/**
 * Clauer: quien abre una ciudad, sea partner o miembro. Durante el primer año comisiona
 * este porcentaje de cada reserva que entra por ese partner. Se descuenta de la comisión
 * de Secret Key (pendiente de confirmar), de modo que el neto de SK en el año 1 es
 * `commissionPercent - CLAUER_FIRST_YEAR_COMMISSION_PERCENT`.
 */
export const CLAUER_FIRST_YEAR_COMMISSION_PERCENT = 5;
