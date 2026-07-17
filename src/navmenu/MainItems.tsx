// Assume these icons are imported from an icon library
import { GridIcon, ListIcon, UserCircleIcon, PieChartIcon } from "../icons";

import { NavItem } from "./types/NavItem";

const mainItems: NavItem[] = [
	{
		icon: <UserCircleIcon />,
		name: "Perfil",
		path: "/profile",
		requiredRoles: ["Admin", "Client", "Coach"],
	},
	{
		icon: <PieChartIcon />,
		name: "Dashboard",
		path: "/administration/dashboard",
		requiredRoles: ["Admin", "Coach"],
	},
	{
		icon: <GridIcon />,
		name: "Administración",
		requiredRoles: ["Admin", "Coach"],
		subItems: [
			{
				name: "Clientes",
				path: "/administration/clients",
				requiredRoles: ["Admin", "Coach"],
				pro: false,
			},
			{
				name: "Profesores",
				path: "/administration/coachs",
				requiredRoles: ["Admin", "Coach"],
				pro: false,
			},
			{
				name: "Asistencias",
				path: "/administration/assistants",
				requiredRoles: ["Admin", "Coach"],
				pro: false,
			},
		],
	},
	{
		icon: <ListIcon />,
		name: "Operaciones",
		requiredRoles: ["Admin", "Coach"],
		subItems: [
			{
				name: "Suscripciones",
				path: "/operations/payments",
				requiredRoles: ["Admin", "Coach"],
				pro: false,
			},
			{
				name: "Ventas",
				path: "/operations/sales",
				requiredRoles: ["Admin", "Coach"],
				pro: false,
			},
		],
	},
];

export default mainItems;
