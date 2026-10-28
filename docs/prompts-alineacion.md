# Prompts de alineación · una sola fuente para todos

28 oct 2026 · Para Tamara. Cada bloque se pega tal cual en la herramienta indicada.
Fuente única: [secret-key-canon.md](secret-key-canon.md) (versión 1.3). Si una herramienta no
puede leer el repositorio, se le pega el archivo completo antes del prompt.

Orden para monetizar cuanto antes: **1. Codex** (el acceso funciona), **2. GoHighLevel**
(aprobación y pago), **3. ChatGPT y agentes** (alineados), **4. Claude en Chrome y Kumkum**
(app), **5. Limpieza de Drive y Notion**.

## 0. Lo que dicen los datos hoy

**Embudo de acceso (auditoría del 18 oct y estado técnico del 28 oct)**

- El botón «Solicitar acceso» de secretkey.vip lleva a `/acceso`, que escribe en
  `access_requests` de Supabase sin avisar a nadie. A 18 oct la tabla tenía 0 filas. Si hay una
  solicitud hoy, nadie la ve.
- La aprobación automática de GoHighLevel y el pago dentro de la app no están acreditados.
- Los tres flujos de acceso en GoHighLevel eran borradores, y dos de ellos tenían un disparador
  sin pipeline que, al publicarse, saltaría en todos los pipelines.
- Producción aplica una comisión del 20 % a todos los partners por un valor por defecto, y no las
  tres comisiones del canon (30, 20, 15 y 10 %).

**GoHighLevel, lectura del 28 oct (solo lectura, sin cambios)**

| Producto                                    | ID de producto                                      | Precios que existen (ID de precio)                                                                                                                                                                                                                   | Estado                                     |
| ------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Secret Circle · Secret Key                  | 6ad642ab284dd9c2f6ae636c                            | 99 € hasta 31 dic 2026 (6ad642c877b7bb2edf157514), 220 € desde 1 ene 2027 (6ad64421b5505583cb5431f4), mensual 20 € pendiente de BBVA (6ad64b1c4aa95b8dde164b03), y un mensual de 39 € rotulado «precio retirado, no usar» (6ad642cae9b7371c99f30712) | Alineado con el canon                      |
| Secret Circle · Master Key                  | 6ad642ad199e0ac1f7dded6b                            | 2.500 € anual (6ad642cd4d57a9c7c75a917d), mensual 390 € pendiente de BBVA (6ad64b1e2336818e4ef2f7ac)                                                                                                                                                 | Alineado con el canon                      |
| Secret Circle · Wisdom Key                  | 6ae1fae1a478d898a3c04e8c                            | 4.300 € anual, «pendiente de aprobación» (6ae1fae1a478d898a3c04e94)                                                                                                                                                                                  | Alineado, falta aprobar                    |
| Partner · Secret Key y Partner · Master Key | 6ad642afe734f50064126a30 y 6ad642b13c7925ecc1a9835c | No leídos                                                                                                                                                                                                                                            | Descripción con 290 € y 20 %, 890 € y 15 % |

El campo `hasPrices` del listado de GoHighLevel devuelve `false` aunque haya precios, así que no
sirve como prueba. Esto corrige lo que dije antes: los precios de membresía ya están en el
canon. Quedan por borrar o archivar el mensual retirado de 39 € y por aprobar Wisdom Key.

## 1. Codex · sitio Vite, Supabase y acceso

