import { ReactNode } from "react";

type ButtonVariant = "text" | "contained" | "outline";
type ButtonColor =
	| "primary"
	| "success"
	| "error"
	| "warning"
	| "info"
	| "light"
	| "dark";

interface ButtonCustomProps {
	children: ReactNode; // Button text or content
	size?: "sm" | "md"; // Button size
	variant?: ButtonVariant; // Button variant
	color?: ButtonColor; // Button color
	startIcon?: ReactNode; // Icon before the text
	endIcon?: ReactNode; // Icon after the text
	onClick?: () => void; // Click handler
	disabled?: boolean; // Disabled state
	className?: string; // Additional Tailwind classes
	type?: "button" | "submit" | "reset"; // Button type
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
	children,
	size = "md",
	variant = "contained",
	color = "primary",
	startIcon,
	endIcon,
	onClick,
	className = "",
	disabled = false,
	type = "button",
}) => {
	const sizeClasses = {
		sm: "px-4 py-3 text-sm",
		md: "px-5 py-3.5 text-sm",
	};

	const colorClasses: Record<ButtonVariant, Record<ButtonColor, string>> = {
		contained: {
			primary: "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
			success: "bg-green-500 text-white shadow-theme-xs hover:bg-green-600 disabled:bg-green-300",
			error: "bg-red-500 text-white shadow-theme-xs hover:bg-red-600 disabled:bg-red-300",
			warning: "bg-amber-500 text-white shadow-theme-xs hover:bg-amber-600 disabled:bg-amber-300",
			info: "bg-blue-500 text-white shadow-theme-xs hover:bg-blue-600 disabled:bg-blue-300",
			light: "bg-gray-100 text-gray-700 shadow-theme-xs hover:bg-gray-200 disabled:bg-gray-100 dark:bg-white/[0.08] dark:text-gray-200 dark:hover:bg-white/[0.12]",
			dark: "bg-gray-900 text-white shadow-theme-xs hover:bg-gray-800 disabled:bg-gray-500 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200",
		},
		outline: {
			primary: "bg-transparent text-brand-500 ring-1 ring-inset ring-brand-500 hover:bg-brand-50 disabled:text-brand-300 disabled:ring-brand-300 dark:hover:bg-brand-500/[0.12]",
			success: "bg-transparent text-green-600 ring-1 ring-inset ring-green-500 hover:bg-green-50 disabled:text-green-300 disabled:ring-green-300 dark:hover:bg-green-500/[0.12]",
			error: "bg-transparent text-red-600 ring-1 ring-inset ring-red-500 hover:bg-red-50 disabled:text-red-300 disabled:ring-red-300 dark:hover:bg-red-500/[0.12]",
			warning: "bg-transparent text-amber-600 ring-1 ring-inset ring-amber-500 hover:bg-amber-50 disabled:text-amber-300 disabled:ring-amber-300 dark:hover:bg-amber-500/[0.12]",
			info: "bg-transparent text-blue-600 ring-1 ring-inset ring-blue-500 hover:bg-blue-50 disabled:text-blue-300 disabled:ring-blue-300 dark:hover:bg-blue-500/[0.12]",
			light: "bg-transparent text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:text-gray-400 disabled:ring-gray-200 dark:text-gray-300 dark:ring-gray-600 dark:hover:bg-white/[0.06]",
			dark: "bg-transparent text-gray-900 ring-1 ring-inset ring-gray-900 hover:bg-gray-100 disabled:text-gray-400 disabled:ring-gray-300 dark:text-white dark:ring-white dark:hover:bg-white/[0.12]",
		},
		text: {
			primary: "bg-transparent text-brand-500 hover:bg-brand-50 disabled:text-brand-300 dark:hover:bg-brand-500/[0.12]",
			success: "bg-transparent text-green-600 hover:bg-green-50 disabled:text-green-300 dark:hover:bg-green-500/[0.12]",
			error: "bg-transparent text-red-600 hover:bg-red-50 disabled:text-red-300 dark:hover:bg-red-500/[0.12]",
			warning: "bg-transparent text-amber-600 hover:bg-amber-50 disabled:text-amber-300 dark:hover:bg-amber-500/[0.12]",
			info: "bg-transparent text-blue-600 hover:bg-blue-50 disabled:text-blue-300 dark:hover:bg-blue-500/[0.12]",
			light: "bg-transparent text-gray-600 hover:bg-gray-100 disabled:text-gray-400 dark:text-gray-300 dark:hover:bg-white/[0.06]",
			dark: "bg-transparent text-gray-900 hover:bg-gray-100 disabled:text-gray-400 dark:text-white dark:hover:bg-white/[0.12]",
		},
	};

	return (
		<button
			className={`inline-flex items-center justify-center gap-2 rounded-lg transition ${className} ${sizeClasses[size]} ${colorClasses[variant][color]} ${
				disabled ? "cursor-not-allowed opacity-50" : ""
			}`}
			onClick={onClick}
			disabled={disabled}
			type={type}
		>
			{startIcon && <span className="flex items-center">{startIcon}</span>}
			{children}
			{endIcon && <span className="flex items-center">{endIcon}</span>}
		</button>
	);
};

export default ButtonCustom;
