# Equipo de agentes de app-gym

Este directorio contiene perfiles reutilizables para delegar trabajo dentro de
`app-gym`. No reemplaza a `AGENTS.md`: ese archivo contiene las reglas comunes
obligatorias para todos los agentes.

El estado operativo entre tareas se registra en [`MEMORY.md`](../MEMORY.md).
El orquestador lo lee al empezar y lo actualiza al cerrar hitos; los subagentes
entregan la información que debe consolidarse allí, pero no lo editan en
paralelo.

## Equipo inicial

```text
orquestador
├── frontend
├── backend
└── qa
```

- **Orquestador:** recibe el pedido, propone la división, previene conflictos
  entre archivos, integra entregas y coordina la verificación final.
- **Frontend:** implementa cambios de interfaz y lógica cliente dentro de
  `src/`, siguiendo los patrones existentes y los contratos ya definidos.
- **Backend:** implementa y revisa cambios en Supabase, TypeScript de Edge
  Functions, SQL, RPC, relaciones, permisos y contratos de datos.
- **QA:** valida los criterios de aceptación, ejecuta las verificaciones
  disponibles y documenta regresiones o riesgos reproducibles.

## Uso

1. El orquestador lee `AGENTS.md`, inspecciona el código relacionado y define
   las tareas sin superponer archivos.
2. Para cada delegación, copia y completa `task-template.md`.
3. Adjunta el perfil del rol correspondiente (`orchestrator.md`, `frontend.md`,
   `backend.md` o `qa.md`) al contexto del agente que realizará el trabajo.
4. Integra las entregas de forma secuencial cuando dependan del mismo archivo o
   flujo. Al cerrar, usa la lista de `qa.md`.
5. Actualiza `MEMORY.md` con el resultado, verificaciones y próximos pasos.

Los perfiles definen responsabilidades, no permisos adicionales. Si una tarea
requiere cambios de esquema, RPC o Edge Functions, el orquestador debe
asignarla explícitamente al perfil backend y coordinar el contrato con frontend
antes de iniciar el trabajo de interfaz.
