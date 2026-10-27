# Canon v4 para GHL — pegar en su memoria

Fuente: SK Master Context v4 (Notion, 25 oct 2026, cerrado la noche del 26 oct). Sustituye
al catálogo del 19 oct, al prompt del 27 oct y a toda versión anterior. Si algo choca,
manda este bloque.

## 1. Entradas al Círculo (miembros)

| Tier       | Precio                                                                        | Qué incluye                                                                                                                                                    |
| ---------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Key        | 0 €                                                                           | Entrada al ecosistema y a la app. Precio público en experiencias                                                                                               |
| Secret Key | 99 €/año para quien entra antes del 1 ene 2027. Después, 220 €/año o 20 €/mes | Precio de miembro en experiencias y SK Store, Llavecitas a ritmo 2×, Secret Circle de su chapter                                                               |
| Master Key | 2.500 €/año o 390 €/mes                                                       | Todo lo de Secret Key, una experiencia de capa alta en un SKWR (Miami, Bali u otro), dos experiencias de un día en el chapter que elija, Llavecitas a ritmo 5× |
| Wisdom Key | 4.300 €/año                                                                   | Todo lo de Master Key, la capa alta de dos SKWR al año, seguimiento personal durante doce meses                                                                |

- El cuarto tier se llama «Wisdom Key» (decidido el 27 oct 2026). La Llavecita vale 0,10 €.
- Se escribe «Master Key», sin tilde en Master.
- Corte del precio de 99 €: último día 31 dic 2026 (hora de Madrid). Desde el 1 ene 2027 rige 220 €/año.
- Los 99 € son la promoción de fin de año para quien entra como Secret Key. En enero de 2027 el precio sube a 220 €/año. Se comunica como el precio de esta temporada.
- Anual es la opción que se recomienda; el mensual existe para quien lo prefiera.
- Cobro mensual y renovación automática: pendientes de «pago por referencia» en BBVA. Hasta entonces el pago es manual.

## 2. Partners (facilitadores, venues, sponsors)

Una sola escalera de cuatro tiers. La comisión es lo que Secret Key retiene de cada venta hecha a través de SK, según el tier de quien vende.

| Tier       | Cuota anual de partner  | Comisión de SK |
| ---------- | ----------------------- | -------------- |
| Key        | 0 €                     | 30 %           |
| Secret Key | 290 €                   | 20 %           |
| Master Key | 890 €                   | 15 %           |
| Wisdom Key | Pack SK Ads (sección 3) | 10 %           |

- Todo partner cede al Círculo al menos una experiencia o beneficio de cortesía, canjeable con Llavecitas.
- La comisión mínima es el 10 %.
- «Key Partner» y «Top Key» quedan retirados. El cuarto tier de partner, «Wisdom Key», es el pack SK Ads. El «Super Key» a 290 € del catálogo anterior queda retirado.
- Comisiones de partner y condiciones de miembro son sistemas separados.

## 3. SK Ads (agente, CRM, bots, cuenta de GHL y automatizaciones)

| Pack      | Mensual | Alta    |
| --------- | ------- | ------- |
| Essential | 150 €   | 997 €   |
| Growth    | 250 €   | 1.997 € |
| Signature | 350 €   | 2.997 € |

Agente de IA adicional: 150 €/mes. SK Guest Journey (agente para anfitriones) se vende aparte.

## 4. Llavecitas y Sigils

- Una Llavecita vale siempre 0,10 € (confirmado el 27 oct 2026). Por la misma acción: Key gana 0,1×, Secret Key 2×, Master Key 5×.
- Cubren hasta el 30 % de cada compra. En renovación y subida de tier, hasta el 100 %.
- Caducan a los 12 meses, con aviso 30 días antes, y se prorrogan 12 meses cada vez que el miembro reserva una experiencia.
- Sigils: los otorga el Círculo, los verifican los pares. Ilimitados, sin valor monetario, sin niveles.

## 5. Acceso: solicitar primero, pagar dentro

1. «Solicitar acceso» abre tres preguntas: quién eres (cargo o ubicación), qué aportas al Círculo, qué aportas a la naturaleza.
2. El workflow de Kumkum aprueba automáticamente. Un humano decide un rechazo y la persona puede volver a intentarlo.
3. SK, el board y los miembros del Círculo pueden vetar a personas y empresas. El veto cierra la solicitud sin reintento.
4. Con la solicitud aprobada, la persona paga el tier que quiera desde dentro.
5. GHL avisa 10 días antes del vencimiento. Si no se renueva, el servicio se corta hasta el pago.
6. La web recibe el estado en `POST /api/solicitudes/estado` con `Authorization: Bearer <APPLICATIONS_WEBHOOK_SECRET>` y cuerpo `{ "email": "...", "status": "approved" | "rejected" | "vetoed" | "pending" }`.