```text
Eres el ingeniero del sitio de Secret Key (repositorio secret-key-site, Vite, desplegado en
Vercel como secretkey.vip, con Supabase). Antes de tocar nada, lee el canon de Secret Key
(docs/secret-key-canon.md, versión 1.3). Si algo choca con el canon, manda el canon y anotas
la discrepancia. Trabaja en una rama y pasa lint y build.

Prioridad 1, que el acceso genere dinero. Hoy /acceso escribe en public.access_requests sin
avisar a nadie. Haz que cada solicitud llegue a GoHighLevel y a Tamara:
1. Al insertarse una fila en access_requests, envía un webhook (Supabase Database Webhook o
   función edge) a GoHighLevel que cree o actualice el contacto con las tres respuestas del
   canon (quién eres, qué aportas al Círculo, qué aportas a la naturaleza), cree la
   oportunidad en el pipeline de acceso y envíe un correo interno a Tamara.
2. La solicitud nunca genera un cobro.
3. Tras la aprobación en GoHighLevel, el estado de la solicitud vuelve a Supabase y el usuario
   ve en su área elegir un tier y pagar. El pago usa Redsys (TPV virtual de BBVA, comercio
   370662108). Verifica que el checkout admite varios tiers (Secret Key 99 € hasta el 31 dic 2026
   23:59 de Madrid y 220 € después, Master Key 2.500 €, Wisdom Key 4.300 €) con el importe
   leído en el servidor, nunca del navegador. El mensual y la renovación automática esperan el
   pago por referencia de BBVA: no los actives.
4. No afirmes sincronización sin evidencia. Registra cada comprobación (fecha, qué se
   probó, resultado).

Prioridad 2, copy y calendario según el canon:
- Posicionamiento: primer ecosistema de bienestar basado en el Tri Hita Karana. Claim: «Vive como
  local, estés donde estés».
- Calendario publicable: The Radiance, Bali, 9 a 16 dic 2026 (1.900 € y Inmersión 2.500 €, con
  alojamiento). Miami Magic · Conscious Investments 22 a 24 ene 2027 y Full Circle 21 a 25 ene,
  precio por confirmar. The Glow, Bali, en marzo de 2027, tras Nyepi. Madrid sin fecha pública.
  La gala no se anuncia.
- Retira del sitio las palabras que el canon retira (lujo, luxury, exclusivo como reclamo,
  curated, club, Inner Circle, Keybearer, Guardián, Free como nombre de tier, Concierge Seeker,
  Member y Guardian en el formulario, listas de niveles Level 01 a 07), los guiones largos, las
  exclamaciones y las cifras de plazas como «8 people» o «12 people».
- «Solicitar acceso» es el botón principal. No uses «Free to join».

Entrega: lista de archivos cambiados, pruebas hechas, lo que no pudiste verificar y qué decisión
necesitas de Tamara. No publiques en producción sin aprobación escrita de Tamara.
```

## 2. GoHighLevel · base de conocimiento y agentes

**Base de conocimiento**

1. Crea una base nueva «SK · Canon» y pega el contenido de `secret-key-canon.md`.
2. Marca como «no usar» las demás: «updates», «SK · Base Equipo (Onboarding)», «sk expert», «The
   secret key labs» y «Existing knowledge base», hasta que Tamara decida cuál archivar. No borres
   nada. «SK · SEO Expert (ES/EN)» se revisa contra el canon.
3. Conecta «SK · Canon» a todos los agentes de IA.

**Prompt para el agente de GoHighLevel**

```text
Eres el agente de GoHighLevel de Secret Key (ubicación Secret Key Agency Level). Antes de
cada tarea lee la base de conocimiento «SK · Canon». Si algo choca con el canon, manda el
canon y registras la discrepancia. Nunca afirmes que algo está sincronizado sin evidencia.

Tamara autorizó alinear el catálogo y los flujos con el canon 1.3, con estas reglas:
- Antes de editar un objeto, anota su ID y su estado (publicado o borrador). Después de
  editarlo, anota el valor anterior y el nuevo. Devuelve una tabla con cada objeto cambiado.
- No borres productos ni precios sin verificar su correspondencia con Supabase y con el
  checkout. Si un cambio puede romper un cobro, detente y reporta el ID y la decisión necesaria.
- No envíes correos, WhatsApp ni SMS a contactos. No cambies contratos ni automatizaciones
  activas sin probar antes en borrador o entorno de pruebas.

Tareas, en este orden:
1. Catálogo. Los precios de Secret Key (99 € hasta el 31 dic 2026, 220 € desde el 1 ene 2027,
   mensual 20 € pendiente de BBVA), Master Key (2.500 €, mensual 390 € pendiente de BBVA) y
   Wisdom Key (4.300 €, pendiente de aprobación) ya existen. Deja inactivos los mensuales hasta
   que BBVA habilite el pago por referencia. Archiva, sin borrar, el precio mensual de 39 € de
   Secret Key rotulado «precio retirado, no usar». Lee los precios de Partner · Secret Key y
   Partner · Master Key y compáralos con el canon (290 € y 20 %, 890 € y 15 %). Añade Partner ·
   Key (0 €, 30 %) y Partner · Wisdom Key (pack SK Ads, 10 % mínimo) si faltan. Comprueba que
   «Secret Circle · Key» existe.
2. Acceso. La solicitud contiene exactamente tres preguntas: quién eres (cargo o ubicación), qué
   aportas al Círculo y qué aportas a la naturaleza. Una solicitud nunca genera un cobro.
   Diseña en borrador: formulario, entrada en el pipeline de acceso, aprobación automática,
   posibilidad de rechazo por una persona, veto por Secret Key, el board o integrantes del
   Círculo, y pago dentro tras la aprobación. Arregla en los tres flujos borradores los
   disparadores sin pipeline y las etiquetas que faltan. No publiques nada: Tamara aprueba.
3. Correos de acceso. Reescribe en borrador los correos de confirmación, aprobación y lista de
   espera con el tono del canon (afirmativo, sin guiones largos, sin exclamaciones, sin «lo
   leeré yo personalmente»), con el Chapter de la persona y no solo Bali.
4. Plantilla «Los tres niveles de la llave»: solo borrador. Cámbiala a Secret Key 99 €/año y
   Master Key 2.500 €/año, y deja pendiente lo que el canon deja abierto. Nunca la envíes.
5. Partners. Aplica las comisiones del canon (30, 20, 15 y 10 %) en la configuración de
   partners y registra la comisión que producción usa hoy.
6. Verifica POST /api/solicitudes/estado y su autorización sin imprimir secretos.

Tono de marca en todo lo que escribas: afirmativo, sereno, institucional y poético; frases
cortas; sin las palabras retiradas del canon; sin cifras de plazas ni de sponsors.
```

