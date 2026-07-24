import { useState, useEffect, SetStateAction } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Badge from "../../../../components/ui/badge/Badge";
import Alert from "../../../../components/ui/alert/Alert";
import { Feedback } from "../../../../components/ui/alert/types/AlertFeedback";

import { formatLocalDateTime } from "../../../../utils/date";

import { Membership } from "../../../../service/types/Membership";
import { membershipsService } from "../../../../service/memberships.service";

import MembershipsTable from "./MembershipsTable";

interface Props {
	id: string;
}

export default function ClientMembershipCard({ id }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);

	const [memberships, setMemberships] = useState<Membership | null>(null);
	const [listMembership, setListMembership] = useState<Membership[] | null>(
		null,
	);
	const [searchText, setSearchText] = useState("");

	const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
		setSearchText(e.target.value);
	};

	const getData = async (id: string) => {
		try {
			setFeedback(null);

			const resp = await membershipsService.getByClientId(id);
			if (resp.error) throw resp.error;

			setListMembership(resp?.data);
			resp?.data.filter((item: Membership) => {
				if (item?.membership_status?.name == "Active") {
					setMemberships(item);
				}
			});
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
		getData(id);
	}, [id]);

	return (
		<>
			<div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
					<div>
						<h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6 mb-3">
							Datos de Membresía
						</h4>

						<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32">
							{feedback && (
								<div className="col-span-2">
									<Alert
										variant={feedback?.variant}
										title={feedback?.title}
										message={feedback?.message}
									/>
								</div>
							)}

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Fecha de Ingreso
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{formatLocalDateTime(memberships?.created_at)}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Fecha de Fin
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{formatLocalDateTime(memberships?.end_date)}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Estado
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									<Badge
										color={
											memberships?.membership_status.id == 1
												? "success"
												: "warning"
										}
									>
										{memberships?.membership_status?.name}
									</Badge>
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Próximo vencimiento
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{formatLocalDateTime(memberships?.next_due_date)}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Servicio
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{memberships?.service?.name}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Obvervación
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{memberships?.observations}
								</p>
							</div>
							<div className="col-span-2"></div>
						</div>

						<div className="flex justify-between items-end gap-4 max-sm:px-4 mb-3 my-2">
							<div className="space-y-6 flex-1">
								<Label htmlFor="inputTwo">Buscar Membresía</Label>
								<Input
									type="text"
									id="inputTwo"
									placeholder="Ingresar fecha, estado"
									value={searchText}
									onChange={handleSearch}
								/>
							</div>
						</div>
						<div>
							<MembershipsTable searchText="" listData={listMembership || []} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
