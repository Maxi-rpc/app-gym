import React from "react";

interface Props {}

const productsExample: Product[] = [
	{
		id: 1,
		name: "Agua 500ml",
		image:
			"https://static.cotodigital3.com.ar/sitios/fotos/mini/00623200/00623215.jpgg",

		currentCost: 600,
		currentSalePrice: 900,

		status: "active",

		createdAt: "2026-07-09T10:00:00.000Z",
		updatedAt: "2026-07-10T09:00:00.000Z",
	},
	{
		id: 2,
		name: "Agua 1500ml",
		image:
			"https://static.cotodigital3.com.ar/sitios/fotos/large/00582600/00582627.jpg",

		currentCost: 1000,
		currentSalePrice: 1300,

		status: "active",

		createdAt: "2026-07-09T10:10:00.000Z",
		updatedAt: "2026-07-09T10:10:00.000Z",
	},
	{
		id: 3,
		name: "Chicle Topline",
		image:
			"https://static.cotodigital3.com.ar/sitios/fotos/mini/00243600/00243610.jpg",

		currentCost: 100,
		currentSalePrice: 200,

		status: "active",

		createdAt: "2026-07-09T10:10:00.000Z",
		updatedAt: "2026-07-09T10:10:00.000Z",
	},
];

export default function Create() {
	return <div></div>;
}
