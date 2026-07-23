import { createContext, ReactNode, useEffect, useState } from "react";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

import { supabase } from "../utils/supabase";
import { profileService } from "../service/profile.service.ts";

import { Profile } from "./types/Profile.ts";

export interface AuthContextType {
	session: Session | null;
	authUser: SupabaseUser | null;
	profile: Profile | null;

	isLoading: boolean;
	isAuthenticated: boolean;

	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;

	hasRole: (role: string) => boolean;
	hasAnyRole: (roles: string[]) => boolean;

	refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [session, setSession] = useState<Session | null>(null);
	const [authUser, setAuthUser] = useState<SupabaseUser | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);

	const [isLoading, setIsLoading] = useState(true);

	/**
	 * Carga el perfil desde tu tabla profiles
	 */
	const loadProfile = async (userId: string) => {
		try {
			const profileData = await profileService.getById(userId);

			setProfile(profileData);
		} catch (err) {
			console.error("Error cargando profile", err);

			setProfile(null);
		}
	};

	/**
	 * Login
	 */
	const login = async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) throw error;

		// NO hacemos nada más.
		// onAuthStateChange se encargará de cargar el profile.
	};

	/**
	 * Logout
	 */
	const logout = async () => {
		await supabase.auth.signOut();
	};

	/**
	 * Recargar profile manualmente
	 */
	const refreshProfile = async () => {
		if (!authUser) return;

		await loadProfile(authUser.id);
	};

	/**
	 * Escuchar cambios de autenticación
	 */
	useEffect(() => {
		let mounted = true;

		const initialize = async () => {
			setIsLoading(true);

			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!mounted) return;

			setSession(session);
			setAuthUser(session?.user ?? null);

			if (session?.user) {
				await loadProfile(session.user.id);
			}

			if (mounted) {
				setIsLoading(false);
			}
		};

		initialize();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_event, session) => {
			setSession(session);
			setAuthUser(session?.user ?? null);

			if (session?.user) {
				await loadProfile(session.user.id);
			} else {
				setProfile(null);
			}
		});

		return () => {
			mounted = false;
			subscription.unsubscribe();
		};
	}, []);

	const hasRole = (role: string): boolean => {
		return Boolean(
			profile?.user_roles?.some((ur) => ur.role && ur.role.name === role),
		);
	};

	const hasAnyRole = (roles: string[]): boolean => {
		if (!profile?.user_roles) return false;

		return roles.some((r) =>
			profile.user_roles.some((ur) => ur.role && ur.role.name === r),
		);
	};

	return (
		<AuthContext.Provider
			value={{
				session,
				authUser,
				profile,

				isLoading,

				isAuthenticated: !!session,

				login,
				logout,

				hasRole,
				hasAnyRole,

				refreshProfile,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

// Mock API - reemplazar con llamada real al backend
// async function mockLoginAPI(email: string, password: string): Promise<User> {
// 	// Simular delay de red
// 	await new Promise((resolve) => setTimeout(resolve, 500));

// 	// Mock users database
// 	const mockUsers: Record<string, { password: string; user: User }> = {
// 		"admin@gym.com": {
// 			password: "admin123",
// 			user: {
// 				email: "admin@gym.com",
// 				name: "Admin",
// 				lastname: "User",
// 				dni: "",
// 				phone: "111112341",
// 				status: "Active",
// 				roles: ["admin"],
// 				qr_token: "1234abcadmin",
// 			},
// 		},
// 		"client@gym.com": {
// 			password: "client123",
// 			user: {
// 				email: "client@gym.com",
// 				name: "Client",
// 				lastname: "User",
// 				dni: "",
// 				phone: "111112341",
// 				status: "Active",
// 				roles: ["client"],
// 				qr_token: "1234abcclient",
// 			},
// 		},
// 		"coach@gym.com": {
// 			password: "coach123",
// 			user: {
// 				email: "coach@gym.com",
// 				name: "Coach",
// 				lastname: "User",
// 				dni: "",
// 				phone: "111112341",
// 				status: "Active",
// 				roles: ["coach"],
// 				qr_token: "1234abccoach",
// 			},
// 		},
// 	};

// 	const mockUser = mockUsers[email];

// 	if (!mockUser || mockUser.password !== password) {
// 		throw new Error("Email o contraseña incorrectos");
// 	}

// 	return mockUser.user;
// }
