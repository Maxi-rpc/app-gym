// Assume these icons are imported from an icon library
import { CalenderIcon, GridIcon, ListIcon, UserCircleIcon } from "../icons";

type NavItem = {
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

const mainItems: NavItem[] = [
	{
		icon: <GridIcon />,
		name: "Administración",
		requiredRoles: ["admin", "coach"],
		subItems: [
			{
				name: "Clientes",
				path: "/administration/clients",
				requiredRoles: ["admin", "coach"],
				pro: false,
			},
			{
				name: "Profesores",
				path: "/administration/coachs",
				requiredRoles: ["admin", "coach"],
				pro: false,
			},
		],
	},
	{
		icon: <ListIcon />,
		name: "Operaciones",
		requiredRoles: ["admin", "coach"],
		subItems: [
			{
				name: "Pagos",
				path: "/operations/paid",
				requiredRoles: ["admin", "coach"],
				pro: false,
			},
			{
				name: "Clases",
				path: "/operations/class",
				requiredRoles: ["admin", "coach"],
				pro: false,
			},
		],
	},
	{
		icon: <CalenderIcon />,
		name: "Calendar",
		path: "/calendar",
		requiredRoles: ["admin", "coach"],
	},
	{
		icon: <UserCircleIcon />,
		name: "User Profile",
		path: "/profile",
		requiredRoles: ["admin", "client", "coach"],
	},
];

export default mainItems;
