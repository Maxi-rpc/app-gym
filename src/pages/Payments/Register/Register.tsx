import { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Alert from "../../../components/ui/alert/Alert";
import { Feedback } from "../../../components/ui/alert/types/AlertFeedback";

import { Lineicons } from "@lineiconshq/react-lineicons";
import { Search1Outlined } from "@lineiconshq/free-icons";

import { Profile } from "../../../context/types/Profile";
import { clientService } from "../../../service/client.service";
//import { paymentsService } from "../../../service/payments.service";

import DataTable from "./DataTable";
import ClientProfileCard from "./Cards/ClientProfileCard";
import ClientMembershipCard from "./Membership/ClientMembershipCard";
import ClientMembershipPaymentsCard from "./Payments/ClientMembershipPaymentsCard";
import ClientAttemdamceCard from "./Attendance/ClientAttemdamceCard";
import Tabs from "./Tabs";
import FormRegister from "./Form/FormRegister";

export default function Register() {
	const [feedback, setFeedback] = useState<Feedback>(null);

	const [formData, setFormData] = useState({ search: " " });
	const [selectData, setSelectData] = useState<Profile | null>(null);
	const [listData, setListData] = useState<Profile[] | []>([]);

	const getData = async () => {
		try {
			setFeedback(null);

			const resp = await clientService.getByCustomId(formData.search);
			if (resp.error) throw resp.error;

			setListData(resp.data);
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

	const handleSearch = async () => {
		await getData();
	};

	const handleEdit = (client: Profile) => {
		setSelectData(client);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<div>
			<PageMeta
				title="App Gym - Administration Payments"
				description="Panel de administracion para Pagos"
			/>
			<PageBreadcrumb pageTitle="Clients" />
			<div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/3 xl:px-10 xl:py-12">
				<div className="mx-auto w-full text-center mb-8">
					<h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
						Registrar pago
					</h3>

					<p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
						Se puede registrar pagos por cliente.
					</p>

					{feedback && (
						<div className="my-4 text-start">
							<Alert
								variant={feedback?.variant}
								title={feedback?.title}
								message={feedback?.message}
							/>
						</div>
					)}
				</div>

				{/* Search */}
				<div className="flex justify-between items-end gap-4 max-sm:px-4 mb-3">
					<div className="space-y-6 flex-1">
						<Label htmlFor="inputTwo">
							Buscar Cliente por Nombre, Apellido, Email, DNI
						</Label>
						<Input
							type="text"
							id="inputTwo"
							placeholder="Nombre, Apellido, Email, DNI"
							value={formData?.search}
							name="search"
							onChange={handleChange}
						/>
					</div>

					<Button
						size="sm"
						onClick={handleSearch}
						startIcon={
							<Lineicons icon={Search1Outlined} size={20} color="white" />
						}
					>
						Buscar
					</Button>
				</div>

				{/* Data Table */}
				<DataTable listData={listData} onEdit={handleEdit} />

				<div className="my-6"></div>

				{/* Data */}
				{selectData && (
					<>
						<h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
							Perfil
						</h3>
						<ClientProfileCard data={selectData} />
						<Tabs
							membershipContent={
								selectData ? <ClientMembershipCard id={selectData.id} /> : null
							}
							paymentContent={
								selectData ? (
									<ClientMembershipPaymentsCard id={selectData.id} />
								) : null
							}
							attendanceContent={
								selectData ? <ClientAttemdamceCard id={selectData.id} /> : null
							}
						/>
						<FormRegister data={selectData} />
					</>
				)}
			</div>
		</div>
	);
}
