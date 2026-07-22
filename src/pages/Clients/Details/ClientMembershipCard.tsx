import { useState, useEffect } from "react";

import { Membership } from "../types/Membership";
import { membershipsService } from "../../../service/memberships.service";

interface Props {
	id: string;
}

export default function ClientMembershipCard({ id }: Props) {
	const [memberships, setMemberships] = useState<Membership | null>(null);
	const [listMembership, setListMembership] = useState<Membership[] | null>(
		null,
	);

	const getData = async (id) => {
		console.log("memberships - getData");
		try {
			const data = await membershipsService.getByClientId(id);
			setListMembership(data);
			data.filter((item: Membership) => {
				if (item?.active) {
					setMemberships(item);
				}
			});
		} catch (error) {
			console.error("Error getData", error);
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
							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Fecha de Ingreso
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{memberships?.created_at}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Fecha de Fin
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{memberships?.end_date}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Estado
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{String(memberships?.active)}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Próximo vencimiento
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{memberships?.next_due_date}
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
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
