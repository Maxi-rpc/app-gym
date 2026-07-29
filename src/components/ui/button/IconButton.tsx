import { ReactNode } from "react";

interface ButtonProps {
	children: ReactNode; // Button text or content
	size?: "sm" | "md"; // Button size
	variant?: "text" | "contained" | "outline"; // Button variant
	color?:
		| "primary"
		| "success"
		| "error"
		| "warning"
		| "info"
		| "light"
		| "dark"; // Button color
	startIcon?: ReactNode; // Icon before the text
	endIcon?: ReactNode; // Icon after the text
	onClick?: () => void; // Click handler
	disabled?: boolean; // Disabled state
	className?: string; // Disabled state
	type?: "button" | "submit" | "reset"; // Button type
}

const Button: React.FC<ButtonProps> = ({
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
	// Size Classes
	const sizeClasses = {
		sm: "px-4 py-3 text-sm",
		md: "px-5 py-3.5 text-sm",
	};

	// Define color styles for variants TEXT TODO
	const variants = {
		text: {
			primary:
				"bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400",
			success:
				"bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
			error:
				"bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500",
			warning:
				"bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400",
			info: "bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500",
			light: "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80",
			dark: "bg-gray-500 text-white dark:bg-white/5 dark:text-white",
		},
		contained: {
			primary:
				"bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
			success:
				"bg-success-500 text-white shadow-theme-xs hover:bg-success-600 disabled:bg-success-300",
			error:
				"bg-error-500 text-white shadow-theme-xs hover:bg-error-600 disabled:bg-error-300",
			warning:
				"bg-warning-500 text-white shadow-theme-xs hover:bg-warning-600 disabled:bg-warning-300",
			info: "bg-blue-light-500 text-white shadow-theme-xs dark:text-white",
			light:
				"bg-light-500 text-white shadow-theme-xs hover:bg-light-600 disabled:bg-light-300",
			dark: "bg-gray-500 text-white shadow-theme-xs hover:bg-gray-600 disabled:bg-gray-300",
		},
		outline: {
			primary:
				"bg-brand text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-brand/[0.03] dark:hover:text-gray-300",
			success:
				"bg-success text-success-700 ring-1 ring-inset ring-success-300 hover:bg-success-50 dark:bg-success-800 dark:text-success-400 dark:ring-success-700 dark:hover:bg-success/[0.03] dark:hover:text-success-300",
			error:
				"bg-error text-error-700 ring-1 ring-inset ring-error-300 hover:bg-error-50 dark:bg-error-800 dark:text-error-400 dark:ring-error-700 dark:hover:bg-error/[0.03] dark:hover:text-error-300",
			warning:
				"bg-warning text-warning-700 ring-1 ring-inset ring-warning-300 hover:bg-warning-50 dark:bg-warning-800 dark:text-warning-400 dark:ring-warning-700 dark:hover:bg-warning/[0.03] dark:hover:text-warning-300",
			info: "bg-blue-light text-blue-light-700 ring-1 ring-inset ring-blue-light-300 hover:bg-blue-light-50 dark:bg-blue-light-800 dark:text-blue-light-400 dark:ring-blue-light-700 dark:hover:bg-blue-light/[0.03] dark:hover:text-blue-light-300",
			light:
				"bg-light text-light-700 ring-1 ring-inset ring-light-300 hover:bg-light-50 dark:bg-light-800 dark:text-light-400 dark:ring-light-700 dark:hover:bg-light/[0.03] dark:hover:text-light-300",
			dark: "bg-gray text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-gray/[0.03] dark:hover:text-gray-300",
		},
	};

	// Get styles based on size and color variant
	const sizeClass = sizeClasses[size];
	const colorStyles = variants[variant][color];

	return (
		<button
			className={`relative flex items-center justify-center transition-colors rounded-full ${className} ${
				sizeClass
			} ${colorStyles} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
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

export default Button;
