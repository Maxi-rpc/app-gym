import { useId, useState, type ReactNode } from "react";

type TabId = "membership" | "payments" | "attendance";

type Tab = {
	id: TabId;
	label: string;
	title: string;
	description: string;
};

type Props = {
	membershipContent?: ReactNode;
	paymentContent?: ReactNode;
	attendanceContent?: ReactNode;
};

const tabs: Tab[] = [
	{
		id: "membership",
		label: "Membresía",
		title: "Membresía",
		description:
			"Consultá el estado, las fechas de vigencia y el servicio contratado por el cliente.",
	},
	{
		id: "payments",
		label: "Pagos",
		title: "Pagos",
		description:
			"El historial de pagos del cliente se mostrará en esta sección.",
	},
	{
		id: "attendance",
		label: "Asistencias",
		title: "Asistencias",
		description:
			"El historial de asistencias del cliente se mostrará en esta sección.",
	},
];

export default function Tabs({
	membershipContent,
	paymentContent,
	attendanceContent,
}: Props) {
	const [activeTab, setActiveTab] = useState<TabId>("membership");
	const tabListId = useId();
	const selectedTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

	return (
		<div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
			<div className="border-b border-gray-200 dark:border-gray-800">
				<nav
					aria-label="Información del cliente"
					className="-mb-px flex gap-2 overflow-x-auto custom-scrollbar"
					role="tablist"
				>
					{tabs.map((tab) => {
						const isActive = tab.id === activeTab;

						return (
							<button
								aria-controls={`${tabListId}-${tab.id}-panel`}
								aria-selected={isActive}
								className={`inline-flex items-center border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
									isActive
										? "border-brand-500 text-brand-500 dark:border-brand-400 dark:text-brand-400"
										: "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
								}`}
								id={`${tabListId}-${tab.id}`}
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								role="tab"
								type="button"
							>
								{tab.label}
							</button>
						);
					})}
				</nav>
			</div>

			<div
				aria-labelledby={`${tabListId}-${selectedTab.id}`}
				className="pt-4"
				id={`${tabListId}-${selectedTab.id}-panel`}
				role="tabpanel"
			>
				<h3 className="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">
					{selectedTab.title}
				</h3>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					{selectedTab.description}
				</p>
				{activeTab === "membership" && membershipContent ? (
					<div className="mt-4">{membershipContent}</div>
				) : null}

				{activeTab === "payments" && paymentContent ? (
					<div className="mt-4">{paymentContent}</div>
                ) : null}
                
                {activeTab === "attendance" && attendanceContent ? (
					<div className="mt-4">{attendanceContent}</div>
				) : null}
			</div>
		</div>
	);
}
