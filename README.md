# Monolito Cotizador Termoacusticos

## Ejecutar el proyecto para desarrollo

OJO: las db que se usen en el entorno de desarrollo local también son locales, no se conectan con cloudflare y no tendrán ninguna tabla creada.

### Archivos de entorno

#### .env

- `PUBLIC_IS_DEV=TRUE` hará que, al ejecutar el proyecto localmente, se creen las tablas y se inserten datos de prueba

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

La base de datos debe ser reimplementada, las querys sql se encuentran en el archivo X (TBD).
