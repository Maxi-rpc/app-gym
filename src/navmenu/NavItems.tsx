// Assume these icons are imported from an icon library
import {
	BoxCubeIcon,
	CalenderIcon,
	ChevronDownIcon,
	GridIcon,
	HorizontaLDots,
	ListIcon,
	PageIcon,
	PieChartIcon,
	PlugInIcon,
	TableIcon,
	UserCircleIcon,
} from "../icons";

type NavItem = {
	name: string;
	icon: React.ReactNode;
	path?: string;
	subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
	requiredRoles?: string[]; // Roles requeridos para ver este menú
};

const navItems: NavItem[] = [
	{
		icon: <GridIcon />,
		name: "Dashboard",
		subItems: [{ name: "Ecommerce", path: "/", pro: false }],
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
	{
		name: "Forms",
		icon: <ListIcon />,
		subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
	},
	{
		name: "Tables",
		icon: <TableIcon />,
		subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
	},
	{
		name: "Pages",
		icon: <PageIcon />,
		subItems: [
			{ name: "Blank Page", path: "/blank", pro: false },
			{ name: "404 Error", path: "/error-404", pro: false },
		],
	},
];

export default navItems;
