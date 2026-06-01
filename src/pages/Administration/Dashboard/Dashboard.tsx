import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import SectionMetrics from "./SectionMetrics/SectionMetrics";
import SectionMontlhly from "./SectionMontlhly/SectionMontlhly";
import SectionMontlhyTarget from "./SectionMontlhyTarget/SectionMontlhyTarget";
import SectionRecentOrders from "./SectionRecentOrders/SectionRecentOrders";

export default function Dashboard() {
	return (
		<div>
			<PageMeta
				title="React.js Dashboard | TailAdmin - Next.js Admin Dashboard Template"
				description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<PageBreadcrumb pageTitle="Dashboard" />

			<div className="grid grid-cols-12 gap-4 md:gap-6">
				<div className="col-span-12 space-y-6 xl:col-span-7">
					<SectionMetrics />

					<SectionMontlhyTarget />
				</div>

				<div className="col-span-12 xl:col-span-5">
					<SectionMontlhly />
				</div>

				<div className="col-span-12 xl:col-span-7">
					<SectionRecentOrders />
				</div>
			</div>
		</div>
	);
}
