import type { Metadata } from 'next';
import Link from 'next/link';

import { CookieSettingsButton } from '@/features/legal/components/cookie-consent';
import { LegalDoc } from '@/features/legal/components/legal-doc';
import { legalConfig } from '@/features/legal/legal-config';

export const metadata: Metadata = {
  title: 'Política de cookies | Secret Key',
  description:
    'Qué cookies utiliza Secret Key, con qué finalidad, cuánto duran y cómo aceptarlas, rechazarlas o revocar el consentimiento.',
};

export default function CookiesPage() {
  const { company } = legalConfig;

  return (
    <LegalDoc
      title='Política de cookies'
      intro='Qué cookies utilizamos, para qué sirven, cuánto duran y cómo puedes aceptarlas, rechazarlas o cambiar de opinión.'
    >
      <h2>1. Qué es una cookie</h2>
      <p>
        Una cookie es un pequeño archivo de texto que el sitio web almacena en tu dispositivo cuando lo visitas. Permite
        recordar información sobre tu navegación —por ejemplo, mantener tu sesión iniciada— y, según su finalidad,
        obtener información estadística sobre el uso del sitio.
      </p>
      <p>
        Esta política se publica en cumplimiento del artículo 22.2 de la Ley 34/2002 (LSSI-CE) y del Reglamento (UE)
        2016/679 (RGPD).
      </p>

      <h2>2. Cookies que utilizamos</h2>
      <h3>2.1. Cookies técnicas o necesarias</h3>
      <p>
        Son imprescindibles para que el sitio funcione y para prestarte el servicio que solicitas, por lo que{' '}
        <strong>no requieren consentimiento</strong>. Sin ellas no es posible iniciar sesión ni completar una compra.
      </p>
      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Titular</th>
            <th>Finalidad</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>sb-access-token</td>
            <td>Propia (gestor de autenticación)</td>
            <td>Mantener la sesión del usuario iniciada de forma segura</td>
            <td>1 hora</td>
          </tr>
          <tr>
            <td>sb-refresh-token</td>
            <td>Propia (gestor de autenticación)</td>
            <td>Renovar la sesión sin obligarte a volver a identificarte</td>
            <td>Hasta 30 días</td>
          </tr>
          <tr>
            <td>sk-cookie-consent</td>
            <td>Propia</td>
            <td>
              Recordar tu decisión sobre las cookies (se almacena en el navegador mediante <em>localStorage</em>)
            </td>
            <td>Hasta que borres los datos del navegador</td>
          </tr>
        </tbody>
      </table>

      <h3>2.2. Cookies de analítica</h3>
      <p>
        Nos permiten conocer de forma agregada cómo se usa el sitio para mejorarlo.{' '}
        <strong>Solo se activan si las aceptas</strong>: mientras no lo hagas, el componente de analítica no se carga.
      </p>
      <table>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Titular</th>
            <th>Finalidad</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Analítica de audiencia</td>
            <td>Proveedor de alojamiento del sitio (tercero)</td>
            <td>Medir visitas y páginas más consultadas de forma agregada</td>
            <td>Sesión / hasta 12 meses</td>
          </tr>
        </tbody>
      </table>

      <h3>2.3. Cookies publicitarias</h3>
      <p>
        Actualmente <strong>no utilizamos cookies publicitarias ni de seguimiento con fines de mercadotecnia</strong>.
        Si en el futuro se incorporaran, se recabaría tu consentimiento previo y se actualizaría esta política.
      </p>

      <h2>3. Cómo gestionar tu consentimiento</h2>
      <p>
        Al entrar por primera vez te mostramos un panel donde puedes <strong>aceptar</strong> o{' '}
        <strong>rechazar</strong> las cookies no necesarias con la misma facilidad. Puedes revocar o modificar tu
        decisión en cualquier momento:
      </p>
      <div className='my-4'>
        <CookieSettingsButton />
      </div>
      <p>
        También puedes configurar o eliminar las cookies desde tu navegador. Ten en cuenta que bloquear las cookies
        técnicas puede impedir el acceso a tu área privada.
      </p>
      <ul>
        <li>
          <a href='https://support.google.com/chrome/answer/95647' target='_blank' rel='noopener noreferrer'>
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href='https://support.mozilla.org/es/kb/Borrar%20cookies'
            target='_blank'
            rel='noopener noreferrer'
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a href='https://support.apple.com/es-es/guide/safari/sfri11471/mac' target='_blank' rel='noopener noreferrer'>
            Safari
          </a>
        </li>
        <li>
          <a
            href='https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09'
            target='_blank'
            rel='noopener noreferrer'
          >
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h2>4. Transferencias internacionales</h2>
      <p>
        Algunos de los proveedores que intervienen pueden estar ubicados fuera del Espacio Económico Europeo. En ese
        caso, las transferencias se amparan en una decisión de adecuación de la Comisión Europea o en cláusulas
        contractuales tipo. Más detalle en la <Link href='/privacidad'>política de privacidad</Link>.
      </p>

      <h2>5. Actualizaciones</h2>
      <p>
        Esta política puede modificarse cuando cambien las cookies utilizadas o la normativa aplicable. Te recomendamos
        revisarla periódicamente. Para cualquier duda, escribe a {company.email}.
      </p>
    </LegalDoc>
  );
}
