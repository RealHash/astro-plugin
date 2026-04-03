# Astro Symbols for Google Docs

Base productiva para un **Editor add-on de Google Docs** hecho con **Google Apps Script + HTML Service + `clasp`**. Permite abrir una sidebar visual, buscar símbolos astrológicos y insertarlos en el documento activo desde una UI compacta y mantenible.

## Qué resuelve

- Menú del add-on en Google Docs.
- Sidebar visual con buscador, categorías colapsables y feedback.
- Inserción segura con cursor, selección activa y fallback consistente.
- Catálogo inicial de planetas, signos y aspectos.
- Preferencias por usuario para espaciado e intento de fuente sugerida.
- Preferencia por usuario para presentación `auto`, `texto` o `emoji` al insertar símbolos compatibles.
- Favoritos persistentes por usuario desde la propia sidebar.
- Base preparada para favoritos, recientes, settings y crecimiento del catálogo.
- Repo listo para trabajo en equipo, versionado y despliegue con `clasp`.

## Decisión de arquitectura

Este proyecto está implementado como **Editor add-on de Google Docs**.

Esa elección es intencional: una **sidebar HTML rica** dentro de Docs es el patrón correcto para este caso. Los **Google Workspace add-ons modernos** en editores priorizan **cards/homepages**, no una sidebar HTML como flujo principal. Por eso:

- hoy: Editor add-on con `DocumentApp`, `HtmlService` y menú en Docs
- después: posible evolución a publicación más formal, o a una experiencia complementaria con cards/homepage

Las implicancias y el plan de evolución están documentados en [`docs/architecture.md`](docs/architecture.md) y [`docs/deployment.md`](docs/deployment.md).

## Estructura del repo

```text
.
├── .clasp.json.example
├── .gitignore
├── LICENSE
├── README.md
├── legal
│   ├── privacy-policy.html
│   └── terms-of-service.html
├── package.json
├── scripts
│   └── sync-catalog.mjs
├── docs
│   ├── architecture.md
│   ├── deployment.md
│   ├── repo-operations.md
│   ├── release-checklist.md
│   ├── team-workflow.md
│   └── testing.md
└── src
    ├── appsscript.json
    ├── Catalog.gs
    ├── CatalogData.gs
    ├── Config.gs
    ├── I18n.gs
    ├── Insert.gs
    ├── Main.gs
    ├── Menu.gs
    ├── Preferences.gs
    ├── Sidebar.css.html
    ├── Sidebar.html
    ├── Sidebar.js.html
    ├── SidebarController.gs
    ├── Utils.gs
    └── symbol-catalog.json
```

## Catálogo inicial

### Planetas

- ☉ Sol
- ☽ Luna
- ☿ Mercurio
- ♀ Venus
- ♂ Marte
- ♃ Júpiter
- ♄ Saturno
- ♅ Urano
- ♆ Neptuno
- ♇ Plutón

### Signos zodiacales

- ♈ Aries
- ♉ Tauro
- ♊ Géminis
- ♋ Cáncer
- ♌ Leo
- ♍ Virgo
- ♎ Libra
- ♏ Escorpio
- ♐ Sagitario
- ♑ Capricornio
- ♒ Acuario
- ♓ Piscis

### Aspectos

- ☌ Conjunción
- ⚹ Sextil
- □ Cuadratura
- △ Trígono
- ☍ Oposición

## Catálogo ampliado ya integrado

Además del MVP inicial, el runtime ya quedó preparado con categorías extra tomadas del seed catalog:

- puntos astrológicos
- ángulos y ejes
- aspectos menores
- casas
- clasificaciones útiles

