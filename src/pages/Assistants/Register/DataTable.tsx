import { useState } from 'react';

import Badge from '../../../components/ui/badge/Badge';
import Tooltip from '../../../components/ui/tooltip/Tooltip';

import { Lineicons } from '@lineiconshq/react-lineicons';
import { CheckOutlined } from '@lineiconshq/free-icons';

import { Profile } from '../../../context/types/Profile';

import { formatLocalDateTime } from '../../../utils/date';

type SortConfig = {
    key: keyof Profile;
    direction: 'asc' | 'desc';
};

function SortIcon({
    column,
    sortConfig,
}: {
    column: keyof Profile;
    sortConfig: SortConfig;
}) {
    if (sortConfig.key !== column) {
        return <span className="text-gray-400">↕</span>;
    }

    return sortConfig.direction === 'asc' ? (
        <span className="text-blue-500">↑</span>
    ) : (
        <span className="text-blue-500">↓</span>
    );
}

type Props = {
    listData: Profile[] | [];
    onEdit?: (client: Profile) => void;
};

export default function DataTable({ listData, onEdit }: Props) {
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: 'name',
        direction: 'desc',
    });

    const handleCheck = (client: Profile) => {
        onEdit?.(client);
    };

    const sortedData = [...listData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === 'string') {
            return sortConfig.direction === 'asc'
                ? aValue.localeCompare(bValue as string)
                : (bValue as string).localeCompare(aValue);
        }

        if (typeof aValue === 'number') {
            return sortConfig.direction === 'asc'
                ? (aValue as number) - (bValue as number)
                : (bValue as number) - (aValue as number);
        }

        return 0;
    });

    const handleSort = (key: keyof Profile) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <th className="px-4 py-3 text-left">
                            <button
                                onClick={() => handleSort('id')}
                                className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
                            >
                                User ID
                                <SortIcon column="id" sortConfig={sortConfig} />
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                onClick={() => handleSort('name')}
                                className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
                            >
                                Nombre
                                <SortIcon
                                    column="name"
                                    sortConfig={sortConfig}
                                />
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                onClick={() => handleSort('last_name')}
                                className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
                            >
                                Apellido
                                <SortIcon
                                    column="last_name"
                                    sortConfig={sortConfig}
                                />
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                onClick={() => handleSort('created_at')}
                                className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
                            >
                                Fecha Creación
                                <SortIcon
                                    column="created_at"
                                    sortConfig={sortConfig}
                                />
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                onClick={() => handleSort('status')}
                                className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
                            >
                                Estado
                                <SortIcon
                                    column="status"
                                    sortConfig={sortConfig}
                                />
                            </button>
                        </th>
                        <th className="px-4 py-3 text-left">
                            <button
                                onClick={() => handleSort('updated_at')}
                                className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
                            >
                                Actualizado
                                <SortIcon
                                    column="updated_at"
                                    sortConfig={sortConfig}
                                />
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
                    {sortedData.map((client, index) => (
                        <tr
                            key={client.id}
                            className={`border-b border-gray-200 dark:border-gray-700 ${
                                index % 2 === 0
                                    ? 'bg-white dark:bg-white/2'
                                    : 'bg-gray-50 dark:bg-white/5'
                            } hover:bg-gray-100 dark:hover:bg-white/8 transition-colors`}
                        >
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {client.id}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {client?.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {client?.last_name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {formatLocalDateTime(client.created_at)}
                            </td>
                            <td className="px-4 py-3 text-sm">
                                <Badge
                                    color={
                                        client?.status?.id == 1
                                            ? 'success'
                                            : 'warning'
                                    }
                                    size="sm"
                                >
                                    {client?.status?.name}
                                </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {formatLocalDateTime(client.updated_at)}
                            </td>
                            <td className="px-4 py-3 text-sm">
                                <div className="flex gap-2">
                                    <Tooltip message="Check">
                                        <button
                                            onClick={() => handleCheck(client)}
                                            className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                        >
                                            <Lineicons
                                                icon={CheckOutlined}
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
        </div>
    );
}
