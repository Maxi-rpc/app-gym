// Assume these icons are imported from an icon library
import { CalenderIcon, GridIcon, ListIcon, UserCircleIcon, PieChartIcon } from "../icons";

import { NavItem } from "./types/NavItem";

const mainItems: NavItem[] = [
	{
		icon: <PieChartIcon />,
		name: "Dashboard",
		path: "/administration/dashboard",
		requiredRoles: ["admin", "coach"],
	},
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
				path: "/operations/payments",
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
