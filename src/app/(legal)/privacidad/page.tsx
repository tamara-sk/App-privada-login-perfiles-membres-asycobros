import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalDoc } from '@/features/legal/components/legal-doc';
import { formatAddress, legalConfig } from '@/features/legal/legal-config';

export const metadata: Metadata = {
  title: 'Política de privacidad | Secret Key',
  description:
    'Responsable del tratamiento, finalidades, base jurídica, destinatarios, plazos de conservación y derechos RGPD en Secret Key.',
};

export default function PrivacidadPage() {
  const { company, dataProtection, payments, processors } = legalConfig;
  const privacyEmail = dataProtection.privacyEmail;

  return (
    <LegalDoc
      title='Política de privacidad'
      intro='Información sobre el tratamiento de tus datos personales conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).'
    >
      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>
          <strong>Identidad:</strong> {company.legalName} (NIF {company.taxId})
        </li>
        <li>
          <strong>Domicilio:</strong> {formatAddress()}
        </li>
        <li>
          <strong>Correo electrónico:</strong> {company.email}
        </li>
        <li>
          <strong>Ejercicio de derechos:</strong> {privacyEmail}
        </li>
        {dataProtection.dpo && (
          <li>
            <strong>Delegado de Protección de Datos:</strong> {dataProtection.dpo.name} ({dataProtection.dpo.email})
          </li>
        )}
      </ul>

      <h2>2. Datos que tratamos</h2>
      <ul>
        <li>
          <strong>Datos identificativos y de contacto:</strong> nombre y apellidos, correo electrónico, teléfono y, en
          su caso, dirección postal.
        </li>
        <li>
          <strong>Datos de la cuenta:</strong> credenciales de acceso (la contraseña se almacena cifrada), preferencias
          de perfil e historial de actividad dentro de la plataforma.
        </li>
        <li>
          <strong>Datos de facturación y pago:</strong> datos fiscales, historial de pedidos, importe, fecha y
          resultado de la operación y los últimos dígitos de la tarjeta.{' '}
          <strong>No tratamos el número completo de la tarjeta ni el CVV</strong>, que se introducen directamente en el
          entorno seguro de la entidad financiera.
        </li>
        <li>
          <strong>Datos de las experiencias:</strong> reservas, asistencia, preferencias y, si tú nos las facilitas,
          necesidades específicas (por ejemplo, alergias o restricciones alimentarias), que trataremos con tu
          consentimiento explícito y únicamente para poder prestarte el servicio.
        </li>
        <li>
          <strong>Datos de navegación:</strong> dirección IP, tipo de dispositivo y navegador y páginas visitadas, en
          los términos de la <Link href='/cookies'>política de cookies</Link>.
        </li>
      </ul>

      <h2>3. Finalidades, base jurídica y conservación</h2>
      <table>
        <thead>
          <tr>
            <th>Finalidad</th>
            <th>Base jurídica</th>
            <th>Conservación</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gestionar el alta, la cuenta y el acceso a la plataforma</td>
            <td>Ejecución del contrato (art. 6.1.b RGPD)</td>
            <td>Mientras la cuenta esté activa</td>
          </tr>
          <tr>
            <td>Gestionar la contratación, las reservas y la prestación de las experiencias</td>
            <td>Ejecución del contrato (art. 6.1.b RGPD)</td>
            <td>Duración de la relación contractual</td>
          </tr>
          <tr>
            <td>Tramitar cobros, facturación y devoluciones</td>
            <td>Ejecución del contrato y obligación legal (arts. 6.1.b y 6.1.c RGPD)</td>
            <td>6 años (art. 30 Código de Comercio) y 4 años a efectos fiscales</td>
          </tr>
          <tr>
            <td>Atender consultas, incidencias y reclamaciones</td>
            <td>Ejecución del contrato e interés legítimo (arts. 6.1.b y 6.1.f RGPD)</td>
            <td>Hasta la resolución y los plazos de prescripción aplicables</td>
          </tr>
          <tr>
            <td>Prevenir el fraude y garantizar la seguridad de la plataforma</td>
            <td>Interés legítimo y obligación legal (arts. 6.1.f y 6.1.c RGPD)</td>
            <td>Hasta 1 año los registros de acceso, salvo incidencia</td>
          </tr>
          <tr>
            <td>Enviar comunicaciones comerciales y novedades de la membresía</td>
            <td>Consentimiento o interés legítimo en servicios similares (arts. 6.1.a y 6.1.f RGPD; art. 21 LSSI)</td>
            <td>Hasta que retires el consentimiento o te opongas</td>
          </tr>
          <tr>
            <td>Analizar el uso del sitio y mejorar el servicio</td>
            <td>Consentimiento para cookies no necesarias (art. 6.1.a RGPD; art. 22.2 LSSI)</td>
            <td>Según la duración indicada en la política de cookies</td>
          </tr>
        </tbody>
      </table>
      <p>
        Finalizados los plazos indicados, los datos se conservan bloqueados a disposición de jueces, tribunales y
        administraciones públicas durante los plazos de prescripción de las acciones, y después se suprimen.
      </p>

      <h2>4. Destinatarios de los datos</h2>
      <p>
        No se ceden datos a terceros salvo obligación legal. Sí acceden a ellos, como encargados del tratamiento y bajo
        contrato conforme al artículo 28 del RGPD, los proveedores necesarios para prestar el servicio:
      </p>
      <ul>
        <li>
          <strong>Entidad financiera y pasarela de pago:</strong> {payments.acquirer} y {payments.gateway}, para el
          procesamiento de los cobros y devoluciones
          {payments.ipsp ? `, así como ${payments.ipsp.legalName} como proveedor de servicios de pago` : ''}.
        </li>
        <li>
          <strong>Proveedores de las experiencias</strong> (restaurantes, hoteles, organizadores, servicios de
          asistencia): reciben únicamente los datos imprescindibles para prestar la experiencia que has reservado.
        </li>
        <li>
          <strong>Asesoría fiscal y contable</strong> y, en su caso, asesoría jurídica.
        </li>
      </ul>
      <p>
        Los proveedores tecnológicos que intervienen en la prestación del servicio son los siguientes:
      </p>
      <table>
        <thead>
          <tr>
            <th>Proveedor</th>
            <th>Función</th>
            <th>Ubicación</th>
            <th>Garantía de la transferencia</th>
          </tr>
        </thead>
        <tbody>
          {processors.map((processor) => (
            <tr key={processor.name}>
              <td>{processor.name}</td>
              <td>{processor.role}</td>
              <td>{processor.location}</td>
              <td>{processor.guarantee}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Algunos proveedores pueden estar ubicados fuera del Espacio Económico Europeo. En ese caso, las transferencias
        internacionales se amparan en una decisión de adecuación de la Comisión Europea o en cláusulas contractuales
        tipo, con las garantías adicionales que resulten necesarias. Puedes solicitar información sobre dichas garantías
        en {privacyEmail}.
      </p>

      <h2>5. Tus derechos</h2>
      <p>Puedes ejercer en cualquier momento los siguientes derechos:</p>
      <ul>
        <li>
          <strong>Acceso:</strong> conocer qué datos tuyos tratamos.
        </li>
        <li>
          <strong>Rectificación:</strong> corregir datos inexactos o incompletos.
        </li>
        <li>
          <strong>Supresión:</strong> solicitar que se eliminen cuando ya no sean necesarios.
        </li>
        <li>
          <strong>Oposición:</strong> oponerte a tratamientos basados en interés legítimo, incluida la mercadotecnia
          directa.
        </li>
        <li>
          <strong>Limitación:</strong> solicitar que se restrinja el tratamiento en los supuestos previstos.
        </li>
        <li>
          <strong>Portabilidad:</strong> recibir tus datos en formato estructurado y de uso común, o que se transmitan a
          otro responsable.
        </li>
        <li>
          <strong>Retirada del consentimiento:</strong> en cualquier momento, sin que afecte a la licitud del
          tratamiento previo.
        </li>
      </ul>
      <p>
        Para ejercerlos, escribe a {privacyEmail} indicando el derecho que deseas ejercer y adjuntando copia de un
        documento que acredite tu identidad. Responderemos en el plazo máximo de un mes, prorrogable por dos meses más
        en casos de especial complejidad.
      </p>
      <p>
        Si consideras que no hemos atendido correctamente tu solicitud, puedes presentar una reclamación ante la{' '}
        <a href={dataProtection.supervisoryAuthority.url} target='_blank' rel='noopener noreferrer'>
          {dataProtection.supervisoryAuthority.name}
        </a>{' '}
        ({dataProtection.supervisoryAuthority.address}).
      </p>

      <h2>6. Obligación de facilitar los datos</h2>
      <p>
        Los datos marcados como obligatorios en los formularios son necesarios para dar de alta la cuenta y prestar el
        servicio; si no los facilitas, no podremos formalizar la contratación. El resto de datos son opcionales y su
        finalidad es personalizar tu experiencia.
      </p>

      <h2>7. Menores de edad</h2>
      <p>
        Los servicios están dirigidos exclusivamente a mayores de edad. No recabamos conscientemente datos de menores;
        si detectamos que se han facilitado, los suprimiremos.
      </p>

      <h2>8. Decisiones automatizadas</h2>
      <p>
        No se adoptan decisiones automatizadas con efectos jurídicos ni elaboración de perfiles con impacto
        significativo. Los sistemas antifraude de la entidad financiera pueden rechazar una operación concreta; en tal
        caso puedes solicitar la revisión humana escribiendo a {company.email}.
      </p>

      <h2>9. Medidas de seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas apropiadas al riesgo (cifrado en tránsito, control de accesos por
        perfiles, copias de seguridad, registro de actividad y contratos de encargo con todos los proveedores),
        conforme al artículo 32 del RGPD. Puedes consultar el detalle en{' '}
        <Link href='/seguridad-de-pago'>seguridad y protección al comprador</Link>.
      </p>

      <h2>10. Cambios en esta política</h2>
      <p>
        Esta política puede actualizarse para adaptarse a cambios normativos o del servicio. Si los cambios son
        sustanciales, se te comunicarán por correo electrónico o mediante un aviso destacado en el Sitio.
      </p>
    </LegalDoc>
  );
}
