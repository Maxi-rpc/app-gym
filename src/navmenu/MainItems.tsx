// Assume these icons are imported from an icon library
import { UserCircleIcon, PieChartIcon } from "../icons";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
	UserMultiple4Outlined,
	Dumbbell1Outlined,
	CheckCircle1Outlined,
	CreditCardMultipleOutlined,
	BoxClosedOutlined,
	// BarChart4Outlined,
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
				name: "Escanear QR",
				path: "/assistants/register-qr",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
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
		icon: <Lineicons icon={BoxClosedOutlined} size={40} />,
		name: "Productos",
		requiredRoles: ["Admin", "Profesor"],
		subItems: [
			{
				name: "Productos",
				path: "/products/list",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
			{
				name: "Stock",
				path: "/products/stock",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
			{
				name: "Movimientos de Stock",
				path: "/products/stock-history",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
		],
	},
	// {
	// 	icon: <Lineicons icon={BarChart4Outlined} size={40} />,
	// 	name: "Reportes",
	// 	path: "/report",
	// 	requiredRoles: ["Admin", "Profesor"],
	// },
];

export default mainItems;
