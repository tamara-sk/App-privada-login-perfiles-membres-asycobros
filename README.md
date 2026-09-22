# Secret Key — App privada de miembros

Plataforma privada de membresía de Secret Key: login, perfiles de miembros, cobro de cuotas y acceso
a experiencias.

Secret Key es un **ecosistema de optimización del tiempo y acceso extraordinario**. La misión es
convertir dinero en tiempo, y todo lo que se construye aquí debe ahorrar tiempo, crear experiencias
memorables, ampliar el acceso o reforzar la relación con los miembros.

## Stack

- **Next.js 15** (App Router, React 19) + **TypeScript**
- **Supabase** — base de datos y autenticación
- **Stripe** — suscripciones y checkout *(pendiente de decisión: ver el apartado de pagos)*
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

Actualmente el cobro se realiza con **Stripe**. Está en curso el alta del **TPV Virtual de BBVA**
(Redsys), y queda por decidir si se mantiene Stripe —que es un IPSP y hay que declarar a BBVA— o se
cobra directamente contra Redsys.

Contexto, checklist y borrador de respuesta a BBVA:
[`docs/bbva-tpv-virtual.md`](docs/bbva-tpv-virtual.md) y
[`docs/respuesta-bbva-tpv-virtual.md`](docs/respuesta-bbva-tpv-virtual.md).

## Planes de membresía

Los beneficios de cada plan se editan **desde Stripe**, no desde el código. En los metadatos de cada
producto:

- `price_card_variant`: `basic` | `pro` | `enterprise` (controla el estilo de la tarjeta)
- `features`: beneficios separados por `|`, por ejemplo
  `Acceso a la plataforma privada|Concierge por email|Cancelación flexible`

Plantilla de ejemplo en [`stripe-fixtures.json`](stripe-fixtures.json).

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
