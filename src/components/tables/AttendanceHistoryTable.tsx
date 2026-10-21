import { formatLocalDateTime } from '../../utils/date';
import { Attendance } from '../../service/types/Attendance';
import {
    AttendancePageSize,
    ClientAttendanceSortKey,
} from '../../service/types/Attendance';
import Badge from '../ui/badge/Badge';

type SortConfig = {
    key: ClientAttendanceSortKey;
    direction: 'asc' | 'desc';
};

interface Props {
    listData: Attendance[];
    page: number;
    pageSize: AttendancePageSize;
    total: number;
    isLoading: boolean;
    sortConfig: SortConfig;
    showCheckOut?: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: AttendancePageSize) => void;
    onSortChange: (sortConfig: SortConfig) => void;
}

export default function AttendanceHistoryTable({
    listData,
    page,
    pageSize,
    total,
    isLoading,
    sortConfig,
    showCheckOut = false,
    onPageChange,
    onPageSizeChange,
    onSortChange,
}: Props) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);

    const handleSort = () => {
        onSortChange({
            key: 'check_in_at',
            direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    const sortIcon =
        sortConfig.direction === 'asc' ? (
            <span className="text-blue-500">↑</span>
        ) : (
            <span className="text-blue-500">↓</span>
        );

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                        <th className="px-4 py-3 text-left">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                ID
                            </span>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300"
                                onClick={handleSort}
                                type="button"
                                disabled={isLoading}
                            >
                                Check In {sortIcon}
                            </button>
                        </th>
                        {showCheckOut && (
                            <th className="px-4 py-3 text-left">
                                <span className="font-semibold text-gray-700 dark:text-gray-300">
                                    Check Out
                                </span>
                            </th>
                        )}
                        <th className="px-4 py-3 text-left">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                Acceso
                            </span>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                Razón
                            </span>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                Registrado Por
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listData.length > 0 ? (
                        listData.map((attendance, index) => (
                            <tr
                                className={`border-b border-gray-200 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-white/8 ${
                                    index % 2 === 0
                                        ? 'bg-white dark:bg-white/2'
                                        : 'bg-gray-50 dark:bg-white/5'
                                }`}
                                key={attendance.id}
                            >
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                    {attendance.id}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                    {formatLocalDateTime(
                                        attendance.check_in_at,
                                    )}
                                </td>
                                {showCheckOut && (
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                        {formatLocalDateTime(
                                            attendance.check_out_at,
                                        )}
                                    </td>
                                )}
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                    <Badge
                                        color={
                                            attendance.access_granted
                                                ? 'success'
                                                : 'warning'
                                        }
                                    >
                                        {attendance.access_granted
                                            ? 'Si'
                                            : 'No'}
                                    </Badge>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                    {attendance.access_reason}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                    {attendance.created_by_profile?.name}{' '}
                                    {attendance.created_by_profile?.last_name}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                                colSpan={showCheckOut ? 6 : 5}
                            >
                                {isLoading
                                    ? 'Cargando asistencias...'
                                    : 'No hay asistencias para mostrar.'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-4 flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <label htmlFor="attendance-history-page-size">
                        Mostrar
                    </label>
                    <select
                        id="attendance-history-page-size"
                        value={pageSize}
                        disabled={isLoading}
                        onChange={(event) =>
                            onPageSizeChange(
                                Number(
                                    event.target.value,
                                ) as AttendancePageSize,
                            )
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 outline-none focus:border-brand-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    >
                        {([5, 10, 15, 20] as AttendancePageSize[]).map(
                            (size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ),
                        )}
                    </select>
                    <span>por página</span>
                </div>
                <div className="flex items-center gap-3 sm:justify-end">
                    <span>
                        Mostrando {from}-{to} de {total}
                    </span>
                    <button
                        type="button"
                        disabled={isLoading || page <= 1}
                        onClick={() => onPageChange(page - 1)}
                        className="rounded-lg border border-gray-300 px-3 py-2 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
                    >
                        Anterior
                    </button>
                    <span>
                        {page} / {totalPages}
                    </span>
                    <button
                        type="button"
                        disabled={
                            isLoading || page >= totalPages || total === 0
                        }
                        onClick={() => onPageChange(page + 1)}
                        className="rounded-lg border border-gray-300 px-3 py-2 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}
