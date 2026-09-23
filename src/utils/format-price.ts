/**
 * Formatea un importe en la unidad mínima (céntimos) en la moneda indicada.
 *
 * Secret Key factura en euros a través del TPV Virtual, por lo que la moneda por
 * defecto es EUR y el formato, el español.
 */
export function formatPrice(unitAmount: number, currency: string | null): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: (currency ?? 'eur').toUpperCase(),
    minimumFractionDigits: unitAmount % 100 === 0 ? 0 : 2,
  }).format(unitAmount / 100);
}
