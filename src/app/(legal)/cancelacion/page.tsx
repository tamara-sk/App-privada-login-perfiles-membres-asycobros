import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalDoc } from '@/features/legal/components/legal-doc';
import { legalConfig } from '@/features/legal/legal-config';

export const metadata: Metadata = {
  title: 'Cancelación de pedidos | Secret Key',
  description:
    'Cómo cancelar una reserva, una experiencia o la renovación de la membresía de Secret Key: plazos, procedimiento y efectos.',
};

export default function CancelacionPage() {
  const { company } = legalConfig;

  return (
    <LegalDoc
      title='Cancelación de pedidos'
      intro='Plazos y procedimiento para cancelar una reserva, una experiencia o la renovación de la membresía.'
    >
      <h2>1. Alcance</h2>
      <p>
        Esta política regula la cancelación de los pedidos realizados en el Sitio. Es complementaria de los{' '}
        <Link href='/terminos-y-condiciones'>términos y condiciones</Link> y de la política de{' '}
        <Link href='/devoluciones'>devoluciones y reembolsos</Link>, que regula el derecho de desistimiento y la
        devolución de los importes.
      </p>

      <h2>2. Cancelación antes de que se procese el pedido</h2>
      <p>
        Mientras el pedido no haya sido confirmado y cobrado, puede cancelarse sin coste alguno desde el propio proceso
        de compra o escribiendo a {company.email}. Si el cargo ya se hubiera realizado, se reembolsa íntegramente por el
        mismo medio de pago.
      </p>

      <h2>3. Cancelación de la membresía</h2>
      <h3>3.1. Cómo cancelar</h3>
      <p>
        El usuario puede cancelar la renovación en cualquier momento, sin penalización y sin necesidad de justificar el
        motivo, por cualquiera de estas vías:
      </p>
      <ul>
        <li>Desde su área privada, en la sección de gestión de la suscripción.</li>
        <li>Escribiendo a {company.email} desde la dirección asociada a su cuenta.</li>
        <li>Llamando al {company.phone} en horario de atención.</li>
      </ul>

      <h3>3.2. Efectos</h3>
      <p>
        La cancelación impide la renovación siguiente, pero el usuario conserva el acceso a todos los servicios hasta el
        final del periodo ya abonado. No se practican devoluciones proporcionales del periodo en curso, salvo en los
        supuestos de desistimiento o de incumplimiento descritos en{' '}
        <Link href='/devoluciones'>devoluciones y reembolsos</Link>.
      </p>
      <p>
        Para que la cancelación evite el siguiente cargo, debe solicitarse con al menos <strong>24 horas</strong> de
        antelación a la fecha de renovación. Si se solicita después de haberse emitido el cargo, se reembolsa el importe
        del nuevo periodo siempre que no se hayan utilizado servicios de ese periodo.
      </p>

      <h2>4. Cancelación de experiencias y reservas</h2>
      <p>
        Cada experiencia indica en su ficha, antes de la reserva, su política de cancelación y el plazo aplicable. Salvo
        que la ficha establezca otra cosa, aplican los siguientes plazos generales:
      </p>
      <table>
        <thead>
          <tr>
            <th>Antelación de la cancelación</th>
            <th>Importe reembolsado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Más de 7 días naturales antes de la fecha</td>
            <td>100 % del importe</td>
          </tr>
          <tr>
            <td>Entre 7 días y 48 horas antes</td>
            <td>50 % del importe, o 100 % en crédito para futuras experiencias</td>
          </tr>
          <tr>
            <td>Menos de 48 horas antes o no presentación</td>
            <td>Sin reembolso, salvo causa de fuerza mayor acreditada</td>
          </tr>
        </tbody>
      </table>
      <p>
        Estos plazos responden a los compromisos adquiridos con los proveedores (reservas, aforos y servicios
        personalizados) y se informan siempre antes de confirmar la reserva.
      </p>

      <h2>5. Cancelación por parte de Secret Key</h2>
      <p>
        Si {company.tradeName} o el proveedor tuvieran que cancelar una experiencia, se comunicará al usuario con la
        mayor antelación posible y podrá elegir entre:
      </p>
      <ul>
        <li>Una nueva fecha para la misma experiencia.</li>
        <li>Una experiencia alternativa de valor equivalente.</li>
        <li>El reembolso íntegro del importe abonado.</li>
      </ul>
      <p>El reembolso se tramita en un máximo de 14 días naturales por el mismo medio de pago utilizado.</p>

      <h2>6. Fuerza mayor</h2>
      <p>
        En casos de fuerza mayor debidamente acreditados (enfermedad grave, fallecimiento de un familiar, catástrofe,
        prohibición administrativa u otras circunstancias equivalentes), {company.tradeName} estudiará cada caso de
        forma individual y ofrecerá el cambio de fecha o el reembolso, aunque se hayan superado los plazos generales.
      </p>

      <h2>7. Confirmación</h2>
      <p>
        Toda cancelación se confirma por correo electrónico, con indicación de la fecha efectiva y del importe a
        reembolsar, si lo hubiera. Si no recibes esa confirmación, escribe a {company.email} para verificar que la
        solicitud se ha registrado.
      </p>
    </LegalDoc>
  );
}
