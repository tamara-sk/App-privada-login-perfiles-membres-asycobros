/**
 * Fuente única de verdad para la información legal del sitio.
 *
 * Los valores marcados con PENDING_MARK deben completarse con los datos reales
 * de la sociedad ANTES de solicitar el alta del TPV Virtual: la Ley 34/2002
 * (LSSI-CE), art. 10, exige que esta información sea accesible de forma
 * permanente, fácil, directa y gratuita.
 *
 * Ejecuta `npm run legal:check` para verificar que no queda ningún dato sin completar.
 */

export const PENDING_MARK = '[COMPLETAR';

/** Devuelve true si el valor todavía es un marcador sin rellenar. */
export function isPending(value: string): boolean {
  return value.startsWith(PENDING_MARK);
}

export const legalConfig = {
  /** Marca comercial de cara al público. */
  brand: {
    name: 'Secret Key',
    tagline: 'Ecosistema de optimización del tiempo y acceso extraordinario',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.secretkey.vip',
  },

  /** Art. 10.1 a), b) y c) LSSI-CE — titular del sitio. */
  company: {
    /** Denominación social completa, con la forma societaria (S.L., S.A., ...). */
    legalName: 'The Secret Key Labs, S.L.',
    /** Nombre comercial, si difiere de la denominación social. */
    tradeName: 'Secret Key',
    /** NIF / CIF de la sociedad (art. 10.1 c). */
    taxId: 'B25909565',
    /** Domicilio social o establecimiento permanente en España (art. 10.1 a). */
    address: {
      street: 'Camí Vora Riu Solades 1771',
      postalCode: '12540',
      city: 'Vila-real',
      province: 'Castellón',
      country: 'España',
    },
    /** Correo electrónico de contacto directo y efectivo (art. 10.1 a). */
    email: 'hello@secretkey.vip',
    /** Teléfono de atención al miembro. */
    phone: '[COMPLETAR: teléfono de atención]',
    /** Datos registrales (art. 10.1 b). */
    registry: {
      name: '[COMPLETAR: Registro Mercantil de ___]',
      volume: '[COMPLETAR: tomo]',
      book: '[COMPLETAR: libro, si aplica]',
      folio: '[COMPLETAR: folio]',
      sheet: '[COMPLETAR: hoja]',
      entry: '[COMPLETAR: inscripción]',
    },
  },

  /** Protección de datos (RGPD / LOPDGDD). */
  dataProtection: {
    /** Correo del responsable o, si se ha designado, del Delegado de Protección de Datos. */
    privacyEmail: 'legal@secretkey.vip',
    /** Delegado de Protección de Datos: null si no se ha designado (no siempre es obligatorio). */
    dpo: null as null | { name: string; email: string },
    supervisoryAuthority: {
      name: 'Agencia Española de Protección de Datos (AEPD)',
      url: 'https://www.aepd.es',
      address: 'C/ Jorge Juan, 6, 28001 Madrid',
    },
  },

  /** Medios de pago. Se refleja en /seguridad-de-pago y en el aviso legal. */
  payments: {
    /** Entidad adquirente del TPV Virtual. */
    acquirer: 'Banco Bilbao Vizcaya Argentaria, S.A. (BBVA)',
    /** Plataforma de pago del TPV Virtual. */
    gateway: 'Redsys Servicios de Procesamiento, S.L.',
    /**
     * Proveedor de servicios de pago (IPSP) intermedio, si se utiliza uno.
     * Déjalo a null si el cobro se realiza directamente contra el TPV Virtual de BBVA.
     * Si se usa un IPSP (Stripe, Adyen, PayPal, Redsys vía agregador...), indícalo aquí
     * Y comunícaselo a BBVA: lo piden expresamente para tramitar el alta correctamente.
     */
    ipsp: null as null | { name: string; legalName: string; role: string },
    /** Tarjetas y métodos admitidos. */
    methods: ['Visa', 'Mastercard', 'American Express'],
  },

  /**
   * Encargados del tratamiento (art. 28 RGPD) que se publican en /privacidad.
   *
   * MANTENER SINCRONIZADO CON LA REALIDAD: si se añade, se quita o se cambia un
   * proveedor que trata datos de miembros, hay que actualizar esta lista y firmar
   * (o rescindir) el contrato de encargo correspondiente.
   */
  processors: [
    {
      name: 'Vercel Inc.',
      role: 'Alojamiento y despliegue del sitio y de la aplicación',
      location: 'Estados Unidos (con red de distribución global)',
      guarantee: 'Cláusulas contractuales tipo de la Comisión Europea',
    },
    {
      name: 'Supabase Inc.',
      role: 'Base de datos de miembros y autenticación',
      location: 'Región del proyecto (recomendado: Unión Europea)',
      guarantee: 'Cláusulas contractuales tipo si la región está fuera del EEE',
    },
    {
      name: 'Resend (Plus Five Five, Inc.)',
      role: 'Envío de correo transaccional (confirmaciones, facturas, avisos)',
      location: 'Estados Unidos',
      guarantee: 'Cláusulas contractuales tipo de la Comisión Europea',
    },
    {
      name: 'HighLevel Inc. (GoHighLevel)',
      role: 'CRM, seguimiento de solicitudes de acceso y automatización de comunicaciones',
      location: 'Estados Unidos',
      guarantee: 'Cláusulas contractuales tipo de la Comisión Europea',
    },
  ] as ReadonlyArray<{ name: string; role: string; location: string; guarantee: string }>,

  /** Fecha de última actualización de los textos legales (formato ISO). */
  lastUpdated: '2026-09-16',
} as const;

export type LegalConfig = typeof legalConfig;

/** Domicilio en una sola línea, para cabeceras y textos corridos. */
export function formatAddress(): string {
  const { street, postalCode, city, province, country } = legalConfig.company.address;
  return `${street}, ${postalCode} ${city} (${province}), ${country}`;
}

/** Datos registrales en una sola línea (art. 10.1 b LSSI). */
export function formatRegistry(): string {
  const { name, volume, book, folio, sheet, entry } = legalConfig.company.registry;
  const parts = [`tomo ${volume}`];
  if (!book.includes('si aplica')) parts.push(`libro ${book}`);
  parts.push(`folio ${folio}`, `hoja ${sheet}`, `inscripción ${entry}`);
  return `${name}, ${parts.join(', ')}`;
}

/** Fecha de actualización en formato legible en español. */
export function formatLastUpdated(): string {
  return new Date(legalConfig.lastUpdated).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
