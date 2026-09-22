# Secret Key — App privada de miembros

Plataforma privada de membresía de Secret Key: login, perfiles de miembros, cobro de cuotas
y acceso a experiencias.

> **Posicionamiento.** Secret Key no es un concierge, ni un club de lujo, ni una agencia de viajes:
> es un **ecosistema de optimización del tiempo y acceso extraordinario**. Todo el copy de la
> aplicación debe reforzar eso. La misión es convertir dinero en tiempo.

## Stack

| Capa | Tecnología | Notas |
| --- | --- | --- |
| Framework | Next.js 15 (App Router, React 19) | `export const dynamic = 'force-dynamic'` en el layout raíz |
| Estilos | Tailwind CSS + shadcn/ui | Tema oscuro, fuentes Montserrat / Montserrat Alternates |
| Base de datos y auth | Supabase | Cliente de servidor, de navegador y de middleware en `src/libs/supabase` |
| Pagos | Stripe (hoy) → TPV Virtual BBVA/Redsys (decisión pendiente) | Ver `docs/bbva-tpv-virtual.md` |
| Correo transaccional | Resend + React Email | Plantillas en `src/features/emails` |
| CRM y automatización | GoHighLevel (GHL) | Ver `docs/integracion-ghl.md` |
| Alojamiento | Vercel | Ver `docs/despliegue-vercel.md` |

Gestor de paquetes: **bun** (`bun.lockb`). `npm run` funciona igual para los scripts.

## Comandos

```bash
bun install           # instalar dependencias
npm run dev           # desarrollo (turbopack)
npm run build         # build de producción
npm run lint          # eslint (incluye orden de imports: usa --fix)
npm run legal:check   # falla si quedan datos legales sin completar
npx tsc --noEmit      # typecheck
npm run email:dev     # previsualizar plantillas de correo (puerto 3001)
npm run migration:up  # aplicar migraciones de Supabase y regenerar tipos
```

Antes de dar por terminado un cambio: `npx tsc --noEmit`, `npm run lint` y `npm run build`.

## Estructura

```
src/app/(auth)        login, signup, callback de OAuth
src/app/(account)     área privada del miembro, gestión de la suscripción
src/app/(legal)       textos legales públicos (LSSI) — ver más abajo
src/features/account  controladores de sesión, usuario y suscripción
src/features/legal    configuración legal, documentos y banner de cookies
src/features/pricing  planes, tarjetas de precio y checkout
src/libs              clientes de Supabase, Stripe y Resend
```

## Reglas del proyecto

### 1. Las rutas legales son públicas, siempre

El artículo 10 de la **Ley 34/2002 (LSSI-CE)** exige que la información del prestador sea accesible
de forma permanente, fácil, directa y gratuita. Aunque el resto de la aplicación sea privada,
las rutas de `publicLegalRoutes` (`src/features/legal/legal-documents.ts`) **nunca** pueden quedar
detrás de un guard de autenticación. Hay un recordatorio en
`src/libs/supabase/supabase-middleware-client.ts`, donde se añadirían los guards.

### 2. Los datos identificativos viven en un único sitio

`src/features/legal/legal-config.ts` es la fuente de verdad de la denominación social, el NIF, el
domicilio, los datos registrales, los contactos, los medios de pago y los encargados del tratamiento.
No dupliques ninguno de esos datos en las páginas: impórtalos de ahí.

`npm run legal:check` falla mientras queden marcadores `[COMPLETAR: ...]`.

### 3. La lista de encargados del tratamiento debe reflejar la realidad

`legalConfig.processors` se publica tal cual en `/privacidad`. Si se añade, se cambia o se retira un
proveedor que trata datos de miembros (alojamiento, base de datos, correo, CRM, pagos), hay que
actualizar esa lista **y** firmar o rescindir el contrato de encargo correspondiente.

### 4. Nada de enlaces a rutas que no existen

El starter enlazaba a `/terms`, `/privacy`, `/contact` y `/about-us`, que daban 404. Un enlace roto en
el flujo de registro o de pago es un defecto legal, no un detalle estético. Las rutas reales son
`/terminos-y-condiciones`, `/privacidad`, `/contacto` y `/legal`.

### 5. Idioma y moneda

Interfaz y textos legales **en español**. Los importes se formatean con `formatPrice`
(`src/utils/format-price.ts`), en **euros** y con formato español.

### 6. Los beneficios de cada plan se editan en Stripe

`price_card_variant` controla el estilo de la tarjeta (`basic` | `pro` | `enterprise`) y `features` es
una lista separada por `|` en los metadatos del producto de Stripe. Cambiar los beneficios de un plan
no debería requerir tocar código. Plantilla de ejemplo en `stripe-fixtures.json`.

## Contexto abierto

- **Alta del TPV Virtual de BBVA** en curso. Requisitos, checklist y borrador de respuesta en
  `docs/bbva-tpv-virtual.md` y `docs/respuesta-bbva-tpv-virtual.md`.
- **Decisión pendiente:** cobrar directamente con Redsys (sin IPSP) o mantener Stripe, que **es** un
  IPSP y hay que declarar a BBVA.
- **Datos pendientes:** los 15 marcadores de `legal-config.ts` (nota simple del Registro Mercantil,
  CIF, domicilio, correos y teléfono).
