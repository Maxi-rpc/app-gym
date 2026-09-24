import { useState, useEffect } from "react";

import { Employee } from "../../../service/types/Employee";

import { formatLocalDateTime } from "../../../utils/date";

interface Props {
	data: Employee | null;
}

export default function CoachCard({ data }: Props) {
	const [user, setUser] = useState<Employee | null>(null);

	useEffect(() => {
		setUser(data);
	}, [data]);

	return (
		<>
			<div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
					<div>
						<h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6 mb-3">
							Datos Personales
						</h4>

						<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32">
							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Fecha de Ingreso
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{formatLocalDateTime(user?.hire_date)}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Salario
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{user?.salary}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Especialidad
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{user?.specialist}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Observación
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{user?.observations}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