## 6. Calendario publicable (v4)

| Fecha                                      | Experiencia                               | Chapter |
| ------------------------------------------ | ----------------------------------------- | ------- |
| 9–16 dic 2026                              | The Radiance                              | Bali    |
| 29–31 ene 2027 (Full Circle: 28 ene–1 feb) | Miami Magic · Conscious Investments       | Miami   |
| 10 mar 2027                                | The Radiance, segunda edición, tras Nyepi | Bali    |

## 7. Qué actualizar en GHL

- Agency Level → Products: sustituir el catálogo del 19 oct por las secciones 1–3.
- Espejo `price_catalog` en Supabase: mismos importes.
- Plantillas de email: corregir «99 euros al mes» y «390 euros al mes» del email «Los tres niveles de la llave» (25 oct). Secret Key es 99 €/año; Master Key 2.500 €/año.
- Formulario de acceso: las tres preguntas de la sección 5.
- Fechas de The Radiance y Miami: las de la sección 6.

## 8. Abierto en v4 (no inventar)

- Renovación de quien entra a 99 €: ¿paga 220 € al renovar o mantiene el precio?
- Mensual de Secret Key antes del 1 ene 2027.
- Margen de los extras de Master Key y Wisdom Key (seguimiento personal, jornadas de un día); mensual de Master Key (390 €/mes son 4.680 €/año).
- Tabla de acciones de Llavecitas y regalo de bienvenida.
- Descuentos de miembro (v3: 10 % y 20 %).
- Nombre de la capa alta de The Radiance.
- Definición de «marketplace»: sin definición aprobada; no se usa en ningún texto.

## 9. Léxico y tono

- Se dice: Secret Circle / el Círculo, Clauer, Keyholder, Chapter, Experiencia, Trusted Place, SK Alchemy, Llavecitas, Sigils.
- Retirados: lujo/luxury, exclusivo como reclamo, curated/curado (se dice «secret» o «seleccionadas»), club, Keybearer, Guardián, Inner Circle, Free como nombre de tier, lenguaje de startup (launch, beta, founding members, early adopters), guiones largos, exclamaciones y emoji en copy de marca.
- El 99 € se comunica como el precio de esta temporada, con la puerta abierta hasta el 31 dic y sin cuenta atrás.
- En público no se menciona el número de plazas. El mínimo operativo de 6 personas es interno.
- Toda frase se escribe en afirmativo.

## 10. Captación en GHL: sponsors y clientes de los SKWR

El foco comercial de GHL es llenar los SKWR (retiros) con dos públicos: sponsors y clientes.

**Sponsors**

- Entran por la escalera de partners (sección 2) y ceden al Círculo al menos una experiencia o beneficio de cortesía.
- Un formulario de captación propio, con el tono de marca y sin mencionar nunca número de plazas ni de sponsors.
- Seguimiento: confirmación inmediata, conversación con el equipo, propuesta, acuerdo.
- Pendiente de precio: la aportación de un sponsor a cada SKWR (NO CONFIRMADO).

**Clientes de los SKWR**

- Entrada: «Solicitar acceso» (sección 5). Con la solicitud aprobada, reserva de la experiencia con precio de miembro.
- Capa alta de cada SKWR: la incluyen Master Key (una) y Wisdom Key (dos al año).
- Precio público de The Radiance: 1.900 € y 2.500 € la capa alta, alojamiento incluido. Miami Magic y Full Circle: NO CONFIRMADO.
- Una experiencia sale con 6 personas como mínimo. Dato interno, nunca público.

## 11. Calendario de experiencias

Confirmado:

| Fecha                                      | Experiencia                         | Chapter |
| ------------------------------------------ | ----------------------------------- | ------- |
| 9–16 dic 2026                              | The Radiance                        | Bali    |
| 29–31 ene 2027 (Full Circle: 28 ene–1 feb) | Miami Magic · Conscious Investments | Miami   |
| 10 mar 2027                                | The Radiance, segunda edición       | Bali    |

Para 2027, el calendario se completa con las experiencias que Tamara confirme: nombre, chapter, fechas, precio público y capa alta. Cada línea se publica solo con esos cinco datos.

## 12. Gala benéfica y de Sigils, 2027

- Se planifica para 2027 y se presenta a la candidatura de impacto social.
- Estado: planificada, sin fecha, lugar ni formato confirmados.
- Los Sigils reconocen la contribución real. Los otorga el Círculo y los verifican los pares. No se compran, no se gastan y no tienen valor monetario, tampoco en la gala ni para sponsors.
- Llavecitas destinadas a causas: bloqueado hasta definir quién paga la caja real.
- Candidatura de impacto social: nombre, convocatoria y plazo, NO CONFIRMADO.
