/**
 * Índice de documentos legales publicados.
 *
 * Se reutiliza en el pie de página, en /legal y en el sitemap, de forma que
 * todos los textos exigidos por la Ley 34/2002 (LSSI-CE) sean accesibles de
 * forma permanente, fácil, directa y gratuita desde cualquier página.
 */

export type LegalDocument = {
  href: string;
  title: string;
  description: string;
  /** Requisito de BBVA (alta de TPV Virtual) que cubre este documento. */
  covers: string;
};

export const legalDocuments: LegalDocument[] = [
  {
    href: '/aviso-legal',
    title: 'Aviso legal',
    description:
      'Titular del sitio, domicilio, NIF, datos registrales y medios de contacto directo y efectivo.',
    covers: 'Artículo 10 LSSI: información general del prestador de servicios',
  },
  {
    href: '/terminos-y-condiciones',
    title: 'Términos y condiciones',
    description:
      'Condiciones generales de contratación de la membresía y de las experiencias de Secret Key.',
    covers: 'Condiciones generales de contratación',
  },
  {
    href: '/cancelacion',
    title: 'Cancelación de pedidos',
    description:
      'Cómo cancelar una reserva, una experiencia o la renovación de la membresía, y qué plazos aplican.',
    covers: 'Cancelación de pedidos',
  },
  {
    href: '/devoluciones',
    title: 'Devoluciones y reembolsos',
    description:
      'Derecho de desistimiento, supuestos de reembolso, plazos y medio de devolución del importe.',
    covers: 'Devolución y reembolso',
  },
  {
    href: '/envios',
    title: 'Entrega y envíos',
    description:
      'Plazos de activación de los servicios digitales y condiciones de envío de cualquier elemento físico.',
    covers: 'Envíos',
  },
  {
    href: '/seguridad-de-pago',
    title: 'Seguridad y protección al comprador',
    description:
      'Pago mediante TPV Virtual con cifrado TLS y autenticación reforzada (PSD2), y protección frente a cargos no reconocidos.',
    covers: 'Seguridad y protección a compradores',
  },
  {
    href: '/privacidad',
    title: 'Política de privacidad',
    description:
      'Responsable, finalidades, base jurídica, destinatarios, plazos de conservación y derechos RGPD.',
    covers: 'Privacidad y protección de datos',
  },
  {
    href: '/cookies',
    title: 'Política de cookies',
    description: 'Cookies utilizadas, finalidad, duración y cómo aceptarlas, rechazarlas o revocarlas.',
    covers: 'Política de cookies',
  },
  {
    href: '/contacto',
    title: 'Contacto',
    description: 'Canal de atención al Círculo y vía de reclamación, incluida la plataforma europea de ODR.',
    covers: 'Comunicación directa y efectiva (art. 10.1 a LSSI)',
  },
];

/**
 * Rutas que deben permanecer siempre accesibles sin iniciar sesión.
 *
 * El art. 10 LSSI exige acceso permanente, fácil, directo y gratuito, por lo que
 * ningún guard de autenticación puede cubrir estas rutas aunque el resto de la
 * aplicación sea privada.
 */
export const publicLegalRoutes: string[] = ['/legal', ...legalDocuments.map((doc) => doc.href)];

export function isPublicLegalRoute(pathname: string): boolean {
  return publicLegalRoutes.includes(pathname);
}
