import { createContext, ReactNode, useState, useEffect } from "react";

export interface User {
	email: string;
	name: string;
	lastname: string;
	phone: string;
	roles: string[];
}

export interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	hasRole: (role: string) => boolean;
	hasAnyRole: (roles: string[]) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// Verificar si hay sesión guardada al cargar
	useEffect(() => {
		const savedUser = localStorage.getItem("user");
		if (savedUser) {
			try {
				setUser(JSON.parse(savedUser));
			} catch {
				localStorage.removeItem("user");
			}
		}
	}, []);

	const login = async (email: string, password: string): Promise<void> => {
		setIsLoading(true);
		try {
			// Mock API - simular llamada al backend
			const userData = await mockLoginAPI(email, password);
			setUser(userData);
			localStorage.setItem("user", JSON.stringify(userData));
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	const hasRole = (role: string): boolean => {
		if (!user?.roles) return false;
		return user.roles.includes(role);
	};

	const hasAnyRole = (roles: string[]): boolean => {
		if (!user?.roles || !Array.isArray(roles)) return false;
		return roles.some((role) => user.roles.includes(role));
	};

	const value: AuthContextType = {
		user,
		isLoading,
		isAuthenticated: !!user,
		login,
		logout,
		hasRole,
		hasAnyRole,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Mock API - reemplazar con llamada real al backend
async function mockLoginAPI(email: string, password: string): Promise<User> {
	// Simular delay de red
	await new Promise((resolve) => setTimeout(resolve, 500));

	// Mock users database
	const mockUsers: Record<string, { password: string; user: User }> = {
		"admin@gym.com": {
			password: "admin123",
			user: {
				email: "admin@gym.com",
				name: "Admin",
				lastname: "User",
				phone: "111112341",
				roles: ["admin"],
			},
		},
		"client@gym.com": {
			password: "client123",
			user: {
				email: "client@gym.com",
				name: "Client",
				lastname: "User",
				phone: "111112341",
				roles: ["client"],
			},
		},
		"coach@gym.com": {
			password: "coach123",
			user: {
				email: "coach@gym.com",
				name: "Coach",
				lastname: "User",
				phone: "111112341",
				roles: ["coach"],
			},
		},
	};

	const mockUser = mockUsers[email];

	if (!mockUser || mockUser.password !== password) {
		throw new Error("Email o contraseña incorrectos");
	}

	return mockUser.user;
}
