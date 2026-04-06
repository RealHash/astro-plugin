# Entregarle Este Add-on a Otra Persona

## Qué se puede hacer hoy

En el estado actual, este proyecto **no queda instalado de forma normal en todos los Google Docs** de otra persona, porque **no está publicado en Google Workspace Marketplace**.

La forma más práctica hoy es:

1. crear una **copia propia del proyecto Apps Script** en la cuenta de esa persona;
2. subir este código ahí con `clasp`;
3. crear un **test deployment** de tipo `Editor add-on`.

Eso le permite usarlo para pruebas reales, pero sigue siendo un flujo de testing, no una instalación oficial global.

## Opción recomendada para tu amigo

Si tu amigo no es developer, lo más simple es que **vos hagas la instalación inicial en su cuenta** una sola vez.

## Paso a paso

### 1. Hacer una copia local del repo

Trabajá sobre una copia aparte para no pisar tu `.clasp.json` actual.

```bash
cp -R astro-plugin astro-plugin-friend
cd astro-plugin-friend
npm install
```

### 2. Crear un proyecto Apps Script nuevo

Tenés dos formas.

#### Forma A: desde la web

1. Entrá con la cuenta de tu amigo en https://script.google.com
2. Creá un proyecto **Standalone** nuevo.
3. Copiá el `scriptId` del proyecto.

Después dejá `.clasp.json` así:

```json
{
  "scriptId": "SCRIPT_ID_DEL_AMIGO",
  "rootDir": "src"
}
```

#### Forma B: con `clasp`

Logueate con la cuenta de tu amigo:

```bash
npx clasp login
```

Creá el proyecto:

```bash
npx clasp create --type standalone --title "Astro Symbols"
```

Y verificá que `.clasp.json` quede con:

```json
{
  "scriptId": "SCRIPT_ID_DEL_AMIGO",
  "rootDir": "src"
}
```

Si `rootDir` no quedó como `src`, corregilo a mano.

### 3. Subir el código

```bash
npx clasp push --force
```

### 4. Crear una versión

```bash
npx clasp version "Initial handoff"
```

### 5. Crear el test deployment

1. Abrí el proyecto Apps Script.
2. Andá a `Deploy > Test deployments`.
3. Activá `Editor add-on`.
4. Elegí `Latest code` o la versión creada.
5. Seleccioná un Google Doc de prueba del amigo.
6. Guardá el test.

### 6. Cómo lo usa tu amigo

1. Abre el Google Doc que quedó asociado al test.
2. Ejecuta el test deployment.
3. Autoriza el script la primera vez.
4. Usa el add-on desde el menú de extensiones dentro de ese documento.

## Limitación importante

Este flujo **no equivale a instalar el add-on en todos sus documentos** como haría una app oficial.

Para uso real generalizado en todos sus proyectos, necesitás una de estas dos cosas:

1. publicar el add-on vía **Google Workspace Marketplace**;
2. distribuirlo de forma administrada dentro de un dominio Workspace.

## Recomendación práctica

Si tu amigo lo va a usar seguido pero no querés publicar todavía:

1. dejale **su propio proyecto Apps Script**;
2. preparale **uno o más documentos de prueba** ya configurados;
3. mantené vos el código y actualizalo con `clasp push`.

## Comandos útiles

```bash
npx clasp push --force
npx clasp version "Update"
npx clasp deployments
```
