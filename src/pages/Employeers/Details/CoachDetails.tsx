import { useState, useEffect } from "react";
import { useParams } from "react-router";

import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Alert from "../../../components/ui/alert/Alert";
import { Feedback } from "../../../components/ui/alert/types/AlertFeedback";

import { Employee } from "../../../service/types/Employee";
import { Profile } from "../../../context/types/Profile";
import { employeeService } from "../../../service/employee.service";

import CoachCard from "./CoachCard";
import CoachProfileCard from "./CoachProfileCard";
import CoachMembershipCard from "./Membership/CoachMembershipCard";
import CoachMembershipPaymentsCard from "./Payments/CoachMembershipPaymentsCard";
import CoachAttendanceCard from "./Attendance/CoachAttendanceCard";
import Tabs from "./Tabs";

type ParamsUsuario = {
	id?: string;
};

export default function CoachDetails() {
	const { id } = useParams<ParamsUsuario>();
	const [feedback, setFeedback] = useState<Feedback>(null);

	const [data, setData] = useState<Employee | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);

	const getData = async (id: string) => {
		try {
			setFeedback(null);

			const user = await employeeService.getById(id);

			setData(user);
			setProfile(user?.profile);
		} catch (error) {
			console.error("Error al obtener datos", error);

			setFeedback({
				variant: "error",
				title: "No se puede obtener datos",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		}
	};

	useEffect(() => {
		if (id) {
			getData(id);
		}
	}, [id]);

	return (
		<div>
			<PageMeta
				title="App Gym - Administration Coach"
				description="Panel de administracion para Coachs"
			/>
			<PageBreadcrumb pageTitle="Coach" />
			<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 lg:p-6">
				<h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
					Perfil
				</h3>
				<div className="space-y-6">
					{feedback && (
						<div>
							<Alert
								variant={feedback?.variant}
								title={feedback?.title}
								message={feedback?.message}
							/>
						</div>
					)}
					<CoachProfileCard data={profile} />
					<CoachCard data={data} />
					<Tabs
						membershipContent={
							profile ? <CoachMembershipCard id={profile.id} /> : null
						}
						paymentContent={
							profile ? <CoachMembershipPaymentsCard id={profile.id} /> : null
						}
						attendanceContent={
							profile ? <CoachAttendanceCard id={profile.id} /> : null
						}
					/>
				</div>
			</div>
		</div>
	);
}
