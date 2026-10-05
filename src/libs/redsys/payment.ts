import { randomInt } from 'node:crypto';

import { getRedsysConfig, REDSYS_SIGNATURE_VERSION } from './config';
import { createSignature, decodeMerchantParameters, encodeMerchantParameters, verifySignature } from './signature';

/**
 * Número de pedido de Redsys: 12 caracteres, los 4 primeros numéricos, y cada uno se usa
 * una sola vez. Se forma con la fecha (AAMMDD) y 6 dígitos aleatorios; la columna `order`
 * es única en la base de datos, así que una colisión falla de forma visible.
 */
export function createOrderNumber(date = new Date()): string {
  const yymmdd = date.toISOString().slice(2, 10).replace(/-/g, '');
  const random = randomInt(0, 1_000_000).toString().padStart(6, '0');
  return `${yymmdd}${random}`;
}

export type RedirectPaymentInput = {
  order: string;
  /** Importe en céntimos. */
  amount: number;
  /** Texto que ve el cliente en la página del banco. Máximo 125 caracteres. */
  description: string;
  /** URL a la que Redsys notifica el resultado, servidor a servidor. */
  notificationUrl: string;
  /** URL a la que vuelve el cliente si el pago sale bien. */
  okUrl: string;
  /** URL a la que vuelve el cliente si el pago sale mal o lo cancela. */
  koUrl: string;
  /** Nombre del titular, opcional. */
  holderName?: string;
};

export type RedirectPaymentForm = {
  action: string;
  fields: {
    Ds_SignatureVersion: string;
    Ds_MerchantParameters: string;
    Ds_Signature: string;
  };
};

/** Redsys muestra mal tildes y símbolos en algunos navegadores: se envía texto plano. */
function toPlainText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E]/g, '-');
}

/**
 * Construye el formulario firmado que el navegador envía a Redsys.
 * El cliente paga en la página del banco; el resultado llega por la notificación.
 */
export function buildRedirectPayment(input: RedirectPaymentInput): RedirectPaymentForm {
  const config = getRedsysConfig();

  const params: Record<string, string> = {
    DS_MERCHANT_AMOUNT: String(input.amount),
    DS_MERCHANT_ORDER: input.order,
    DS_MERCHANT_MERCHANTCODE: config.merchantCode,
    DS_MERCHANT_CURRENCY: config.currency,
    DS_MERCHANT_TRANSACTIONTYPE: '0',
    DS_MERCHANT_TERMINAL: config.terminal,
    DS_MERCHANT_MERCHANTURL: input.notificationUrl,
    DS_MERCHANT_URLOK: input.okUrl,
    DS_MERCHANT_URLKO: input.koUrl,
    DS_MERCHANT_PRODUCTDESCRIPTION: toPlainText(input.description).slice(0, 125),
    DS_MERCHANT_MERCHANTNAME: 'Secret Key',
    DS_MERCHANT_CONSUMERLANGUAGE: '001',
  };

  if (input.holderName) {
    params.DS_MERCHANT_TITULAR = toPlainText(input.holderName).slice(0, 60);
  }

  if (config.requestPaymentReference) {
    // Primer pago de una serie (COF): Redsys devuelve una referencia para renovar.
    params.DS_MERCHANT_IDENTIFIER = 'REQUIRED';
    params.DS_MERCHANT_COF_INI = 'S';
    params.DS_MERCHANT_COF_TYPE = 'R';
  }

  const merchantParameters = encodeMerchantParameters(params);

  return {
    action: config.paymentUrl,
    fields: {
      Ds_SignatureVersion: REDSYS_SIGNATURE_VERSION,
      Ds_MerchantParameters: merchantParameters,
      Ds_Signature: createSignature(config.secretKey, input.order, merchantParameters),
    },
  };
}

/** Parámetros que Redsys envía en la notificación. Todos llegan como texto. */
export type RedsysNotification = {
  Ds_Order: string;
  Ds_Amount: string;
  Ds_Currency: string;
  Ds_Response: string;
  Ds_AuthorisationCode?: string;
  Ds_MerchantCode: string;
  Ds_Terminal: string;
  Ds_Date?: string;
  Ds_Hour?: string;
  Ds_Card_Brand?: string;
  Ds_Card_Country?: string;
  Ds_Merchant_Identifier?: string;
  Ds_Merchant_Cof_Txnid?: string;
  Ds_ExpiryDate?: string;
  [key: string]: string | undefined;
};

/**
 * Valida y decodifica una notificación de Redsys.
 * Devuelve `null` si la firma no cuadra: esa petición no viene del banco.
 */
export function parseNotification(body: {
  Ds_SignatureVersion?: string | null;
  Ds_MerchantParameters?: string | null;
  Ds_Signature?: string | null;
}): RedsysNotification | null {
  if (!body.Ds_MerchantParameters || !body.Ds_Signature) return null;
  if (body.Ds_SignatureVersion && body.Ds_SignatureVersion !== REDSYS_SIGNATURE_VERSION) return null;

  const config = getRedsysConfig();

  let params: RedsysNotification;
  try {
    params = decodeMerchantParameters<RedsysNotification>(body.Ds_MerchantParameters);
  } catch {
    return null;
  }

  const order = params.Ds_Order;
  if (!order) return null;

  const isValid = verifySignature(config.secretKey, order, body.Ds_MerchantParameters, body.Ds_Signature);
  if (!isValid) return null;

  if (params.Ds_MerchantCode !== config.merchantCode) return null;

  return params;
}

/** Redsys considera autorizada una operación con `Ds_Response` entre 0000 y 0099. */
export function isAuthorised(dsResponse: string | undefined): boolean {
  const code = Number.parseInt(dsResponse ?? '', 10);
  return Number.isInteger(code) && code >= 0 && code <= 99;
}
