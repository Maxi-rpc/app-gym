import { useEffect, useState } from "react";

type Props = {
	target: number;
	duration?: number; // en ms
};

export default function AnimateCount({ target, duration = 1000 }: Props) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		let start = 0;
		const increment = target / (duration / 16); // ~60fps

		const interval = setInterval(() => {
			start += increment;

			if (start >= target) {
				setCount(target);
				clearInterval(interval);
			} else {
				setCount(Math.floor(start));
			}
		}, 16);

		return () => clearInterval(interval);
	}, [target, duration]);

	return count;
}
