import { useState, useEffect } from "react";

import { Client } from "../types/Client";

interface Props {
	data: Client | null;
}

export default function ClientCard({ data }: Props) {
	const [client, setClient] = useState<Client | null>(null);

	useEffect(() => {
		setClient(data);
	}, [data]);

	return (
		<>
			<div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
					<div>
						<h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6 mb-3">
							Datos Cliente
						</h4>

						<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32">
							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Fecha de Ingreso
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{client?.created_at}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Altura y Peso
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{client?.height} , {client?.weight}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Contacto de Emergencia
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{client?.emergency_contact}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Notas Medicas
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{client?.medical_notes}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
