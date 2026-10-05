/** Countries we ship to today. Extend as fulfilment coverage grows. */
export const SHIPPING_COUNTRIES = [
  { code: 'ES', name: 'España' },
  { code: 'PT', name: 'Portugal' },
  { code: 'FR', name: 'Francia' },
  { code: 'IT', name: 'Italia' },
  { code: 'DE', name: 'Alemania' },
  { code: 'NL', name: 'Países Bajos' },
  { code: 'BE', name: 'Bélgica' },
  { code: 'LU', name: 'Luxemburgo' },
  { code: 'IE', name: 'Irlanda' },
  { code: 'AT', name: 'Austria' },
  { code: 'DK', name: 'Dinamarca' },
  { code: 'SE', name: 'Suecia' },
  { code: 'FI', name: 'Finlandia' },
  { code: 'PL', name: 'Polonia' },
  { code: 'CZ', name: 'Chequia' },
  { code: 'GB', name: 'Reino Unido' },
  { code: 'CH', name: 'Suiza' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'CA', name: 'Canadá' },
  { code: 'MX', name: 'México' },
  { code: 'AE', name: 'Emiratos Árabes Unidos' },
] as const;

export const SHIPPING_COUNTRY_CODES = SHIPPING_COUNTRIES.map((country) => country.code);

export function isShippingCountry(code: string): boolean {
  return SHIPPING_COUNTRY_CODES.includes(code as (typeof SHIPPING_COUNTRY_CODES)[number]);
}
