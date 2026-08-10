import { useState, useEffect } from "react";

import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Alert from "../../../components/ui/alert/Alert";
import { Feedback } from "../../../components/ui/alert/types/AlertFeedback";

import { dashboardService } from "../../../service/dashboard.service";

import SectionMetrics from "./SectionMetrics/SectionMetrics";
import SectionMontlhly from "./SectionMontlhly/SectionMontlhly";
import SectionMontlhyTarget from "./SectionMontlhyTarget/SectionMontlhyTarget";
import SectionRecentOrders from "./SectionRecentOrders/SectionRecentOrders";

import SectionClients from "./SectionClients/SectionClients";
import SectionAttendances from "./SectionAttendances/SectionAttendances";
import SectionAttendanceNew from "./SectionAttendances/SectionAttendancesNew";

export default function Dashboard() {
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [client, setClient] = useState();
	const [payment, setPayment] = useState();
	const [attendance, setAttendance] = useState();
	const [charts, setCharts] = useState();

	const getData = async () => {
		try {
			setFeedback(null);

			const resp = await dashboardService.getAll();
			if (resp.error) throw resp.error;

			setClient(resp?.data?.clients);
			setPayment(resp?.data?.payments);
			setAttendance(resp?.data?.attendance);
			setCharts(resp?.data?.charts);
		} catch (error) {
			console.error("Error No se puede obtener datos", error);

			setFeedback({
				variant: "error",
				title: "No se puede obtener datos",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<PageMeta
				title="React.js Dashboard | TailAdmin - Next.js Admin Dashboard Template"
				description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<PageBreadcrumb pageTitle="Dashboard" />

			<div className="grid grid-cols-12 gap-4 md:gap-6">
				{feedback && (
					<div className="col-span-12 text-start">
						<Alert
							variant={feedback?.variant}
							title={feedback?.title}
							message={feedback?.message}
						/>
					</div>
				)}
				<div className="col-span-12">
					<SectionClients data={client || null} />
				</div>

				<div className="col-span-12 space-y-6 xl:col-span-7">
					<SectionMetrics
						dataPayment={payment || null}
						dataAttendance={attendance || null}
					/>

					<SectionMontlhyTarget data={charts || null} />
				</div>

				<div className="col-span-12 xl:col-span-5">
					<SectionMontlhly />
				</div>

				<div className="col-span-12 space-y-6 xl:col-span-12">
					<SectionAttendances data={attendance || null} />

					<SectionAttendanceNew data={charts || null} />
				</div>

				<div className="col-span-12 xl:col-span-7">
					<SectionRecentOrders />
				</div>

				<div className="col-span-12 xl:col-span-5">
					<SectionRecentOrders />
				</div>
			</div>
		</div>
	);
}
