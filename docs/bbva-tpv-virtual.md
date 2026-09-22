# Alta del TPV Virtual de BBVA — cumplimiento de la Ley 34/2002 (LSSI-CE)

Checklist de lo que BBVA pide en su correo (ALTATPVVIRTUAL@BBVA.COM) y dónde queda cubierto.

## 1. Artículo 10 LSSI: información general del prestador

| Requisito (art. 10.1) | Dónde se publica | Estado |
| --- | --- | --- |
| a) Nombre o denominación social | `/aviso-legal`, `/legal`, pie de página | ⚠️ Pendiente del dato real |
| a) Domicilio o establecimiento permanente en España | `/aviso-legal`, `/legal`, `/contacto` | ⚠️ Pendiente del dato real |
| a) Correo electrónico y medio de comunicación directa y efectiva | `/aviso-legal`, `/contacto`, pie de página | ⚠️ Pendiente del dato real |
| b) Datos de inscripción en el Registro Mercantil | `/aviso-legal` | ⚠️ Pendiente del dato real |
| c) Número de identificación fiscal (NIF/CIF) | `/aviso-legal`, `/legal`, pie de página | ⚠️ Pendiente del dato real |

La estructura está publicada y enlazada desde **todas** las páginas del sitio (pie de página), de forma
permanente, fácil, directa y gratuita, y **sin necesidad de iniciar sesión**. Solo falta sustituir los
marcadores por los datos reales de la sociedad.

## 2. Términos y condiciones exigidos por BBVA

| Requisito de BBVA | URL |
| --- | --- |
| Cancelación de pedidos | `/cancelacion` |
| Devolución y reembolso | `/devoluciones` |
| Seguridad y protección a compradores | `/seguridad-de-pago` |
| Política de cookies | `/cookies` |
| Envíos | `/envios` |
| Privacidad y protección de datos | `/privacidad` |
| Condiciones generales de contratación | `/terminos-y-condiciones` |
| Índice de toda la información legal | `/legal` |

Además se publica `/contacto` como canal de comunicación directa y efectiva, y se ha añadido un banner
de consentimiento de cookies (art. 22.2 LSSI): la analítica no se carga hasta que el usuario acepta, y
rechazar es tan sencillo como aceptar.

## 3. Datos que hay que completar antes de enviar el alta

Todos viven en un único fichero: `src/features/legal/legal-config.ts`.

```
npm run legal:check
```

El comando falla mientras quede algún marcador `[COMPLETAR: ...]` y enumera los que faltan. Datos necesarios:

1. Denominación social completa (con la forma societaria).
2. NIF/CIF.
3. Domicilio social: calle y número, código postal, municipio y provincia.
4. Correo electrónico de contacto y teléfono de atención.
5. Datos registrales: Registro Mercantil, tomo, libro (si aplica), folio, hoja e inscripción.
6. Correo para el ejercicio de derechos en materia de protección de datos.
7. `brand.siteUrl`: el dominio definitivo (BBVA debe poder abrir las URLs desde fuera).

## 4. Pregunta de BBVA sobre el IPSP

BBVA pregunta expresamente si se va a integrar con un **IPSP** (proveedor de servicios de pago
intermedio). La respuesta cambia el alta, así que hay que decidirlo antes de contestar:

- **Opción A — cobro directo contra el TPV Virtual de BBVA (sin IPSP).** Se integra Redsys directamente.
  En `legal-config.ts`, `payments.ipsp` se deja en `null`.
- **Opción B — cobro a través de un IPSP** (Stripe, Adyen, PayPal, un agregador...). Hay que
  comunicárselo a BBVA con su denominación social, y rellenar `payments.ipsp` en `legal-config.ts`; los
  textos legales lo reflejan automáticamente en `/aviso-legal`, `/terminos-y-condiciones`,
  `/seguridad-de-pago` y `/privacidad`.

> **Atención:** el proyecto integra hoy **Stripe** (`src/libs/stripe`, `src/app/api/webhooks`,
> `src/features/pricing`). Stripe es un IPSP. Si se mantiene esa integración junto al TPV de BBVA,
> la respuesta a BBVA es la opción B. Si el TPV de BBVA va a sustituir a Stripe, hay que planificar la
> migración a Redsys antes de cobrar en producción.

## 5. Documentación relacionada

- [`../CLAUDE.md`](../CLAUDE.md) — contexto y reglas del proyecto.
- [`despliegue-vercel.md`](despliegue-vercel.md) — dominio, HTTPS, variables de entorno y la
  comprobación en ventana de incógnito antes de escribir a BBVA. **Ojo con la protección de
  despliegue de Vercel: si está activa, BBVA no puede ver los textos legales.**
- [`integracion-ghl.md`](integracion-ghl.md) — GoHighLevel como CRM, y por qué la membresía **no**
  debe cobrarse desde GHL: cambiaría la respuesta sobre el IPSP.
- [`respuesta-bbva-tpv-virtual.md`](respuesta-bbva-tpv-virtual.md) — borrador del correo.

## 6. Antes de responder a BBVA

- [ ] Completar `legal-config.ts` y verificar con `npm run legal:check`.
- [ ] Decidir A o B en la pregunta del IPSP.
- [ ] Desplegar en el dominio definitivo con HTTPS válido y sin protección de despliegue activa.
- [ ] Comprobar que las URLs abren en ventana de incógnito, sin sesión iniciada.
- [ ] Revisar los plazos de cancelación de `/cancelacion` y los de envío de `/envios`: llevan valores
      razonables por defecto, pero deben coincidir con la operativa real de Secret Key.
- [ ] Enviar la respuesta (borrador en `docs/respuesta-bbva-tpv-virtual.md`) a ALTATPVVIRTUAL@BBVA.COM.

## 7. Revisión jurídica

Los textos están redactados conforme a la Ley 34/2002 (LSSI-CE), el Real Decreto Legislativo 1/2007
(consumidores y usuarios), el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
Aun así, **no sustituyen al asesoramiento de un profesional**: conviene que la asesoría jurídica de
Secret Key los valide antes de publicarlos, en especial los plazos de cancelación y las excepciones al
derecho de desistimiento, que dependen de la operativa concreta de cada experiencia.
