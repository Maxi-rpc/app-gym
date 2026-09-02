export interface Clients {
	total: number;
	new_this_month: number;
	active: number;
	expired: number;
	cancelled: number;
	paused: number;
	pending: number;
}

export interface Payments {
	today: number;
	month: number;
	year: number;
}

export interface Attendance {
	today: number;
	week: number;
	month: number;
	year: number;
}

export interface PaymentsMonth {
	month: string;
	amount: number;
}

export interface AttendanceHour {
	hour: number;
	count: number;
}

export interface AttendanceByDay {
	day: string;
	count: number;
}

export interface AttendanceByMonth {
	month: string;
	count: number;
}

export interface Charts {
	payments_by_month: PaymentsMonth[];
	attendance_by_hour: AttendanceHour[];
	attendance_by_day: AttendanceByDay[];
	attendance_by_month: AttendanceByMonth[];
}

export interface ProductSummary {
	sales_today: number;
	revenue_month: number;
	units_sold_month: number;
	top_product_id: string;
	top_product_name: string;
	top_product_quantity: number;
}

export interface ProductRanking {
	product_id: string;
	product_name: string;
	quantity_sold: number;
	total_revenue: number;
}

export interface ProductSaleEvo {
	month: number;
	product_id: string;
	product_name: string;
	quantity_sold: number;
	total_revenue: number;
}

export interface ProductRevenueMonth {
	month: number;
	total_quantity: number;
	total_revenue: number;
}

