import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalDoc } from '@/features/legal/components/legal-doc';
import { legalConfig } from '@/features/legal/legal-config';

export const metadata: Metadata = {
  title: 'Entrega y envíos | Secret Key',
  description:
    'Plazos de activación de los servicios digitales de Secret Key y condiciones de envío de cualquier elemento físico asociado a la membresía.',
};

export default function EnviosPage() {
  const { company, brand } = legalConfig;

  return (
    <LegalDoc
      title='Entrega y envíos'
      intro='Cómo y cuándo se entrega lo que contratas: activación de los servicios digitales y, en su caso, envío de elementos físicos.'
    >
      <h2>1. Naturaleza de los servicios</h2>
      <p>
        {brand.name} presta servicios digitales y experienciales: acceso a una plataforma privada, gestión de reservas y
        organización de experiencias. Por su naturaleza, <strong>la entrega es electrónica</strong> y no requiere envío
        postal en la mayoría de los casos.
      </p>

      <h2>2. Activación de la membresía</h2>
      <p>
        El acceso a la plataforma se activa <strong>de forma inmediata</strong> tras la confirmación del pago por parte
        de la entidad financiera. En paralelo se envía al correo asociado a la cuenta:
      </p>
      <ul>
        <li>La confirmación del pedido, con el detalle de lo contratado.</li>
        <li>Las credenciales o el enlace de acceso al área privada.</li>
        <li>La factura electrónica.</li>
      </ul>
      <p>
        Si transcurridos <strong>30 minutos</strong> no has recibido la confirmación, revisa la carpeta de correo no
        deseado y, si no aparece, escribe a {company.email}: lo resolvemos sin coste.
      </p>

      <h2>3. Entrega de experiencias y reservas</h2>
      <p>
        Cada reserva confirmada genera un justificante electrónico (bono, entrada o confirmación) que se envía por
        correo electrónico y queda disponible en el área privada del miembro, habitualmente de forma inmediata y, en
        todo caso, <strong>antes de la fecha de la experiencia</strong>.
      </p>
      <p>
        La ficha de cada experiencia indica el lugar, la fecha, la hora y las instrucciones de acceso. Cualquier cambio
        se comunica por correo electrónico con la mayor antelación posible, con las alternativas descritas en{' '}
        <Link href='/cancelacion'>cancelación de pedidos</Link>.
      </p>

      <h2>4. Envío de elementos físicos</h2>
      <p>
        Cuando un servicio incluya la entrega de algún elemento físico (tarjeta de miembro, obsequio de bienvenida,
        material asociado a una experiencia), aplican las siguientes condiciones:
      </p>
      <table>
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Condiciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ámbito de envío</td>
            <td>Territorio español (península, Baleares, Canarias, Ceuta y Melilla)</td>
          </tr>
          <tr>
            <td>Plazo de preparación</td>
            <td>Hasta 3 días hábiles desde la confirmación del pedido</td>
          </tr>
          <tr>
            <td>Plazo de entrega</td>
            <td>2 a 5 días hábiles en península; hasta 10 días hábiles en el resto del territorio</td>
          </tr>
          <tr>
            <td>Plazo máximo legal</td>
            <td>30 días naturales desde la celebración del contrato, salvo pacto expreso distinto</td>
          </tr>
          <tr>
            <td>Gastos de envío</td>
            <td>Incluidos en el precio, salvo que se indique lo contrario antes de confirmar el pedido</td>
          </tr>
          <tr>
            <td>Seguimiento</td>
            <td>Número de seguimiento remitido por correo electrónico al salir el envío</td>
          </tr>
        </tbody>
      </table>

      <h2>5. Incidencias en la entrega</h2>
      <p>
        Si el envío llega dañado, incompleto o no llega en el plazo indicado, comunícalo a {company.email} en cuanto lo
        detectes. {company.tradeName} repondrá el elemento sin coste o reembolsará el importe correspondiente, a tu
        elección.
      </p>
      <p>
        Si {company.tradeName} incumpliera el plazo de entrega, podrás emplazarle a entregar en un plazo adicional
        adecuado a las circunstancias y, si tampoco se cumpliera, resolver el contrato con derecho al reembolso íntegro,
        conforme al artículo 66 bis del Real Decreto Legislativo 1/2007.
      </p>

      <h2>6. Dirección de entrega</h2>
      <p>
        El miembro es responsable de la exactitud de la dirección facilitada. Si una entrega resulta fallida por datos
        incorrectos o por ausencia reiterada, {company.tradeName} contactará para acordar un nuevo envío; los costes de
        una segunda expedición por causa imputable al miembro podrán repercutirse, informándolo previamente.
      </p>

      <h2>7. Devoluciones</h2>
      <p>
        Las condiciones para devolver un elemento físico y obtener el reembolso se detallan en{' '}
        <Link href='/devoluciones'>devoluciones y reembolsos</Link>.
      </p>
    </LegalDoc>
  );
}
