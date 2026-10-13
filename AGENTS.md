# Guía para agentes de IA

## Contexto del proyecto

Este repositorio contiene **app-gym**, una aplicación web para la gestión de un gimnasio. Incluye secciones para el panel de control, clientes, entrenadores y asistentes, asistencia, membresías y pagos, productos e inventario, además de autenticación y configuración.

La interfaz es una aplicación de página única (SPA). La navegación se configura en `src/App.tsx` con `HashRouter` de React Router y hay rutas protegidas para las secciones que requieren autenticación. Supabase se utiliza como integración de backend; su cliente está en `src/utils/supabase.ts`.

## Stack tecnológico

- React 19 y TypeScript 6.
- Vite 8 para desarrollo y compilación.
- React Router para navegación.
- Tailwind CSS 4 y PostCSS para estilos.
- Supabase JS para la integración con el backend.
- ESLint 10 y Prettier 3 para calidad y formato.
- Node.js 24 se utiliza en el flujo de despliegue de GitHub Actions.

## Estructura principal

- `src/pages/`: páginas agrupadas por funcionalidad.
- `src/components/`: componentes reutilizables de la interfaz.
- `src/layout/` y `src/navmenu/`: estructura y navegación de la aplicación.
- `src/context/`: contextos de autenticación, tema y barra lateral.
- `src/hooks/`: hooks reutilizables.
- `src/service/`: acceso a operaciones y servicios del dominio.
- `src/utils/`: utilidades y configuración compartida, incluido el cliente de Supabase.
- `public/`: recursos estáticos.
- `.github/workflows/`: automatizaciones de GitHub Actions.

## Preparación y comandos

Usa npm y el `package-lock.json` del repositorio para mantener las dependencias reproducibles:

```bash
npm ci
npm run dev
```

Antes de considerar terminado un cambio de código, ejecuta las verificaciones disponibles:

```bash
npm run build
npm run lint
npm run format:check
```

- `npm run build` ejecuta `tsc -b` y luego `vite build`. Ambos pasos deben finalizar correctamente.
- `npm run lint` ejecuta ESLint sobre el repositorio. Corrige los errores y revisa las advertencias relacionadas con tu cambio.
- `npm run format:check` comprueba el formato con Prettier sin modificar archivos. Si hay diferencias, aplica `npx prettier --write <archivos-modificados>` solo a los archivos de tu cambio y vuelve a ejecutar la comprobación.
- No hay un script `test` configurado en `package.json`; no afirmes que se ejecutaron pruebas automatizadas si no se añadieron o ejecutaron por otro medio.
- Si alguna verificación falla, informa el comando y el error. No des por válido el cambio hasta resolver los fallos causados por él.

## Configuración y secretos

- Para las variables de entorno, consulta `.env.example`. La aplicación requiere `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Usa valores locales válidos para ejecutar o compilar cuando corresponda. Nunca incluyas secretos o credenciales reales en el código, documentación o commits.
- No edites `.env` ni publiques sus valores.

## Criterios para los cambios

- Antes de editar, inspecciona el código relacionado y sigue los patrones existentes en la funcionalidad correspondiente.
- Mantén los cambios acotados a lo solicitado; no reviertas ni sobrescribas cambios de trabajo existentes.
- Conserva el tipado de TypeScript y valida entradas y estados de carga/error siguiendo los patrones del proyecto.
- Si cambias una funcionalidad, revisa sus páginas, componentes y servicios relacionados para mantener el comportamiento consistente.
- Actualiza documentación cuando el cambio altere instrucciones, comandos o comportamiento relevante.