**Agente Event Planner:** instrucción lista en
[agente-event-planner.md](agente-event-planner.md), sección 8.

**Agentes existentes** (ATLAS, SDR, Content, COO, CRO, Partner Ops y Experience Agent): conéctalos
a la base «SK · Canon» y pega esta línea al principio de cada uno: «Antes de cada tarea lee el
canon de Secret Key. Si algo choca con el canon, manda el canon».

## 3. ChatGPT Enterprise y sus agentes

Crear un proyecto o GPT «SK · Canon» y subir `secret-key-canon.md` como archivo de conocimiento.
Pegar como instrucción:

```text
Eres un agente de Secret Key. Antes de cada tarea, lee el canon de Secret Key (archivo
adjunto, versión 1.3). Manda sobre cualquier otro documento, incluidos los de Drive y Notion.
Si algo choca con el canon, lo dices y sigues el canon.

Escribe en el idioma de quien te lee. Todo en afirmativo: reescribe cualquier frase que empiece
con una negación. Tono institucional y poético, calma, frases cortas. Sin exclamaciones, emoji
ni guiones largos. Sin las palabras retiradas del canon.

No inventes precios, fechas, cifras, proveedores, speakers ni claims. Si falta un dato, marca
«por confirmar» y pregunta. No publiques cifras de plazas, de sponsors ni la operativa interna.
No afirmes sincronización entre sistemas sin evidencia. No envíes mensajes, no cobres y no
cambies precios: prepara un borrador y espera a Tamara.
```

Para cada agente, añade su función encima: contenido y redes (copy y calendario editorial),
ventas (sponsors, partners y compradores de SKWR, empezando por The Radiance y Miami Magic),
operaciones (checklists y proveedores) y comunidad (The Feminine Frequency, sección 7).

## 4. Claude en Chrome y Kumkum · app

```text
Trabajas en la app de Secret Key. Antes de nada, lee el canon de Secret Key (versión 1.3).
Si algo choca con el canon, manda el canon.

1. En la ficha de la tienda y en los textos de la app usa el posicionamiento del canon y retira
   las palabras retiradas: lujo, exclusivo como reclamo, club, Inner Circle, Free como nombre de
   tier, Concierge Seeker, Circle Contributor, Keeper Candidate. Los nombres de tier son Key,
   Secret Key, Master Key y Wisdom Key.
2. La solicitud tiene tres preguntas: quién eres, qué aportas al Círculo, qué aportas a la
   naturaleza. La solicitud no cobra. El pago llega dentro de la app tras la aprobación.
3. Llavecitas: 1 = 0,10 €. Key 0,1×, Secret Key 2×, Master Key 5× por la misma acción.
   Cubren hasta el 30 % de una compra y hasta el 100 % de una renovación o subida de tier.
   Caducan a los 12 meses con aviso 30 días antes, y las reservas prorrogan 12 meses.
   Corrige el texto que diga que no caducan.
4. Sigils: los otorga el Círculo y los verifican los pares. Ilimitados, sin niveles ni valor
   monetario.
5. Ajustes → Legal con los textos del canon y la URL de privacidad en App Store Connect y
   Google Play.
6. No cobres desde las tarjetas públicas. El checkout usa Redsys y calcula el importe en el
   servidor. El mensual y la renovación automática esperan el pago por referencia de BBVA.

Devuelve lo que cambiaste, lo que no pudiste probar y las decisiones pendientes de Tamara.
Antes de enviar la app a revisión, pide confirmación expresa.
```

## 5. Limpieza de Drive y Notion

Documentos que en la búsqueda de hoy siguen con posicionamiento o nombres retirados. Se marcan
«superados por el canon 1.3», sin borrar:

