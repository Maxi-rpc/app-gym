import { useState, useEffect, SetStateAction } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";

import { Payments } from "../../types/Payments";
import { paymentsService } from "../../../../service/payments.service";

import MembershipsPaymentsTable from "./MembershipsPaymentsTable";

interface Props {
	id: string;
}

export default function ClientMembershipPaymentsCard({ id }: Props) {
	const [payment, setPayment] = useState<Payments | null>(null);
	const [listPayments, setListPayments] = useState<Payments[] | null>(null);
	const [searchText, setSearchText] = useState("");

	const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
		setSearchText(e.target.value);
	};

	const getData = async (id: string) => {
		try {
			const data = await paymentsService.getByClient(id);
			setListPayments(data);
			setPayment(data[0]);
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
							Datos de Último Pago
						</h4>

						<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32">
							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Fecha de Pago
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{payment?.payment_date}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Próximo Vencimiento
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{payment?.next_due_date}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Monto
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{payment?.amount_paid}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Método de Pago
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{payment?.payment_method?.name}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Estatus
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{payment?.status?.name}
								</p>
							</div>
							<div className="col-span-2"></div>
						</div>

						<div className="flex justify-between items-end gap-4 max-sm:px-4 mb-3 my-2">
							<div className="space-y-6 flex-1">
								<Label htmlFor="inputTwo">Buscar Pago</Label>
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
							<MembershipsPaymentsTable
								searchText=""
								listData={listPayments || []}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
