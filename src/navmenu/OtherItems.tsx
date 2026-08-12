// Assume these icons are imported from an icon library
import { Lineicons } from "@lineiconshq/react-lineicons";
import { Gear1Outlined } from "@lineiconshq/free-icons";

import { NavItem } from "./types/NavItem";

const otherItems: NavItem[] = [
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
				name: "Estados de pago",
				path: "/configurations/payment-status",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
			{
				name: "Métodos de pago",
				path: "/configurations/payment-methods",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
			{
				name: "Servicios",
				path: "/configurations/services",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
			{
				name: "Categorías de productos",
				path: "/configurations/product-categories",
				requiredRoles: ["Admin", "Profesor"],
				pro: false,
			},
		],
	},
];

export default otherItems;
