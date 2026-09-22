import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalDoc } from '@/features/legal/components/legal-doc';
import { legalConfig } from '@/features/legal/legal-config';

export const metadata: Metadata = {
  title: 'Seguridad y protección al comprador | Secret Key',
  description:
    'Pago mediante TPV Virtual con cifrado TLS y autenticación reforzada (PSD2), protección frente a cargos no reconocidos y medidas de seguridad de la plataforma.',
};

export default function SeguridadPage() {
  const { company, payments } = legalConfig;

  return (
    <LegalDoc
      title='Seguridad y protección al comprador'
      intro='Cómo protegemos tus pagos y tus datos, y qué hacer si no reconoces un cargo.'
    >
      <h2>1. Entorno de pago seguro</h2>
      <p>
        Los pagos con tarjeta se procesan a través del <strong>TPV Virtual de {payments.acquirer}</strong>, operado por{' '}
        {payments.gateway}.
        {payments.ipsp
          ? ` La operativa de pago se canaliza a través de ${payments.ipsp.legalName}, en su condición de ${payments.ipsp.role}.`
          : ''}
      </p>
      <p>
        Al pagar, los datos de la tarjeta se introducen directamente en el entorno seguro de la entidad financiera:{' '}
        <strong>{company.tradeName} no ve, no trata y no almacena en ningún momento el número completo de la tarjeta,
        su fecha de caducidad ni el código de seguridad (CVV)</strong>. En nuestros sistemas solo queda constancia del
        resultado de la operación, de su importe y de los últimos dígitos de la tarjeta, a efectos de facturación y
        soporte.
      </p>

      <h2>2. Cifrado de las comunicaciones</h2>
      <p>
        Todo el tráfico del Sitio viaja cifrado mediante protocolo <strong>TLS</strong> (HTTPS), lo que impide que
        terceros puedan interceptar la información intercambiada entre tu navegador y nuestros servidores. Puedes
        verificarlo por el candado que muestra la barra de direcciones del navegador.
      </p>

      <h2>3. Autenticación reforzada del cliente (PSD2)</h2>
      <p>
        Conforme a la Directiva (UE) 2015/2366 (PSD2) y al Reglamento Delegado (UE) 2018/389, las operaciones se someten
        a <strong>autenticación reforzada</strong>: tu banco te solicitará una verificación adicional (código de un solo
        uso, biometría o confirmación en su aplicación) antes de autorizar el cargo. Esta verificación se realiza entre
        tú y tu entidad, sin intervención de {company.tradeName}.
      </p>

      <h2>4. Prevención del fraude</h2>
      <p>
        La entidad adquirente aplica sistemas de detección de operaciones fraudulentas. {company.tradeName} podrá
        solicitar verificaciones adicionales o rechazar un pedido cuando existan indicios razonables de fraude o de uso
        no autorizado de una tarjeta, informando al usuario de la decisión.
      </p>

      <h2>5. Protección frente a cargos no reconocidos</h2>
      <p>Si detectas en tu extracto un cargo de {company.tradeName} que no reconoces:</p>
      <ol>
        <li>
          Escríbenos a {company.email} o llama al {company.phone} indicando el importe y la fecha. Revisaremos la
          operación y te responderemos con la mayor brevedad.
        </li>
        <li>
          Si el cargo es efectivamente incorrecto, se anula o se reembolsa íntegramente por el mismo medio de pago,
          conforme a <Link href='/devoluciones'>devoluciones y reembolsos</Link>.
        </li>
        <li>
          Con independencia de lo anterior, como titular de la tarjeta tienes derecho a solicitar a tu entidad la
          devolución de operaciones de pago no autorizadas conforme al Real Decreto-ley 19/2018, de servicios de pago.
        </li>
      </ol>

      <h2>6. Seguridad de tu cuenta</h2>
      <p>Para proteger tu cuenta aplicamos las siguientes medidas:</p>
      <ul>
        <li>Acceso mediante credenciales personales, con contraseñas almacenadas siempre cifradas.</li>
        <li>Control de acceso por perfiles, de modo que cada usuario solo accede a su propia información.</li>
        <li>Registro de accesos y de operaciones relevantes.</li>
        <li>Copias de seguridad periódicas y proveedores de infraestructura con garantías contractuales.</li>
      </ul>
      <p>Por tu parte, te recomendamos usar una contraseña única, no compartirla y cerrar sesión en equipos ajenos.</p>

      <h2>7. Phishing: cómo reconocernos</h2>
      <p>
        {company.tradeName} <strong>nunca</strong> te solicitará por correo electrónico, teléfono o mensaje el número
        completo de tu tarjeta, el CVV, tu contraseña ni los códigos de verificación de tu banco. Si recibes una
        comunicación sospechosa que dice provenir de nosotros, no respondas y reenvíala a {company.email}.
      </p>

      <h2>8. Protección de datos</h2>
      <p>
        El tratamiento de los datos asociados a los pagos y a tu cuenta se describe en la{' '}
        <Link href='/privacidad'>política de privacidad</Link>. Las cookies utilizadas y su finalidad se detallan en la{' '}
        <Link href='/cookies'>política de cookies</Link>.
      </p>

      <h2>9. Notificación de incidentes</h2>
      <p>
        En caso de que se produjera una brecha de seguridad que afectara a tus datos personales,{' '}
        {company.tradeName} la notificará a la Agencia Española de Protección de Datos en un plazo máximo de 72 horas y,
        cuando entrañe un alto riesgo para tus derechos, te lo comunicará también a ti sin dilación indebida.
      </p>
    </LegalDoc>
  );
}
