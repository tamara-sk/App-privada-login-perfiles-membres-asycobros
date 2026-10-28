# Captación: listas, calentamiento, respuestas y nutrición

28 oct 2026 · Para Tamara. Recoge sus respuestas de hoy y deja el flujo atado para que corra solo
en GoHighLevel. Sigue el [canon](secret-key-canon.md) 1.4 y usa los textos de
[mensajes-captacion.md](mensajes-captacion.md). Nada de esto está activado: son
especificaciones para el agente de GoHighLevel, que las construye en borrador y Tamara aprueba.

## 1. Respuestas de Tamara a las ocho preguntas

| #   | Pregunta                 | Respuesta                                                                                                                                                    |
| --- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Quién firma              | **Tamara Edo**                                                                                                                                               |
| 2   | Dominio y buzón          | `tamara@secretkey.vip`, ya calentado. Mañana, con ChatGPT Enterprise, un agente (en ChatGPT o en GoHighLevel) se ocupará de calentar y posicionar el dominio |
| 3   | Qué lista                | Se filtran los contactos mañana a primera hora y se etiquetan en listas. Se empieza por tres bloques (sección 2)                                             |
| 4   | Base legal               | Doble opt-in para la comunidad. Pendiente de definir para la lista de leads (sección 2)                                                                      |
| 5   | Volumen                  | Al menos 20 contactos por Chapter al día, en paralelo (sección 3)                                                                                            |
| 6   | Quién responde           | Un flujo que responde según lo que conteste cada persona (sección 4)                                                                                         |
| 7   | Qué pasa si dicen sí     | Queda atado en el flujo: segundo mensaje, agenda y etiqueta (sección 4)                                                                                      |
| 8   | Qué pasa si no responden | Se sigue impactando y nutriendo hasta que digan sí o no (sección 5)                                                                                          |

**El dolor, tal como lo cuenta Tamara.** El dolor es estar tan abrumada que no se sabe dónde
buscar. Tanto ruido, tantas opciones y tantas notificaciones que ya no se sabe a quién creer ni
por dónde empezar. Tamara pasaba horas y horas buscando recomendaciones y le costaba encontrar
lo que de verdad la ayudara: todo se parecía a lo que ya ponía Google o la web de cada sitio. De ahí salió Secret Key: un círculo de confianza con actividades
probadas por el círculo, donde la confianza llega por las personas. Los textos de captación lo
recogen, con «no puedo más» y «cada vez más notificaciones y menos presencia».

## 2. Listas y orden de arranque

| Orden | Lista                                                   | Tamaño                 | Qué se hace                                                                                                                         | Etiquetas                                                                           |
| ----- | ------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1     | Leads de la empresa de leads                            | 10 para probar         | Prueba de calidad: tasa de respuesta, rebotes y encaje. Se decide si se escala                                                      | `lista-leads-prueba`                                                                |
| 2     | Comunidad actual                                        | Ciento y pico personas | Mensaje de regreso con **doble opt-in** para seguir de cerca y ser las primeras en descargar la app. Deja la base legal actualizada | `comunidad-optin-pendiente`, luego `comunidad-optin-confirmado`                     |
| 3     | Base grande de personas con las que ha trabajado Tamara | Por definir            | Mensaje **personal**, uno a uno, escrito por Tamara. No va en envío masivo                                                          | `base-personal`                                                                     |
| 4     | Captación automática: empresas de Google Maps y Clauers | Continuo               | El agente encuentra lugares que pueden ser sponsors o partners. Los Clauers contactan directamente con lugares y facilitadores      | `prospecto-lugar`, `prospecto-sponsor`, `prospecto-facilitador`, `prospecto-retiro` |

**Etiquetas de Chapter:** `chapter-mediterraneo`, `chapter-bali`, `chapter-madrid`, `chapter-miami`.

**Aviso sobre la lista de leads.** Una lista que proporciona un tercero puede no incluir el
consentimiento de cada persona. En España, la LSSI exige consentimiento o una relación previa para
comunicaciones comerciales. Antes de enviar a esos 10 leads conviene pedir a la empresa de
leads cuál es la fuente y la base legal de cada contacto, y confirmar con un abogado. Si no hay
base clara, se contacta de forma personal o por una vía que no requiera consentimiento previo.

## 3. Calentamiento del dominio y volumen

**Agente de calentamiento y posicionamiento** (en ChatGPT Enterprise o en GoHighLevel):

1. Comprueba SPF, DKIM, DMARC y la cabecera de baja con un clic en `secretkey.vip`.
2. Sube el volumen de forma gradual, con respuestas reales de contactos conocidos.
3. Vigila la reputación en Gmail y Yahoo: rebotes por debajo del 2 % y quejas de spam por debajo
   del 0,1 %. Pausa el envío si se superan.
