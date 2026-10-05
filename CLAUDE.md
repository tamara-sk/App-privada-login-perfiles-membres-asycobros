# Secret Key — App privada del Círculo

> **Antes de tocar nada, lee esto.** Esta rama reconcilia en un solo sitio las dos
> implementaciones que vivían por separado: la capa legal de la Ley 34/2002 y la tienda,
> la analítica y el cobro por Redsys que `main` ya traía. **Las ramas nuevas parten de
> `main`.**
>
> `claude/funny-cannon-t9g3gh` y `claude/funny-cannon-sin-stripe` quedaron fusionadas en
> `main` y **ya no son la referencia**: conservan el domicilio equivocado
> («Camí Vora Riu Solades 1771»), que `main` corrigió después. Partir de ellas reintroduce
> el error, así que conviene dejarlas estar y borrarlas cuando se haga limpieza de ramas.

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

## Principios de producto

Cada funcionalidad se gana su sitio si ahorra tiempo, crea una experiencia que merezca la
pena, amplía el acceso o fortalece las relaciones. El resto se queda fuera.

1. El tiempo es el lujo definitivo
2. El acceso vale más que la propiedad
3. La simplicidad escala
4. La confianza se acumula
5. Las experiencias crean recuerdos
6. La comunidad crea palanca

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

**Revisado el 05/10/2026, rama a rama y página a página.** El **1176** sale correcto en las
17 apariciones del repositorio del sitio y en todas las ramas vivas de esta aplicación,
incluida `main`. El **1771** sobrevive únicamente en `claude/funny-cannon-t9g3gh` y
`claude/funny-cannon-sin-stripe`, ya fusionadas en `main` y superadas por su corrección.

La misma revisión destapó una referencia registral equivocada que sí estaba publicada: los
pies de las ocho páginas del sitio decían «Hoja CS-50580, **Sección 8, Inscripción 1ª**».
El registro lleva folio electrónico, así que las ocho pasan a «hoja CS-50580, folio
electrónico, inscripción 1» (`tamara-sk/secret-key-site`, commit `c59b06c`).

Del `aviso-legal.html` vivo quedan tres datos por corregir **a mano en el Mac**, porque esa
página está fuera del repositorio a propósito: el teléfono (publica +34 605 188 495, cuando
el de atención es +34 614 59 44 06), la inscripción (la misma «Sección 8») y el objeto
social (publica el extracto corto, cuando la certificación trae el literal completo). Las
instrucciones están en `LEGALES.md` del repositorio del sitio, apartado «1 bis».

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
| Entrada al Círculo: inicio | `startPaymentAction` → `/pago/[pedido]`, que envía el formulario al banco |
| Tienda: dirección y envío | `/store/checkout` → `/store/pago/[pedido]` |
| Confirmación de ambos | `/api/redsys/notificacion`: única fuente de verdad del cobro |
| Datos | tablas `payments`, `memberships` y `orders` |

Redsys cobra un importe firmado y nada más, así que la tienda recoge la dirección y la
opción de envío en **nuestra propia** página `/store/checkout` antes de ceder el paso al
banco. El carrito se resuelve siempre contra el catálogo en el servidor: el navegador
aporta slugs, tallas y cantidades, nunca importes.

- Número de comercio: **370662108**. Terminal, clave de firma y entorno van en variables de
  entorno (`REDSYS_*`, ver `.env.local.example`). La clave de firma **jamás** en git.
- La vuelta del navegador a `/pago/resultado` solo informa; el cobro lo confirma la
  notificación firmada, que además comprueba que el importe coincide con el registrado.
- La renovación es manual («Renovar un año más» en `/account`). `REDSYS_PAGO_REFERENCIA=true`
  pide ya la referencia al banco y la guarda, para automatizar la renovación cuando BBVA active
  el pago por referencia.
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

## Mapa del código

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind · Supabase · Redsys · Resend,
desplegado en Vercel.

| Área | Dónde |
| --- | --- |
| Entrada al Círculo: planes y pago | `src/features/membership` |
| Cuentas y sesiones | `src/features/account` |
| Tienda: catálogo, carrito, checkout, pedidos | `src/features/store` |
| Páginas legales, datos identificativos, índice | `src/features/legal` |
| Medición, consentimiento y eventos del dataLayer | `src/libs/analytics` |
| Metadatos, copy de marca y SEO | `src/libs/seo/metadata.ts` |
| Notificación de Redsys (entradas y pedidos) | `src/app/api/redsys/notificacion/route.ts` |
| Migraciones de base de datos | `supabase/migrations` |

