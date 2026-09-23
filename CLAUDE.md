# Secret Key — App privada del Círculo

> **Antes de tocar nada, lee esto.** Esta rama (`claude/bbva-ley-34-2002-compliance-qak9nb`)
> salió de `main`, que está obsoleto. El trabajo vivo está en
> `claude/funny-cannon-t9g3gh`, que ya trae páginas legales, banner de consentimiento,
> datos de la sociedad, tiendas, analítica y el acuerdo de marca. **Parte de esa rama, no de
> `main`**, y lee su `CLAUDE.md`, su `docs/brand-voice.md` y su `docs/port-to-production.md`.

## Voz de marca — innegociable

**1. Nunca definir Secret Key por lo que no es.** Nada de «no somos un concierge», «no es
una agencia de viajes» ni secciones de «lo que no somos», en ninguna página, correo,
descripción de producto, anuncio, presentación o publicación. Di lo que Secret Key **es** y
deja que el contraste lo haga el lector.

**2. Lenguaje afirmativo siempre.** Reescribe en positivo toda frase construida sobre una
negación.

| En lugar de | Escribe |
| --- | --- |
| «No te hacemos perder el tiempo» | «Te devolvemos tu tiempo» |
| «No es un club de lujo» | «Un ecosistema que se mide en horas devueltas» |
| «Nadie recuerda el recado» | «Lo que queda es la velada» |
| «No vendemos tus datos» | «Tus datos son tuyos» |

Vigila: `no`, `nunca`, `nadie`, `sin`, `tampoco`, `jamás`. Cada una es un aviso para
reescribir, tanto en copy de marketing como en páginas legales: la precisión de una política
de privacidad se mantiene eligiendo frases afirmativas, no renunciando a la regla.

**3. Posicionamiento.** Secret Key es un **ecosistema de optimización del tiempo, acceso
extraordinario y bienestar**, fundado sobre el **Tri Hita Karana**. La estrella polar son los
minutos ahorrados y los minutos disfrutados.

El **Tri Hita Karana** es la filosofía balinesa de las tres causas del bienestar, y es la
estructura sobre la que se apoya el ecosistema:

| Pilar | Qué significa | Cómo vive en Secret Key |
| --- | --- | --- |
| **Parahyangan** | Armonía con lo sagrado y con el propósito | La vida intencional: el tiempo recuperado se dedica a lo que de verdad importa |
| **Pawongan** | Armonía entre las personas | El Círculo: confianza, contribución y encuentros reducidos |
| **Palemahan** | Armonía con la naturaleza y el lugar | Las experiencias y los destinos, con respeto por el entorno y por quien lo habita |

Es una tradición viva del hinduismo balinés, no un recurso estético. Se nombra con respeto y
se atribuye a Bali; conviene evitar apropiarla como si fuera un método propio, y cuidar
especialmente los textos del capítulo de Bali.

**4. Tono.** Calmado, seguro, sobrio. Frases cortas. Cálido, generoso, humano.

## Terminología — innegociable

Las palabras **«miembro»/«member»** y **«club»** quedan eliminadas del vocabulario de Secret
Key, en cualquier idioma y en cualquier soporte.

| Se elimina | Se usa |
| --- | --- |
| miembro, miembros, member, members | **The Circle** · **el Círculo** |
| club, private members club, luxury club | **Secret Key**, o **Secret Circle** para el nivel interno |
| membresía de miembros | la entrada al Círculo |

- **Secret Circle** es el nombre del nivel interno, por invitación. Es el **único** nombre:
  «Inner Circle» queda derogado y se sobrescribe allí donde aparezca, sin excepción.
- A las personas que forman parte nos referimos como **The Circle** / **el Círculo**, nunca
  como miembros.
- Revisa también los textos legales: ahí «miembro» se sustituye igualmente, salvo cuando la
  norma exija un término jurídico concreto como «consumidor» o «usuario».

## Datos de la sociedad — confirmados

| Campo | Valor |
| --- | --- |
| Denominación social | THE SECRET KEY LABS, S.L. |
| NIF | B25909565 |
| **Domicilio social** | **Camino Vora Riu Solades 1176, 12540 Vila-real, Castellón, España** |
| Registro Mercantil | Castellón |
| Escritura | 16/12/2025, protocolo 2025/1779 |
| Teléfono de atención | +34 614 59 44 06 |

El domicilio correcto es **1176**, confirmado por Tamara y coincidente con el aviso legal
publicado en secretkey.vip. La variante «Camí Vora Riu Solades 1771» que circulaba en el
código era errónea: mismos dígitos, orden cambiado. Es el dato que BBVA contrasta contra la
escritura, así que no debe volver a bailar.

**El tomo, el folio, la hoja (CS-…) y la inscripción no están en la documentación
disponible.** Se han revisado la escritura de constitución, el listado de actos inscritos
(entrada 1/2026/72) y la correspondencia entera: los documentos llevan el sello del asiento
de presentación, cuyos campos «T.» y «F.» van sin rellenar. **No hay que volver a pedírselos
a Tamara.**

El art. 10.1 b) queda cubierto con `registry.statement`, la misma redacción que publica el
aviso legal de secretkey.vip y que respalda el listado de actos inscritos. Para publicar la
referencia completa basta con rellenar `registry.reference` con los datos de una nota simple
del Registro Mercantil de Castellón, y el texto cambia solo.

## Pagos — decidido: Redsys