| Documento                                                            | Qué lo supera                                                                                         |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Md SK, Brand Core, Strategic Framework, WEB Secret Key, Storytelling | Posicionamiento anterior: ecosistema exclusivo, lujo, «time optimization». Usan «Inner Circle»        |
| SK Inner Circle (presentación y PDF)                                 | Nombre retirado «Inner Circle» y «executive leaders»                                                  |
| onboarding-eva.docx                                                  | «Intentional Living Ecosystem», retirado                                                              |
| SK_Brief_Direccion_Agentes                                           | Posicionamiento anterior. Útil para el contexto de prioridades                                        |
| SK_Niveles_Circle_precios                                            | Precios del 19 oct (99 hasta ene, 390 desde feb, Master 1.200). Los IDs de GoHighLevel siguen válidos |
| SK · Catálogo de precios unificado (Notion, 19 oct)                  | Precios y mensuales superados                                                                         |
| Master Context v3 y v4, Guía de marca (Notion)                       | v4 se integra en el canon 1.3. La Guía conserva el tono                                               |

Prompt para Claude con acceso a Drive y Notion:

```text
Tienes acceso de lectura a Drive y Notion de Secret Key. Lee el canon de Secret Key (versión
1.3). Haz un inventario de los documentos que contradicen el canon (posicionamiento, precios,
fechas, nombres retirados). Para cada uno devuelve: título, enlace, última edición, qué
contradice y si basta con una nota «superado por el canon 1.3 al inicio». No borres ni
muevas nada. Propón la nota y espera la aprobación de Tamara antes de editar.
```

## 6. Dinero cuanto antes: sprint de 7 días

| Prioridad | Qué                                                                                 | Quién                            | Para cobrar qué                                               |
| --------- | ----------------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------- |
| 1         | Conectar `/acceso` con GoHighLevel, aviso a Tamara y pago dentro tras la aprobación | Codex                            | Secret Key a 99 € hasta el 31 dic 2026, la entrada más rápida |
| 2         | Aprobar Wisdom Key y archivar el mensual de 39 €                                    | Tamara y agente de GoHighLevel   | Catálogo limpio y sin errores de cobro                        |
| 3         | Vender The Radiance (9 a 16 dic) con la oferta de 1.900 € y la Inmersión de 2.500 € | Tamara y ventas                  | Es la fecha más cercana. Necesita la ruta de pago operativa   |
| 4         | Contactar partners y Trusted Places con las cuotas del canon (290 € y 890 €)        | Agente de ventas, con aprobación | Ingreso recurrente y ofertas de cortesía para Llavecitas      |
| 5         | Activar la tienda (productos de GoHighLevel conectados a la tienda pública)         | Codex                            | Ingreso inmediato por producto                                |
| 6         | Sponsors y expositores de Miami Magic                                               | Agente Event Planner             | Cobertura de costes del evento                                |
| 7         | Candidatura de impacto social                                                       | Tamara, con documentación        | Pendiente: indica la convocatoria y su fecha límite           |

## 7. The Feminine Frequency · comunidad dentro del Círculo

Fuentes en Drive: «Feminine frequency comunity» y «The femenine frequency MK» (guion de
película de Bali), dentro de la carpeta «The feminine frequency». El material original está en
inglés y usa palabras que el canon retira: «Inner Circle», «exclusivity» y un público definido por
cargo («C-level en telco y tech»). El canon define a las personas por mentalidad.

**Versión para el canon (propuesta, a aprobar)**

- **Qué es:** la comunidad de mujeres del Círculo, para el empoderamiento de las mujeres. Es una
  de varias comunidades dentro del Círculo.
- **Propósito:** crear un campo de presencia, resonancia y confianza donde se encuentren mujeres
  afines al camino Secret Key.
- **A quién:** a mujeres que lideran desde la intuición, la calma y la verdad, cualquiera que sea su
  cargo o sector.
- **Cinco guías** (se mantienen): honrar tu ascenso, liderar desde tu poder femenino, nutrir el
  campo colectivo, proteger la frecuencia y entrar con devoción.
- **Ritmo:** una pregunta semanal, un encuentro mensual (meditación o práctica corporal, círculo de
  conversación y una invitada), sister spotlight y círculos de apoyo entre pares.
- **Seis semanas de contenido:** Awaken the Frequency, Authentic Connection, Micro-wins,
  Embodiment, Community Flow y Puerta al Círculo.
- **Rediseño del nombre del puente:** «Bridge to SK Inner Circle» pasa a «Puerta al Círculo».
- **Vídeo:** guion «A sanctuary where presence becomes power», en Bali, con voz de Tamara.
  Versión vertical de 45 segundos y horizontal de 1:30.
- **Acceso:** se entra por la solicitud de acceso al Círculo y se elige The Feminine Frequency
  como comunidad. Todo lo demás sigue el canon.

**Decisiones de Tamara:** si la comunidad tiene cuota o es parte de cualquier tier, si se organiza
en GoHighLevel o en la app, quién la dinamiza, y cuándo es el primer encuentro.
