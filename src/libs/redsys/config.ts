import { getEnvVar } from '@/utils/get-env-var';

/**
 * Configuración del TPV Virtual de BBVA sobre Redsys.
 *
 * Todo se lee de variables de entorno y en el momento de usarse, nunca al importar el
 * módulo: así el build de Next funciona sin credenciales (ver `create-lazy-client.ts`).
 *
 * | Variable                | Qué es                                                    |
 * | ----------------------- | --------------------------------------------------------- |
 * | `REDSYS_MERCHANT_CODE`  | Número de comercio (FUC) que asigna BBVA. 9 dígitos.      |
 * | `REDSYS_TERMINAL`       | Número de terminal. Suele ser `1`.                        |
 * | `REDSYS_SECRET_KEY`     | Clave de firma SHA-256, en Base64. **Secreta.**           |
 * | `REDSYS_ENV`            | `test` (sis-t, por defecto) o `live` (cobros reales).     |
 * | `REDSYS_CURRENCY`       | Código ISO 4217 numérico. `978` = EUR, por defecto.       |
 * | `REDSYS_PAGO_REFERENCIA`| `true` solo cuando BBVA haya activado el pago por referencia. |
 */

export type RedsysEnvironment = 'test' | 'live';

const PAYMENT_URLS: Record<RedsysEnvironment, string> = {
  test: 'https://sis-t.redsys.es:25443/sis/realizarPago',
  live: 'https://sis.redsys.es/sis/realizarPago',
};

export const REDSYS_SIGNATURE_VERSION = 'HMAC_SHA256_V1';

export function getRedsysEnvironment(): RedsysEnvironment {
  return process.env.REDSYS_ENV === 'live' ? 'live' : 'test';
}

export function getRedsysConfig() {
  const environment = getRedsysEnvironment();

  return {
    environment,
    merchantCode: getEnvVar(process.env.REDSYS_MERCHANT_CODE, 'REDSYS_MERCHANT_CODE'),
    terminal: process.env.REDSYS_TERMINAL || '1',
    secretKey: getEnvVar(process.env.REDSYS_SECRET_KEY, 'REDSYS_SECRET_KEY'),
    currency: process.env.REDSYS_CURRENCY || '978',
    paymentUrl: PAYMENT_URLS[environment],
    /** Pide a Redsys una referencia de pago reutilizable. Requiere que BBVA lo active. */
    requestPaymentReference: process.env.REDSYS_PAGO_REFERENCIA === 'true',
  };
}

/** Indica si las credenciales mínimas están configuradas, sin lanzar error. */
export function isRedsysConfigured(): boolean {
  return Boolean(process.env.REDSYS_MERCHANT_CODE && process.env.REDSYS_SECRET_KEY);
}
