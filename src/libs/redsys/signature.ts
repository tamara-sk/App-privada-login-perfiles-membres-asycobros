import { createCipheriv, createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Firma HMAC_SHA256_V1 de Redsys.
 *
 * 1. Se deriva una clave por operación cifrando el número de pedido con 3DES-CBC
 *    (IV de ceros, relleno con ceros hasta múltiplo de 8) usando la clave del comercio.
 * 2. La firma es el HMAC-SHA256 de `Ds_MerchantParameters` (ya en Base64) con esa clave.
 *
 * Así, la clave secreta jamás viaja: solo la firma.
 */

function deriveOrderKey(secretKeyBase64: string, order: string): Buffer {
  const key = Buffer.from(secretKeyBase64, 'base64');
  const iv = Buffer.alloc(8, 0);

  const orderBytes = Buffer.from(order, 'utf8');
  const paddedLength = Math.ceil(orderBytes.length / 8) * 8;
  const padded = Buffer.alloc(paddedLength, 0);
  orderBytes.copy(padded);

  const cipher = createCipheriv('des-ede3-cbc', key, iv);
  cipher.setAutoPadding(false);

  return Buffer.concat([cipher.update(padded), cipher.final()]);
}

export function encodeMerchantParameters(params: Record<string, string>): string {
  return Buffer.from(JSON.stringify(params), 'utf8').toString('base64');
}

export function decodeMerchantParameters<T = Record<string, string>>(merchantParameters: string): T {
  const normalized = merchantParameters.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(Buffer.from(normalized, 'base64').toString('utf8')) as T;
}

export function createSignature(secretKeyBase64: string, order: string, merchantParameters: string): string {
  const orderKey = deriveOrderKey(secretKeyBase64, order);
  return createHmac('sha256', orderKey).update(merchantParameters).digest('base64');
}

/**
 * Comprueba la firma de una respuesta del banco (notificación o REST).
 *
 * Redsys devuelve la firma en Base64 «URL safe» (`-` y `_`), así que se normalizan ambas
 * antes de comparar, y la comparación es en tiempo constante.
 */
export function verifySignature(
  secretKeyBase64: string,
  order: string,
  merchantParameters: string,
  receivedSignature: string
): boolean {
  const toStandard = (value: string) => value.replace(/-/g, '+').replace(/_/g, '/');

  const expected = Buffer.from(toStandard(createSignature(secretKeyBase64, order, merchantParameters)));
  const received = Buffer.from(toStandard(receivedSignature));

  return expected.length === received.length && timingSafeEqual(expected, received);
}
