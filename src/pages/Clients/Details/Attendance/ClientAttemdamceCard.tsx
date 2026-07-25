import { useState, useEffect, SetStateAction } from "react";

import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Badge from "../../../../components/ui/badge/Badge";
import Alert from "../../../../components/ui/alert/Alert";
import { Feedback } from "../../../../components/ui/alert/types/AlertFeedback";

import { formatLocalDateTime } from "../../../../utils/date";

import { Attendance } from "../../../../service/types/Attendance";
import { attendanceService } from "../../../../service/attendance.service";

import AttendanceTable from "./AttendanceTable";

interface Props {
	id: string;
}

export default function ClientAttemdamceCard({ id }: Props) {
	const [feedback, setFeedback] = useState<Feedback>(null);

	const [attendance, setAttendance] = useState<Attendance | null>(null);
	const [listAttendances, setListAttendances] = useState<Attendance[] | null>(
		null,
	);
	const [searchText, setSearchText] = useState("");

	const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
		setSearchText(e.target.value);
	};

	const getData = async (id: string) => {
		try {
			const resp = await attendanceService.getById(id);
			if (resp.error) throw resp.error;

			setListAttendances(resp.data);
			setAttendance(resp.data[0]);
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
							Datos de Último Acceso
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
									{formatLocalDateTime(attendance?.check_in_at)}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Fecha de Salida
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{formatLocalDateTime(attendance?.check_out_at)}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Acceso
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									<Badge
										color={attendance?.access_granted ? "success" : "warning"}
									>
										{attendance?.access_granted ? "Si" : "No"}
									</Badge>
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Razón
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{attendance?.access_reason}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Registrado por
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{attendance?.created_by_profile?.name}{" "}
									{attendance?.created_by_profile?.last_name}
								</p>
							</div>

							<div className="col-span-2"></div>
						</div>

						<div className="flex justify-between items-end gap-4 max-sm:px-4 mb-3 my-2">
							<div className="space-y-6 flex-1">
								<Label htmlFor="inputTwo">Buscar Asistencia</Label>
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
							<AttendanceTable
								searchText={searchText}
								listData={listAttendances || []}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
