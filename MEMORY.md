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
- **2026-10-31 — Clientes multi-gym:** se crearon las Edge Functions v2
  `get-client-all-2`, `get-client-by-id-2`,
  `get-client-by-custom-search-2`, `create-client-2`, `update-client-2`,
  `update-client-profile-2` y `remove-client-2`, compartiendo la autorización por membership del gym
  confiable `degani-gym`. La SPA de Clientes ya las invoca. El alcance de un
  cliente se determina por `gym_memberships` y `gym_membership_roles` con rol
  Cliente (id 4), sin duplicar `gym_id` en `client_profile`; el alta crea ambas
  relaciones y la baja desactiva solo la membership del gym actual.
- **2026-10-31 — Corrección de listado de Clientes v2:** los embeds de
  `gym_memberships` en listado y búsqueda declaran explícitamente la FK
  `gym_memberships_profile_id_fkey`, necesaria porque la tabla también apunta
  a `profiles` mediante `created_by` y `updated_by`. `get-client-all-2` acepta
  nuevamente el orden por `user_id` expuesto por la SPA. Prettier, ESLint
  focalizado y build pasaron; queda desplegar estas dos funciones antes de la
  prueba remota.
- **2026-10-31 — Plan de Profesores multi-gym:** se relevó
  `src/pages/Employeers` y `employee.service.ts`. Sus cinco operaciones aún
  consumen funciones legacy que autorizan y devuelven `user_roles`; la creación
  y el borrado asumen que `profiles.id` coincide con `auth.users.id`, y el
  borrado elimina la cuenta global. La migración deberá crear funciones v2
  aisladas por el gym confiable para listar, leer, crear, actualizar el perfil
  y datos laborales, y desactivar solamente la membership actual. Los tabs de
  detalle consumen servicios legacy de membresías, pagos y asistencia y no se
  incluirán ni modificarán en este alcance. `gym-membership.ts` es un helper
  compartido y debe conservar íntegro su comportamiento actual; cualquier
  helper de empleados se añadirá sin regresiones. El rol Profesor confirmado
  para la membership es `EMPLOYEE_ROLE_ID = 2`.
- **2026-10-31 — Profesores multi-gym implementado:** se agregaron las Edge
  Functions v2 `get-employee-all-2`, `get-employee-by-id-2`,
  `create-employee-2`, `update-employee-2`, `update-employee-profile-2` y
  `remove-employee-2`. `gym-context.ts` incorpora `EMPLOYEE_ROLE_ID = 2` y
  `getActiveEmployeeInGym`, sin modificar `gym-membership.ts`. El CRUD se
  aísla al gym confiable, obtiene roles sólo desde `gym_memberships` y
  `gym_membership_roles`, y la baja desactiva sólo la membership del gym
  actual. La SPA consume los endpoints v2; la edición de perfil dejó de
  invocar `update-profile`. Los tabs de detalle no fueron modificados.
  Prettier y ESLint focalizados pasaron, al igual que `npm run build` (con la
  advertencia conocida de chunk). `npm run lint` y `npm run format:check`
  continúan fallando por la línea base: 136 errores/9 advertencias y 87
  archivos de formato, respectivamente. Las funciones bajo `back/` siguen
  ignoradas por Git y requieren despliegue/versionado explícito.
- **2026-10-31 — Diagnóstico de prueba remota de Profesores:** invocar
  `get-employee-by-id-2` devolvió `Name and last_name are required`, mensaje
  que no existe en su handler local y que sólo emiten `create-employee-2` o
  los endpoints de actualización de perfil. Antes de cambiar código debe
  verificarse y corregirse el despliegue remoto/selección de función. Una vez
  desplegado el handler correcto, la prueba debe enviar el UUID de
  `profiles.id`; usar `auth.users.id` puede producir un `Not found` legítimo
  porque el modelo multi-gym ya no asume que ambos IDs coinciden.
- **2026-10-31 — Asistencias multi-gym implementado:**
  `back/schemas/supabaseSchemas.sql` declara `gym_id` con índice y FK a
  `gyms` para `attendance` y `client_memberships`; además, FKs compuestas
  garantizan que el cliente, la asistencia y la membresía comercial pertenezcan
  al mismo gimnasio. Se agregaron las funciones v2
  `get-attendance-all-2`, `get-attendance-by-id-2`,
  `get-attendance-by-user-id-2`, `create-attendance-by-qr-2`,
  `update-attendance-by-id-2`, `remove-attendance-2` y
  `attendance-by-terminal-2`, con `gym_id` resuelto de una fuente confiable y
  sin usar `user_roles`. `attendance.service.ts` ya invoca sólo esos endpoints.
  El terminal resuelve el gym mediante `CURRENT_GYM_SLUG` y exige el nuevo env
  `TERMINAL_PROFILE_ID` para su auditoría, sustituyendo el UUID fijo. Build y
  validaciones focalizadas pasaron; lint global mantiene 136 errores y 9
  advertencias preexistentes, y format global 84 archivos preexistentes. Antes
  de liberar se debe aplicar DDL/backfill, configurar `TERMINAL_PROFILE_ID`,
  desplegar las funciones y validar los casos multi-gym remotos. Los archivos
  de `back/` siguen ignorados por Git y deben versionarse o desplegarse de
  forma explícita.

