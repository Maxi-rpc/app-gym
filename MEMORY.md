# Memoria operativa de app-gym

Este archivo mantiene una visión breve y vigente del trabajo de los agentes.
Debe leerse antes de iniciar una tarea y actualizarse al completar un hito. No
reemplaza el historial de Git, issues, pull requests ni documentación técnica.

## Reglas de mantenimiento

- El **orquestador** es el único rol que modifica este archivo para evitar
  conflictos de escritura.
- Registra hechos verificables y decisiones vigentes, no razonamientos largos.
- Nunca incluyas secretos, variables de `.env`, tokens, datos personales o
  credenciales.
- Mantén solo el contexto útil: mueve o elimina detalles obsoletos al cerrar
  una tarea.
- Para cada hito, anota fecha, resultado, verificaciones y próximo paso.

## Estado actual

- **2026-10-24 — Configuración de agentes:** se incorporaron los perfiles de
  orquestador, frontend, backend y QA en `.agents/`, junto con una plantilla
  de delegación. El perfil backend cubre Supabase, TypeScript de Edge
  Functions, SQL, RPC, RLS y contratos de datos.
- **2026-10-24 — Vista de Imágenes:** se agregó la configuración
  `/configurations/images`, con entrada de menú y acceso para `Admin` y
  `Profesor`. La vista ofrece búsqueda, previsualización y confirmación de
  borrado. Su CRUD consume `imagesService` y la Edge Function `images` con
  `GET`, `POST`/`PUT` multipart y `DELETE`. El esquema ahora define
  `public.images` con metadatos, auditoría y asociación por `gym_id`; queda
  pendiente aplicar el DDL, desplegar y validar ese backend.
- **Calidad conocida:** `npm run build` completó correctamente durante la
  configuración y tras la vista de Imágenes (solo advertencia de chunk de
  Vite). `npm run lint` falla por 113 errores y 9 advertencias preexistentes
  ajenos al cambio; `npm run format:check` falla por formato en 93 archivos
  existentes. Las comprobaciones focalizadas de los archivos de Imágenes
  pasaron.

## Tarea activa

Ninguna.

## Decisiones vigentes

- Arquitectura de trabajo: orquestador + frontend + backend + QA.
- Los cambios que involucren Supabase requieren consultar
  `back/schemas/supabaseSchemas.sql` antes de implementarse.
- QA documenta pruebas manuales mientras no exista un script de pruebas
  automatizadas.

## Próximos pasos

1. Aplicar el DDL de `public.images`, definir la FK de `gym_id` cuando exista
   la entidad de gimnasios y desplegar la Edge Function `images`; validar en
   integración el contrato:
   GET `{ data: Image[] }`, POST/PUT multipart (`name`, `source` opcional,
   `file` opcional; PUT con `id`) y DELETE `{ id }`.
2. Considerar validar las URL de imagen que fallen antes de guardarlas y
   liberar las previsualizaciones locales al reemplazarlas.
3. Abordar la línea base de lint y formato en una tarea separada.
