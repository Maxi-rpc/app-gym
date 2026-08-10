import { useEffect, useState } from "react";

type Props = {
	target: number | string;
	duration?: number;
};

function parseCurrency(value: string): number {
	return parseFloat(
		value
			.replace(/[^0-9,.-]/g, "")
			.replace(/\./g, "")
			.replace(/,/g, "."),
	);
}

export default function useAnimateCount({ target, duration = 1000 }: Props) {
	const [count, setCount] = useState<number | string>(
		typeof target === "number" ? 0 : "",
	);

	useEffect(() => {
		const numericTarget =
			typeof target === "number" ? target : parseCurrency(target);

		if (Number.isNaN(numericTarget)) {
			setCount(typeof target === "number" ? 0 : "");
			return;
		}

		const useCurrency = typeof target !== "number";
		const formatter = new Intl.NumberFormat("es-AR", {
			style: "currency",
			currency: "ARS",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});

		let current = 0;
		const steps = Math.max(1, Math.round(duration / 16));
		const increment = numericTarget / steps;

		const interval = window.setInterval(() => {
			current += increment;

			if (current >= numericTarget) {
				setCount(useCurrency ? formatter.format(numericTarget) : numericTarget);
				clearInterval(interval);
			} else {
				const value = Math.floor(current);
				setCount(useCurrency ? formatter.format(value) : value);
			}
		}, 16);

		return () => clearInterval(interval);
	}, [target, duration]);

	return count;
}
