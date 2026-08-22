import { useState } from "react";

import Form from "../../../../components/form/Form";
import Label from "../../../../components/form/Label";
import InputField from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";

type Props = {
	onSubmit: (barcode: string) => Promise<void>;
	isLoading?: boolean;
};

export default function FormSearch({ onSubmit, isLoading = false }: Props) {
	const [barcode, setBarcode] = useState("");
	const handleSubmit = async () => {
		const value = barcode.trim();
		if (value) await onSubmit(value);
		setBarcode("");
	};

	return (
		<div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
			<Form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-12">
					<div className="w-full col-span-1 sm:col-span-3 md:col-span-12">
						<p className="font-medium text-gray-700 dark:text-gray-400">
							Click sobre el campo de texto y usar el escaner o ingresar
							manualmente el código.
						</p>
					</div>
					<div className="w-full lg:col-span-4">
						<Label htmlFor="barcode">Buscar producto</Label>
						<InputField
							id="barcode"
							placeholder="Código de barras"
							value={barcode}
							name="barcode"
							onChange={(event) => setBarcode(event.target.value)}
						/>
					</div>
					<div className="flex w-full items-end lg:col-span-2">
						<Button type="submit" disabled={isLoading || !barcode.trim()}>
							{isLoading ? "Buscando..." : "Buscar producto"}
						</Button>
					</div>
				</div>
			</Form>
			{/* <form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-12">
					<div className="w-full lg:col-span-4">
						<Label htmlFor="barcode">Buscar producto</Label>
						<InputField
							id="barcode"
							placeholder="Código de barras o SKU"
							value={barcode}
							name="barcode"
							onChange={(event) => setBarcode(event.target.value)}
						/>
					</div>
					<div className="flex w-full items-end lg:col-span-2">
						<Button type="submit" disabled={isLoading || !barcode.trim()}>
							{isLoading ? "Buscando..." : "Buscar producto"}
						</Button>
					</div>
				</div>
			</form> */}
		</div>
	);
}
