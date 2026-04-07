# Sitio público para Astro Symbols

Este repo ahora incluye un sitio estático listo para publicar desde la carpeta [`site/`](/Users/pancho/Documents/Proyectos%20desarrollo/astro-plugin/site).

## Qué incluye

- home pública del producto
- página de soporte
- privacy policy pública
- terms of service pública
- headers básicos de seguridad para Cloudflare Pages

## Deploy recomendado en Cloudflare Pages

### 1. Autenticarse

```bash
npx wrangler login
```

### 2. Crear el proyecto Pages

```bash
npx wrangler pages project create astro-symbols-public-site
```

Si te pide framework preset, elegí **None** o **Static HTML**.

### 3. Subir la carpeta estática

```bash
npx wrangler pages deploy site --project-name astro-symbols-public-site
```

Eso devuelve un dominio temporal del estilo:

```text
astro-symbols-public-site.pages.dev
```

## Subdominio recomendado

Sugerencia:

- `astroaddon.productoindustrial.com`

También quedarían bien:

- `astro.productoindustrial.com`
- `docs-addon.productoindustrial.com`
- `symbols.productoindustrial.com`

## Vincular el subdominio

En Cloudflare Pages:

1. abrir el proyecto `astro-symbols-public-site`;
2. ir a `Custom domains`;
3. elegir `Set up a domain`;
4. cargar `astroaddon.productoindustrial.com`;
5. confirmar la activación.

Como el DNS del dominio ya está en Cloudflare, normalmente la asociación del subdominio queda resuelta dentro de la misma cuenta.

## URLs sugeridas para Google

Si usás `astroaddon.productoindustrial.com`, podés cargar:

- homepage: `https://astroaddon.productoindustrial.com/`
- support: `https://astroaddon.productoindustrial.com/support/`
- privacy policy: `https://astroaddon.productoindustrial.com/privacy/`
- terms of service: `https://astroaddon.productoindustrial.com/terms/`

## Antes de publicar

Revisar especialmente:

- que la URL de soporte publique un email o formulario visible; para review de Marketplace no alcanza con decir que el contacto existe en privado o solo dentro de Google;
- que el dominio esté verificado también en Google Search Console si lo vas a usar en OAuth verification;
- que la home, privacy y terms apunten al mismo dominio autorizado que cargues en OAuth consent.
- que el listing y, idealmente, el sitio usen `Google Docs™` cuando nombren el producto y agreguen una atribución del tipo `Google Docs™ is a trademark of Google LLC.`
