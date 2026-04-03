# Contributing

## Objetivo

Este repo mantiene un **Google Docs editor add-on** para insertar símbolos astrológicos desde una sidebar HTML. El objetivo de contribución es mantener:

- comportamiento predecible en Google Docs
- scopes mínimos
- catálogo consistente
- UX usable en sidebar angosta

## Setup local

```bash
npm install
npx clasp login
```

El archivo `.clasp.json` no se versiona. Debe existir localmente con el `scriptId` correcto y `rootDir: "src"`.

## Flujo de trabajo

1. Crear branch desde `main`.
2. Hacer cambios pequeños y coherentes.
3. Si se modifica `src/symbol-catalog.json`, correr:

```bash
npm run catalog:sync
```

4. Probar manualmente en Google Docs.
5. Abrir PR.

## Reglas para el catálogo

- `src/symbol-catalog.json` es la única fuente editable del catálogo.
- `src/CatalogData.gs` es generado.
- No editar `src/CatalogData.gs` manualmente.
- Si el catálogo cambia, el PR debe incluir ambos archivos:
  - `src/symbol-catalog.json`
  - `src/CatalogData.gs`

## Testing mínimo antes de abrir PR

- El menú aparece en Google Docs.
- La sidebar abre sin errores.
- La búsqueda encuentra símbolos por nombre o alias.
- La inserción funciona con cursor activo.
- La inserción no rompe con selección activa.
- Favoritos y recientes siguen funcionando.
- Si tocaste presentación `auto/texto/emoji`, validar render real en Docs.
- Si tocaste layout, validar sidebar angosta.

## Reglas de cambios sensibles

### Manifest y scopes

- Todo cambio en `src/appsscript.json` requiere revisión adicional.
- No agregar scopes nuevos sin justificarlo en la PR.

### Inserción

- Todo cambio en `src/Insert.gs` requiere prueba manual explícita.

### UX

- Mantener densidad visual razonable.
- Evitar controles que rompan la sidebar angosta.

## Convención de commits

Usar Conventional Commits cuando sea posible:

- `feat: add settings default filter`
- `fix: avoid overflow in symbol cards`
- `docs: clarify release workflow`
- `refactor: normalize generated catalog flow`

## Push a Apps Script

Cuando haga falta sincronizar el proyecto remoto:

```bash
npm run catalog:sync
./node_modules/.bin/clasp push --force
```
