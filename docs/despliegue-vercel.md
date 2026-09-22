# Despliegue en Vercel

La app se aloja en **Vercel**. Este documento recoge lo necesario para que el sitio esté en el
dominio definitivo, con HTTPS válido, antes de enviar el alta del TPV Virtual a BBVA.

## 1. Por qué importa para BBVA

BBVA va a abrir la web y comprobar que la información del art. 10 de la Ley 34/2002 está publicada y
es accesible **sin iniciar sesión**. Para eso hace falta:

- Dominio propio y definitivo (no una URL `*.vercel.app` de previsualización).
- Certificado HTTPS válido (Vercel lo emite automáticamente al añadir el dominio).
- Las rutas legales accesibles en abierto y sin protección de despliegue.

> **Atención con Vercel Authentication / Deployment Protection.** Si el proyecto tiene activada la
> protección de despliegue, la web pide login antes de mostrar nada y **BBVA no podrá ver los textos
> legales**. Hay que desactivarla para producción, o al menos para el dominio de producción.

## 2. Variables de entorno

Configúralas en Vercel → Project → Settings → Environment Variables, para *Production*, *Preview* y
*Development*. Plantilla completa en `.env.local.example`.

| Variable | De dónde sale |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API (**secreta**, solo servidor) |
| `SUPABASE_DB_PASSWORD` | Supabase → Project Settings → Database |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe → Developers → API keys |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys (**secreta**) |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks, tras crear el endpoint |
| `RESEND_API_KEY` | Resend → API Keys |
| `NEXT_PUBLIC_SITE_URL` | El dominio definitivo, con `https://` y sin barra final |

`NEXT_PUBLIC_SITE_URL` alimenta `legalConfig.brand.siteUrl`, y de ahí salen el `sitemap.xml`, el
`robots.txt` y las URLs que se envían a BBVA. Si está mal, las URLs del correo a BBVA apuntarán a
`localhost`.

Quedan dos marcadores en `package.json` que son identificadores de Supabase, no secretos, y se
rellenan al enlazar el proyecto: `UPDATE_THIS_WITH_YOUR_SUPABASE_PROJECT_ID` en los scripts
`generate-types` y `supabase:link`.

## 3. Webhook de Stripe

El endpoint está en `/api/webhooks` (`src/app/api/webhooks/route.ts`) y sincroniza productos, precios
y suscripciones con Supabase. Tras el primer despliegue:

1. Stripe → Developers → Webhooks → Add endpoint → `https://TU-DOMINIO/api/webhooks`.
2. Copia el *signing secret* en `STRIPE_WEBHOOK_SECRET` y vuelve a desplegar.

En local: `npm run stripe:listen`.

## 4. Dominio

1. Vercel → Project → Settings → Domains → añade el dominio.
2. Apunta los DNS según indique Vercel.
3. Espera a que el certificado se emita (suele ser inmediato).
4. Actualiza `NEXT_PUBLIC_SITE_URL` y vuelve a desplegar.

## 5. Comprobación antes de escribir a BBVA

Abre una **ventana de incógnito** (sin sesión) y verifica que cargan:

```
https://TU-DOMINIO/legal
https://TU-DOMINIO/aviso-legal
https://TU-DOMINIO/terminos-y-condiciones
https://TU-DOMINIO/cancelacion
https://TU-DOMINIO/devoluciones
https://TU-DOMINIO/envios
https://TU-DOMINIO/seguridad-de-pago
https://TU-DOMINIO/privacidad
https://TU-DOMINIO/cookies
https://TU-DOMINIO/contacto
https://TU-DOMINIO/sitemap.xml
https://TU-DOMINIO/robots.txt
```

Y que en `/aviso-legal` **no** aparece ningún `[COMPLETAR: ...]`. Antes de desplegar:
`npm run legal:check`.

## 6. Implicación de protección de datos

Vercel Inc. es un **encargado del tratamiento** establecido en Estados Unidos. Ya figura como tal en
`legalConfig.processors` y se publica en `/privacidad`. Hay que tener firmado su acuerdo de
tratamiento de datos (DPA), que Vercel ofrece desde el panel de la cuenta.

Para la base de datos, lo más sencillo desde el punto de vista de cumplimiento es alojar el proyecto
de **Supabase en una región de la Unión Europea** (por ejemplo Frankfurt): evita la transferencia
internacional de los datos de miembros. Conviene confirmar la región del proyecto actual y, si está
fuera del EEE, ajustar la línea correspondiente de `legalConfig.processors`.
