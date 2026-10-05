import { redirect } from 'next/navigation';

/**
 * La política de privacidad vive en español, en un solo texto: `/privacidad`.
 *
 * Esta ruta se conserva porque el enlace en inglés ya circulaba, y redirige para
 * que exista una única versión que mantener.
 */
export default function PrivacyPage() {
  redirect('/privacidad');
}