Secret Key cobra por el **TPV Virtual de BBVA, sobre Redsys**. La decisión está tomada.

El código de este repositorio todavía usa **Stripe**, tanto para las suscripciones como para
la tienda. Es anterior a esa decisión y hay que sustituirlo: trata toda ruta de Stripe como
provisional.

Lo que implica Redsys en la práctica:

- Es una pasarela por redirección. El sitio envía a la entidad un formulario firmado
  (código de comercio, terminal, número de pedido, importe, moneda), el cliente paga en la
  página del banco y el banco llama a una URL de notificación. Petición y respuesta van
  firmadas, así que la clave secreta jamás sale del servidor.
- Los **cobros recurrentes requieren «pago por referencia»**, que BBVA debe habilitar en el
  comercio. El primer pago devuelve una referencia y los siguientes la reutilizan. El ciclo
  de facturación pasa a vivir en nuestro código, con su propio planificador y su gestión de
  impagos.
- El número de pedido tiene un formato fijo que el banco valida, y cada uno se usa una vez.

Confirmar con BBVA: entorno de Redsys, si el pago por referencia está habilitado y la
configuración exacta de terminal y moneda.

## Despliegue — dos codebases en un mismo proyecto de Vercel

El proyecto de Vercel `secret-key-site` sirve **secretkey.vip** desde **otro codebase**: una
SPA de Vite desplegada por CLI desde una máquina local. **Este repositorio de Next.js no es
la web pública.**

Ese mismo proyecto de Vercel está además enlazado por git a este repositorio, así que cada
push de aquí lanza una previsualización de esta app Next.js dentro de un proyecto
configurado para Vite.

Hasta que se separen en dos proyectos distintos:

- `vercel.json` (en `claude/funny-cannon-t9g3gh`) desactiva los despliegues de git para
  `main`, de modo que un merge aquí jamás publique esta app sobre secretkey.vip.
- Las previsualizaciones construyen **sin variables de entorno**, porque los clientes de SDK
  se crean de forma diferida (`src/utils/create-lazy-client.ts`). Mantenlo así: un cliente
  que lea sus credenciales al importarse tumba el build entero cuando Next recopila los
  datos de página. Esta rama carece de ese patrón, y por eso su build falla con
  `Reference to undefined env var: STRIPE_SECRET_KEY`.

## Comandos

```bash
bun install
npm run dev
npx tsc --noEmit        # tipos
npx next lint           # eslint, incluye orden de imports
npx next build          # la comprobación de verdad
npm run legal:check     # falla si quedan datos legales sin completar
```

## Reglas del proyecto

### 1. Las rutas legales son públicas, siempre

El artículo 10 de la **Ley 34/2002 (LSSI-CE)** exige que la información del prestador sea
accesible de forma permanente, fácil, directa y gratuita. Aunque el resto de la aplicación
sea privada, las rutas de `publicLegalRoutes` (`src/features/legal/legal-documents.ts`)
quedan siempre fuera de cualquier guard de autenticación.

### 2. Los datos identificativos viven en un único sitio

En esta rama, `src/features/legal/legal-config.ts`. En `claude/funny-cannon-t9g3gh` ese
papel lo cumple `companyConfig` (`src/libs/seo/metadata.ts`), que **ya tiene el domicilio y
el NIF**. Al reconciliar las dos ramas hay que quedarse con uno solo de los dos.

### 3. Los encargados del tratamiento deben reflejar la realidad

`legalConfig.processors` se publica tal cual en `/privacidad`. Si cambia un proveedor que
trata datos del Círculo (alojamiento, base de datos, correo, CRM, pagos), actualiza la lista
y firma o rescinde el contrato de encargo.

### 4. Enlaces que existen

Las rutas legales de esta rama son `/legal`, `/aviso-legal`, `/terminos-y-condiciones`,
`/cancelacion`, `/devoluciones`, `/envios`, `/seguridad-de-pago`, `/privacidad`, `/cookies`
y `/contacto`. En `claude/funny-cannon-t9g3gh` existen además `/privacy` y `/about-us`.

### 5. Idioma y moneda

Interfaz y textos legales en español. Importes en euros con `formatPrice`
(`src/utils/format-price.ts`).

## Contexto abierto

- **Alta del TPV Virtual de BBVA** en curso: `docs/bbva-tpv-virtual.md` y
  `docs/respuesta-bbva-tpv-virtual.md`. La respuesta sobre el IPSP es la **variante A**:
  cobro directo contra Redsys, sin proveedor intermedio.
- **Duplicidad por resolver:** esta rama y `claude/funny-cannon-t9g3gh` implementan por
  separado páginas legales, banner de cookies y datos de la sociedad. Hay que reconciliarlas
  antes de fusionar nada.
- **Datos pendientes:** quedan 6 marcadores en `legal-config.ts`. Denominación social, NIF,
  domicilio, correos y Registro Mercantil (Castellón) ya están puestos. Faltan el tomo, el
  libro, el folio, la hoja y la inscripción —están en las últimas páginas de la escritura de
  constitución del 16/12/2025, protocolo 1779— y el teléfono de atención.
- **El TPV está firmado y en vigor** desde el 14/09/2026 (contrato de comercio virtual). Lo
  que falta son los 3 parámetros de conexión de Redsys, que BBVA aún no ha entregado: la
  información del art. 10 publicada es la condición para que los suelten.
