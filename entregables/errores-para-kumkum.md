# Secret Key — errores detectados y estado

Recopilado el 5 de octubre de 2026. Todo lo de aquí está **verificado en vivo o contra el
repositorio**, con la referencia para comprobarlo.

Dos sitios distintos, conviene no mezclarlos:

| | Qué es | Dónde vive |
| --- | --- | --- |
| **secretkey.vip** | La web pública. SPA de Vite, desplegada por CLI | Proyecto de Vercel `secret-key-site` |
| **La app privada** | Next.js: login, perfiles, entradas al Círculo y cobros | `tamara-sk/App-privada-login-perfiles-membres-asycobros` |

---

## 1. Resuelto hoy

### Stripe eliminado del repositorio

Se cobra por el TPV Virtual de BBVA sobre Redsys, pero Stripe seguía en el código y reaparecía
una y otra vez. La causa: `main` estaba obsoleto y **con Stripe**, así que cada rama nueva lo
heredaba.

- **PR #3** sacó Stripe de la rama viva: dependencias, webhook, portal de cliente,
  sincronización de productos, fixtures, y la tienda entera, que iba sobre Stripe Checkout.
- **PR #4** puso `main` al día con esa rama.

Resultado: `main` y la rama viva a **cero referencias** en `src/` y en `package.json`.

Quedan cuatro ramas antiguas con Stripe (`optimistic-allen`, `skwr-big-bang`,
`exciting-carson`, `friendly-euler`). Son instantáneas de la situación anterior. Lo importante
es que **cualquier rama nueva que salga de `main` ya nace limpia**.

### La tienda, reconstruida sobre Redsys

Redsys cobra un importe firmado y nada más: sin líneas de pedido, sin recoger dirección, sin
códigos de descuento. Todo eso lo hacía la página de Stripe, así que hubo que construirlo:

| Paso | Dónde |
| --- | --- |
| Datos, dirección y envío | `/store/checkout` |
| Envío al banco | `/store/pago/[pedido]` |
| Confirmación | `/api/redsys/notificacion` |

La notificación verifica la firma, comprueba que **el importe coincide con el registrado** y
exige `status = 'pending'` al actualizar, de modo que un reenvío del banco no cobre dos veces.
El carrito se resuelve contra el catálogo en el servidor: el navegador aporta slugs, tallas y
cantidades, nunca precios.

---

## 2. Pendiente, por orden de urgencia

### 2.1 Claves de Stripe vivas en Vercel

El código ya no usa Stripe, pero las variables `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
y `STRIPE_WEBHOOK_SECRET` podrían seguir en el proyecto de Vercel. Desde aquí la API devuelve
403 al listarlas, así que hay que comprobarlo a mano:

> Vercel → proyecto `secret-key-site` → Settings → Environment Variables

Si siguen ahí, son credenciales vivas sin ningún uso. Conviene retirarlas, y cerrar o pasar a
modo prueba la cuenta de Stripe.

### 2.2 Cuatro artículos del blog dan 404

Comprobado en vivo. Los archivos existen en `dist/blog/`, pero `vercel.json` carece de su
rewrite, y el catch-all `/((?!blog/).*)` excluye `/blog/`, así que no resuelven:

- `/blog/soho-house-alternative`
- `/blog/private-members-club`
- `/blog/bali-wellness-retreat`
- `/blog/why-time-luxury`

**Arreglo:** añadir en `vercel.json`, antes del catch-all, un rewrite por artículo:

```json
{ "source": "/blog/soho-house-alternative", "destination": "/blog/soho-house-alternative.html" }
```

### 2.3 La portada define Secret Key por negación

`index.html` incumple la regla de marca en tres sitios, y uno de ellos es el que leen los
buscadores:

| Dónde | Qué dice |
| --- | --- |
| `disambiguatingDescription` del JSON-LD | «Secret Key is not a travel agency, not a social network and not a luxury club» |
| Cuarta pregunta del `FAQPage` | «Is Secret Key a travel agency or a social network?» → «No…» |
| Sección del `<noscript>` | Un apartado titulado **«What Secret Key is not»** |

Además usa «membership club» y «members». Hay una versión corregida preparada, a cero
infracciones, en el repositorio `tamara-sk/secret-key-site`, en `home/index-corregido.html`.

### 2.4 El `llms.txt` es la peor infracción, y la más silenciosa

`https://www.secretkey.vip/llms.txt` es el archivo que leen ChatGPT, Claude, Perplexity y
Gemini para saber qué es Secret Key. Define la marca ante toda la IA generativa, y la versión
publicada tiene:

