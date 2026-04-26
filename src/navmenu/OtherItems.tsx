// Assume these icons are imported from an icon library
import { BoxCubeIcon, PieChartIcon, PlugInIcon } from "../icons";

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

const otherItems: NavItem[] = [
	{
		icon: <PieChartIcon />,
		name: "Charts",
		subItems: [
			{ name: "Line Chart", path: "/line-chart", pro: false },
			{ name: "Bar Chart", path: "/bar-chart", pro: false },
		],
	},
	{
		icon: <BoxCubeIcon />,
		name: "UI Elements",
		subItems: [
			{ name: "Alerts", path: "/alerts", pro: false },
			{ name: "Avatar", path: "/avatars", pro: false },
			{ name: "Badge", path: "/badge", pro: false },
			{ name: "Buttons", path: "/buttons", pro: false },
			{ name: "Images", path: "/images", pro: false },
			{ name: "Videos", path: "/videos", pro: false },
		],
	},
	{
		icon: <PlugInIcon />,
		name: "Authentication",
		subItems: [
			{ name: "Sign In", path: "/signin", pro: false },
			{ name: "Sign Up", path: "/signup", pro: false },
		],
	},
];

export default otherItems;
