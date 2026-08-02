import QRCode from "react-qr-code";

type Props = {
	value?: string | "";
};

export default function QRCard({ value }: Props) {
	return (
		<div className="p-2 mx-auto sm:mx-0 border-gray-20 overflow-hidden rounded-2xl border dark:border-gray-800">
			<QRCode className="size-34" value={value || "no data"} />
		</div>
	);
}
