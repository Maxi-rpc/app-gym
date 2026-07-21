import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: () => void | undefined;
};

export default function ModalAttendance({ isOpen, onClose, onSubmit }: Props) {
	const [isScanning, setIsScanning] = useState(false);

	const handleScan = (codes: { rawValue: string }[]) => {
		const qrValue = codes[0]?.rawValue;

		if (!qrValue) return;

		console.log("Escaneado OK:", qrValue);

		onSubmit();
		setIsScanning(false);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} className="max-w-175 m-4">
			<div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
				<div className="px-2 pr-14">
					<h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
						Agregar Registro
					</h4>
					<p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
						Complete los campos requeridos*.
					</p>
				</div>

				{/* <FormdAdd onClose={onClose} onSubmit={onSubmit} /> */}

				<Button size="sm" variant="outline" onClick={() => setIsScanning(true)}>
					Escanear QR
				</Button>

				{isScanning && (
					<div className="mt-2">
						<Scanner
							onScan={handleScan}
							onError={(error) => console.error("Error escaneando QR:", error)}
							constraints={{ facingMode: "environment" }}
							formats={["qr_code"]}
							allowMultiple={false}
						/>

						<Button
							size="sm"
							variant="outline"
							onClick={() => setIsScanning(false)}
						>
							Cancelar
						</Button>
					</div>
				)}
			</div>
		</Modal>
	);
}
