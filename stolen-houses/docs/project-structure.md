# Stolen Houses - Estructura del proyecto y directrices

Este documento describe la arquitectura objetivo del proyecto y las buenas
practicas que todo nuevo aporte debe respetar. Sirve como guia rapida tanto
para humanos como para asistentes automatizados (Claude Code, etc.).

## Stack

- Next.js 16.2.4 (App Router)
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4 (con `@tailwindcss/postcss`)

> Nota: Next.js 16 introduce cambios respecto a versiones previas. Antes de
> usar APIs del framework, consulte la documentacion local incluida en
> `node_modules/next/dist/docs/` y respete los avisos de deprecacion.

## Directrices de codigo (obligatorias)

1. **Nada de hardcodes**: cualquier literal repetible (textos, rutas,
   credenciales, mensajes, claves de cookies, identificadores, formatos)
   vive en una constante. Los textos de UI van en `src/i18n/`.
2. **Single-Responsibility por archivo**: si un archivo mezcla
   responsabilidades (UI + logica + parsing, por ejemplo) debe partirse en
   archivo padre + archivo(s) hijo(s) o moverse a su carpeta correspondiente.
3. **Estructura de proyecto consistente**: la organizacion descrita mas abajo
   se mantiene incluso para features pequenas. Una carpeta vacia o con
   `.gitkeep` es preferible a romper la convencion.
4. **Widgets para piezas visuales**: cualquier bloque de UI con identidad
   propia se coloca en `src/widgets/<nombre>/ui/`. Lo verdaderamente
   reutilizable a nivel de la app se promueve a `src/shared/ui/`.
5. **Hooks documentados**: todo hook lleva un comentario que indique
   que necesita (parametros), que hace (proposito) y que devuelve.
6. **Features auto-contenidas**: cada feature agrupa sus partes en
   subcarpetas `model/`, `ui/`, `hooks/`, `api/`, segun aplique.
7. **Hooks compartidos en shared**: si un hook deja de ser exclusivo de una
   feature, se mueve a `src/shared/hooks/`.
8. **Comentarios solo donde aportan valor**: explicar el "por que" de logicas
   complejas; el "que" lo expresa el propio codigo.
9. **Sin emojis** en codigo, comentarios, commits ni documentacion.
10. **Validacion en bordes**: solo se valida en bordes del sistema (entrada
    HTTP, parsing de JSON, formularios). El codigo interno confia en sus
    invariantes.

## Estructura de directorios objetivo

```
stolen-houses/
|-- Docs/                         <- Documentacion del proyecto (este archivo)
|-- data/                         <- Datos persistidos en JSON (mock back-end)
|-- public/                       <- Assets estaticos servidos por Next
|-- src/
|   |-- app/                      <- App Router de Next.js (rutas + handlers)
|   |   |-- (admin)/              <- Grupo de rutas con prefijo /dashboard
|   |   |-- (public)/             <- Grupo de rutas publicas
|   |   |-- api/                  <- Route handlers (back-end del proyecto)
|   |   |-- login/                <- Pantalla de autenticacion
|   |   |-- layout.tsx
|   |   |-- page.tsx              <- Menu principal publico
|   |   `-- globals.css
|   |
|   |-- assets/                   <- Iconos e imagenes locales
|   |
|   |-- entities/                 <- Entidades del dominio (Property, User, ...)
|   |   `-- <entity>/
|   |       |-- model/            <- Tipos y constantes de la entidad
|   |       `-- api/              <- Cliente HTTP especifico
|   |
|   |-- features/                 <- Casos de uso del producto
|   |   `-- <feature>/
|   |       |-- model/            <- Tipos, constantes, helpers, mappers
|   |       |-- hooks/            <- Hooks de React especificos
|   |       |-- api/              <- Acceso a back-end propio del feature
|   |       |-- ui/               <- Componentes pequenos de la feature
|   |       `-- index.ts          <- Barrel publico
|   |
|   |-- widgets/                  <- Piezas visuales reutilizables del producto
|   |   `-- <widget>/
|   |       |-- ui/               <- Componente + estilos (CSS Modules / Tailwind)
|   |       `-- index.ts
|   |
|   |-- shared/                   <- Codigo agnostico al dominio
|   |   |-- ui/                   <- Componentes UI genericos (Feedback, Button, ...)
|   |   |-- hooks/                <- Hooks reutilizables (no vinculados a una feature)
|   |   |-- lib/                  <- Helpers y utilidades puras
|   |   |-- constants/            <- Constantes generales (formato, locales, ...)
|   |   |-- config/               <- Configuracion (rutas, flags, ...)
|   |   `-- types/                <- Tipos compartidos
|   |
|   |-- i18n/                     <- Textos visibles al usuario
|   |   `-- es/                   <- Locale activo (por archivo: auth, main-menu, ...)
|   |
|   |-- store/                    <- Stores globales (cuando se incorporen)
|   |-- tests/                    <- Tests del proyecto
|   |
|   `-- proxy.ts                  <- Middleware de autenticacion (Next.js 16)
|
|-- AGENTS.md                     <- Notas para agentes de IA
|-- CLAUDE.md                     <- Re-exporta AGENTS.md
|-- next.config.ts
|-- package.json
`-- tsconfig.json
```

## Como organizar un cambio nuevo

1. **Texto visible**: agregalo a `src/i18n/es/<dominio>.ts`.
2. **Constante repetida**: ubicala junto a su dominio (`features/<f>/model/`,
   `entities/<e>/model/`, o `shared/constants/`).
3. **Hook nuevo**: vive en `features/<f>/hooks/` o `shared/hooks/` y debe
   incluir un comentario JSDoc-style con `Needs / Does / Returns`.
4. **Componente nuevo**: si es propio de una feature, va en
   `features/<f>/ui/`. Si es una pieza autonoma del producto, va en
   `widgets/<w>/ui/`. Si es generico (boton, input, layout), va en
   `shared/ui/`.
5. **Llamada HTTP**: cliente en `entities/<e>/api/` (o
   `features/<f>/api/` si es exclusiva de la feature). Mensajes de error en
   `model/<e>.constants.ts` o en `i18n/es/api-<dominio>.ts`.

## Convenciones de archivos

- **Nombres**: kebab-case para archivos, PascalCase para componentes,
  camelCase para funciones.
- **Estilos**: preferimos Tailwind. Cuando se usan CSS Modules se aceptan
  `@apply` y media queries. Evitar valores hex sueltos: si se requieren,
  usar tokens de Tailwind.
- **Barrels**: cada feature, entity y widget exportan via `index.ts` para que
  los consumidores no se acoplen a la estructura interna.
- **Imports**: usar el alias `@/` configurado en `tsconfig.json`.

## Documentacion de hooks

Formato minimo para todo hook (encima de la funcion):

```ts
/**
 * useEjemplo
 * Needs: parametros que recibe y por que.
 * Does: resumen funcional de lo que hace.
 * Returns: que entrega y como lo consumen los widgets.
 */
export function useEjemplo(...) { ... }
```

## Que NO hacer

- No mezclar lectura/escritura de back-end dentro de un componente. Esa
  logica vive en hooks o servicios.
- No duplicar literales (ver punto 1). Si se duplica, se extrae.
- No crear archivos `*.tsx` con mas de ~250 lineas: dividir en padre + hijos.
- No introducir dependencias nuevas sin justificacion explicita.
- No usar emojis en ningun lugar del repositorio.
