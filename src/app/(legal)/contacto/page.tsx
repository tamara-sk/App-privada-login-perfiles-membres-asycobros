import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalDataTable, LegalDoc } from '@/features/legal/components/legal-doc';
import { formatAddress, legalConfig } from '@/features/legal/legal-config';

export const metadata: Metadata = {
  title: 'Contacto | Secret Key',
  description:
    'Canales de comunicación directa y efectiva con Secret Key: correo electrónico, teléfono y domicilio, además de las vías de reclamación.',
};

export default function ContactoPage() {
  const { company, dataProtection } = legalConfig;

  return (
    <LegalDoc
      title='Contacto'
      intro='Medios para establecer una comunicación directa y efectiva con nosotros, conforme al artículo 10.1 a) de la Ley 34/2002.'
    >
      <h2>1. Atención al Círculo</h2>
      <LegalDataTable
        rows={[
          { label: 'Titular', value: company.legalName },
          { label: 'Correo electrónico', value: company.email },
          { label: 'Teléfono', value: company.phone },
          { label: 'Domicilio', value: formatAddress() },
          { label: 'Protección de datos', value: dataProtection.privacyEmail },
        ]}
      />
      <p>
        Respondemos a cualquier consulta en un plazo máximo de 48 horas hábiles. Para incidencias con un pago o una
        reserva en curso, el teléfono es la vía más rápida.
      </p>

      <h2>2. Reclamaciones</h2>
      <p>
        Puedes presentar una reclamación escribiendo a {company.email} con el asunto «Reclamación». Recibirás acuse de
        recibo y una respuesta motivada en el plazo máximo de un mes.
      </p>
      <p>
        Si no quedas conforme, tienes a tu disposición la plataforma de resolución de litigios en línea de la Comisión
        Europea en{' '}
        <a href='https://ec.europa.eu/consumers/odr' target='_blank' rel='noopener noreferrer'>
          ec.europa.eu/consumers/odr
        </a>
        , así como los servicios de consumo de tu comunidad autónoma.
      </p>

      <h2>3. Incidencias con pagos</h2>
      <p>
        Si no reconoces un cargo, consulta{' '}
        <Link href='/seguridad-de-pago'>seguridad y protección al comprador</Link>. Para solicitar una devolución,
        revisa <Link href='/devoluciones'>devoluciones y reembolsos</Link>.
      </p>

      <h2>4. Ejercicio de derechos en materia de protección de datos</h2>
      <p>
        Las solicitudes de acceso, rectificación, supresión, oposición, limitación o portabilidad se dirigen a{' '}
        {dataProtection.privacyEmail}, adjuntando copia de un documento que acredite tu identidad. El procedimiento
        completo está descrito en la <Link href='/privacidad'>política de privacidad</Link>.
      </p>
    </LegalDoc>
  );
}
