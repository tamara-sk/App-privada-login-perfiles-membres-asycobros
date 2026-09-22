# Integración con GoHighLevel (GHL)

GoHighLevel es el CRM y el motor de automatización de Secret Key. Este documento fija qué papel
juega frente a la app privada, qué implicaciones legales tiene y qué queda por decidir.

> Los apartados marcados **[Por confirmar]** dependen de cómo esté montada hoy la cuenta de GHL.
> Confírmalos y actualiza este documento: es la referencia para futuras sesiones de trabajo.

## 1. Reparto de responsabilidades

La regla que evita duplicar sistemas y datos:

| Responsabilidad | Sistema |
| --- | --- |
| Captación, funnels, formularios de solicitud de acceso | **GHL** |
| Seguimiento comercial del lead hasta que se convierte en miembro | **GHL** |
| Campañas de email y SMS, secuencias, recordatorios comerciales | **GHL** |
| Identidad del miembro, login y perfil | **App (Supabase)** |
| Cobro de la membresía y facturación | **App (Stripe / TPV BBVA)** |
| Correo transaccional (confirmación de pedido, factura, acceso) | **App (Resend)** |
| Reservas de experiencias y su histórico | **App** |

El criterio: **GHL se queda con el ciclo comercial; la app se queda con la relación contractual.**
El correo transaccional no debe salir de GHL, porque va ligado a la operación de pago y tiene que
poder acreditarse ante BBVA y ante el consumidor.

## 2. Punto de unión

El momento en el que un lead de GHL se convierte en miembro de la app. Opciones, de menos a más
trabajo:

1. **Enlace simple.** GHL envía al lead a `/signup` con su email. Sin integración técnica; el lead
   se registra y el CRM se actualiza a mano o con una etiqueta al recibir la notificación de alta.
2. **Webhook desde la app hacia GHL.** Al completarse un alta o un pago, la app llama a un webhook de
   GHL para mover el contacto de etapa y disparar la secuencia de bienvenida. Es la opción
   recomendada: una sola dirección, poco acoplamiento.
3. **Sincronización bidireccional.** GHL y la app comparten estado de suscripción en ambos sentidos.
   Añade complejidad operativa y puntos de fallo; solo merece la pena si el equipo trabaja el día a
   día dentro de GHL.

**Recomendación: opción 2.** El punto natural de enganche es el webhook de Stripe que ya existe en
`src/app/api/webhooks/route.ts`, donde se procesan los eventos de suscripción: ahí se sabe cuándo un
miembro se da de alta, renueva o cancela.

**[Por confirmar]** qué opción está montada hoy, si hay ya un webhook de GHL en uso y con qué campos.

## 3. Implicaciones legales

Esto no es opcional, y conecta con el expediente de BBVA:

- **HighLevel Inc. es un encargado del tratamiento** establecido en Estados Unidos. Ya figura como
  tal en `legalConfig.processors` y se publica en `/privacidad`. Hay que tener firmado su DPA.
- **Consentimiento para comunicaciones comerciales.** Los artículos 20 y 21 de la LSSI solo permiten
  enviar email o SMS comercial a quien lo ha solicitado o autorizado expresamente, o con quien existe
  relación contractual previa por servicios similares. Los formularios de GHL deben recoger ese
  consentimiento de forma separada, con casilla no premarcada, y **guardar la prueba** (fecha, hora,
  IP y texto aceptado).
- **Baja en un clic.** Toda comunicación comercial debe incluir un medio sencillo y gratuito de
  oponerse. Las secuencias de GHL tienen que llevarlo.
- **Derechos RGPD.** Si un miembro ejerce supresión o portabilidad, hay que atenderlo **también en
  GHL**, no solo en la base de datos de la app. Conviene tener escrito el procedimiento.
- **Enlace a la política de privacidad** en todos los formularios de GHL, apuntando a
  `https://TU-DOMINIO/privacidad`.

**[Por confirmar]** si los formularios actuales de GHL recogen el consentimiento por separado y
enlazan la política de privacidad.

## 4. Riesgo a vigilar: no cobrar desde GHL

GHL permite cobrar con sus propias integraciones de pago. **No debe usarse para la membresía.**
Motivos:

- El alta que se está tramitando con BBVA es para el TPV Virtual de **este** sitio. Un cobro que sale
  de otro dominio o de otra pasarela no encaja con lo declarado.
- Si el cobro se hace desde GHL, entra en juego otro proveedor de pagos, y eso cambia la respuesta a
  la pregunta de BBVA sobre el IPSP (ver `docs/bbva-tpv-virtual.md`).
- Las condiciones de contratación, la factura y el justificante deben salir del mismo sistema que
  gestiona la relación contractual.

**[Por confirmar]** que no hay ningún flujo de pago activo en GHL para la membresía.

## 5. Datos que la app enviaría a GHL

Cuando se implemente el webhook, el mínimo imprescindible (principio de minimización, art. 5.1.c
RGPD):

| Campo | Para qué |
| --- | --- |
| Email | Identificar el contacto en GHL |
| Nombre | Personalizar la comunicación |
| Estado de la membresía | Mover de etapa (alta, activa, cancelada) |
| Plan contratado | Segmentar secuencias |
| Fecha de alta o renovación | Disparar recordatorios |

**Nunca** se envían a GHL datos de pago, datos de tarjeta ni información sensible que un miembro haya
facilitado para una experiencia (alergias, salud, necesidades específicas).

## 6. Siguientes pasos

- [ ] Confirmar los cuatro **[Por confirmar]** de este documento.
- [ ] Firmar el DPA de HighLevel si no está firmado.
- [ ] Revisar los formularios de GHL: consentimiento separado, prueba guardada y enlace a
      `/privacidad`.
- [ ] Decidir e implementar el punto de unión (recomendado: webhook desde
      `src/app/api/webhooks/route.ts`).
- [ ] Documentar el procedimiento de borrado y portabilidad que cubra app + GHL.
