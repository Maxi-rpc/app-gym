import { SetStateAction, useState, useEffect } from "react";

import Layout from "./Layout";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

import Form from "../../../components/form/Form";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Alert from "../../../components/ui/alert/Alert";
import { Feedback } from "../../../components/ui/alert/types/AlertFeedback";

import { Lineicons } from "@lineiconshq/react-lineicons";
import { RefreshCircle1ClockwiseOutlined } from "@lineiconshq/free-icons";

import { ClientAssistant } from "../../../service/types/ClientAssistant";
import { attendanceService } from "../../../service/attendance.service";

export default function RegisterClients() {
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [searchText, setSearchText] = useState("");
	const [selectData, setSelectData] = useState<ClientAssistant | null>(null);
	const [listData, setListData] = useState<ClientAssistant[] | []>([]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const getData = async () => {
		try {
			setFeedback(null);
			setIsLoading(true);

			const resp = await attendanceService.getAll();
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
		} finally {
			setIsLoading(false);
		}
	};

	const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
		setSearchText(e.target.value);
	};

	const handleSave = async (qrValue: string) => {
		try {
			setFeedback(null);

			const date_to_string = new Date().toISOString();

			const body = {
				qr_token: qrValue,
				check_in_at: date_to_string,
				check_out_at: null,
			};

			const resp = await attendanceService.register(body);
			if (resp.error) throw resp.error;

			if (resp.data) {
				setFeedback({
					variant: "info",
					title: "Verificar",
					message: resp.data?.message,
				});
			}
		} catch (error) {
			console.error("Error No se puede obtener datos", error);

			setFeedback({
				variant: "error",
				title: "No se puede obtener datos",
				message:
					"Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.",
			});
		}
		getData();
	};

	const handleSubmit = async () => {
		setError("");

		// Validación básica
		if (!email || !password) {
			setError("Por favor completa todos los campos*");
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError("Email inválido");
			return;
		}

		try {
			//await login(email, password);
			console.log("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error al iniciar sesión");
		}
	};

	return (
		<div>
			<PageMeta
				title="App Gym - Administration Asistencias"
				description="Panel de administracion para Asistencias"
			/>
			<Layout>
				<div className="flex flex-col flex-1">
					<div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
						<div>
							<div className="mb-5 sm:mb-8">
								<h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
									Bienvenido a Degani Gym
								</h1>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									¡Introduce tu DNI o Escanea tu cod QR!
								</p>
							</div>
							<div>
								<Form onSubmit={handleSubmit}>
									<div className="space-y-6">
										{error && (
											<div className="p-4 rounded-lg bg-error-50 dark:bg-error-500/10 border border-error-200 dark:border-error-500/20">
												<p className="text-sm text-error-600 dark:text-error-400">
													{error}
												</p>
											</div>
										)}
										<div>
											<Label htmlFor="email">
												DNI <span className="text-error-500">*</span>{" "}
											</Label>
											<Input
												placeholder="info@gmail.com"
												type="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												disabled={isLoading}
												autocomplete={email}
												name="email"
												id="email"
											/>
										</div>
										<div>
											<Label htmlFor="password">
												Password <span className="text-error-500">*</span>{" "}
											</Label>
											<div className="relative"></div>
										</div>

										<div>
											<Button
												className="w-full"
												size="sm"
												type="submit"
												disabled={isLoading}
											>
												{isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
											</Button>
										</div>
									</div>
								</Form>

								<div className="mt-5">
									<p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
										¿No tienes una cuenta? {""}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</div>
	);
}
