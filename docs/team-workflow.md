# Workflow de equipo

## Branching sugerido

### Modelo simple

- `main`: siempre estable
- `develop`: integración previa al release
- `feature/*`: trabajo nuevo
- `fix/*`: correcciones puntuales

Si el equipo es muy chico, también funciona:

- `main`
- `feature/*`

## Política de merge

- PR obligatoria para cambios funcionales.
- Al menos una revisión para cambios en inserción o manifest.
- No mezclar refactors estructurales con cambios de producto en la misma PR.

## Convención de commits

Sugerencia compatible con Conventional Commits:

- `feat: add recent symbols section`
- `fix: handle selection fallback in tables`
- `docs: clarify clasp deployment flow`
- `refactor: split sidebar bootstrap helpers`
- `chore: bump addon version`

## Reglas prácticas

- Cambios de catálogo en PR separada si el alcance es editorial.
- Si se toca `src/symbol-catalog.json`, incluir también el diff generado de `src/CatalogData.gs`.
- Cambios de scopes o manifest requieren revisión extra.
- Toda modificación de inserción debe ir acompañada por prueba manual en Docs.
- Mantener `README.md` y `docs/` al día cuando cambie el flujo operativo.
