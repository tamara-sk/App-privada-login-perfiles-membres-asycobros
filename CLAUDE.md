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

**Los datos de inscripción están confirmados** por la certificación registral que expidió la
Registradora Mercantil de Castellón de la Plana el 22/01/2026 (asiento 56 del Diario 2026):

| Campo | Valor |
| --- | --- |
| Hoja | **CS-50580** |
| Folio | **electrónico** |
| Inscripción | **1** |
| EUID | ES12011.000207496 |
| IRUS | 1000465501454 |
| Fecha de inscripción | 22/01/2026 |
| Capital social suscrito | 3.000,00 € |
| Órgano de administración | Administrador único |
| CNAE | 8230, 6832, 7020 |

El Registro Mercantil de Castellón lleva **folio electrónico**, así que la hoja y la
inscripción identifican la sociedad, y el tomo y el folio en papel quedan superados. Ahí
estuvo la confusión durante días: se buscaba un tomo que este registro ya deja de emitir. El
texto que se publica es «Inscrita en el Registro Mercantil de Castellón, hoja CS-50580, folio
electrónico, inscripción 1.», y sale de `registry.reference` en `legal-config.ts`.

La certificación trae además el **objeto social completo**, bastante más largo que el extracto
que circulaba, y ya está literal en `legalConfig.company.corporatePurpose`.

## Pagos — decidido: Redsys

Secret Key cobra por el **TPV Virtual de BBVA, sobre Redsys**. La decisión está tomada.

En esta rama **Stripe ya está eliminado**. El cobro de las entradas al Círculo va por Redsys:

| Pieza | Dónde |
| --- | --- |
| Firma y formulario | `src/libs/redsys/` (verificada contra una implementación de referencia) |
| Precios | `src/features/membership/plans.ts`, la única fuente; se releen en el servidor |
| Inicio del pago | `startPaymentAction` → `/pago/[pedido]`, que envía el formulario al banco |
| Confirmación | `/api/redsys/notificacion`: única fuente de verdad del cobro |
| Datos | tablas `payments` y `memberships` (migración `20260923120000_redsys_payments.sql`) |

- Número de comercio: **370662108**. Terminal, clave de firma y entorno van en variables de
  entorno (`REDSYS_*`, ver `.env.local.example`). La clave de firma **jamás** en git.
- La vuelta del navegador a `/pago/resultado` solo informa; el cobro lo confirma la
  notificación firmada, que además comprueba que el importe coincide con el registrado.
- La renovación es manual («Renovar un año más» en `/account`). `REDSYS_PAGO_REFERENCIA=true`
  pide ya la referencia al banco y la guarda, para automatizar la renovación cuando BBVA active
  el pago por referencia.
- La tienda de `claude/funny-cannon-t9g3gh` sigue con Stripe Checkout: al reconciliar ramas
  hay que pasarla a este mismo módulo.
- **Referencia, no producción.** La app que cobra de verdad es la de Kumkum
  (`kumkum020704/secret-key-app`), que ya integra Redsys. Este módulo sirve de referencia y de
  cobro para la web; evita mantener dos lógicas de precios distintas.

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

Confirmar con BBVA: si el pago por referencia está habilitado.

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
  datos de página. Redsys lee su configuración al usarse, por la misma razón.

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
- **Datos legales: completos.** `npm run legal:check` pasa en verde. La certificación
  registral del 22/01/2026 cerró lo último que faltaba: hoja CS-50580, folio electrónico,
  inscripción 1.
- **El TPV está firmado y en vigor** desde el 14/09/2026 (contrato de comercio virtual). Lo
  que falta son los 3 parámetros de conexión de Redsys, que BBVA aún no ha entregado: la
  información del art. 10 publicada es la condición para que los suelten.
