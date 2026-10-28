# Alinear ChatGPT y GoHighLevel con el canon

28 oct 2026 · Para Tamara. Dos archivos, un texto para pegar en cada herramienta y la lista de lo
que cambió hoy.

## Archivos que se suben

| Archivo                | Qué es                                                                                                          | Dónde                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `docs/pack-agentes.md` | Canon 1.5, guía para humanizar, mensajes de captación, series de cuatro correos (ES y EN) y flujos de captación | ChatGPT (proyecto «SK · Canon») y GoHighLevel (base de conocimiento «SK · Canon») |
| `docs/pack-eventos.md` | Miami (estudio, costes, sponsors) y el agente Event Planner                                                     | ChatGPT y el agente Event Planner de GoHighLevel                                  |

Los packs son archivos derivados. Si cambia un documento, se regeneran con
`python3 docs/build-packs.py`. Este conector de GoHighLevel no permite subir archivos a la base de
conocimiento, así que el archivo se sube desde la interfaz de GoHighLevel.

## 1. ChatGPT Enterprise

1. Crea un proyecto «SK · Canon» y sube `pack-agentes.md` y `pack-eventos.md`.
2. Pega esta instrucción en el proyecto y en cada agente:

```text
Eres un agente de Secret Key. Antes de cada tarea lee el canon de Secret Key (archivo del
proyecto, versión 1.5). Manda sobre cualquier otro documento, incluidos los de Drive y Notion.
Si algo choca con el canon, lo dices y sigues el canon.

Claim: «Vive local, estés donde estés» («Live local, wherever you are»).

Escribe en el idioma de quien te lee y con la voz de Tamara Edo: frases cortas, imágenes
concretas, una idea por párrafo. Antes de entregar un texto repásalo con la guía para humanizar
(guia-humanizar.md): sin tríadas repetidas, sin la misma fórmula en cada mensaje, sin
revelaciones de manual ni abstracciones gruesas, sin preguntas retóricas de cierre.

Todo en afirmativo. Sin guiones largos, exclamaciones, emoji ni palabras retiradas por el canon.
No inventes precios, fechas, cifras, proveedores, speakers, claims ni hechos de la vida de
Tamara. Si falta un dato, marca «por confirmar» y pregunta. No publiques cifras de plazas, de
sponsors ni la operativa interna. No afirmes sincronización entre sistemas sin evidencia.
No envíes mensajes, no cobres y no cambies precios: prepara un borrador y espera a Tamara.
```

## 2. GoHighLevel

1. Base de conocimiento: crea «SK · Canon» y sube `pack-agentes.md`. Conéctala a todos los
   agentes. Marca «no usar» las otras seis bases hasta que Tamara decida cuáles se archivan.
2. Agente Event Planner: añade `pack-eventos.md` a su base y pega su instrucción
   (`agente-event-planner.md`, sección 8).
3. Pega en cada agente existente (ATLAS, SDR, Content, COO, CRO, Partner Ops, Experience Agent) esta
   línea al principio: «Antes de cada tarea lee el canon de Secret Key (versión 1.5). Si algo
   choca con el canon, manda el canon. Claim: Vive local, estés donde estés».
4. Correos: el logo nuevo ya está aplicado. Añade el pie legal fijo
   (`mensajes-captacion.md`, al principio) y la palabra de baja «BAJA».

## 3. Lo que cambió hoy en el canon

| Tema                           | Decisión                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Claim                          | «Vive local, estés donde estés». Ya no «como local»                                                          |
| Wisdom Key                     | Aprobado a 4.300 €/año                                                                                       |
| Renovación hasta enero de 2027 | Manual: serie de correos desde 10 días antes y bloqueo de cuenta hasta que pague                             |
| The Feminine Frequency         | Sin cuota, en el portal de la app                                                                            |
| Miami                          | Magic del 22 al 24 de enero, Full Circle del 21 al 25                                                        |
| Marzo de 2027                  | The Glow, en Bali                                                                                            |
| Dolor                          | Estar tan abrumada que no se sabe dónde buscar. Todo se parecía a lo que decía Google o la web de cada sitio |
| Qué es Secret Key              | Un círculo de confianza con actividades probadas por el círculo                                              |
| Firma                          | Tamara Edo                                                                                                   |
| Primer mensaje                 | Sin precio, comisión ni condiciones. Las condiciones van en el segundo mensaje, si hay interés               |
| Identidad                      | Nuevo icono y cabecera: sello de cera con cuatro anillos dorados, mar turquesa y arena                       |

## 4. Icono para Kumkum (App Store y Google Play)

Kumkum pide un PNG de 1024 × 1024 sin transparencia y sin esquinas redondeadas, y, de forma
opcional, el sello dorado solo sobre fondo transparente para el icono de Android.

| Archivo                                      | Uso                                                                                                         |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `public/brand/secret-key-icon-1024.png`      | Apple, 1024 × 1024, RGB, sin transparencia, esquinas rectas                                                 |
| `public/brand/secret-key-seal-gold-1024.png` | Android: el motivo dorado de cuatro anillos sobre fondo transparente, en la zona segura del icono adaptable |

**Aviso de calidad.** El icono original que tengo es de 512 px. El de 1024 px sale de ampliarlo y
puede verse algo suave. Si Tamara tiene el original en vector o en alta resolución, es mejor
enviar ese a Kumkum.
