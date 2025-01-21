# Monolito Cotizador Termoacusticos

## Ejecutar el proyecto para desarrollo

OJO: las db que se usen en el entorno de desarrollo local también son locales, no se conectan con cloudflare y no tendrán ninguna tabla creada.

### Archivos de entorno

#### wrangler.toml

Este es el archivo de configuración para cloudflare, todos los valores se sacan de la dashboard. [(docs)](https://developers.cloudflare.com/pages/functions/bindings/#d1-databases)

- `binding = "DB"` es el nombre del binding, debe ser el mismo que en el archivo de tipos [app.d.ts](./src/app.d.ts)

- `database_name` nombre de la base de datos d1

- `database_id` id generado por cloudflare

### Comandos

#### Instalar dependencias

```bash
npm i
```

#### Prisma

Generar el cliente y tipos de la db
Generar el script sql que crea las tablas (necesario en caso de realizar cambios a schema.prisma)
Aplicar el script de migración que crea las tablas en la db, en --remote o --local

```bash
npx prisma generate
npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_create_tables.sql
npx wrangler d1 migrations apply termoacusticos-db --local
```

Más info en los [docs](https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-cloudflare#cloudflare-d1)

#### Ejecutar entorno de desarrollo con `vite dev`

```bash
npm run dev
```

#### Ejecutar entorno de desarrollo con `wrangler`

Este comando compilará el proyecto y ejecutará el proyecto en un entorno más cercano a la producción final.

```bash
npm run devw
```

## Tecnologías usadas

### SvelteKit

SvelteKit es usado para el frontend Y el backend. Las rutas de `/api/` deberían ser sólo para enviar y recibir datos con interacción del usuario. Para pre-cargar datos en una vista se usa `+page.ts`.

Para aprender svelte puedes usar el [tutorial interactivo](https://learn.svelte.dev/tutorial/welcome-to-svelte) o leer la [documentación](https://svelte.dev/docs/introduction).

### Cloudflare

El proyecto se hostea en [Cloudflare Pages](https://developers.cloudflare.com/pages/) y usa el servicio de base de datos [D1](https://developers.cloudflare.com/d1/) (SQLite).

### TailwindCSS

En la documentación de TailwindCSS hay una sección de [Core Concepts](https://tailwindcss.com/docs/utility-first) que explica las ventajas y los conceptos necesarios para comenzar a trabajar correctamente con este framework.

### Iconify.Design

Se usa el [plugin de tailwind](https://iconify.design/docs/usage/css/tailwind/iconify/) para traer iconos con css:

```html
<span class="iconify mdi--account-alert-outline"></span>
```

Para agregar un paquete de iconos nuevo se debe instalar (ej. `npm i -D @iconify-json/mdi-light`) e importar a la configuración de tailwind ([tailwind.config.js](./tailwind.config.js)), agregandolo a la lista en `addIconSelectors(['mdi', 'mdi-light'])`.

## Migración fuera de cloudflare

Se puede cambiar a otra plataforma similar como [vercel](https://vercel.com) o [netlify](https://netlify.com).

Para hosteo local se puede crear un [servidor de node](https://kit.svelte.dev/docs/adapter-node).

## Migración prisma

Comando para generar el archivo de migración

```bash
npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_create_tables.sql
```
