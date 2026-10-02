# Feedback de la revisión · App privada de miembros (Secret Key)

**Borrador para revisión de Tamara antes de compartir.**
Fecha: 2026-10-02 · Rama: `claude/exciting-carson-jp1af2`

## Alcance real de la revisión

Lo que se hizo:
- Auditoría de seguridad del código (lectura), con un agente especializado.
- Typecheck, lint y build tras los cambios.

Lo que **no** se hizo todavía:
- Prueba como miembro nuevo en un navegador (registro, solicitud, reservas, pagos, mensajes de error).
- Revisión de la configuración real del proyecto Supabase.
- Prueba con una cuenta real de prueba.

Los hallazgos de abajo vienen de leer el código. Los marcados como "por verificar" dependen de algo que no se pudo comprobar.

## Qué está bien

- No hay secretos reales en el código ni en el historial de git.
- La clave `service_role` de Supabase solo se usa en servidor.
- RLS está activado en todas las tablas y `customers` no es accesible para los usuarios.
- No hay redirecciones abiertas.

## Ya corregido en esta rama

| ID | Qué pasaba | Qué se hizo |
|---|---|---|
| A-01 | `react` y `react-dom` fijados en 19.0.0, versión señalada por una vulnerabilidad de ejecución remota de código en componentes de servidor (por verificar con la auditoría completa). | `next` ^15.5.26 y `react`/`react-dom` ^19.2.8. |
| A-02 | Ninguna ruta estaba protegida en el middleware. | `/account` y `/manage-subscription` exigen sesión y solicitud aceptada. |
| A-03 | Registro abierto en una app que debe ser privada. | Cualquiera puede solicitar acceso, pero hasta ser aceptado solo ve la pantalla de solicitud. |
| A-04 | La identidad se tomaba de `getSession()`, que no revalida en servidor. | Ahora usa `getUser()`. |
| A-07 | El callback de login ignoraba errores. | Ahora trata el error y vuelve a `/login`. |

## Pendiente, por prioridad

**Crítico / alto**
1. **Aplicar la migración** `supabase/migrations/20260930000000_membership_applications.sql` en Supabase. Sin ella, `/apply` no guarda solicitudes.
2. **Retirar Stripe y montar Redsys** (TPV Virtual BBVA). Al retirarlo, también desaparece la ruta `/pricing` y el webhook actuales.
   - El importe se calcula en servidor, nunca desde el cliente.
   - Verificar la firma HMAC-SHA256 de la notificación en tiempo constante.
   - Procesar cada pedido (`Ds_Order`) una sola vez.
   - Confirmar el pago por la notificación, no por la redirección del navegador.
   - No guardar datos de tarjeta.

**Medio**
3. **A-05:** un miembro puede escribir su propio `billing_address` y `payment_method` en `users`. Restringir columnas editables.
4. **A-07 (resto):** si falta `NEXT_PUBLIC_SITE_URL`, el login redirige a `localhost`. Debe fallar al arrancar.
5. **A-08:** el webhook devuelve el mensaje de error de la firma al llamante. Responder genérico.

**Bajo**
6. Logs con identificadores de usuario y objetos de error completos (A-10).
7. `supabase-admin.ts` sin `import 'server-only'` (A-09).
8. Dependencias antiguas o con avisos de `bun audit` (denegación de servicio en paquetes secundarios). Pasada aparte con pruebas.
9. Carpeta `delete-me/` con una captura de la plantilla original.
10. Nombre del paquete aún en `UPDATE_THIS_WITH_YOUR_APP_NAME`.

## Decisiones de Tamara que bloquean trabajo

- Cómo se aceptan las solicitudes: hoy es a mano en el panel de Supabase. Falta decidir si se necesita un panel de administración.
- Si se mantienen Google y GitHub en el login.
- Si las membresías son de pago único o recurrentes (cambia el diseño de Redsys).
- Textos visibles de `/apply`: son un borrador.

## Siguiente prueba recomendada

En el Mac, con Chrome for Testing y una cuenta real de prueba:
registro → solicitud → aceptación manual → acceso → cierre de sesión, y comprobar que una cuenta sin aceptar no llega a `/account`.
