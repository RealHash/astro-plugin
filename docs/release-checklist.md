# Checklist de release

## Release interna

- Verificar que `appsscript.json` solo pida scopes mínimos.
- Confirmar que el menú aparece en Docs sin errores.
- Probar apertura de sidebar en documento vacío y documento real.
- Probar inserción con cursor activo.
- Probar inserción con selección de texto.
- Probar inserción en tabla.
- Probar fallback al final del documento.
- Probar toggle de espacios y persistencia.
- Probar favoritos y filtros rápidos.
- Probar badges y metadata de símbolos en sidebar.
- Probar toggle de fuente sugerida y degradación.
- Probar clipboard en Chrome.
- Revisar logs de Apps Script para errores no controlados.
- Crear nueva versión del proyecto antes del test deployment compartido.
- Comunicar número de versión y alcance del release.

## Checklist para publicación futura

- Asociar el proyecto a un Google Cloud project estándar.
- Definir nombre final, íconos y branding.
- Completar configuración del Marketplace SDK.
- Revisar política de privacidad y soporte si aplica.
- Verificar si algún scope requiere verificación OAuth adicional.
- Revisar que la UX no dependa de estados ocultos ni permisos inesperados.
- Preparar material de QA reproducible.
- Validar comportamiento en cuentas del dominio y cuentas de prueba separadas.
- Evaluar si conviene sumar homepage card además de la sidebar HTML.

## Checklist de resubmisión a Google Workspace Marketplace

- Asegurar que el nombre corto, la descripción corta y la descripción larga del listing usen `Google Docs™` donde corresponda.
- Agregar una nota de atribución en la descripción larga, por ejemplo: `Google Docs™ is a trademark of Google LLC.`
- Verificar que la URL de soporte publique un punto de contacto real visible para usuarios: email o formulario.
- Verificar que la URL de privacy policy apunte a una política pública real y no a una página genérica.
- Verificar que la URL de terms of service apunte a términos públicos reales y consistentes con el producto.
- Si la app pide `userinfo.email`, verificar que la privacy policy y el listing expliquen para qué se usa hoy.
- Copiar manualmente al Marketplace SDK todos los scopes de `src/appsscript.json`.
- Copiar manualmente los mismos scopes al OAuth consent screen de Google Cloud.
- No remover los scopes por defecto `userinfo.email` y `userinfo.profile` del consentimiento.
- Confirmar que los scopes en Apps Script, Marketplace SDK y OAuth consent screen sean idénticos.
- Enviar la app a OAuth verification si hay scopes sensibles o restringidos.
- No resubir al Marketplace hasta que OAuth verification haya sido aprobada.
- Verificar que el sitio público no muestre botones o enlaces al Marketplace si la app todavía no fue aprobada.
