import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type Props = {
	series: number[] | undefined;
};

export default function GraphObjetive({ series }: Props) {
	const options: ApexOptions = {
		colors: ["#465FFF"],
		chart: {
			fontFamily: "Outfit, sans-serif",
			type: "radialBar",
			height: 330,
			sparkline: {
				enabled: true,
			},
		},
		plotOptions: {
			radialBar: {
				startAngle: -85,
				endAngle: 85,
				hollow: {
					size: "80%",
				},
				track: {
					background: "#E4E7EC",
					strokeWidth: "100%",
					margin: 5, // margin is in pixels
				},
				dataLabels: {
					name: {
						show: false,
					},
					value: {
						fontSize: "36px",
						fontWeight: "600",
						offsetY: -40,
						color: "#1D2939",
						formatter: function (val) {
							return val + "%";
						},
					},
				},
			},
		},
		fill: {
			type: "solid",
			colors: ["#465FFF"],
		},
		stroke: {
			lineCap: "round",
		},
		labels: ["Progress"],
	};

	if (!series?.length || series == undefined) {
		return <>No data</>;
	}

	return (
		<div className="max-h-82.5" id="chartDarkStyle">
			<Chart options={options} series={series} type="radialBar" height={330} />
		</div>
	);
}
