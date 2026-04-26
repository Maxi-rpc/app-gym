// Assume these icons are imported from an icon library
import {
	CalenderIcon,
	GridIcon,
	ListIcon,
	PageIcon,
	TableIcon,
	UserCircleIcon,
} from "../icons";

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
				path: "/administration/couchs",
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
