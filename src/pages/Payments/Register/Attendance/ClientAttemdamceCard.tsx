import { useAttendancesByUser } from '../../../../hooks/useAttendancesByUser';

import Form from '../../../../components/form/Form';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';
import Button from '../../../../components/ui/button/Button';
import Badge from '../../../../components/ui/badge/Badge';
import Alert from '../../../../components/ui/alert/Alert';

import { formatLocalDateTime } from '../../../../utils/date';

import AttendanceTable from '../../../../components/tables/AttendanceHistoryTable';

interface Props {
    id: string;
}

export default function ClientAttemdamceCard({ id }: Props) {
    const {
        feedback,
        attendance,
        listAttendances,
        searchText,
        isLoading,
        page,
        pageSize,
        total,
        sortConfig,
        handleSearch,
        handleSearchSubmit,
        handlePageChange,
        handlePageSizeChange,
        handleSortChange,
    } = useAttendancesByUser(id);

    return (
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6 mb-3">
                            Datos de Último Acceso
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            {feedback && (
                                <div className="col-span-2">
                                    <Alert
                                        variant={feedback?.variant}
                                        title={feedback?.title}
                                        message={feedback?.message}
                                    />
                                </div>
                            )}

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Fecha de Ingreso
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {formatLocalDateTime(
                                        attendance?.check_in_at,
                                    )}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Fecha de Salida
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {formatLocalDateTime(
                                        attendance?.check_out_at,
                                    )}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Acceso
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    <Badge
                                        color={
                                            attendance?.access_granted
                                                ? 'success'
                                                : 'warning'
                                        }
                                    >
                                        {attendance?.access_granted
                                            ? 'Si'
                                            : 'No'}
                                    </Badge>
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Razón
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {attendance?.access_reason}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Registrado por
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {attendance?.created_by_profile?.name}{' '}
                                    {attendance?.created_by_profile?.last_name}
                                </p>
                            </div>

                            <div className="col-span-2"></div>
                        </div>

                        <Form
                            onSubmit={handleSearchSubmit}
                            className="my-2 mb-3 flex items-end justify-between gap-4 max-sm:px-4"
                        >
                            <div className="flex-1 space-y-6">
                                <Label htmlFor="inputTwo">
                                    Buscar Asistencia
                                </Label>
                                <Input
                                    type="text"
                                    id="inputTwo"
                                    placeholder="Ingresar fecha, estado"
                                    value={searchText}
                                    onChange={handleSearch}
                                />
                            </div>
                            <Button
                                type="submit"
                                size="sm"
                                disabled={isLoading}
                            >
                                Buscar
                            </Button>
                        </Form>
                        <div>
                            <AttendanceTable
                                listData={listAttendances}
                                page={page}
                                pageSize={pageSize}
                                total={total}
                                isLoading={isLoading}
                                sortConfig={sortConfig}
                                showCheckOut
                                onPageChange={handlePageChange}
                                onPageSizeChange={handlePageSizeChange}
                                onSortChange={handleSortChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
