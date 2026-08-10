export interface Clients {
	total: number;
	new_this_month: number;
	active: number;
	expired: number;
	cancelled: number;
	paused: number;
	pending: number;
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
  }
}
*/
