import { publicAsset } from "../utils/publicAsset";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import { ChevronDownIcon, HorizontaLDots } from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../hooks/useAuth";
import SidebarWidget from "./SidebarWidget";

import NavItems from "../navmenu/NavItems";
import OtherItems from "../navmenu/OtherItems";

// user menu
import MainItems from "../navmenu/MainItems";

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

const navItems = MainItems;

const othersItems = OtherItems;

const AppSidebar: React.FC = () => {
	const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
	const { hasAnyRole } = useAuth();
	const location = useLocation();

	const [openSubmenu, setOpenSubmenu] = useState<{
		type: "main" | "others";
		index: number;
	} | null>(null);
	const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
		{},
	);
	const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

	// Verificar si el usuario tiene acceso a un menú o subitem
	const canAccessMenuItem = (requiredRoles?: string[]): boolean => {
		if (!requiredRoles || requiredRoles.length === 0) {
			return true; // Si no tiene requiredRoles, todos pueden acceder
		}
		return hasAnyRole(requiredRoles);
	};

	// Filtrar subitems según los roles del usuario
	const getFilteredSubItems = (
		subItems?: NavItem["subItems"],
	): NavItem["subItems"] => {
		if (!subItems) return undefined;
		return subItems.filter((subItem) =>
			canAccessMenuItem(subItem.requiredRoles),
		);
	};

	// Filtrar items según roles del usuario con useMemo
	const filteredNavItems = useMemo(
		() => navItems.filter((item) => canAccessMenuItem(item.requiredRoles)),
		[hasAnyRole],
	);
	const filteredOthersItems = useMemo(
		() => othersItems.filter((item) => canAccessMenuItem(item.requiredRoles)),
		[hasAnyRole],
	);

	useEffect(() => {
		let submenuMatched = false;
		["main", "others"].forEach((menuType) => {
			const items =
				menuType === "main" ? filteredNavItems : filteredOthersItems;
			items.forEach((nav, index) => {
				if (nav.subItems) {
					const filteredSubItems = getFilteredSubItems(nav.subItems);
					if (filteredSubItems) {
						filteredSubItems.forEach((subItem) => {
							if (location.pathname === subItem.path) {
								setOpenSubmenu({
									type: menuType as "main" | "others",
									index,
								});
								submenuMatched = true;
							}
						});
					}
				}
			});
		});

		if (!submenuMatched) {
			setOpenSubmenu(null);
		}
	}, [location.pathname, filteredNavItems, filteredOthersItems]);

	useEffect(() => {
		if (openSubmenu !== null) {
			const key = `${openSubmenu.type}-${openSubmenu.index}`;
			if (subMenuRefs.current[key]) {
				setSubMenuHeight((prevHeights) => ({
					...prevHeights,
					[key]: subMenuRefs.current[key]?.scrollHeight || 0,
				}));
			}
		}
	}, [openSubmenu]);

	const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
		setOpenSubmenu((prevOpenSubmenu) => {
			if (
				prevOpenSubmenu &&
				prevOpenSubmenu.type === menuType &&
				prevOpenSubmenu.index === index
			) {
				return null;
			}
			return { type: menuType, index };
		});
	};

	const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
		<ul className="flex flex-col gap-4">
			{items.map((nav, index) => (
				<li key={nav.name}>
					{nav.subItems ? (
						<button
							onClick={() => handleSubmenuToggle(index, menuType)}
							className={`menu-item group ${
								openSubmenu?.type === menuType && openSubmenu?.index === index
									? "menu-item-active"
									: "menu-item-inactive"
							} cursor-pointer ${
								!isExpanded && !isHovered
									? "lg:justify-center"
									: "lg:justify-start"
							}`}
						>
							<span
								className={`menu-item-icon-size  ${
									openSubmenu?.type === menuType && openSubmenu?.index === index
										? "menu-item-icon-active"
										: "menu-item-icon-inactive"
								}`}
							>
								{nav.icon}
							</span>
							{(isExpanded || isHovered || isMobileOpen) && (
								<span className="menu-item-text">{nav.name}</span>
							)}
							{(isExpanded || isHovered || isMobileOpen) && (
								<ChevronDownIcon
									className={`ml-auto w-5 h-5 transition-transform duration-200 ${
										openSubmenu?.type === menuType &&
										openSubmenu?.index === index
											? "rotate-180 text-brand-500"
											: ""
									}`}
								/>
							)}
						</button>
					) : (
						nav.path && (
							<Link
								to={nav.path}
								className={`menu-item group ${
									location.pathname === nav.path
										? "menu-item-active"
										: "menu-item-inactive"
								}`}
							>
								<span
									className={`menu-item-icon-size ${
										location.pathname === nav.path
											? "menu-item-icon-active"
											: "menu-item-icon-inactive"
									}`}
								>
									{nav.icon}
								</span>
								{(isExpanded || isHovered || isMobileOpen) && (
									<span className="menu-item-text">{nav.name}</span>
								)}
							</Link>
						)
					)}
					{nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
						<div
							ref={(el) => {
								subMenuRefs.current[`${menuType}-${index}`] = el;
							}}
							className="overflow-hidden transition-all duration-300"
							style={{
								height:
									openSubmenu?.type === menuType && openSubmenu?.index === index
										? `${subMenuHeight[`${menuType}-${index}`]}px`
										: "0px",
							}}
						>
							<ul className="mt-2 space-y-1 ml-9">
								{getFilteredSubItems(nav.subItems)?.map((subItem) => (
									<li key={subItem.name}>
										<Link
											to={subItem.path}
											className={`menu-dropdown-item ${
												location.pathname === subItem.path
													? "menu-dropdown-item-active"
													: "menu-dropdown-item-inactive"
											}`}
										>
											{subItem.name}
											<span className="flex items-center gap-1 ml-auto">
												{subItem.new && (
													<span
														className={`ml-auto ${
															location.pathname === subItem.path
																? "menu-dropdown-badge-active"
																: "menu-dropdown-badge-inactive"
														} menu-dropdown-badge`}
													>
														new
													</span>
												)}
												{subItem.pro && (
													<span
														className={`ml-auto ${
															location.pathname === subItem.path
																? "menu-dropdown-badge-active"
																: "menu-dropdown-badge-inactive"
														} menu-dropdown-badge`}
													>
														pro
													</span>
												)}
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</li>
			))}
		</ul>
	);

	return (
		<aside
			className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
					isExpanded || isMobileOpen
						? "w-72.5"
						: isHovered
							? "w-72.5"
							: "w-22.5"
				}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
			onMouseEnter={() => !isExpanded && setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div
				className={`py-8 flex ${
					!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
				}`}
			>
				<Link to="/">
					{isExpanded || isHovered || isMobileOpen ? (
						<>
							<img
								className="dark:hidden"
								src={publicAsset("images/logo/logo.svg")}
								alt="Logo"
								width={150}
								height={40}
							/>
							<img
								className="hidden dark:block"
								src={publicAsset("images/logo/logo-dark.svg")}
								alt="Logo"
								width={150}
								height={40}
							/>
						</>
					) : (
						<img
							src={publicAsset("images/logo/logo-icon.svg")}
							alt="Logo"
							width={32}
							height={32}
						/>
					)}
				</Link>
			</div>
			<div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
				<nav className="mb-6">
					<div className="flex flex-col gap-4">
						<div>
							<h2
								className={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
									!isExpanded && !isHovered
										? "lg:justify-center"
										: "justify-start"
								}`}
							>
								{isExpanded || isHovered || isMobileOpen ? (
									"Menu"
								) : (
									<HorizontaLDots className="size-6" />
								)}
							</h2>
							{renderMenuItems(filteredNavItems, "main")}
						</div>
						<div className="">
							<h2
								className={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
									!isExpanded && !isHovered
										? "lg:justify-center"
										: "justify-start"
								}`}
							>
								{isExpanded || isHovered || isMobileOpen ? (
									"Others"
								) : (
									<HorizontaLDots />
								)}
							</h2>
							{renderMenuItems(filteredOthersItems, "others")}
						</div>
					</div>
				</nav>
				{isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
			</div>
		</aside>
	);
};

export default AppSidebar;
