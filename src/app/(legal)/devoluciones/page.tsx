import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalDoc } from '@/features/legal/components/legal-doc';
import { formatAddress, legalConfig } from '@/features/legal/legal-config';

export const metadata: Metadata = {
  title: 'Devoluciones y reembolsos | Secret Key',
  description:
    'Derecho de desistimiento, supuestos de reembolso, plazos y medio de devolución del importe en Secret Key.',
};

export default function DevolucionesPage() {
  const { company } = legalConfig;

  return (
    <LegalDoc
      title='Devoluciones y reembolsos'
      intro='Derecho de desistimiento, supuestos de reembolso, plazos y forma de devolución del importe.'
    >
      <h2>1. Derecho de desistimiento</h2>
      <p>
        Si contratas como consumidor, dispones de <strong>14 días naturales</strong> desde la celebración del contrato
        para desistir sin necesidad de justificación y sin penalización alguna, conforme a los artículos 102 y
        siguientes del Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de
        la Ley General para la Defensa de los Consumidores y Usuarios.
      </p>
      <p>
        En el caso de bienes físicos, el plazo se cuenta desde el día en que recibes el bien. Para ejercerlo basta con
        una declaración inequívoca dirigida a {company.email}, o mediante el formulario del apartado 4.
      </p>

      <h2>2. Excepciones al derecho de desistimiento</h2>
      <p>Conforme al artículo 103 del Real Decreto Legislativo 1/2007, el desistimiento no procede en:</p>
      <ul>
        <li>
          <strong>Servicios ya ejecutados por completo</strong> cuando la ejecución haya comenzado, con tu consentimiento
          previo y expreso, y con el reconocimiento por tu parte de que pierdes el derecho de desistimiento una vez
          ejecutado el contrato.
        </li>
        <li>
          <strong>Servicios de ocio con fecha o periodo determinado</strong>: entradas, reservas de restaurante,
          alojamiento, transporte, eventos y experiencias contratadas para una fecha concreta. En estos casos se aplica
          la política de <Link href='/cancelacion'>cancelación de pedidos</Link>.
        </li>
        <li>
          <strong>Contenidos digitales</strong> no prestados en soporte material cuya ejecución haya comenzado con tu
          consentimiento previo y expreso y con tu conocimiento de que pierdes el derecho de desistimiento.
        </li>
        <li>Bienes confeccionados conforme a tus especificaciones o claramente personalizados.</li>
      </ul>
      <p>
        Estas excepciones se te recuerdan expresamente en el proceso de compra, antes de confirmar el pedido, y tu
        aceptación queda registrada.
      </p>

      <h2>3. Desistimiento de la membresía ya iniciada</h2>
      <p>
        Si desistes de la membresía dentro del plazo de 14 días pero ya has empezado a usar los servicios con tu
        consentimiento expreso, se te reembolsará el importe abonado descontando la parte proporcional a los servicios
        efectivamente prestados hasta la fecha del desistimiento. Si no has utilizado ningún servicio, el reembolso es
        íntegro.
      </p>

      <h2>4. Formulario de desistimiento</h2>
      <p>
        Puedes utilizar el siguiente modelo, aunque su uso no es obligatorio. Envíalo a {company.email} o por correo
        postal a {formatAddress()}.
      </p>
      <blockquote className='my-4 rounded-lg border border-zinc-800 bg-black p-5 text-sm leading-relaxed text-neutral-300'>
        A la atención de {company.legalName}, {formatAddress()}, {company.email}:
        <br />
        <br />
        Por la presente le comunico que desisto del contrato de prestación del siguiente servicio: ______________.
        <br />
        Pedido número: ______________.
        <br />
        Fecha de contratación: ______________.
        <br />
        Nombre del consumidor: ______________.
        <br />
        Domicilio del consumidor: ______________.
        <br />
        Fecha: ______________.
      </blockquote>

      <h2>5. Otros supuestos de reembolso</h2>
      <p>Con independencia del derecho de desistimiento, se reembolsa el importe abonado cuando:</p>
      <ul>
        <li>{company.tradeName} o el proveedor cancelan una experiencia y no aceptas la alternativa ofrecida.</li>
        <li>El servicio prestado no se corresponde con lo descrito en la ficha de la experiencia.</li>
        <li>Se ha producido un cargo duplicado o erróneo.</li>
        <li>Se ha cobrado una renovación tras haberse solicitado la cancelación en plazo y sin uso del nuevo periodo.</li>
      </ul>

      <h2>6. Plazos y medio de devolución</h2>
      <p>
        {company.tradeName} reembolsa el importe <strong>en un máximo de 14 días naturales</strong> desde que recibe la
        comunicación de desistimiento o desde que se reconoce el derecho al reembolso, utilizando{' '}
        <strong>el mismo medio de pago</strong> empleado en la compra, salvo que acuerdes expresamente otro distinto. La
        devolución no supone ningún gasto para ti.
      </p>
      <p>
        Al tratarse de una devolución sobre la tarjeta a través del TPV Virtual, la fecha en que el abono aparece en el
        extracto depende de la entidad emisora de la tarjeta, habitualmente entre 3 y 10 días hábiles adicionales.
      </p>

      <h2>7. Devolución de bienes físicos</h2>
      <p>
        Si el pedido incluyera algún elemento físico, deberás devolverlo sin demora indebida y, en todo caso, en el
        plazo de 14 días naturales desde que comuniques el desistimiento, en su estado original y con su embalaje.{' '}
        {company.tradeName} podrá retener el reembolso hasta haber recibido el bien o hasta que acredites su devolución.
      </p>

      <h2>8. Reclamaciones</h2>
      <p>
        Si no estás conforme con la resolución de una devolución, escribe a {company.email}: tu reclamación será
        atendida en el plazo máximo de un mes. También puedes acudir a la plataforma europea de resolución de litigios
        en línea en{' '}
        <a href='https://ec.europa.eu/consumers/odr' target='_blank' rel='noopener noreferrer'>
          ec.europa.eu/consumers/odr
        </a>{' '}
        o a los organismos de consumo de tu comunidad autónoma.
      </p>
    </LegalDoc>
  );
}
