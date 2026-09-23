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
    /** Forma social, según el Registro Mercantil. */
    legalForm: 'Sociedad de responsabilidad limitada, de duración indefinida',
    /** Fecha de comienzo de operaciones inscrita. */
    operationsSince: '16 de diciembre de 2025',
    /**
     * Objeto social inscrito, literal del listado de actos inscritos del Registro Mercantil
     * de Castellón. Coincide con el que ya publica el aviso legal de secretkey.vip.
     */
    corporatePurpose:
      'La organización, gestión, promoción, producción y desarrollo integral de ferias, exposiciones, congresos, convenciones, conferencias, seminarios, presentaciones y eventos corporativos, culturales, comerciales, promocionales o de cualquier otra naturaleza; así como la prestación de servicios auxiliares y complementarios relacionados con dichos eventos, incluyendo el montaje de estands y estructuras, diseño expositivo, producción técnica y artística, servicios audiovisuales, logística, contratación de personal, alquiler de espacios y recintos, equipamiento, catering y servicios de hostelería. Asimismo, la prestación de servicios de consultoría, asesoramiento, marketing, comunicación, publicidad, identidad corporativa, diseño gráfico y digital, gestión de redes sociales y difusión digital o audiovisual, siempre vinculados al desarrollo de los eventos descritos. Como actividades complementarias y accesorias, la sociedad podrá también: 1. La gestión, intermediación, comercialización y asesoramiento en operaciones inmobiliarias, así como la compra, venta, arrendamiento —excluido el financiero—, permuta, administración y promoción de toda clase de bienes inmuebles, rústicos o urbanos, propios o de terceros. 2. El asesoramiento en gestión empresarial y de negocio especializado en empresas del sector de Telecomunicaciones, incluyendo consultoría estratégica, comercial, operativa, organizativa y de desarrollo corporativo.',
    /** Códigos CNAE inscritos. */
    cnae: ['8230', '6832', '7020'],
    /** Capital social suscrito, en euros. */
    shareCapital: 3000,
    /** Órgano de administración inscrito. */
    governingBody: 'Administrador único',
    /** NIF / CIF de la sociedad (art. 10.1 c). */
    taxId: 'B25909565',
    /** Domicilio social o establecimiento permanente en España (art. 10.1 a). */
    address: {
      street: 'Camino Vora Riu Solades 1176',
      postalCode: '12540',
      city: 'Vila-real',
      province: 'Castellón',
      country: 'España',
    },
    /** Correo electrónico de contacto directo y efectivo (art. 10.1 a). */
    email: 'hello@secretkey.vip',
    /** Teléfono de atención al Círculo. */
    phone: '+34 614 59 44 06',
    /**
     * Datos registrales (art. 10.1 b).
     *
     * Confirmados por la certificación registral expedida por la Registradora Mercantil de
     * Castellón de la Plana el 22 de enero de 2026 (asiento 56 del Diario 2026).
     */
    registry: {
      name: 'Registro Mercantil de Castellón',
      /**
       * Redacción de respaldo, por si alguna vez faltara la referencia. Es la que publica el
       * aviso legal de secretkey.vip.
       */
      statement:
        'Inscrita en el Registro Mercantil de Castellón. Sociedad de responsabilidad limitada, de duración indefinida, con fecha de comienzo de operaciones el 16 de diciembre de 2025.',
      /**
       * Referencia registral.
       *
       * El Registro Mercantil de Castellón lleva folio electrónico, de modo que la hoja y la
       * inscripción identifican la sociedad y el tomo y el folio en papel quedan superados.
       * Por eso `folio` vale 'electrónico': es el dato literal de la certificación, y es lo
       * que corresponde publicar.
       */
      reference: {
        sheet: 'CS-50580',
        folio: 'electrónico',
        entry: '1',
        /** Identificador único europeo (Reglamento UE 2015/884). */
        euid: 'ES12011.000207496',
        /** Identificador único registral. */
        irus: '1000465501454',
        registeredOn: '22 de enero de 2026',
      } as null | {
        sheet: string;
        folio: string;
        entry: string;
        euid: string;
        irus: string;
        registeredOn: string;
      },
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
     * Si se usa un IPSP (un agregador que se interponga entre el sitio y BBVA), indícalo aquí
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
   * proveedor que trata datos del Círculo, hay que actualizar esta lista y firmar
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
      role: 'Base de datos del Círculo y autenticación',
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

/**
 * Datos registrales en una sola línea (art. 10.1 b LSSI).
 *
 * Publica la referencia completa en cuanto `registry.reference` deja de ser null; hasta
 * entonces, la redacción de `registry.statement`, que ya acredita la inscripción.
 */
export function formatRegistry(): string {
  const { name, statement, reference } = legalConfig.company.registry;
  if (!reference) return statement;

  const { sheet, folio, entry } = reference;
  return `Inscrita en el ${name}, hoja ${sheet}, folio ${folio}, inscripción ${entry}.`;
}

/** Fecha de actualización en formato legible en español. */
export function formatLastUpdated(): string {
  return new Date(legalConfig.lastUpdated).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
