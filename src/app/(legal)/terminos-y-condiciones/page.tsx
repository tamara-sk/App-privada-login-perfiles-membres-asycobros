import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalDoc } from '@/features/legal/components/legal-doc';
import { formatAddress, legalConfig } from '@/features/legal/legal-config';

export const metadata: Metadata = {
  title: 'Términos y condiciones | Secret Key',
  description:
    'Condiciones generales de contratación de la membresía y de las experiencias de Secret Key: proceso de compra, precios, pago, duración, cancelación y desistimiento.',
};

export default function TerminosPage() {
  const { company, brand, payments } = legalConfig;

  return (
    <LegalDoc
      title='Términos y condiciones'
      intro='Condiciones generales de contratación aplicables a la membresía y a las experiencias contratadas a través de este sitio.'
    >
      <h2>1. Identificación del prestador</h2>
      <p>
        El titular del sitio y prestador de los servicios es <strong>{company.legalName}</strong>, con NIF{' '}
        {company.taxId} y domicilio en {formatAddress()}. Puedes contactar en {company.email} o en el teléfono{' '}
        {company.phone}. El detalle completo figura en el <Link href='/aviso-legal'>aviso legal</Link>.
      </p>

      <h2>2. Objeto</h2>
      <p>
        Estas condiciones regulan la contratación, a través del Sitio, de los servicios de {brand.name}: el acceso a la
        membresía y la reserva de experiencias, servicios y beneficios asociados a ella. La contratación se realiza en
        español.
      </p>

      <h2>3. Capacidad y acceso al Círculo</h2>
      <p>
        Para contratar es necesario ser mayor de edad y tener capacidad legal suficiente. El alta requiere crear una
        cuenta con una dirección de correo electrónico válida y facilitar datos veraces y actualizados. Las credenciales
        son personales e intransferibles, y el usuario es responsable de su custodia.
      </p>
      <p>
        {company.tradeName} podrá denegar o revocar el acceso cuando exista incumplimiento de estas condiciones, impago,
        uso fraudulento o conducta que perjudique a otros usuarios o a los proveedores de experiencias.
      </p>

      <h2>4. Proceso de contratación</h2>
      <p>Conforme a los artículos 27 y 28 de la LSSI-CE, el procedimiento es el siguiente:</p>
      <ol>
        <li>Selección del plan de membresía o de la experiencia y revisión de su descripción y precio.</li>
        <li>Identificación o registro.</li>
        <li>
          Revisión del pedido, aceptación expresa de estas condiciones y de la{' '}
          <Link href='/privacidad'>política de privacidad</Link>, y confirmación del pedido mediante un botón que indica
          claramente la obligación de pago.
        </li>
        <li>Pago mediante el TPV Virtual, con autenticación reforzada del titular de la tarjeta.</li>
        <li>
          Confirmación del pedido por correo electrónico en un plazo máximo de 24 horas, con el detalle de lo contratado
          y un ejemplar de estas condiciones. Esa confirmación, junto con la factura, constituye el justificante de la
          operación.
        </li>
      </ol>
      <p>
        Antes de confirmar, el usuario puede revisar y modificar los datos introducidos o cancelar el proceso. El
        documento electrónico de formalización queda archivado y el usuario puede solicitar copia en {company.email}.
      </p>

      <h2>5. Precios, impuestos y facturación</h2>
      <p>
        Los precios vigentes son los publicados en la página de <Link href='/pricing'>precios</Link> y en la ficha de
        cada experiencia en el momento de la contratación. Se expresan en euros e incluyen los impuestos indirectos que
        resulten aplicables, salvo que se indique lo contrario de forma expresa.
      </p>
      <p>
        {company.tradeName} puede modificar sus precios en cualquier momento, pero el precio aplicable es siempre el
        vigente al confirmar el pedido. En las membresías con renovación automática, cualquier cambio de precio se
        comunica con al menos 30 días de antelación a la fecha de renovación, pudiendo el usuario cancelar antes de que
        surta efecto.
      </p>
      <p>La factura se emite en formato electrónico y se envía al correo asociado a la cuenta.</p>

      <h2>6. Formas de pago</h2>
      <p>
        El pago se realiza con tarjeta ({payments.methods.join(', ')}) a través del TPV Virtual de {payments.acquirer},
        operado por {payments.gateway}.
        {payments.ipsp ? ` La operativa se canaliza a través de ${payments.ipsp.legalName} (${payments.ipsp.role}).` : ''}
      </p>
      <p>
        {company.tradeName} no almacena los datos completos de la tarjeta: se introducen en el entorno seguro de la
        entidad financiera. Más información en{' '}
        <Link href='/seguridad-de-pago'>seguridad y protección al comprador</Link>.
      </p>
      <p>
        Si el cargo es rechazado o resulta impagado, el pedido podrá quedar sin efecto y el acceso a la membresía
        suspendido hasta su regularización.
      </p>

      <h2>7. Duración y renovación de la membresía</h2>
      <p>
        La membresía se contrata por el periodo indicado en el plan elegido y se renueva automáticamente por periodos
        iguales, salvo cancelación previa. Antes de cada renovación se remite un recordatorio con la fecha y el importe.
      </p>
      <p>
        El usuario puede desactivar la renovación en cualquier momento desde su área privada o escribiendo a{' '}
        {company.email}, con los efectos descritos en <Link href='/cancelacion'>cancelación de pedidos</Link>.
      </p>

      <h2>8. Prestación del servicio y disponibilidad de las experiencias</h2>
      <p>
        El acceso a la plataforma se activa inmediatamente tras la confirmación del pago. Las experiencias están sujetas
        a disponibilidad, a aforo y a las condiciones particulares de cada proveedor, que se detallan en la ficha
        correspondiente antes de reservar.
      </p>
      <p>
        Si una experiencia no pudiera prestarse por causa imputable a {company.tradeName} o al proveedor,{' '}
        {company.tradeName} ofrecerá una alternativa equivalente o el reembolso íntegro del importe, a elección del
        usuario, conforme a <Link href='/devoluciones'>devoluciones y reembolsos</Link>. Los plazos de entrega y
        activación se detallan en <Link href='/envios'>entrega y envíos</Link>.
      </p>

      <h2>9. Cancelación, desistimiento y reembolsos</h2>
      <p>
        El consumidor dispone del derecho de desistimiento de 14 días naturales previsto en el Real Decreto Legislativo
        1/2007, con las excepciones legalmente establecidas. Las condiciones, el formulario y los plazos de devolución
        se detallan en <Link href='/devoluciones'>devoluciones y reembolsos</Link> y en{' '}
        <Link href='/cancelacion'>cancelación de pedidos</Link>, que forman parte integrante de estas condiciones.
      </p>

      <h2>10. Obligaciones del usuario</h2>
      <ul>
        <li>Utilizar los servicios de forma personal; la membresía no es transferible salvo autorización expresa.</li>
        <li>Respetar las normas de cada experiencia, del proveedor y del espacio en el que se desarrolle.</li>
        <li>Comunicar con antelación cualquier imposibilidad de asistir a una reserva confirmada.</li>
        <li>Mantener un trato respetuoso con el resto del Círculo, los proveedores y el equipo de {brand.name}.</li>
      </ul>

      <h2>11. Responsabilidad</h2>
      <p>
        {company.tradeName} responde de la correcta prestación de los servicios contratados conforme a la normativa de
        consumo. No responde de los daños derivados de un uso indebido de los servicios por el usuario, del
        incumplimiento de las normas de una experiencia, ni de acontecimientos de fuerza mayor.
      </p>
      <p>
        Cuando {company.tradeName} actúe como intermediario en el acceso a servicios prestados por terceros, dicha
        condición se indica expresamente en la ficha de la experiencia.
      </p>

      <h2>12. Modificación de las condiciones</h2>
      <p>
        {company.tradeName} puede modificar estas condiciones por motivos legales, técnicos o de negocio. Las
        modificaciones se comunican con al menos 30 días de antelación a los usuarios con contrato en vigor, que podrán
        resolver el contrato sin penalización si no las aceptan. A los pedidos ya confirmados se les aplican las
        condiciones vigentes en el momento de la contratación.
      </p>

      <h2>13. Nulidad parcial</h2>
      <p>
        Si alguna cláusula fuera declarada nula o inaplicable, el resto de condiciones mantendrá su validez, y la
        cláusula afectada se sustituirá por otra de efectos equivalentes conforme a derecho.
      </p>

      <h2>14. Ley aplicable, reclamaciones y resolución de litigios</h2>
      <p>
        Estas condiciones se rigen por la legislación española. Cualquier reclamación puede dirigirse a {company.email}{' '}
        y será atendida en el plazo máximo de un mes.
      </p>
      <p>
        El consumidor puede acudir a la plataforma europea de resolución de litigios en línea en{' '}
        <a href='https://ec.europa.eu/consumers/odr' target='_blank' rel='noopener noreferrer'>
          ec.europa.eu/consumers/odr
        </a>
        , así como a los organismos de consumo de su comunidad autónoma. En caso de litigio, serán competentes los
        juzgados del domicilio del consumidor.
      </p>
    </LegalDoc>
  );
}
