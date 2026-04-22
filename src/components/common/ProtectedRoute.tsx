import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

interface ProtectedRouteProps {
	children: ReactNode;
	requiredRoles?: string[];
	fallbackPath?: string;
}

export function ProtectedRoute({
	children,
	requiredRoles,
	fallbackPath = "/signin",
}: ProtectedRouteProps) {
	const { isAuthenticated, hasAnyRole } = useAuth();

	// Si no está autenticado, redirigir a signin
	if (!isAuthenticated) {
		return <Navigate to={fallbackPath} replace />;
	}

	// Si requiere roles específicos y el usuario no los tiene, redirigir
	if (requiredRoles && !hasAnyRole(requiredRoles)) {
		return <Navigate to="/profile" replace />;
	}

	return <>{children}</>;
}
