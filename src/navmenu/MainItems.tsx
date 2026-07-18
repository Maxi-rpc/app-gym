// Assume these icons are imported from an icon library
import { GridIcon, ListIcon, UserCircleIcon, PieChartIcon } from "../icons";

import { NavItem } from "./types/NavItem";

const mainItems: NavItem[] = [
	{
		icon: <UserCircleIcon />,
		name: "Perfil",
		path: "/profile",
		requiredRoles: ["Admin", "Cliente", "Profesor"],
	},
	{
		icon: <PieChartIcon />,
		name: "Dashboard",
		path: "/administration/dashboard",
		requiredRoles: ["Admin", "Profesor"],
	},
	{
		icon: <GridIcon />,
		name: "Administración",
		requiredRoles: ["Admin", "Profesor"],
		subItems: [
			{
				name: "Clientes",
				path: "/administration/clients",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
			{
				name: "Profesores",
				path: "/administration/coachs",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
			{
				name: "Asistencias",
				path: "/administration/assistants",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
		],
	},
	{
		icon: <ListIcon />,
		name: "Operaciones",
		requiredRoles: ["Admin", "Profesor"],
		subItems: [
			{
				name: "Suscripciones",
				path: "/operations/payments",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
			{
				name: "Ventas",
				path: "/operations/sales",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
		],
	},
];

export default mainItems;
