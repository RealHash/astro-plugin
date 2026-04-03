# Desarrollo y despliegue

## Modelo recomendado

Para este proyecto, la mejor base es un **Apps Script standalone project** conectado con `clasp`.

Ventajas:

- repo limpio y versionable
- no depende de un documento particular
- sirve para test deployments de tipo Editor add-on
- es mejor base para crecer a instalación interna y publicación

Recomendación práctica:

- arrancar con standalone
- pasar temprano a un **Google Cloud project estándar** si el equipo ya prevé releases internos versionados o una futura publicación

## Opción A recomendada: standalone

### Setup inicial

```bash
npm install
npx clasp login
npx clasp create --type standalone --title "Astro Symbols"
```

Después editar `.clasp.json` para asegurar:

```json
{
  "scriptId": "TU_SCRIPT_ID",
  "rootDir": "src"
}
```

### Push de código

```bash
npx clasp push
```

### Siguiente paso recomendado para despliegues serios

Antes de institucionalizar el add-on para más usuarios, asociar el script a un **Google Cloud project estándar**. Eso simplifica el camino a:

- deployments versionados más controlados
- branding y OAuth más claros
- preparación para Marketplace o distribución interna más formal

### Abrir el proyecto

```bash
npx clasp open
```

## Opción B: vincular a proyecto existente

1. Crear el proyecto Apps Script desde la web.
2. Copiar el `scriptId`.
3. Crear `.clasp.json` a partir de `.clasp.json.example`.
4. Ejecutar:

```bash
npx clasp push
```

## Probar como Editor add-on

Pasos basados en la documentación oficial revisada de Google:

1. Abrir el proyecto en Apps Script.
2. Ir a `Deploy > Test deployments`.
3. Activar tipo `Editor add-on`.
4. Seleccionar versión o `Latest code`.
5. Elegir un documento de Google Docs de prueba.
6. Guardar el test deployment.
7. Abrir el documento y usar `Extensions > Astro Symbols`.

Consejo:

- usar `Latest code` para smoke tests iniciales
- usar versiones etiquetadas cuando ya haya QA interna

Referencia oficial:

- https://developers.google.com/workspace/add-ons/how-tos/testing-editor-addons

## Compartir internamente

## Escenario 1: equipo pequeño

Recomendación:

- un único proyecto standalone
- repositorio Git compartido
- test deployments para QA
- una persona responsable de las versiones

Esto suele ser suficiente si el uso es interno y el equipo es chico.

## Escenario 2: equipo creciendo

Recomendación:

- mover la asociación del script a un **Google Cloud project estándar**
- preparar identidad del add-on y configuración del Marketplace SDK
- definir proceso formal de versionado y despliegue
- considerar publicación privada al dominio o una estrategia híbrida con homepage card

Referencia oficial:

- https://developers.google.com/apps-script/concepts/deployments
- https://developers.google.com/workspace/add-ons/how-tos/publish-add-on-overview
- https://developers.google.com/workspace/marketplace/enable-configure-sdk

## Script ligado a documento vs standalone vs add-on

### Script ligado a documento

Pros:

- arranca rápido para un documento puntual
- fácil de prototipar

Contras:

- mala escalabilidad para equipo
- deployment y versionado más incómodos
- acoplamiento al archivo host

### Standalone Apps Script

Pros:

- mejor opción para este repo
- funciona bien con `clasp`
- desacopla código del documento
- base correcta para test deployments e instalación más ordenada

Contras:

- requiere un paso adicional de despliegue

### Add-on formal publicado

Pros:

- instalación más limpia para usuarios finales
- control de distribución
- mejor camino para escalar dentro del dominio o Marketplace

Contras:

- más requisitos de revisión
- más trabajo de identidad, OAuth y configuración

## Recomendación concreta

### Para un equipo pequeño hoy

- **standalone Apps Script + `clasp` + test deployments**

### Para crecer

- **standalone + Cloud project estándar + publicación interna/privada**

## Qué falta para publicar más formalmente

1. Asociar Cloud project estándar.
2. Revisar OAuth consent y branding.
3. Configurar Marketplace SDK.
4. Validar scopes definitivos.
5. Preparar assets, textos e íconos.
6. Revisar UX y manejo de errores según guías de add-ons.
7. Probar instalación limpia en cuentas reales del dominio.

## Riesgos comunes de review

- scopes demasiado amplios
- UX confusa o sin manejo claro de errores
- dependencia de contexto no autorizado
- fallos en `onOpen` por usar servicios restringidos
- documentación insuficiente para testers/admins
