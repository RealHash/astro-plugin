# Estrategia de testing

## Enfoque

Apps Script para Editor add-ons no tiene una experiencia de testing automatizado equivalente a una app Node clásica sin agregar más tooling. Para esta base, la estrategia es:

- server code modular para facilitar revisión
- smoke tests manuales repetibles
- test deployments sobre un documento controlado

## Smoke test mínimo

1. Abrir documento nuevo.
2. Abrir `Extensions > Astro Symbols`.
3. Verificar que carga la sidebar.
4. Buscar `sol`, `aries`, `trígono`.
5. Insertar al menos tres símbolos.
6. Copiar uno al portapapeles.
7. Cambiar preferencia de espacios.
8. Cambiar presentación entre `auto`, `texto` y `emoji`.
9. Reabrir sidebar y confirmar persistencia.

## Casos de inserción

- Cursor en párrafo simple.
- Cursor al inicio, medio y final de línea.
- Selección parcial de texto.
- Selección de texto completa dentro de párrafo.
- Cursor dentro de celda de tabla.
- Cursor en header o footer.
- Documento sin cursor válido con fallback al final.

## Casos de degradación

- Fuente sugerida activada en documento donde no haya cambio visible.
- Presentación `texto` o `emoji` en símbolos que Google Docs siga renderizando igual.
- Clipboard bloqueado por navegador.
- Símbolo inexistente enviado por cliente.
- Selección no textual.

## Criterio de aceptación del MVP

- El add-on abre sin errores.
- La sidebar responde rápido.
- La búsqueda filtra bien.
- La inserción nunca rompe el documento por una selección compleja.
- El usuario siempre recibe feedback entendible.
