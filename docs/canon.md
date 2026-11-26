# Canon Secret Key

Un único canon. Fuente: SK Master Context v4 (Notion) y las decisiones de Tamara del 27 oct 2026. Todo precio, nombre y fecha de este documento es el vigente. Sirve para pegar en la
memoria de GHL y de Chati, y para el código (`src/features/membership/plans.ts` y
`partners.ts`).

## 1. Entradas al Círculo (miembros)

| Tier       | Precio                                                                        | Qué incluye                                                                                                                                                    |
| ---------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Key        | 0 €                                                                           | Entrada al ecosistema y a la app. Precio público en experiencias                                                                                               |
| Secret Key | 99 €/año para quien entra antes del 1 ene 2027. Después, 220 €/año o 20 €/mes | Precio de miembro en experiencias y SK Store, Llavecitas a ritmo 2×, Secret Circle de su chapter                                                               |
| Master Key | 2.500 €/año o 390 €/mes                                                       | Todo lo de Secret Key, una experiencia de capa alta en un SKWR (Miami, Bali u otro), dos experiencias de un día en el chapter que elija, Llavecitas a ritmo 5× |
| Wisdom Key | 4.300 €/año                                                                   | Todo lo de Master Key, la capa alta de dos SKWR al año, seguimiento personal durante doce meses                                                                |

- Los 99 € son la promoción de fin de año de Secret Key. El último día es el 31 dic 2026 (hora de Madrid). En enero de 2027 el precio sube a 220 €/año. Se comunica como el precio de esta temporada.
- Anual es la opción que se recomienda; el mensual existe para quien lo prefiera.
- El cobro mensual y la renovación automática llegan con el «pago por referencia» de BBVA. Hasta entonces el pago es manual.
- Se escribe «Master Key» y «Wisdom Key».

## 2. Partners (facilitadores, venues, sponsors)

Una sola escalera de cuatro tiers, la misma que usan los miembros.

| Tier       | Cuota anual de partner | Comisión de Secret Key |
| ---------- | ---------------------- | ---------------------- |
| Key        | 0 €                    | 30 %                   |
| Secret Key | 290 €                  | 20 %                   |
| Master Key | 890 €                  | 15 %                   |
| Wisdom Key | Pack SK Ads (sec. 4)   | 10 %                   |

- La comisión es lo que Secret Key retiene de cada venta hecha a través de SK, según el tier de quien vende. La mínima es el 10 %.
- Todo partner cede al Círculo al menos una experiencia o beneficio de cortesía, canjeable con Llavecitas.
- Comisiones de partner y condiciones de miembro son sistemas separados.

## 3. Comisión de partners y el Clauer

**Qué paga la comisión.** El 30 / 20 / 15 / 10 % retribuye a la plataforma (reserva, cobro,
comunidad y soporte) y al Clauer.

**El Clauer** es quien abre una ciudad, sea partner o miembro. Durante el primer año
comisiona el **5 % de cada reserva** que entra por ese partner.

| Tier del partner | Comisión de SK | Del cual, Clauer (año 1) | Neto de SK en el año 1 | Neto de SK desde el año 2 |
| ---------------- | -------------- | ------------------------ | ---------------------- | ------------------------- |
| Key              | 30 %           | 5 %                      | 25 %                   | 30 %                      |
| Secret Key       | 20 %           | 5 %                      | 15 %                   | 20 %                      |
| Master Key       | 15 %           | 5 %                      | 10 %                   | 15 %                      |
| Wisdom Key       | 10 %           | 5 %                      | 5 %                    | 10 %                      |

Pendiente de confirmar por Tamara (se publica cuando esté cerrado):

- Que el 5 % del Clauer sale de la comisión de Secret Key, sin sumarse al precio ni al partner.
- Que el primer año cuenta desde la entrada del partner en Secret Key.

## 4. SK Ads (agente, CRM, bots, cuenta de GHL y automatizaciones)

| Pack      | Mensual | Alta    |
| --------- | ------- | ------- |
| Essential | 150 €   | 997 €   |
| Growth    | 250 €   | 1.997 € |
| Signature | 350 €   | 2.997 € |

Agente de IA adicional: 150 €/mes. SK Guest Journey (agente para anfitriones) se vende aparte.

## 5. Llavecitas y Sigils

- Una Llavecita vale siempre 0,10 € (10 Llavecitas = 1 €). Por la misma acción: Key gana 0,1×, Secret Key 2×, Master Key 5×.
- Se ganan participando, contribuyendo e invitando. Cubren hasta el 30 % de cada compra y hasta el 100 % en renovación y subida de tier.
- Caducan a los 12 meses, con aviso 30 días antes, y se prorrogan otros 12 meses cada vez que el miembro reserva una experiencia.
- Sigils: los otorga el Círculo y los verifican los pares. Ilimitados, sin niveles, sin valor monetario.

