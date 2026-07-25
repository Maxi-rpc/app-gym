import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

import Button from "../../../components/ui/button/Button";

type Props = {
	onRegister: (qrValue: string) => Promise<void>;
	onRegistered?: () => void;
};

export default function ButtonQr({ onRegister, onRegistered }: Props) {
	const [isRegistering, setIsRegistering] = useState(false);

	const [isScanning, setIsScanning] = useState(false);

	const handleScan = async (codes: { rawValue: string }[]) => {
		const qrValue = codes[0]?.rawValue;
		if (!qrValue || isRegistering) return;

		console.log("Escaneado OK:", qrValue);

		try {
			setIsRegistering(true);

			await onRegister(qrValue); // POST al backend
			onRegistered?.(); // refresca la tabla tras éxito
		} catch (error) {
			console.error("No se pudo registrar la asistencia:", error);
			// Mostrar mensaje de error en pantalla
		} finally {
			setIsRegistering(false);
		}
	};

	return (
		<div>
			<Button
				size="sm"
				onClick={() => {
					setIsScanning(true);
				}}
			>
				Escanear QR
			</Button>

			{isScanning && (
				<div className="w-100 mt-4 mx-auto">
					<Scanner
						onScan={handleScan}
						allowMultiple
						scanDelay={1000}
						formats={["qr_code"]}
					/>

					<Button
						size="sm"
						variant="outline"
						onClick={() => setIsScanning(false)}
						className="mt-4 rounded-lg bg-gray-200 px-4 py-2 text-gray-800"
					>
						Cancelar
					</Button>
				</div>
			)}
		</div>
	);
}
