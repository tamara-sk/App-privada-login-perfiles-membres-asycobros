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
| `REDSYS_MERCHANT_CODE` | Número de comercio de BBVA: `370662108` |
| `REDSYS_TERMINAL` | Número de terminal que da BBVA (normalmente `1`) |
| `REDSYS_SECRET_KEY` | Clave de firma SHA-256 que da BBVA (**secreta**, solo servidor) |
| `REDSYS_ENV` | `test` para pruebas, `live` para cobros reales |
| `REDSYS_CURRENCY` | `978` (euros). Opcional |
| `REDSYS_PAGO_REFERENCIA` | `true` solo cuando BBVA active el pago por referencia. Opcional |
| `RESEND_API_KEY` | Resend → API Keys |
| `NEXT_PUBLIC_SITE_URL` | El dominio definitivo, con `https://` y sin barra final |

`NEXT_PUBLIC_SITE_URL` alimenta `legalConfig.brand.siteUrl`, y de ahí salen el `sitemap.xml`, el
`robots.txt` y las URLs que se envían a BBVA. Si está mal, las URLs del correo a BBVA apuntarán a
`localhost`.

Quedan dos marcadores en `package.json` que son identificadores de Supabase, no secretos, y se
rellenan al enlazar el proyecto: `UPDATE_THIS_WITH_YOUR_SUPABASE_PROJECT_ID` en los scripts
`generate-types` y `supabase:link`.

## 3. Notificación de Redsys

Redsys confirma cada cobro llamando a `https://www.secretkey.vip/api/redsys/notificacion`
(`src/app/api/redsys/notificacion/route.ts`). La app envía esa URL en cada pago, así que en el
módulo de administración de Redsys no hay nada que configurar. Solo hace falta que la URL sea
pública: **sin protección de despliegue de Vercel** en el entorno que cobra.

Para probar, deja `REDSYS_ENV=test` y usa la clave de pruebas y las tarjetas de prueba que da BBVA.
Pasa a `live` solo cuando una compra de prueba complete el circuito entero.

## 4. Dominio

1. Vercel → Project → Settings → Domains → añade el dominio.
2. Apunta los DNS según indique Vercel.
3. Espera a que el certificado se emita (suele ser inmediato).
4. Actualiza `NEXT_PUBLIC_SITE_URL` y vuelve a desplegar.

## 5. Comprobación antes de escribir a BBVA

Abre una **ventana de incógnito** (sin sesión) y verifica que cargan:

```
https://www.secretkey.vip/legal
https://www.secretkey.vip/aviso-legal
https://www.secretkey.vip/terminos-y-condiciones
https://www.secretkey.vip/cancelacion
https://www.secretkey.vip/devoluciones
https://www.secretkey.vip/envios
https://www.secretkey.vip/seguridad-de-pago
https://www.secretkey.vip/privacidad
https://www.secretkey.vip/cookies
https://www.secretkey.vip/contacto
https://www.secretkey.vip/sitemap.xml
https://www.secretkey.vip/robots.txt
```

Y que en `/aviso-legal` **no** aparece ningún `[COMPLETAR: ...]`. Antes de desplegar:
`npm run legal:check`.

## 6. Implicación de protección de datos

Vercel Inc. es un **encargado del tratamiento** establecido en Estados Unidos. Ya figura como tal en
`legalConfig.processors` y se publica en `/privacidad`. Hay que tener firmado su acuerdo de
tratamiento de datos (DPA), que Vercel ofrece desde el panel de la cuenta.

Para la base de datos, lo más sencillo desde el punto de vista de cumplimiento es alojar el proyecto
de **Supabase en una región de la Unión Europea** (por ejemplo Frankfurt): evita la transferencia
internacional de los datos del Círculo. Conviene confirmar la región del proyecto actual y, si está
fuera del EEE, ajustar la línea correspondiente de `legalConfig.processors`.
