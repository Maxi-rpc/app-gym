const ARGENTINA_TIME_ZONE = "America/Argentina/Buenos_Aires";

/**
 * Convierte una fecha ISO de la API (UTC u otra zona incluida en el string)
 * a fecha y hora de Argentina.
 */
export function formatLocalDateTime(dateValue?: string | null): string {
	if (!dateValue) {
		return "-";
	}

	const date = new Date(dateValue);

	if (Number.isNaN(date.getTime())) {
		return "-";
	}

	return new Intl.DateTimeFormat("es-AR", {
		timeZone: ARGENTINA_TIME_ZONE,
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hourCycle: "h23",
	}).format(date);
}
