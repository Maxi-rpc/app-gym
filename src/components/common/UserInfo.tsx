import { useAuth } from "../../hooks/useAuth";

/**
 * Hook personalizado para acceder a información del usuario
 * Ejemplo de uso en cualquier componente:
 *
 * function MyComponent() {
 *   const { user, isAuthenticated, hasRole, logout } = useAuth();
 *
 *   if (!isAuthenticated) return <div>No autenticado</div>;
 *
 *   return (
 *     <div>
 *       <p>{user?.name} {user?.lastname}</p>
 *       <p>{user?.email}</p>
 *       {hasRole('admin') && <p>Eres administrador</p>}
 *       <button onClick={logout}>Logout</button>
 *     </div>
 *   );
 * }
 */

export function UserInfo() {
	const { user, isAuthenticated, logout } = useAuth();

	if (!isAuthenticated || !user) {
		return null;
	}

	return (
		<div className="flex flex-col gap-2">
			<div>
				<p className="text-sm font-semibold text-gray-900 dark:text-white">
					{user.name} {user.lastname}
				</p>
				<p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
			</div>
			<div className="flex gap-2">
				<span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
					{user.roles.join(", ")}
				</span>
			</div>
			<button
				onClick={logout}
				className="text-sm text-red-500 hover:text-red-600 font-medium"
			>
				Logout
			</button>
		</div>
	);
}