- **Los productos de la tienda** viven en `src/features/store/catalog.ts`. Añadir un objeto
  ahí lo añade a la cuadrícula, a su página, al sitemap y a los datos estructurados.
- **Los precios se releen en el servidor al pagar**, de modo que el navegador jamás dicta
  lo que se cobra. Conviene mantenerlo así.
- **Los identificadores de analítica son variables opcionales.** Si falta uno, ese script se
  omite y el resto sigue funcionando. Los tags de Google van bajo Consent Mode; Clarity
  (mapas de calor y grabación de sesión) y el píxel de Meta cargan una vez concedido el
  consentimiento.
- **El consentimiento está denegado por defecto** y se puede retirar desde `/privacidad`.
  El banner y ese control pasan los dos por `src/libs/analytics/consent.ts`.
- **La voz de marca para herramientas de fuera del repositorio** (GoHighLevel, agencias,
  colaboradores) está en `docs/brand-voice.md`, lista para pegar.

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
npx prettier --write <los ficheros que hayas tocado>
```

Los imports los ordena `simple-import-sort`; cuando se queje, `npx next lint --fix`.

## Reglas del proyecto

### 1. Las rutas legales son públicas, siempre

El artículo 10 de la **Ley 34/2002 (LSSI-CE)** exige que la información del prestador sea
accesible de forma permanente, fácil, directa y gratuita. Aunque el resto de la aplicación
sea privada, las rutas de `publicLegalRoutes` (`src/features/legal/legal-documents.ts`)
quedan siempre fuera de cualquier guard de autenticación.

### 2. Los datos identificativos viven en un único sitio

`src/features/legal/legal-config.ts`, y solo ahí. `companyConfig`
(`src/libs/seo/metadata.ts`) **deriva de él**, así que los metadatos, el JSON-LD de
`Organization` y las páginas en inglés leen el mismo dato sin copiarlo. Al cambiar una cifra
de la escritura, se cambia en `legalConfig` y aparece en todas partes.

### 3. Los encargados del tratamiento deben reflejar la realidad

`legalConfig.processors` se publica tal cual en `/privacidad`. Si cambia un proveedor que
trata datos del Círculo (alojamiento, base de datos, correo, CRM, pagos), actualiza la lista
y firma o rescinde el contrato de encargo.

### 4. Enlaces que existen

Las rutas legales son `/legal`, `/aviso-legal`, `/terminos-y-condiciones`, `/cancelacion`,
`/devoluciones`, `/envios`, `/seguridad-de-pago`, `/privacidad`, `/cookies` y `/contacto`.
Existen además `/about-us` y `/privacy`, que redirige a `/privacidad`: la política vive en
español, en un solo texto, y el enlace en inglés se conserva porque ya circulaba.

### 5. Idioma y moneda

Interfaz y textos legales en español. Importes en euros con `formatPrice`
(`src/utils/format-price.ts`).

## Contexto abierto

- **Alta del TPV Virtual de BBVA** en curso: `docs/bbva-tpv-virtual.md` y
  `docs/respuesta-bbva-tpv-virtual.md`. La respuesta sobre el IPSP es la **variante A**:
  cobro directo contra Redsys, sin proveedor intermedio.
- **Duplicidad: resuelta.** Las páginas legales, el banner de consentimiento y los datos de
  la sociedad existían por duplicado en esta rama y en `main`. Se quedan: la capa legal en
  español de esta rama, el `ConsentBanner` de `main` bajo Consent Mode, y `legalConfig` como
  fuente única de la que deriva `companyConfig`.
- **Datos legales: completos.** `npm run legal:check` pasa en verde. La certificación
  registral del 22/01/2026 cerró lo último que faltaba: hoja CS-50580, folio electrónico,
  inscripción 1.
- **El TPV está firmado y en vigor** desde el 14/09/2026 (contrato de comercio virtual), y
  los parámetros de conexión llegaron el 18/09: comercio **370662108**, terminal **1**,
  Bizum activo en ese terminal. Quedan dos cosas, las dos del lado del banco: que habiliten
  el **pago por referencia** (BBVA pidió el 02/10 el modelo de negocio, el motivo de la
  exención MIT y la aceptación por escrito del riesgo operativo; la respuesta está en
  `entregables/correo-bbva-redsys.md`) y el **paso a producción**, que se solicita desde el
  panel de administración del TPV.
