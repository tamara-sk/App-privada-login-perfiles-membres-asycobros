# Traspaso a Kumkum — datos legales y URLs para el TPV de BBVA

Todo lo que hace falta para publicar la información del artículo 10 de la Ley 34/2002 y
cerrar el alta del TPV Virtual. Copia y pega desde aquí.

## 1. Datos de la sociedad

| Campo | Valor |
| --- | --- |
| Denominación social | **The Secret Key Labs, S.L.** |
| NIF / CIF | **B25909565** |
| Domicilio social | Camino Vora Riu Solades 1176, 12540 Vila-real, Castellón, España |
| Correo de contacto | hello@secretkey.vip |
| Correo de protección de datos | legal@secretkey.vip |
| Registro Mercantil | **Castellón** (confirmado) |
| Escritura de constitución | 16/12/2025, protocolo 1779, notario JCHB |
| Teléfono de atención | ⚠️ **PENDIENTE** — decisión de Tamara |
| Tomo / folio / hoja / inscripción | No constan en la documentación disponible. Ver nota abajo |

Los cuatro datos registrales que faltan están en las **últimas páginas** de la escritura de
constitución, en las certificaciones de inscripción y liquidación:

> Fichero: `01592 012629 Esc 2025 12 16 1779 JCHB Constitucion sociedad.pdf`
> Correo: «Fwd: Copia Constitución», de FISTEKA (cbs@fisteka.es), 27/08/2026.

El Registro Mercantil es el de **Castellón**, ya confirmado: es la copia que lleva el sello
«INSCRITO EN EL REGISTRO MERCANTIL DE CASTELLÓN». El prefijo `B25` del NIF, pese a
corresponder a la serie de Lleida, no contradice la inscripción en Castellón.

## 2. URLs que deben existir y ser públicas

El art. 10 de la LSSI exige acceso **permanente, fácil, directo y gratuito**, sin registro ni
inicio de sesión. Deben estar enlazadas desde el pie de **todas** las páginas.

| Contenido | Ruta |
| --- | --- |
| Índice de información legal | `/legal` |
| Aviso legal (datos del art. 10) | `/aviso-legal` |
| Términos y condiciones de contratación | `/terminos-y-condiciones` |
| Cancelación de pedidos | `/cancelacion` |
| Devolución y reembolso | `/devoluciones` |
| Entrega y envíos | `/envios` |
| Seguridad y protección al comprador | `/seguridad-de-pago` |
| Privacidad y protección de datos | `/privacidad` |
| Política de cookies | `/cookies` |
| Contacto | `/contacto` |

Sobre el dominio definitivo quedan así:

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
```

Hoy secretkey.vip publica `/aviso-legal.html` y `/privacy.html`. Hay que decidir si las
rutas nuevas se añaden ahí o si BBVA recibe las de la aplicación: **tienen que estar en el
dominio que se declare en el alta**, y ser el mismo en ambos sitios.

## 3. Textos ya redactados

Los diez documentos están escritos, en español y conforme a la LSSI-CE, el RDL 1/2007
(consumidores), el RGPD y la LOPDGDD. Están en `src/app/(legal)/` de este repositorio, en la
rama `claude/bbva-ley-34-2002-compliance-qak9nb`.

Todos leen sus datos de un único fichero, `src/features/legal/legal-config.ts`: al rellenar
ahí el teléfono y los datos registrales, las diez páginas quedan completas a la vez.

```bash
npm run legal:check   # falla mientras quede algún dato sin rellenar
```

> **Antes de reutilizar estos textos**, aplícales la terminología vigente: «miembro» y «club»
> quedan eliminados; se usa **The Circle** / **el Círculo** y **Secret Circle**. Está en
> `CLAUDE.md`.

## 4. Pagos

Secret Key cobra por el **TPV Virtual de BBVA sobre Redsys**, sin IPSP. Lo que Kumkum
necesita saber para la integración:

- Redsys es una pasarela **por redirección**: el sitio envía un formulario firmado (código de
  comercio, terminal, número de pedido, importe, moneda), el cliente paga en la página del
  banco, y el banco llama a una URL de notificación. La clave secreta se queda siempre en el
  servidor.
- El **cobro recurrente exige «pago por referencia»**, que BBVA debe habilitar en el comercio.
  El primer pago devuelve una referencia y los siguientes la reutilizan. El ciclo de
  facturación y la gestión de impagos viven en nuestro código.
- El número de pedido tiene un formato fijo que el banco valida, y cada uno se usa una vez.

Pendiente de confirmar con BBVA: entorno de Redsys, número de terminal, moneda y si el pago
por referencia está habilitado.

## 5. Checklist

- [ ] Conseguir la nota simple del Registro Mercantil.
- [ ] Decidir el teléfono de atención que se publica.
- [ ] Rellenar los 7 valores restantes de `legal-config.ts` y pasar `npm run legal:check`.
- [ ] Publicar las diez rutas en el dominio definitivo, enlazadas desde el pie.
- [ ] Comprobarlas en ventana de incógnito, sin sesión iniciada.
- [ ] Enviar a BBVA la respuesta de `docs/respuesta-bbva-tpv-virtual.md`.
