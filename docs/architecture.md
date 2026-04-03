# Arquitectura

## Resumen

La solución usa un split claro entre:

- **Servidor Apps Script** para menú, bootstrap, catálogo, inserción y persistencia.
- **Cliente HTML Service** para sidebar, búsqueda, render y feedback visual.

El objetivo es mantener el proyecto compatible con Apps Script y a la vez suficientemente modular para trabajo en equipo.

## Por qué Editor add-on

La necesidad principal del producto es una **sidebar visual HTML** dentro de Google Docs. Esa UX encaja con el modelo de **Editor add-on** basado en:

- `DocumentApp`
- `HtmlService`
- `onOpen`
- `createAddonMenu`
- `showSidebar`

Un Google Workspace add-on moderno para editores usa principalmente **cards/homepages** definidas en manifest. Esa arquitectura sirve mejor para paneles informativos, integración con servicios externos o flujos accionables tipo card, pero no es la base ideal para esta primera versión de inserción visual densa con grid de símbolos.

## Capas

### 1. Bootstrap y menú

- `Main.gs`
- `Menu.gs`

Responsabilidades:

- registrar `onOpen` y `onInstall`
- construir el menú del add-on
- exponer funciones globales requeridas por Apps Script

Restricción importante:

- `onOpen` no debe depender de scopes o servicios innecesarios. Se limita a logging y creación del menú.

## 2. Configuración y utilidades

- `Config.gs`
- `Utils.gs`
- `I18n.gs`

Responsabilidades:

- metadata de la app
- defaults de preferencias
- normalización de locale
- helpers de template, JSON y strings
- mensajes de UI y servidor

## 3. Catálogo

- `Catalog.gs`
- `CatalogData.gs`
- `symbol-catalog.json`

Responsabilidades:

- `symbol-catalog.json`: fuente editable del catálogo
- `CatalogData.gs`: artefacto generado compatible con Apps Script
- `Catalog.gs`: normalización, i18n de labels y estructura lista para cliente

El catálogo está centralizado y pensado para sumar:

- casas
- nodos
- quirón
- puntos arábigos
- glifos personalizados
- snippets de texto
- categorías dinámicas

Flujo operativo:

1. editar `src/symbol-catalog.json`
2. ejecutar `npm run catalog:sync`
3. subir cambios con `clasp push`

## 4. Inserción y seguridad operativa

- `Insert.gs`

Responsabilidades:

- resolver el símbolo pedido
- construir el texto a insertar
- intentar inserción por cursor
- degradar a inserción sobre selección
- usar fallback al final del documento
- aplicar fuente sugerida de forma no destructiva
- devolver feedback útil al cliente

Estrategia deliberada:

- evitar manipulación agresiva de selección compleja
- preferir una inserción conservadora antes que modificar rangos ambiguos

## 5. Persistencia de usuario

- `Preferences.gs`

Responsabilidades:

- guardar preferencias individuales
- mantener recientes
- dejar lista la estructura de favoritos

Se usa `PropertiesService.getUserProperties()` porque alcanza para este MVP sin infraestructura externa.

## 6. Cliente sidebar

- `Sidebar.html`
- `Sidebar.css.html`
- `Sidebar.js.html`

Responsabilidades:

- bootstrap inicial con `google.script.run`
- render de secciones y símbolos
- búsqueda local
- toggles de settings
- copy to clipboard
- feedback visual y estados

## Flujo principal

1. El usuario abre Docs.
2. `onOpen` crea el menú del add-on.
3. El usuario abre la sidebar.
4. La sidebar pide bootstrap al servidor.
5. El servidor devuelve locale, strings, catálogo y preferencias.
6. El cliente renderiza la UI.
7. El usuario hace clic en un símbolo.
8. El cliente invoca la inserción.
9. El servidor inserta, actualiza recientes y devuelve resultado.
10. El cliente muestra feedback y refresca la sección de recientes.

## Extensibilidad prevista

### Favoritos

Los favoritos ya están implementados con:

- persistencia por usuario en `PropertiesService`
- UI para marcar y desmarcar desde la sidebar
- sección dinámica al inicio del catálogo

### Historial

`recentSymbolIds` ya está implementado y visible en UI.

### Configuración por equipo

Si más adelante hace falta configuración compartida:

- `PropertiesService.getScriptProperties()` para defaults globales
- o una fuente externa versionable

### Add-on más formal

Para crecer hacia una distribución más formal:

1. Asociar el script a un Cloud project estándar.
2. Preparar assets e identidad del add-on.
3. Evaluar homepage card para entrada universal.
4. Revisar manifest, OAuth y cumplimiento de review.

## Convenciones de código

- funciones pequeñas
- namespaces con `var AstroX = (function () {})();`
- datos puros para catálogo e i18n
- cliente sin dependencias externas
- sin build step obligatorio
