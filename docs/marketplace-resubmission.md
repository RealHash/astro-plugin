# Reenvío a Google Workspace Marketplace

## Estado actual del repo

Este repo ya cubre parte de lo que Google pide:

- manifiesto mínimo en [`src/appsscript.json`](/Users/pancho/Documents/Proyectos%20desarrollo/astro-plugin/src/appsscript.json#L1);
- sitio público en [`site/`](/Users/pancho/Documents/Proyectos%20desarrollo/astro-plugin/site);
- páginas públicas de privacy y terms;
- documentación operativa para deploy y publicación.

## Qué te observó Google y cómo impacta acá

### 1. Uso de marcas de Google

Esto no se corrige desde Apps Script. Se corrige en el listing del Marketplace SDK:

- usar `Google Docs™` en nombre o descripciones cuando lo menciones;
- agregar una nota de atribución en la descripción larga, por ejemplo:
  `Google Docs™ is a trademark of Google LLC.`

En este repo conviene mantener el sitio público alineado con esa convención para que branding, OAuth review y listing no se contradigan.

### 2. Support / Privacy / Terms

Privacy y Terms ya tienen base pública en `site/`, y soporte ya expone un contacto visible real mediante formulario público y email directo.

Para cumplir:

- la URL de soporte debe mostrar un email o formulario visible;
- no alcanza con decir que el contacto existe en un canal privado o en la configuración de Google;
- idealmente homepage, support, privacy y terms deben vivir bajo el mismo dominio final.

### 3. Scopes y uso de Google Workspace APIs

El código sí usa APIs núcleo de Google Workspace a través de Apps Script para Google Docs.

Scopes actuales en [`src/appsscript.json`](/Users/pancho/Documents/Proyectos%20desarrollo/astro-plugin/src/appsscript.json#L1):

- `https://www.googleapis.com/auth/script.container.ui`
- `https://www.googleapis.com/auth/documents.currentonly`

Lo que Google te está marcando no parece ser un exceso de scopes en código, sino una desalineación entre:

- Apps Script manifest;
- Marketplace SDK;
- OAuth consent screen.

Acción exacta:

1. Abrir el proyecto Apps Script y revisar `Overview > OAuth Scopes`.
2. Copiar cada scope al `Marketplace SDK > App configuration > OAuth Scopes`.
3. Copiar los mismos scopes al `OAuth consent screen`.
4. Dejar además los scopes por defecto:
   `userinfo.email` y `userinfo.profile`.
5. Confirmar que las tres listas queden idénticas.

### 4. OAuth verification

Esto es externo al repo y es obligatorio antes de volver a enviar la app.

Secuencia correcta:

1. dejar definitivos dominio, homepage, support, privacy y terms;
2. alinear scopes en Apps Script, Marketplace SDK y OAuth consent screen;
3. completar branding y datos obligatorios del consentimiento OAuth;
4. enviar `Submit for Verification`;
5. esperar aprobación;
6. recién después, republicar en Marketplace.

## Qué conviene hacer ahora

### Cambios ya razonables dentro del repo

- mantener el sitio público alineado con el uso de `Google Docs™`;
- dejar documentado que la URL de soporte necesita un contacto público real;
- usar una checklist específica de resubmisión para evitar rechazos repetidos.

### Cambios externos que todavía te faltan sí o sí

- desplegar el sitio final en el dominio que vas a usar en Google;
- cargar esas URLs finales en Marketplace SDK y OAuth consent;
- pedir OAuth verification.

## Criterio práctico de salida

No lo des por “listo para publicar” hasta que se cumplan estas cuatro condiciones:

- la página de soporte publique el formulario y el email visibles;
- el listing use `Google Docs™` con atribución;
- los scopes coincidan exactamente en los tres lugares;
- OAuth verification esté aprobada.
