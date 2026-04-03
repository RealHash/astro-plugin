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
