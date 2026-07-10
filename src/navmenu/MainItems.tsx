// Assume these icons are imported from an icon library
import { GridIcon, ListIcon, UserCircleIcon, PieChartIcon } from "../icons";

import { NavItem } from "./types/NavItem";

const mainItems: NavItem[] = [
	{
		icon: <UserCircleIcon />,
		name: "Perfil",
		path: "/profile",
		requiredRoles: ["admin", "client", "coach"],
	},
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
			{
				name: "Productos",
				path: "/administration/products",
				requiredRoles: ["admin", "coach"],
				pro: false,
			},
			{
				name: "Asistencias",
				path: "/administration/assistants",
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
				name: "Suscripciones",
				path: "/operations/payments",
				requiredRoles: ["admin", "coach"],
				pro: false,
			},
			{
				name: "Ventas",
				path: "/operations/sales",
				requiredRoles: ["admin", "coach"],
				pro: false,
			},
		],
	},
];

export default mainItems;
