export type NavItem = {
	name: string;
	icon: React.ReactNode;
	path?: string;
	subItems?: {
		name: string;
		path: string;
		pro?: boolean;
		new?: boolean;
		requiredRoles?: string[];
	}[];
	requiredRoles?: string[]; // Roles requeridos para ver este menú
};