4. Informa a Tamara cada semana.

**Volumen.** Tamara quiere al menos 20 contactos por Chapter al día. Con cuatro Chapters son hasta
80 al día. Para un dominio que acaba de empezar con envío frío, conviene subir por fases:

| Semana | Envíos al día | Reparto        |
| ------ | ------------- | -------------- |
| 1      | 20            | 5 por Chapter  |
| 2      | 40            | 10 por Chapter |
| 3      | 60            | 15 por Chapter |
| 4      | 80            | 20 por Chapter |

Para proteger `tamara@secretkey.vip`, el envío en volumen sale de un subdominio de envío (por
ejemplo `mail.secretkey.vip`). Los mensajes personales de Tamara siguen saliendo de su buzón.
Los 20 diarios de WhatsApp o redes por Chapter, con relación previa y de forma personal, no
tienen el mismo límite.

## 4. Flujo de respuestas

El agente de GoHighLevel clasifica cada respuesta por intención y actúa según esta tabla. Todo
mensaje que salga sigue el texto aprobado. Los casos dudosos pasan a Tamara.

| La persona responde                         | Acción automática                                                                                                        | Siguiente paso                                 | Etiqueta           |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ------------------ |
| Interés o «cuéntame más»                    | Envía el **segundo mensaje** de su audiencia                                                                             | Enlace de agenda para la llamada de 15 minutos | `resp-interesada`  |
| Pregunta por condiciones, precio o comisión | Respuesta tipo: cortesía canjeable con Llavecitas y comisión según tier (30, 20, 15 o 10 %), con invitación a la llamada | Agenda de llamada                              | `resp-condiciones` |
| Quiere llamada o reunión                    | Envía el enlace de agenda y crea la tarea                                                                                | Llamada con Tamara o la persona designada      | `resp-llamada`     |
| «Ahora no» o «más adelante»                 | Agradece y pregunta cuándo retomar. Pausa la secuencia hasta esa fecha                                                   | Retoma con un contenido de valor               | `resp-mas-tarde`   |
| Un «sí» claro                               | Alta en el pipeline de la audiencia y tarea para Tamara                                                                  | Solicitud de acceso o acuerdo de partner       | `resp-si`          |
| Un «no»                                     | Agradece con calidez, detiene toda la secuencia y suprime el contacto                                                    | Fin                                            | `resp-no`          |
| Pide la baja                                | Confirma la baja y suprime el contacto en todos los canales                                                              | Fin                                            | `baja`             |
| Respuesta automática o fuera de oficina     | Pausa y retoma tras la fecha que indique                                                                                 | Reanuda                                        | `resp-auto`        |
| Rebote del correo                           | Marca el correo como inválido y busca otro canal                                                                         | Revisión                                       | `rebote`           |
| No responde                                 | Continúa la nutrición (sección 5)                                                                                        |                                                | `sin-respuesta`    |

## 5. Nutrición hasta el sí o el no

Cadencia para quien no responde, por audiencia. Cada mensaje aporta algo: una escena, un texto
de Tamara o una historia real, y nunca urgencia inventada.

| Momento           | Canal                             | Contenido                                                                |
| ----------------- | --------------------------------- | ------------------------------------------------------------------------ |
| Día 0             | Correo                            | Primer mensaje                                                           |
| Día 0 más 2 horas | WhatsApp, con número y base legal | Versión corta                                                            |
| Día 5             | WhatsApp                          | Seguimiento breve                                                        |
| Día 10            | Correo                            | Una escena de un Chapter o un texto de Tamara                            |
| Día 20            | Correo                            | Una historia real de un lugar o una experiencia, con permiso por escrito |
| Día 30            | Llamada                           | Tamara o la persona designada llama                                      |
| Después           | Correo mensual                    | Una pieza de contenido, mientras la persona no diga sí ni no             |

**Límite legal.** Tamara quiere seguir nutriendo hasta que digan sí o no. Para la comunidad con
doble opt-in y para quien dio su consentimiento, el contenido mensual puede continuar. Para
contactos fríos sin consentimiento conviene un máximo de cinco contactos y cerrar con una puerta
abierta, sin seguir escribiendo. Es una decisión de Tamara con su abogado.

## 6. Mensaje a la comunidad actual (doble opt-in)

_Para las ciento y pico personas de la comunidad. Correo, desde `tamara@secretkey.vip`._

**Asunto:** La comunidad vuelve, y quiero que estés cerca
_Variantes:_ Volvemos con más fuerza · Las primeras en descargar la app