La fuente editable quedó en [symbol-catalog.json](/Users/pancho/Documents/Proyectos%20desarrollo/astro-plugin/src/symbol-catalog.json#L1), el artefacto generado para Apps Script en [CatalogData.gs](/Users/pancho/Documents/Proyectos%20desarrollo/astro-plugin/src/CatalogData.gs#L1) y la lógica de runtime en [Catalog.gs](/Users/pancho/Documents/Proyectos%20desarrollo/astro-plugin/src/Catalog.gs#L1).

## Flujo de catálogo

Para editar el catálogo del equipo:

1. Modificar [symbol-catalog.json](/Users/pancho/Documents/Proyectos%20desarrollo/astro-plugin/src/symbol-catalog.json#L1).
2. Ejecutar `npm run catalog:sync`.
3. Hacer `clasp push`.

No edites [CatalogData.gs](/Users/pancho/Documents/Proyectos%20desarrollo/astro-plugin/src/CatalogData.gs#L1) a mano.

## Instalación rápida

### 1. Preparar entorno

```bash
npm install
npx clasp login
```

### 2. Crear o vincular proyecto Apps Script

Opción recomendada para equipo:

1. Crear un proyecto **standalone** de Apps Script.
2. Editar `.clasp.json` para que apunte a `src`.
3. Si el objetivo es compartir versiones internas con más formalidad, migrar cuanto antes a un **Google Cloud project estándar**.

Ejemplo:

```bash
npx clasp create --type standalone --title "Astro Symbols"
```

Luego dejar `.clasp.json` así:

```json
{
  "scriptId": "TU_SCRIPT_ID",
  "rootDir": "src"
}
```

Alternativa:

1. Copiar `.clasp.json.example` a `.clasp.json`.
2. Pegar un `scriptId` existente.

### 3. Subir código

```bash
npx clasp push
```

### 4. Probar en Google Docs

1. Abrir el proyecto en Apps Script con `npx clasp open`.
2. En Apps Script, ir a `Deploy > Test deployments`.
3. Habilitar tipo **Editor add-on**.
4. Elegir **Google Docs** y un documento de prueba.
5. Guardar el test deployment y abrir el documento.
6. En Docs, abrir `Extensions > Astro Symbols`.

Nota operativa:

- Para pruebas rápidas, el flujo con Apps Script + test deployment alcanza.
- Para releases más formales, versionados y preparación de publicación, conviene pasar el script a un **Google Cloud project estándar** desde temprano.

Referencia oficial consultada:

- Test de Editor add-ons: https://developers.google.com/workspace/add-ons/how-tos/testing-editor-addons
- Scopes de Editor add-ons: https://developers.google.com/workspace/add-ons/concepts/editor-scopes
- Extender Docs con menús y sidebars: https://developers.google.com/workspace/add-ons/editors/docs

## Scopes elegidos

En [`src/appsscript.json`](src/appsscript.json):

- `https://www.googleapis.com/auth/script.container.ui`
  Permite abrir la sidebar y menús dentro de Google Docs.
- `https://www.googleapis.com/auth/documents.currentonly`
  Limita la escritura y lectura al documento abierto.

No se pide `drive.file`, ni scopes de Gmail, Drive o APIs externas porque este MVP no los necesita.

## Flujo recomendado para equipo

### Equipo pequeño

- Un proyecto Apps Script standalone compartido entre desarrolladores.
- Un branch principal estable.
- Test deployments para QA interna.
- Un responsable de crear versiones y despliegues.

### Equipo en crecimiento

- Asociar el script a un **Google Cloud project estándar**.
- Preparar assets y configuración para Marketplace.
- Definir pipeline de release interno y control de versiones del deployment.
- Evaluar publicación interna al dominio o transición parcial a Google Workspace add-on con cards.

Más detalle:

- [`docs/deployment.md`](docs/deployment.md)
- [`docs/repo-operations.md`](docs/repo-operations.md)
- [`docs/team-workflow.md`](docs/team-workflow.md)
- [`docs/release-checklist.md`](docs/release-checklist.md)

## Legal base

Se agregaron dos páginas legales base para usar como punto de partida:

- [`legal/privacy-policy.html`](/Users/pancho/Documents/Proyectos%20desarrollo/astro-plugin/legal/privacy-policy.html#L1)
- [`legal/terms-of-service.html`](/Users/pancho/Documents/Proyectos%20desarrollo/astro-plugin/legal/terms-of-service.html#L1)

Importante:

- para Google Workspace Marketplace necesitás URLs públicas accesibles por Google y por los usuarios;
- si el repo sigue privado, estos archivos sirven como base de contenido, pero no como URL final del listing;
- el texto incluye limitación de responsabilidad fuerte, pero no reemplaza revisión legal.

## UX actual

- Sidebar compacta y clara para ancho angosto.
- Búsqueda por nombre, categoría, símbolo y alias.
- Filtros rápidos para `todo`, `favoritos` y `estándar`.
- Categorías colapsables.
- Badges contextuales para símbolos `core/extendidos`, `unicode` y ángulo cuando aplica.
- Inserción visual con feedback y estado.
- Copia al portapapeles desde cliente cuando el navegador lo permite.
- Preparado para modo oscuro futuro mediante tokens CSS.

## Preferencias por usuario

El proyecto ya incluye persistencia por usuario para:

- modo de inserción: solo símbolo o con espacios
- modo de presentación: auto, texto o emoji
- intento de fuente sugerida
- favoritos
- recientes

Se guardan con `PropertiesService`.

## Tipografía sugerida

Se intenta aplicar `Noto Sans Symbols 2` al glifo insertado cuando el usuario activa la opción.

Limitación real:

- Google Docs no ofrece una verificación confiable desde Apps Script para saber si esa fuente está realmente disponible o aplicada visualmente en el documento.
- Por eso la implementación es **best effort**: intenta setearla y, si falla, sigue sin romper la inserción.

## Limitaciones reales

- La posición exacta de inserción depende de lo que Google Docs expone en `DocumentApp`.
- Si no hay cursor o selección editable válida, el add-on usa fallback al final del documento.
- En selecciones complejas o elementos no textuales, la estrategia es conservadora para no romper estructura.
- El portapapeles depende del navegador y del sandbox del cliente.
- Los modos `texto` y `emoji` dependen de que Google Docs y la fuente efectiva respeten los selectores Unicode `FE0E` y `FE0F`.
- Una sidebar HTML rica corresponde mejor a **Editor add-ons** que a homepages de Google Workspace add-ons.

## Testing

Hay una estrategia concreta en [`docs/testing.md`](docs/testing.md). Incluye:

- smoke test
- casos de cursor
- casos de selección
- tablas, header/footer y final del documento
- preferencias
- clipboard
- chequeo de degradación ante errores

## Siguientes pasos recomendados

1. Agregar favoritos reales en UI.
2. Permitir snippets y categorías custom de equipo.
3. Añadir métricas internas o logging estructurado.
4. Crear una homepage card mínima para una futura distribución más formal.
5. Incorporar una etapa de validación previa a release con documento de QA.

## Documentación adicional

- [`docs/architecture.md`](docs/architecture.md)
- [`docs/deployment.md`](docs/deployment.md)
- [`docs/team-workflow.md`](docs/team-workflow.md)
- [`docs/release-checklist.md`](docs/release-checklist.md)
- [`docs/testing.md`](docs/testing.md)
