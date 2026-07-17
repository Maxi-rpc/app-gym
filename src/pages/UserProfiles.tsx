import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserDataCard from "../components/UserProfile/UserDataCard";
import EmployeeCard from "../components/UserProfile/EmployeeCard";
import ClientCard from "../components/UserProfile/ClientCard";
import UserSecurityCard from "../components/UserProfile/UserSecurityCard";
import PageMeta from "../components/common/PageMeta";

import { useAuth } from "../hooks/useAuth";

export default function UserProfiles() {
	const { hasRole } = useAuth();

	return (
		<>
			<PageMeta title="App Gym - Profile" description="Panel de perfil" />
			<PageBreadcrumb pageTitle="Perfil" />
			<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 lg:p-6">
				<h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
					Perfil
				</h3>
				<div className="space-y-6">
					<UserDataCard />
					{hasRole("Admin") && <EmployeeCard />}
					{hasRole("Profesor") && <EmployeeCard />}
					{hasRole("Administración") && <p>Eres de Administración</p>}
					{hasRole("Cliente") && <ClientCard />}
					<ClientCard />
					<UserSecurityCard />
				</div>
			</div>
		</>
	);
}
