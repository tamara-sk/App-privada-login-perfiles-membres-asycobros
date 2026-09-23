# Secret Key — App privada de miembros

Plataforma privada de membresía de Secret Key: login, perfiles de miembros, cobro de cuotas y acceso
a experiencias.

Secret Key es un **ecosistema de optimización del tiempo y acceso extraordinario**. La misión es
convertir dinero en tiempo, y todo lo que se construye aquí debe ahorrar tiempo, crear experiencias
memorables, ampliar el acceso o reforzar la relación con los miembros.

## Stack

- **Next.js 15** (App Router, React 19) + **TypeScript**
- **Supabase** — base de datos y autenticación
- **Redsys** — TPV Virtual de BBVA, cobro directo
- **Resend + React Email** — correo transaccional
- **Tailwind CSS + shadcn/ui** — interfaz
- **Vercel** — alojamiento
- **GoHighLevel** — CRM y automatización

Partiendo de [next-supabase-stripe-starter](https://github.com/KolbySisk/next-supabase-stripe-starter)
de Kolby Sisk.

## Puesta en marcha

```bash
bun install
cp .env.local.example .env.local   # y rellena las credenciales
npm run dev
```

Guía completa de variables de entorno y despliegue: [`docs/despliegue-vercel.md`](docs/despliegue-vercel.md).

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint (usa `--fix` para ordenar imports) |
| `npx tsc --noEmit` | Typecheck |
| `npm run legal:check` | Falla si quedan datos legales sin completar |
| `npm run email:dev` | Previsualiza las plantillas de correo |
| `npm run migration:up` | Aplica migraciones de Supabase y regenera tipos |

## Información legal (Ley 34/2002)

El sitio publica toda la información exigida por el artículo 10 de la LSSI-CE y las condiciones de
contratación, accesibles **sin iniciar sesión** desde el pie de página:

`/legal` · `/aviso-legal` · `/terminos-y-condiciones` · `/cancelacion` · `/devoluciones` · `/envios` ·
`/seguridad-de-pago` · `/privacidad` · `/cookies` · `/contacto`

Los datos identificativos (denominación social, NIF, domicilio, datos registrales, contactos y
encargados del tratamiento) viven en un único fichero:
[`src/features/legal/legal-config.ts`](src/features/legal/legal-config.ts).

```bash
npm run legal:check   # falla mientras queden marcadores [COMPLETAR: ...]
```

**Estas rutas nunca pueden quedar detrás de un guard de autenticación**, aunque el resto de la
aplicación sea privada.

## Pagos

El cobro se realiza directamente contra el **TPV Virtual de BBVA, sobre Redsys**, sin proveedor
intermedio. Stripe queda fuera del proyecto.

| Pieza | Dónde |
| --- | --- |
| Firma HMAC-SHA256 y formulario de pago | `src/libs/redsys/` |
| Precios de las entradas (única fuente) | `src/features/membership/plans.ts` |
| Inicio del pago | `src/features/membership/actions/start-payment-action.ts` → `/pago/[pedido]` |
| Confirmación del banco | `src/app/api/redsys/notificacion/route.ts` |
| Tablas `payments` y `memberships` | `supabase/migrations/20260923120000_redsys_payments.sql` |

Variables de entorno: ver [`docs/despliegue-vercel.md`](docs/despliegue-vercel.md).

Contexto, checklist y borrador de respuesta a BBVA:
[`docs/bbva-tpv-virtual.md`](docs/bbva-tpv-virtual.md) y
[`docs/respuesta-bbva-tpv-virtual.md`](docs/respuesta-bbva-tpv-virtual.md).

## Entradas al Círculo

| Entrada | Slug | Precio | Descuento | Llavecitas por cada 10 € |
| --- | --- | --- | --- | --- |
| Key | `member_key` | 0 € | — | 3 |
| Secret Key | `member_secret_key` | 99 €/año | 10 % | 4 |
| Máster Key | `member_master_key` | 390 €/año | 20 % | 5 |

Se editan en `src/features/membership/plans.ts`. Cada pago cubre un año; renovar el mismo plan
antes de que venza suma el año nuevo al final del actual.

## Documentación

| Documento | Contenido |
| --- | --- |
| [`CLAUDE.md`](CLAUDE.md) | Contexto del proyecto, reglas y convenciones |
| [`docs/bbva-tpv-virtual.md`](docs/bbva-tpv-virtual.md) | Alta del TPV Virtual y cumplimiento LSSI |
| [`docs/respuesta-bbva-tpv-virtual.md`](docs/respuesta-bbva-tpv-virtual.md) | Borrador de respuesta a BBVA |
| [`docs/despliegue-vercel.md`](docs/despliegue-vercel.md) | Despliegue, variables de entorno y dominio |
| [`docs/integracion-ghl.md`](docs/integracion-ghl.md) | Integración con GoHighLevel |

## Licencia

MIT. Ver [`LICENSE`](LICENSE).
