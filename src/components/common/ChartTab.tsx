import { useState } from "react";

export type ChartTabOption = {
	id: string;
	label: string;
};

type ChartTabProps = {
	tabs?: ChartTabOption[];
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
};

const defaultTabs: ChartTabOption[] = [
	{ id: "monthly", label: "Monthly" },
	{ id: "quarterly", label: "Quarterly" },
	{ id: "annually", label: "Annually" },
];

const ChartTab: React.FC<ChartTabProps> = ({
	tabs = defaultTabs,
	value,
	defaultValue,
	onChange,
}) => {
	const [internalValue, setInternalValue] = useState(
		defaultValue ?? tabs[0]?.id ?? ""
	);
	const selected = value ?? internalValue;

	const selectTab = (tabId: string) => {
		if (value === undefined) setInternalValue(tabId);
		onChange?.(tabId);
	};

	const getButtonClass = (tabId: string) =>
		selected === tabId
			? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
			: "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
		{tabs.map((tab) => (
			<button
				key={tab.id}
				type="button"
				onClick={() => selectTab(tab.id)}
				className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
					tab.id
				)}`}
			>
				{tab.label}
			</button>
		))}
    </div>
  );
};

export default ChartTab;
