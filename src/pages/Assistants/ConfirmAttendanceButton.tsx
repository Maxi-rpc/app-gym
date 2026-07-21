import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

import Button from "../../components/ui/button/Button";

type Props = {
	onClick?: () => void; // Click handler
	onConfirm?: () => void; // Click handler
};

export default function ConfirmAttendanceButton({ onClick, onConfirm }: Props) {
	const [isScanning, setIsScanning] = useState(false);

	const handleScan = (codes: { rawValue: string }[]) => {
		const qrValue = codes[0]?.rawValue;

		if (!qrValue) return;

		console.log("Escaneado OK:", qrValue);

		onConfirm?.();
		setIsScanning(false);
	};

	return (
		<div>
			<Button
				size="sm"
				onClick={() => {
					onClick?.();
					setIsScanning(true);
				}}
			>
				Confirmar asistencia
			</Button>

			{isScanning && (
				<div className="w-100 mt-4 mx-auto">
					<Scanner
						onScan={handleScan}
						onError={(error) => console.error("Error escaneando QR:", error)}
						constraints={{ facingMode: "environment" }}
						formats={["qr_code"]}
						allowMultiple={false}
					/>

					<button
						type="button"
						onClick={() => setIsScanning(false)}
						className="mt-3 rounded-lg bg-gray-200 px-4 py-2 text-gray-800"
					>
						Cancelar
					</button>
				</div>
			)}
		</div>
	);
}