- Un apartado entero titulado **«WHAT SECRET KEY IS NOT»**, con «NOT a travel agency» y «NOT a
  social network» desarrollados en párrafos propios.
- Dos preguntas frecuentes respondidas con «No.».
- La definición «private international membership club».
- **«Inner Circle»**, nombre derogado: el único correcto es **Secret Circle**.
- Un enlace de alta a `/join`, ruta que sirve la portada. La real es `/acceso`.

Versión corregida lista en `tamara-sk/secret-key-site`, en `public/llms.txt`.

### 2.5 Terminología en las páginas legales publicadas

`/terminos` y `/privacidad` usan «membresía», «miembro» y «miembros» de forma repetida: «cuenta
de miembro», «otros miembros», «solicitud de membresía», «datos de miembros». La regla del
proyecto retira esas palabras en favor de **el Círculo** y **la entrada al Círculo**. También
aparece «Master Key» donde el resto del material usa «Máster Key».

### 2.6 Correos de contacto sin unificar

| Dónde | Qué usa |
| --- | --- |
| Páginas publicadas | `legal@secretkey.vip` y `privacy@secretkey.vip` |
| Configuración del repositorio | `hello@secretkey.vip` y `legal@secretkey.vip` |

Hay que elegir un par y dejarlo en los dos sitios.

### 2.7 El código fuente de la web pública vive solo en un portátil

`secretkey.vip` se despliega por CLI desde una máquina local. El repositorio
`tamara-sk/secret-key-site` contiene las correcciones preparadas, pero **no el código fuente
del sitio**. Mientras siga así, ese portátil es un punto único de fallo.

Se sube en cuatro líneas, desde la carpeta del sitio:

```bash
git init
git remote add origin https://github.com/tamara-sk/secret-key-site
git fetch origin && git reset --soft origin/main
git add -A && git commit -m "Código fuente del sitio" && git push -u origin main
```

### 2.8 Dos codebases en un mismo proyecto de Vercel

El proyecto `secret-key-site` sirve secretkey.vip desde la SPA de Vite **y** está enlazado por
git a la app de Next.js. Hoy lo compensa `vercel.json` con `deploymentEnabled.main: false`, que
impide que un merge publique la app sobre el dominio. Funciona, pero lo correcto es separarlos:
un proyecto de Vercel propio para la app, con sus variables, y `secret-key-site` desconectado
del repositorio.

### 2.9 Proliferación de ramas

Ocho ramas en el repositorio, y las nuevas nacen de `main`. Hasta hoy eso significaba heredar
Stripe; ya está resuelto, pero conviene que las sesiones nuevas partan de `main` actualizado y
que se borren las ramas muertas (`optimistic-allen`, del PR #2 ya cerrado, y `skwr-big-bang`).

---

## 3. Bloqueado por BBVA

El contrato de comercio virtual está **firmado y en vigor desde el 14/09/2026**. Faltan dos
cosas, y las dos dependen del banco:

1. **Los parámetros de conexión de Redsys**: entorno, número de terminal, clave de firma y
   moneda. Número de comercio: **370662108**.
2. **Habilitar el pago por referencia**, sin el cual la renovación anual automática resulta
   impracticable.

La información del artículo 10 publicada era la condición para que los entreguen, y ya está en
vivo. El correo de respuesta está redactado y listo en `entregables/correo-bbva-redsys.md`.

---

## 4. Datos de la sociedad — confirmados

Certificación registral expedida por la Registradora Mercantil de Castellón de la Plana el
22/01/2026 (asiento 56 del Diario 2026):

| Campo | Valor |
| --- | --- |
| Denominación | THE SECRET KEY LABS, S.L. |
| NIF | B25909565 |
| Domicilio | Camino Vora Riu Solades 1176, 12540 Vila-real, Castellón |
| Registro | Castellón · hoja CS-50580 · folio electrónico · inscripción 1 |
| EUID | ES12011.000207496 |
| IRUS | 1000465501454 |
| Capital suscrito | 3.000,00 € |
| Órgano de administración | Administrador único |
| CNAE | 8230, 6832, 7020 |

El Registro Mercantil de Castellón lleva **folio electrónico**: la hoja y la inscripción
identifican la sociedad, y el tomo y el folio en papel quedan superados. Ahí estuvo semanas de
confusión, buscando un tomo que este registro ya deja de emitir.

El domicilio correcto lleva el número **1176**. La variante «1771» que circuló en el código era
errónea: mismos dígitos, orden cambiado. Es el dato que BBVA contrasta contra la escritura.
