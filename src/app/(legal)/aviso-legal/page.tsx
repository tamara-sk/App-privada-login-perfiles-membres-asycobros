import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalDataTable, LegalDoc } from '@/features/legal/components/legal-doc';
import { formatAddress, formatRegistry, legalConfig } from '@/features/legal/legal-config';

export const metadata: Metadata = {
  title: 'Aviso legal | Secret Key',
  description:
    'Información general del prestador de servicios conforme al artículo 10 de la Ley 34/2002 (LSSI-CE): denominación social, domicilio, NIF, datos registrales y contacto.',
};

export default function AvisoLegalPage() {
  const { company, brand } = legalConfig;

  return (
    <LegalDoc
      title='Aviso legal'
      intro={`Información general del prestador de servicios de la sociedad de la información, en cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE).`}
    >
      <h2>1. Datos identificativos del titular</h2>
      <LegalDataTable
        rows={[
          { label: 'Denominación social', value: company.legalName },
          { label: 'Nombre comercial', value: company.tradeName },
          { label: 'NIF', value: company.taxId },
          { label: 'Domicilio social', value: formatAddress() },
          { label: 'Correo electrónico', value: company.email },
          { label: 'Teléfono', value: company.phone },
          { label: 'Datos registrales', value: formatRegistry() },
          { label: 'Sitio web', value: brand.siteUrl },
        ]}
      />
      <p>
        El correo electrónico y el teléfono indicados permiten establecer una comunicación directa y efectiva con{' '}
        {company.tradeName}. Puedes escribirnos también desde la página de <Link href='/contacto'>contacto</Link>.
      </p>

      <h2>2. Objeto y ámbito de aplicación</h2>
      <p>
        El presente aviso legal regula el acceso y el uso del sitio web y de la aplicación privada de {brand.name} (en
        adelante, el «Sitio»), a través de los cuales {company.tradeName} ofrece un ecosistema de optimización del
        tiempo y acceso a experiencias para sus miembros.
      </p>
      <p>
        La navegación por el Sitio atribuye la condición de usuario e implica la aceptación plena de este aviso legal,
        de la <Link href='/privacidad'>política de privacidad</Link> y de la{' '}
        <Link href='/cookies'>política de cookies</Link>. La contratación de cualquier servicio se rige, además, por los{' '}
        <Link href='/terminos-y-condiciones'>términos y condiciones</Link>.
      </p>

      <h2>3. Condiciones de uso del Sitio</h2>
      <p>El usuario se compromete a:</p>
      <ul>
        <li>Utilizar el Sitio conforme a la ley, a este aviso legal, a la buena fe y al orden público.</li>
        <li>
          Facilitar información veraz y actualizada en los formularios de registro y mantener la confidencialidad de sus
          credenciales de acceso, que son personales e intransferibles.
        </li>
        <li>
          No realizar actuaciones que puedan dañar, sobrecargar o impedir el normal funcionamiento del Sitio, ni
          intentar acceder a áreas restringidas o a datos de otros miembros.
        </li>
        <li>No introducir ni difundir contenidos ilícitos, difamatorios, discriminatorios o que infrinjan derechos de terceros.</li>
      </ul>
      <p>
        {company.tradeName} podrá suspender o cancelar el acceso de cualquier usuario que incumpla estas condiciones,
        sin perjuicio de las acciones legales que correspondan.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del Sitio —textos, fotografías, gráficos, imágenes, marcas, logotipos, diseño, código
        fuente, bases de datos y selección o presentación de contenidos— son titularidad de {company.tradeName} o de
        terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial.
      </p>
      <p>
        Queda prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de
        explotación, total o parcial, sin autorización previa y por escrito del titular. El acceso al Sitio no otorga al
        usuario ningún derecho sobre dichos contenidos.
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        {company.tradeName} adopta medidas técnicas y organizativas razonables para que el Sitio funcione de forma
        continuada y segura, pero no puede garantizar la ausencia total de interrupciones, errores o de elementos
        lesivos introducidos por terceros ajenos a su control.
      </p>
      <p>
        El Sitio puede incluir enlaces a páginas de terceros (proveedores de experiencias, pasarelas de pago,
        colaboradores). {company.tradeName} no controla dichos sitios ni asume responsabilidad por sus contenidos o
        políticas, que el usuario debe consultar de forma independiente.
      </p>

      <h2>6. Medios de pago</h2>
      <p>
        Los pagos se procesan a través del TPV Virtual de {legalConfig.payments.acquirer}, con la plataforma{' '}
        {legalConfig.payments.gateway}.
        {legalConfig.payments.ipsp
          ? ` La operativa de pago se canaliza a través del proveedor de servicios de pago ${legalConfig.payments.ipsp.legalName}.`
          : ''}{' '}
        Puedes consultar el detalle en <Link href='/seguridad-de-pago'>seguridad y protección al comprador</Link>.
      </p>

      <h2>7. Protección de datos</h2>
      <p>
        El tratamiento de los datos personales de los usuarios se describe en la{' '}
        <Link href='/privacidad'>política de privacidad</Link>, elaborada conforme al Reglamento (UE) 2016/679 (RGPD) y
        a la Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD).
      </p>

      <h2>8. Comunicaciones comerciales</h2>
      <p>
        Conforme a los artículos 20 y 21 de la LSSI-CE, {company.tradeName} solo remite comunicaciones comerciales por
        vía electrónica cuando el destinatario lo ha solicitado o autorizado expresamente, o cuando existe una relación
        contractual previa y las comunicaciones se refieren a servicios similares. Toda comunicación es identificable
        como tal e incluye un medio sencillo y gratuito para oponerse a recibirla.
      </p>

      <h2>9. Legislación aplicable y jurisdicción</h2>
      <p>
        Este aviso legal se rige por la legislación española. Para la resolución de cualquier controversia, las partes
        se someten a los juzgados y tribunales que resulten competentes conforme a derecho; cuando el usuario tenga la
        condición de consumidor, serán los de su domicilio.
      </p>
      <p>
        El usuario consumidor también puede acudir a la plataforma de resolución de litigios en línea de la Comisión
        Europea, disponible en{' '}
        <a href='https://ec.europa.eu/consumers/odr' target='_blank' rel='noopener noreferrer'>
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2>10. Modificaciones</h2>
      <p>
        {company.tradeName} se reserva el derecho de modificar este aviso legal para adaptarlo a novedades legislativas
        o a cambios en el Sitio. La versión vigente es siempre la publicada en esta página, con indicación de su fecha
        de actualización.
      </p>
    </LegalDoc>
  );
}
