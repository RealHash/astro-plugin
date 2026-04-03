# Operación del repo

## Primer setup de un colaborador

```bash
npm install
npx clasp login
```

Si el proyecto ya existe:

1. Obtener `.clasp.json` del responsable del proyecto o crear uno con el `scriptId` correcto.
2. Verificar que `rootDir` apunte a `src`.

## Flujo diario recomendado

1. Crear branch desde `main`.
2. Hacer cambios.
3. Si se editó `src/symbol-catalog.json`, correr:

```bash
npm run catalog:sync
```

4. Validar manualmente en Google Docs.
5. Subir cambios y abrir PR.

## Antes de push a Apps Script

```bash
npm run catalog:sync
./node_modules/.bin/clasp push --force
```

Usar `--force` acá es aceptable porque el proyecto remoto es el reflejo del contenido versionado en `src/`.

## Versionado sugerido

- Cambios funcionales: bump semántico en `package.json` y `AstroConfig.app.version`
- Cambios solo editoriales de catálogo: patch version
- Cambios de UI o inserción: minor version

## Convención práctica para el catálogo

- `src/symbol-catalog.json` es la única fuente editable.
- `src/CatalogData.gs` es generado.
- No editar `src/CatalogData.gs` manualmente.
- Si `CatalogData.gs` cambió pero `symbol-catalog.json` no, revisar el diff antes de merge.
