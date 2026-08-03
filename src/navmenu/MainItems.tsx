// Assume these icons are imported from an icon library
import { UserCircleIcon, PieChartIcon } from "../icons";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
	UserMultiple4Outlined,
	Dumbbell1Outlined,
	CheckCircle1Outlined,
	CreditCardMultipleOutlined,
	BarChart4Outlined,
	Gear1Outlined,
} from "@lineiconshq/free-icons";

import { NavItem } from "./types/NavItem";

const mainItems: NavItem[] = [
	{
		icon: <PieChartIcon />,
		name: "Dashboard",
		path: "/administration/dashboard",
		requiredRoles: ["Admin", "Profesor"],
	},
	{
		icon: <UserCircleIcon />,
		name: "Perfil",
		path: "/profile",
		requiredRoles: ["Admin", "Cliente", "Profesor"],
	},
	{
		icon: <Lineicons icon={UserMultiple4Outlined} size={40} />,
		name: "Clientes",
		path: "/clients",
		requiredRoles: ["Admin", "Profesor"],
	},
	{
		icon: <Lineicons icon={Dumbbell1Outlined} size={40} />,
		name: "Profesores",
		path: "/coachs",
		requiredRoles: ["Admin", "Profesor"],
	},
	{
		icon: <Lineicons icon={CheckCircle1Outlined} size={40} />,
		name: "Asistencias",
		requiredRoles: ["Admin", "Profesor"],
		subItems: [
			{
				name: "Registrar",
				path: "/assistants/register",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
			{
				name: "Historial",
				path: "/assistants/list",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
		],
	},
	{
		icon: <Lineicons icon={CreditCardMultipleOutlined} size={40} />,
		name: "Pagos",
		requiredRoles: ["Admin", "Profesor"],
		subItems: [
			{
				name: "Registrar",
				path: "/payments/register",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
			{
				name: "Historial",
				path: "/payments/list",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
		],
	},
	{
		icon: <Lineicons icon={BarChart4Outlined} size={40} />,
		name: "Reportes",
		path: "/report",
		requiredRoles: ["Admin", "Profesor"],
	},
	{
		icon: <Lineicons icon={Gear1Outlined} size={40} />,
		name: "Configuración",
		requiredRoles: ["Admin", "Profesor"],
		subItems: [
			{
				name: "Roles",
				path: "/configurations/roles",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
			{
				name: "Estados de usuario",
				path: "/configurations/user-status",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},

			{
				name: "Estados de membresía",
				path: "/configurations/membership-status",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
			{
				name: "Servicios",
				path: "/configurations/sales",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
			{
				name: "Métodos de pago",
				path: "/configurations/sales",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
		],
	},
];

export default mainItems;
