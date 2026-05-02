import { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import SectionList from "./SectionList/SectionList";
import SectionAdd from "./SectionAdd/SectionAdd";
import SectionEdit from "./SectionEdit/SectionEdit";

export default function Payments() {
	const [activeTab, setActiveTab] = useState<string>("history");

	const tabs = [
		{ id: "history", label: "Historial" },
		{ id: "register", label: "Registrar" },
		{ id: "edit", label: "Editar" },
	];

	const tabContent: { [key: string]: React.ReactNode } = {
		history: (
			<div>
				<h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white/90">
					Historial
				</h3>
				<SectionList />
			</div>
		),
		register: (
			<div>
				<h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white/90">
					Registrar Pago
				</h3>
				<SectionAdd />
			</div>
		),
		edit: (
			<div>
				<h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white/90">
					Editar Pago
				</h3>
				<SectionEdit />
			</div>
		),
	};

	return (
		<div>
			<PageMeta
				title="App Gym - Administration Payments"
				description="Panel de administracion para Payments"
			/>
			<PageBreadcrumb pageTitle="Payments" />

			<div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/3 xl:px-10 xl:py-12">
				<div className="mx-auto w-full text-center mb-8">
					<h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
						Listado de Pagos
					</h3>

					<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
						En esta vista se puede registrar un pago, editar, eliminar y ver el
						historial.
					</p>
				</div>

				<div className=" max-sm:px-4 mb-3">
					<div className="border-b border-gray-200 dark:border-gray-800">
						<nav className="-mb-px flex space-x-2 overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
							{tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`inline-flex items-center border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
										activeTab === tab.id
											? "text-brand-500 dark:text-brand-400 border-brand-500 dark:border-brand-400"
											: "bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
									}`}
								>
									{tab.label}
								</button>
							))}
						</nav>
					</div>

					<div className="pt-4 dark:border-gray-800">
						{tabContent[activeTab]}
					</div>
				</div>
			</div>
		</div>
	);
}
