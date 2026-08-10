const ARG_FORMAT = "es-AR";
const ARG_MONEY = "ARS";

/**
 * Convierte una fecha ISO de la API (UTC u otra zona incluida en el string)
 * a fecha y hora de Argentina.
 */
export function formatLocalMoney(numberValue?: number | null): string {
	if (!numberValue) {
		return "";
	}

	const formatMoney = new Intl.NumberFormat(ARG_FORMAT, {
		style: "currency",
		currency: ARG_MONEY,
	});

	return formatMoney.format(numberValue);
}
