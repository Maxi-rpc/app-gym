import { Lineicons } from '@lineiconshq/react-lineicons';
import { Trash3Outlined, Pencil1Outlined } from '@lineiconshq/free-icons';

import Badge from '../../../components/ui/badge/Badge';

import { formatLocalDateTime } from '../../../utils/date';

import {
    Attendance,
    AttendancePageSize,
    AttendanceSortKey,
} from '../../../service/types/Attendance';

type SortConfig = { key: AttendanceSortKey; direction: 'asc' | 'desc' };

type Props = {
    listData: Attendance[] | [];
    page: number;
    pageSize: AttendancePageSize;
    total: number;
    isLoading?: boolean;
    sortConfig: SortConfig;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: AttendancePageSize) => void;
    onSortChange: (sortConfig: SortConfig) => void;
    onEdit?: (attendance: Attendance) => void;
    onDelet?: (attendance: Attendance) => void;
    onView?: (attendance: Attendance) => void;
};

const columns: Array<{ label: string; key: AttendanceSortKey }> = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'name' },
    { label: 'Apellido', key: 'last_name' },
    { label: 'Fecha Ingreso', key: 'check_in_at' },
    { label: 'Estado', key: 'access_granted' },
    { label: 'Registrado Por', key: 'created_by_profile' },
];

export default function DataTable({
    listData,
    page,
    pageSize,
    total,
    isLoading = false,
    sortConfig,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onEdit,
    onDelet,
    onView,
}: Props) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);

    const handleSort = (key: AttendanceSortKey) => {
        onSortChange({
            key,
            direction:
                sortConfig.key === key && sortConfig.direction === 'asc'
                    ? 'desc'
                    : 'asc',
        });
    };

    const SortIcon = ({ column }: { column: AttendanceSortKey }) => {
        if (sortConfig.key !== column)
            return <span className="text-gray-400">↕</span>;
        return (
            <span className="text-blue-500">
                {sortConfig.direction === 'asc' ? '↑' : '↓'}
            </span>
        );
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        {columns.map(({ label, key }) => (
                            <th key={key} className="px-4 py-3 text-left">
                                <button
                                    type="button"
                                    onClick={() => handleSort(key)}
                                    disabled={isLoading}
                                    className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300"
                                >
                                    {label} <SortIcon column={key} />
                                </button>
                            </th>
                        ))}
                        <th className="px-4 py-3 text-left">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                Acciones
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listData.map((item, index) => (
                        <tr
                            key={item.id}
                            className={`border-b border-gray-200 transition-colors dark:border-gray-700 ${index % 2 === 0 ? 'bg-white dark:bg-white/2' : 'bg-gray-50 dark:bg-white/5'} hover:bg-gray-100 dark:hover:bg-white/8`}
                        >
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {formatLocalDateTime(item?.check_in_at)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {item?.user?.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {item?.user?.last_name}
                            </td>
                            <td className="px-4 py-3 text-sm">
                                <Badge
                                    color={
                                        item?.access_granted
                                            ? 'success'
                                            : 'warning'
                                    }
                                >
                                    {item?.access_granted ? 'Si' : 'No'}
                                </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                <Badge
                                    color={
                                        item?.membership?.membership_status
                                            ?.id == 1
                                            ? 'success'
                                            : 'warning'
                                    }
                                >
                                    {item?.membership?.membership_status?.name}
                                </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {item?.created_by_profile?.name}{' '}
                                {item?.created_by_profile?.last_name}
                            </td>
                            <td className="px-4 py-3 text-sm">
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => onEdit?.(item)}
                                        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                    >
                                        <Lineicons
                                            icon={Pencil1Outlined}
                                            size={20}
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onDelet?.(item)}
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-error-500 transition-colors hover:bg-gray-100 hover:text-error-700 dark:border-gray-800 dark:bg-gray-900 dark:text-red-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                    >
                                        <Lineicons
                                            icon={Trash3Outlined}
                                            size={20}
                                        />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <label htmlFor="attendance-page-size">Mostrar</label>
                    <select
                        id="attendance-page-size"
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
                    <span>por pagina</span>
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
