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
- **2026-10-26 — Primera fase de login multi-gym:** se reemplazó la fuente de
  autorización del contexto de sesión por `gym_memberships` y
  `gym_membership_roles`; `get-profile-by-id-2` autentica por JWT, resuelve
  `profiles.auth_user_id` y devuelve perfil, gimnasio y roles. El tenant
  actual se fija del lado backend con `CURRENT_GYM_SLUG` (configurar
  `degany-gym` para este despliegue), por lo que memberships activas de otros
  gyms no se mezclan. Se extrajeron helpers de respuesta y membership/roles.
  El DDL de referencia eliminó la unicidad individual de
  `gym_memberships.profile_id`, manteniendo la pareja única `(gym_id,
  profile_id)`. La función antigua y los consumidores legacy de `user_roles`
  fuera del login aún coexisten.

## Tarea activa

- Resolver el estado/pantalla para usuarios sin acceso al gym configurado;
  luego desplegar y validar la primera fase de login.

## Decisiones vigentes

- Arquitectura de trabajo: orquestador + frontend + backend + QA.
- Los cambios que involucren Supabase requieren consultar
  `back/schemas/supabaseSchemas.sql` antes de implementarse.
- QA documenta pruebas manuales mientras no exista un script de pruebas
  automatizadas.
- Un perfil puede pertenecer a varios gimnasios. En el despliegue actual, el
  backend fija el tenant por `CURRENT_GYM_SLUG=degany-gym`; una futura app
  multi-tenant compartida requerirá un mapeo de subdominio confiable o un
  selector/persistencia explícita del gym activo.

## Próximos pasos

1. Implementar una salida controlada para usuarios sin membership activa en el
   gym configurado, o con ese gym inactivo/inexistente.
2. Aplicar en Supabase remoto `ALTER TABLE public.gym_memberships DROP
   CONSTRAINT IF EXISTS gym_memberships_profile_id_key;`, revisar RLS para el
   perfil actual, memberships, gyms y roles, y desplegar `get-profile-by-id-2`
   con sus helpers. `back/` está ignorado por Git, por lo que estos archivos no
   quedan versionados sin cambiar esa regla o agregarlos forzadamente.
3. Aplicar el DDL de `public.images`, definir la FK de `gym_id` cuando exista
   la entidad de gimnasios y desplegar la Edge Function `images`; validar en
   integración el contrato:
   GET `{ data: Image[] }`, POST/PUT multipart (`name`, `source` opcional,
   `file` opcional; PUT con `id`) y DELETE `{ id }`.
4. Considerar validar las URL de imagen que fallen antes de guardarlas y
   liberar las previsualizaciones locales al reemplazarlas.
5. Abordar la línea base de lint y formato en una tarea separada.