## 6. Acceso: solicitar primero, pagar dentro

1. «Solicitar acceso» abre tres preguntas: quién eres (cargo o ubicación), qué aportas al Círculo, qué aportas a la naturaleza.
2. El workflow de Kumkum aprueba automáticamente. Un humano decide un rechazo y la persona puede volver a intentarlo.
3. SK, el board y los miembros del Círculo pueden vetar a personas y empresas. El veto cierra la solicitud.
4. Con la solicitud aprobada, la persona paga el tier que quiera desde dentro.
5. GHL avisa 10 días antes del vencimiento. Sin renovación, el servicio se corta hasta el pago.
6. La web recibe el estado en `POST /api/solicitudes/estado` con `Authorization: Bearer <APPLICATIONS_WEBHOOK_SECRET>` y cuerpo `{ "email": "...", "status": "approved" | "rejected" | "vetoed" | "pending" }`.

## 7. Calendario de experiencias

| Fecha                                      | Experiencia                               | Chapter |
| ------------------------------------------ | ----------------------------------------- | ------- |
| 9–16 dic 2026                              | The Radiance                              | Bali    |
| 29–31 ene 2027 (Full Circle: 28 ene–1 feb) | Miami Magic · Conscious Investments       | Miami   |
| 10 mar 2027                                | The Radiance, segunda edición, tras Nyepi | Bali    |

- Quedadas del Secret Circle en Madrid: sin fecha pública.
- The Radiance: 1.900 € y 2.500 € la capa alta, alojamiento incluido. Miami Magic y Full Circle: precio por confirmar.
- El resto de 2027 se publica cuando Tamara confirma, para cada experiencia: nombre, chapter, fechas, precio público y capa alta.
- Gala benéfica y de Sigils: prevista para 2027 y candidata a impacto social. Fecha, lugar y formato por confirmar. Los Sigils conservan su naturaleza: no tienen valor monetario, tampoco en la gala ni para sponsors.

## 8. Captación en GHL: sponsors y clientes de los SKWR

- **Sponsors:** entran por la escalera de partners (sec. 2) con su experiencia de cortesía. Formulario propio, confirmación inmediata, conversación con el equipo, propuesta y acuerdo. La aportación de cada sponsor a cada SKWR está por confirmar.
- **Clientes:** entran por «Solicitar acceso» (sec. 6). Con la solicitud aprobada, reservan con precio de miembro. La capa alta de cada SKWR la incluyen Master Key (una) y Wisdom Key (dos al año).
- Escalera de venta: Secret Circle local (25–60 €) → Secret Key → experiencias de un día (150–390 €) → SKWR → Master Key → Wisdom Key.
- En GHL: Products (Agency Level) y `price_catalog` en Supabase llevan los importes de las secciones 1, 2 y 4.

## 9. Abierto (preguntar a Tamara; no inventar)

- Si quien entra a 99 € mantiene ese precio al renovar o pasa a 220 €.
- Precio mensual de Secret Key antes del 1 ene 2027.
- Coste de las dos jornadas de Master Key y del seguimiento de Wisdom Key.
- Tabla de acciones de Llavecitas y regalo de bienvenida.
- Descuentos de miembro.
- Nombre de la capa alta de The Radiance.
- Llavecitas destinadas a causas: espera a definir quién paga la caja real.
- Candidatura de impacto social: nombre, convocatoria y plazo.
- Definición de «marketplace»: sin definición aprobada, no se usa en ningún texto.

## 10. Léxico y tono

- Se dice: Secret Circle / el Círculo, Clauer, Keyholder, Chapter, Experiencia, Trusted Place, SK Alchemy, SKWR, Llavecitas, Sigils.
- Retirado: lujo/luxury, exclusivo como reclamo, curated/curado (se dice «secret» o «seleccionadas»), club, Keybearer, Guardián, Inner Circle, lenguaje de startup (launch, beta, founding members, early adopters), guiones largos, exclamaciones y emoji en copy de marca.
- Toda frase se escribe en afirmativo. Tono calmado, institucional y poético, frases cortas.
- Los 99 € se comunican como el precio de esta temporada, con la puerta abierta hasta el 31 dic.
- En público no aparece ningún número de plazas ni de sponsors, y se habla de cada experiencia sin limitar su aforo. El mínimo operativo de 6 personas es interno.
