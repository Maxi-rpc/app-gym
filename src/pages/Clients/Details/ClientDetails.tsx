import { useState, useEffect } from "react";
import { useParams } from "react-router";

import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import { Client } from "../types/Client";
import { Profile } from "../../../context/types/Profile";
import { clientService } from "../../../service/client.service";

import ClientCard from "./ClientCard";
import ClientProfileCard from "./ClientProfileCard";
import ClientMembershipCard from "./Membership/ClientMembershipCard";
import ClientMembershipPaymentsCard from "./Payments/ClientMembershipPaymentsCard";
import ClientAttemdamceCard from "./Attendance/ClientAttemdamceCard";
import Tabs from "./Tabs";

type ParamsUsuario = {
	id?: string;
};

export default function ClientDetails() {
	const { id } = useParams<ParamsUsuario>();

	const [data, setData] = useState<Client | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);

	const getData = async (id: string) => {
		try {
			const client = await clientService.getById(id);
			setData(client);
			setProfile(client?.profile);
		} catch (error) {
			console.error("Error getData", error);
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
				title="App Gym - Administration Client"
				description="Panel de administracion para clientes"
			/>
			<PageBreadcrumb pageTitle="Client" />
			<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 lg:p-6">
				<h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
					Perfil
				</h3>
				<div className="space-y-6">
					<ClientProfileCard data={profile} />
					<ClientCard data={data} />
					<Tabs
						membershipContent={
							profile ? <ClientMembershipCard id={profile.id} /> : null
						}
						paymentContent={
							profile ? <ClientMembershipPaymentsCard id={profile.id} /> : null
						}
						attendanceContent={
							profile ? <ClientAttemdamceCard id={profile.id} /> : null
						}
					/>
				</div>
			</div>
		</div>
	);
}
