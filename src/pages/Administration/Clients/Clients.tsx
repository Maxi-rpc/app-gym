import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

const mockData = [
    {
        id: 1,
        name: 'Maxi',
        lastname: 'Pepe',
        createDate: '11-01-2026',
        status: 'Valid',
        nextPaid: '11-02-2026',
        updateDate: '11-01-2026'
    },
    {
        id: 2,
        name: 'Pepe',
        lastname: 'Pepito',
        createDate: '12-01-2026',
        status: 'Valid',
        nextPaid: '12-02-2026',
        updateDate: '12-01-2026'
    },
];

export default function Clients() {
	return (
		<div>
			<PageMeta
				title="App Gym - Administration Client"
				description="Panel de administracion para clientes"
			/>
			<PageBreadcrumb pageTitle="Clients" />
			<div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
				<div className="mx-auto w-full max-w-157.5 text-center">
					<h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
						Listado de clientes
					</h3>

					<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
						Start putting content on grids or panels, you can also use different
						combinations of grids.Please check out the dashboard and other pages
					</p>
				</div>
			</div>
		</div>
	);
}