> Hola [nombre],
>
> Hemos estado un tiempo en silencio. Detrás había muchas actualizaciones del sistema, y la
> comunidad ha estado siempre en el centro.
>
> Te cuento por qué lo hago. Llegó un momento en que estaba tan abrumada que no sabía dónde
> buscar. Pasaba horas y horas entre recomendaciones, con cada vez más notificaciones y menos
> presencia, y ya no sabía a quién creer. Un día pensé: no puedo más. De ahí nació Secret Key, un
> círculo de confianza con actividades probadas por el círculo, donde la conexión real, la que
> siempre estuvo, vuelve a sentirse.
>
> La comunidad vuelve con más fuerza que nunca. Me encantaría saber si quieres seguirla de cerca
> y ser de las primeras personas en descargar la app.
>
> Si es así, confirma aquí:
>
> [Sí, quiero seguirlo de cerca]
>
> Con cariño,
> Tamara Edo

**Subject:** The community is back, and I want you close
_Variants:_ We return stronger than ever · Among the first to download the app

> Hello [name],
>
> We have been quiet for a while. Behind it were many updates to the system, and the community has
> always been at the center.
>
> Let me tell you why I do this. There came a moment when I was so overwhelmed that I did not know
> where to look. I spent hours and hours among recommendations, with more and more notifications
> and less presence, and I no longer knew whom to believe. One day I thought: I can't take any
> more. That is how Secret Key began, a circle of trust with activities tested by the circle,
> where the real connection, the one that was always there, can be felt again.
>
> The community returns stronger than ever. I would love to know whether you want to follow it
> closely and be among the first people to download the app.
>
> If so, please confirm here:
>
> [Yes, I want to follow closely]
>
> With love,
> Tamara Edo

**Página de confirmación (doble opt-in)**

> Gracias, [nombre]. Tu lugar está confirmado. Serás de las primeras personas en recibir la app y
> las novedades del Círculo. Te escribiremos desde tamara@secretkey.vip. Para dar de baja tu
> correo, responde BAJA en cualquier momento.

_Flujo:_ clic en «Sí» → etiqueta `comunidad-optin-confirmado` y registro de fecha y origen del
consentimiento. Sin clic, un recordatorio a los 7 días y, si sigue sin respuesta, queda como
`comunidad-optin-pendiente` sin más envíos comerciales.

## 7. Base grande de personas con las que ha trabajado Tamara

Mensajes personales, escritos por Tamara. El agente prepara un borrador por persona a partir del
primer mensaje de la audiencia que corresponda, con una línea sobre cómo se conocen. Tamara lo
revisa y lo envía ella misma. No se envía de forma masiva.

## 8. Captación automática con Clauers

- **Agente de Google Maps:** busca por Chapter lugares, centros y marcas que puedan ser sponsors
  o partners, los puntúa con la checklist de la casa como espacio sagrado y de encaje con el
  canon, y los guarda con la etiqueta de su tipo. Tamara aprueba la lista antes de cualquier
  contacto.
- **Clauers:** quien abre una ciudad contacta directamente con lugares y facilitadores con los
  mensajes aprobados y firma con su nombre. El agente les entrega la ficha y el borrador.
- **Ritmo:** unos 20 contactos al día por Chapter, repartidos entre Tamara, los Clauers y el flujo.

## 9. Reunión con la decana (SK Ads)

Guion para la conversación. Los precios de SK Ads son los del canon: Essential 150 €/mes + 997 €
de alta, Growth 250 €/mes + 1.997 €, Signature 350 €/mes + 2.997 € y agente de IA adicional
150 €/mes. Incluye agente, CRM, bots, cuenta de GoHighLevel y automatizaciones según el pack.

1. **Por qué le interesa a la universidad:** qué problema de atención, captación o comunidad
   quiere resolver.
2. **Qué es SK Ads:** un pack que pone al servicio de una entidad un agente, un CRM, bots y
   automatizaciones, con la misma voz de marca.
3. **Un caso concreto para su universidad:** captación de estudiantes, antiguos alumnos o
   programas, con un piloto de 60 días.
4. **Qué necesitamos saber:** audiencia, canales actuales, equipo que lo llevaría y plazos.
5. **Siguiente paso:** una demo y una propuesta por escrito.

Para preparar una propuesta a medida, Tamara indica a qué universidad pertenece la decana y qué
le interesó de SK Ads.

## 10. Pendientes para mañana

1. Filtrar y etiquetar los contactos (Tamara, a primera hora).
2. Elegir la lista de 10 leads y pedir a la empresa de leads la fuente del consentimiento.
3. Crear el agente de calentamiento (ChatGPT Enterprise o GoHighLevel).
4. Decidir el subdominio de envío en volumen.
5. Aprobar el límite de contactos para quien no responde.
6. Aprobar el mensaje a la comunidad y su doble opt-in.