/*
{
  "clients": {
    "total": 185,
    "new_this_month": 12,
    "active": 163,
    "expired": 22,
    "cancelled": 22,
    "paused": 22,
    "pending": 22
  },
  "payments": {
    "month": 4850000,
    "year": 39200000,
    "today": 85000
  },
  "attendance": {
    "today": 58,
    "week": 312,
    "month": 1218,
    "year": 1218
  },
  "charts": {
    "payments_by_month": [
      { "month": "Ene", "amount": 3200000 },
      { "month": "Feb", "amount": 3500000 }
    ],
    "attendance_by_hour": [
      { "hour": 7, "count": 12 },
      { "hour": 8, "count": 25 }
    ],
    "attendance_by_day": [
      { "day": "Lun", "count": 180 }
    ],
	"attendance_by_month": [
      { "month": "Ene", "count": 180 }
    ]
  },
  "product": {
      "sales_today": 1,
      "revenue_month": 150,
      "units_sold_month": 1,
      "top_product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
      "top_product_name": "Chicle Top Line",
      "top_product_quantity": 1
  },
  "product_ranking": [
      {
          "product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
          "product_name": "Chicle Top Line",
          "quantity_sold": 1,
          "total_revenue": 150
      }
  ],
  "product_sale_month": [
      {
          "month": 1,
          "product_id": "6e9218da-d38f-45ae-884d-2a955da7f273",
          "product_name": "Agua Mineral 1,5 l Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 1,
          "product_id": "2e79a950-734e-41ab-8c83-7db72acd9118",
          "product_name": "Agua Mineral 500ml Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 1,
          "product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
          "product_name": "Chicle Top Line",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 2,
          "product_id": "6e9218da-d38f-45ae-884d-2a955da7f273",
          "product_name": "Agua Mineral 1,5 l Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 2,
          "product_id": "2e79a950-734e-41ab-8c83-7db72acd9118",
          "product_name": "Agua Mineral 500ml Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 2,
          "product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
          "product_name": "Chicle Top Line",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 3,
          "product_id": "6e9218da-d38f-45ae-884d-2a955da7f273",
          "product_name": "Agua Mineral 1,5 l Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 3,
          "product_id": "2e79a950-734e-41ab-8c83-7db72acd9118",
          "product_name": "Agua Mineral 500ml Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 3,
          "product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
          "product_name": "Chicle Top Line",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 4,
          "product_id": "6e9218da-d38f-45ae-884d-2a955da7f273",
          "product_name": "Agua Mineral 1,5 l Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 4,
          "product_id": "2e79a950-734e-41ab-8c83-7db72acd9118",
          "product_name": "Agua Mineral 500ml Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 4,
          "product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
          "product_name": "Chicle Top Line",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 5,
          "product_id": "6e9218da-d38f-45ae-884d-2a955da7f273",
          "product_name": "Agua Mineral 1,5 l Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 5,
          "product_id": "2e79a950-734e-41ab-8c83-7db72acd9118",
          "product_name": "Agua Mineral 500ml Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 5,
          "product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
          "product_name": "Chicle Top Line",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 6,
          "product_id": "6e9218da-d38f-45ae-884d-2a955da7f273",
          "product_name": "Agua Mineral 1,5 l Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 6,
          "product_id": "2e79a950-734e-41ab-8c83-7db72acd9118",
          "product_name": "Agua Mineral 500ml Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 6,
          "product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
          "product_name": "Chicle Top Line",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 7,
          "product_id": "6e9218da-d38f-45ae-884d-2a955da7f273",
          "product_name": "Agua Mineral 1,5 l Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 7,
          "product_id": "2e79a950-734e-41ab-8c83-7db72acd9118",
          "product_name": "Agua Mineral 500ml Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 7,
          "product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
          "product_name": "Chicle Top Line",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 8,
          "product_id": "6e9218da-d38f-45ae-884d-2a955da7f273",
          "product_name": "Agua Mineral 1,5 l Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 8,
          "product_id": "2e79a950-734e-41ab-8c83-7db72acd9118",
          "product_name": "Agua Mineral 500ml Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 8,
          "product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
          "product_name": "Chicle Top Line",
          "quantity_sold": 1,
          "total_revenue": 150
      },
      {
          "month": 9,
          "product_id": "6e9218da-d38f-45ae-884d-2a955da7f273",
          "product_name": "Agua Mineral 1,5 l Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 9,
          "product_id": "2e79a950-734e-41ab-8c83-7db72acd9118",
          "product_name": "Agua Mineral 500ml Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 9,
          "product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
          "product_name": "Chicle Top Line",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 10,
          "product_id": "6e9218da-d38f-45ae-884d-2a955da7f273",
          "product_name": "Agua Mineral 1,5 l Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 10,
          "product_id": "2e79a950-734e-41ab-8c83-7db72acd9118",
          "product_name": "Agua Mineral 500ml Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 10,
          "product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
          "product_name": "Chicle Top Line",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 11,
          "product_id": "6e9218da-d38f-45ae-884d-2a955da7f273",
          "product_name": "Agua Mineral 1,5 l Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 11,
          "product_id": "2e79a950-734e-41ab-8c83-7db72acd9118",
          "product_name": "Agua Mineral 500ml Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 11,
          "product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
          "product_name": "Chicle Top Line",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 12,
          "product_id": "6e9218da-d38f-45ae-884d-2a955da7f273",
          "product_name": "Agua Mineral 1,5 l Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 12,
          "product_id": "2e79a950-734e-41ab-8c83-7db72acd9118",
          "product_name": "Agua Mineral 500ml Corazon",
          "quantity_sold": 0,
          "total_revenue": 0
      },
      {
          "month": 12,
          "product_id": "7029b0c6-6027-47a4-9a85-07c1f7463d20",
          "product_name": "Chicle Top Line",
          "quantity_sold": 0,
          "total_revenue": 0
      }
  ],
  "product_revenue_month": [
        {
            "month": 1,
            "total_quantity": 0,
            "total_revenue": 0
        },
        {
            "month": 2,
            "total_quantity": 0,
            "total_revenue": 0
        },
        {
            "month": 3,
            "total_quantity": 0,
            "total_revenue": 0
        },
        {
            "month": 4,
            "total_quantity": 0,
            "total_revenue": 0
        },
        {
            "month": 5,
            "total_quantity": 0,
            "total_revenue": 0
        },
        {
            "month": 6,
            "total_quantity": 0,
            "total_revenue": 0
        },
        {
            "month": 7,
            "total_quantity": 0,
            "total_revenue": 0
        },
        {
            "month": 8,
            "total_quantity": 1,
            "total_revenue": 150
        },
        {
            "month": 9,
            "total_quantity": 0,
            "total_revenue": 0
        },
        {
            "month": 10,
            "total_quantity": 0,
            "total_revenue": 0
        },
        {
            "month": 11,
            "total_quantity": 0,
            "total_revenue": 0
        },
        {
            "month": 12,
            "total_quantity": 0,
            "total_revenue": 0
        }
    ]
}
*/
