import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import FormSaleManual from "./forms/FormSaleManual";
import Tabs from "./Tabs";

export default function Register() {
	return (
		<div>
			<PageMeta
				title="App Gym - Registrar venta"
				description="Registro manual de ventas"
			/>
			<PageBreadcrumb pageTitle="Registrar venta" />
			<div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/3 xl:px-10 xl:py-12">
				<div className="mx-auto w-full text-center">
					<h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
						Registrar venta
					</h3>
					<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
						Agregá productos por código de barras o SKU para registrar una venta
						manual.
					</p>
				</div>
			</div>
			<div className="my-3" />
			<Tabs tabBodyOne={<FormSaleManual />} />
		</div>
	);
}