- **2026-10-31 — Plan de Pagos multi-gym:** se acordó migrar las cinco
  operaciones de pagos de membresías de `src/pages/Payments` mediante Edge
  Functions v2 y RPCs nuevas, conservando las legacy. La RPC de alta se
  llamará `register_membership_payment_v2`; la de actualización de fecha,
  `update_membership_payment_date_v2`. El alcance aísla cada operación por
  `client_memberships.gym_id`, usa `profiles.id` del actor como empleado y
  valida su membership activa de Profesor. No requiere nuevas columnas ni
  backfill: períodos y pagos heredan el gym a través de su membresía. Catálogos
  de servicios, métodos y estados de pago siguen fuera de alcance y globales.
- **2026-10-31 — Pagos multi-gym implementado:** se agregaron las Edge
  Functions v2 `get-membership-payments-all-2`,
  `get-membership-payments-by-id-2`, `register-membership-payment-2`,
  `update-membership-payment-2` y `remove-membership-payment-2`, además de
  las RPCs `register_membership_payment_v2` y
  `update_membership_payment_date_v2`. Todas se aíslan por
  `client_memberships.gym_id`, autentican mediante el contexto de gym y no
  consultan `user_roles`; el cobro usa el `profiles.id` del actor y exige que
  sea Profesor activo. Las cinco funciones reutilizan `jsonResponse` y
  `corsPreflightResponse` de `_shared/json-response.ts`; `payments.service.ts`
  consume sólo estos endpoints. No hubo DDL ni backfill. Prettier y ESLint focalizados, `git diff --check` y
  build pasaron; lint global conserva 136 errores/9 advertencias y format
  global 83 archivos preexistentes. Antes de liberar hay que aplicar las dos
  RPCs, desplegar las cinco funciones y validar remotamente dos gyms. Los
  archivos de `back/` siguen ignorados por Git y requieren despliegue o
  versionado explícito.

- **2026-11-01 — Productos multi-gym implementado:** el esquema de referencia
  ya incorpora `gym_id` y FKs compuestas para `products`, `stock_movements`,
  `product_sales` y `product_sale_items`. Se agregaron las RPCs
  `adjust_product_stock_v2` y `register_product_sale_v2`, junto con doce Edge
  Functions v2 para productos, inventario, ventas y los GET de sus catálogos
  globales. La SPA de Products consume sólo los endpoints v2. El stock se
  calcula en servidor y las ventas agrupan ítems, bloquean productos y crean
  venta, ítems y movimientos en una transacción. Los listados de movimientos y
  ventas declaran sus FKs de embed explícitamente para evitar ambigüedad entre
  las FKs simples y compuestas. Roles de inventario: 1/2/3;
  ventas: 1/2. Build, Prettier focalizado y `git diff --check` pasaron; lint y
  format globales mantienen la línea base (136 errores/9 advertencias y 82
  archivos, respectivamente). Antes de liberar hay que aplicar ambas RPCs,
  desplegar las doce Functions, confirmar que `product_status.id = 1` es el
  estado activo y validar remotamente el aislamiento de dos gyms. `back/`
  continúa ignorado por Git y requiere despliegue/versionado explícito.

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
6. Desplegar las ocho funciones v2 de Clientes (incluido
   `_shared/gym-context.ts`) antes de publicar la SPA. Auditar y versionar la
   función desplegada `get-memberships-client-by-id`, que no existe en
   `back/functions`; las pestañas de membresías, pagos y asistencia todavía
   requieren su propio aislamiento por `gym_id`.
7. Aplicar el backfill y las restricciones de `gym_id` de asistencias y
   membresías comerciales, configurar `TERMINAL_PROFILE_ID` y desplegar las
   siete funciones v2 de Asistencias antes de publicar la SPA.
8. Aplicar `register_membership_payment_v2` y
   `update_membership_payment_date_v2`, desplegar las cinco Edge Functions de
   Pagos v2 y validar en remoto aislamiento por gym, pagos parciales y
   corrección de fechas antes de publicar la SPA.
9. Aplicar `adjust_product_stock_v2` y `register_product_sale_v2`, desplegar
   las doce Functions v2 de Productos y validar en remoto aislamiento entre dos
   gyms, concurrencia de stock/ventas y el mapeo `auth.users` a `profiles`.
