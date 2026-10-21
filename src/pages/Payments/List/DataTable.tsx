import Badge from '../../../components/ui/badge/Badge';
import Tooltip from '../../../components/ui/tooltip/Tooltip';

import { Lineicons } from '@lineiconshq/react-lineicons';
import { Trash3Outlined, Pencil1Outlined } from '@lineiconshq/free-icons';

import {
    Membership_payment,
    MembershipPaymentPageSize,
    MembershipPaymentSortKey,
} from '../../../service/types/Payments';

import { formatLocalDateTime } from '../../../utils/date';

type SortConfig = {
    key: MembershipPaymentSortKey;
    direction: 'asc' | 'desc';
};

type Props = {
    listData: Membership_payment[] | [];
    page: number;
    pageSize: MembershipPaymentPageSize;
    total: number;
    isLoading?: boolean;
    sortConfig: SortConfig;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: MembershipPaymentPageSize) => void;
    onSortChange: (sortConfig: SortConfig) => void;
    onEdit?: (client: Membership_payment) => void;
    onDelet?: (client: Membership_payment) => void;
};

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
}: Props) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);

    const handleEdit = (client: Membership_payment) => {
        onEdit?.(client);
    };

    const handleDelete = (client: Membership_payment) => {
        onDelet?.(client);
    };

    const handleSort = (key: MembershipPaymentSortKey) => {
        onSortChange({
            key,
            direction:
                sortConfig.key === key && sortConfig.direction === 'asc'
                    ? 'desc'
                    : 'asc',
        });
    };

    const renderSortIcon = (column: MembershipPaymentSortKey) => {
        if (sortConfig.key !== column) {
            return <span className="text-gray-400">↕</span>;
        }
        return sortConfig.direction === 'asc' ? (
            <span className="text-blue-500">↑</span>
        ) : (
            <span className="text-blue-500">↓</span>
        );
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <th className="px-4 py-3 text-left">
                            <button
                                type="button"
                                onClick={() => handleSort('payment_date')}
                                disabled={isLoading}
                                className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 disabled:opacity-50 dark:text-gray-300"
                            >
                                Fecha de pago {renderSortIcon('payment_date')}
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                type="button"
                                onClick={() => handleSort('name')}
                                disabled={isLoading}
                                className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 disabled:opacity-50 dark:text-gray-300"
                            >
                                Nombre {renderSortIcon('name')}
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                type="button"
                                onClick={() => handleSort('last_name')}
                                disabled={isLoading}
                                className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 disabled:opacity-50 dark:text-gray-300"
                            >
                                Apellido {renderSortIcon('last_name')}
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                type="button"
                                onClick={() => handleSort('status')}
                                disabled={isLoading}
                                className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 disabled:opacity-50 dark:text-gray-300"
                            >
                                Estado {renderSortIcon('status')}
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                Próximo Pago
                            </span>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                Registrado Por
                            </span>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                type="button"
                                onClick={() => handleSort('updated_at')}
                                disabled={isLoading}
                                className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-brand-500 disabled:opacity-50 dark:text-gray-300"
                            >
                                Actualizado {renderSortIcon('updated_at')}
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                Acciones
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listData.map((client, index) => (
                        <tr
                            key={client.id}
                            className={`border-b border-gray-200 dark:border-gray-700 ${
                                index % 2 === 0
                                    ? 'bg-white dark:bg-white/2'
                                    : 'bg-gray-50 dark:bg-white/5'
                            } hover:bg-gray-100 dark:hover:bg-white/8 transition-colors`}
                        >
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {formatLocalDateTime(client.payment_date)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {client?.membership?.client?.profile?.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {client?.membership?.client?.profile?.last_name}
                            </td>
                            <td className="px-4 py-3 text-sm">
                                <Badge
                                    color={
                                        client?.payment_status?.id == 1
                                            ? 'success'
                                            : 'warning'
                                    }
                                    size="sm"
                                >
                                    {client?.payment_status?.name}
                                </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {client?.next_due_date}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {client?.employee?.profile?.name}{' '}
                                {client?.employee?.profile?.last_name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {formatLocalDateTime(client.updated_at)}
                            </td>
                            <td className="px-4 py-3 text-sm">
                                <div className="flex gap-2">
                                    <Tooltip message="Editar">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(client)}
                                            disabled={isLoading}
                                            className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                        >
                                            <Lineicons
                                                icon={Pencil1Outlined}
                                                size={20}
                                            />
                                        </button>
                                    </Tooltip>

                                    <Tooltip message="Eliminar">
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(client)}
                                            disabled={isLoading}
                                            className="flex items-center justify-center text-error-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-error-700 dark:border-gray-800 dark:bg-gray-900 dark:text-red-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                        >
                                            <Lineicons
                                                icon={Trash3Outlined}
                                                size={20}
                                            />
                                        </button>
                                    </Tooltip>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <label htmlFor="payments-page-size">Mostrar</label>
                    <select
                        id="payments-page-size"
                        value={pageSize}
                        disabled={isLoading}
                        onChange={(event) =>
                            onPageSizeChange(
                                Number(
                                    event.target.value,
                                ) as MembershipPaymentPageSize,
                            )
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 outline-none focus:border-brand-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    >
                        {([5, 10, 15, 20] as MembershipPaymentPageSize[]).map(
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
