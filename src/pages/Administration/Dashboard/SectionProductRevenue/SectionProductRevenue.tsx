import { ProductRevenueMonth } from "../../../../service/types/Dashboard";

import BarChart from "./Charts/BarChart";

type Props = {
	data: ProductRevenueMonth[] | null;
};

export default function SectionProductRevenueView({ data }: Props) {
	return (
		<div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/3 sm:px-6 sm:pt-6">
			<div className="grid grid-cols-1 gap-4 md:gap-6">
				<div className="w-full">
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
						Facturación mensual de productos
					</h3>
					<p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
						Ingresos generados por las ventas de productos
					</p>
				</div>
				<div className="max-w-full overflow-x-auto custom-scrollbar">
					<div className="min-w-175 xl:min-w-full text-gray-800 dark:text-white/90">
						<BarChart data={data} />
					</div>
				</div>
			</div>
		</div>
	);
}
