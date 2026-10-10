import { SetStateAction, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import PageBreadcrumb from '../../../components/common/PageBreadCrumb';
import PageMeta from '../../../components/common/PageMeta';

import Form from '../../../components/form/Form';
import Label from '../../../components/form/Label';
import Input from '../../../components/form/input/InputField';
import Button from '../../../components/ui/button/Button';
import Alert from '../../../components/ui/alert/Alert';
import { Feedback } from '../../../components/ui/alert/types/AlertFeedback';
import { useModal } from '../../../hooks/useModal';

import { Lineicons } from '@lineiconshq/react-lineicons';
import {
    PlusOutlined,
    RefreshCircle1ClockwiseOutlined,
    XmarkOutlined,
} from '@lineiconshq/free-icons';

import {
    Employee,
    EmployeePageSize,
    EmployeeSortKey,
} from '../../../service/types/Employee';
import { employeeService } from '../../../service/employee.service';

import DataTable from './DataTable';
import ModalDelete from './modals/ModalDelete';

type GetDataOptions = {
    page: number;
    pageSize: EmployeePageSize;
    search: string;
    sortBy: EmployeeSortKey;
    sortDirection: 'asc' | 'desc';
};

const INITIAL_DATA_OPTIONS: GetDataOptions = {
    page: 1,
    pageSize: 10,
    search: '',
    sortBy: 'user_id',
    sortDirection: 'asc',
};

export default function Employeers() {
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        isOpen: isOpenDelete,
        openModal: openModalDelete,
        closeModal: closeModalDelete,
    } = useModal();

    const [searchText, setSearchText] = useState('');
    const [selectData, setSelectData] = useState<Employee | null>(null);
    const [listData, setListData] = useState<Employee[] | []>([]);
    const [page, setPage] = useState(INITIAL_DATA_OPTIONS.page);
    const [pageSize, setPageSize] = useState<EmployeePageSize>(
        INITIAL_DATA_OPTIONS.pageSize,
    );
    const [total, setTotal] = useState(0);
    const [sortConfig, setSortConfig] = useState<{
        key: EmployeeSortKey;
        direction: 'asc' | 'desc';
    }>({
        key: INITIAL_DATA_OPTIONS.sortBy,
        direction: INITIAL_DATA_OPTIONS.sortDirection,
    });
    const navigate = useNavigate();

    const getData = useCallback(async (options: GetDataOptions) => {
        const resp = await employeeService.getAll({
            page: options.page,
            pageSize: options.pageSize,
            search: options.search.trim(),
            sortBy: options.sortBy,
            sortDirection: options.sortDirection,
        });

        if (resp.error) {
            throw resp.error;
        }

        return resp;
    }, []);

    const applyData = useCallback(
        (resp: Awaited<ReturnType<typeof employeeService.getAll>>) => {
            setListData(resp.data ?? []);
            setTotal(resp.pagination?.total ?? 0);
        },
        [],
    );

    const handleLoadError = useCallback((error: unknown) => {
        console.error('Error al obtener profesores:', error);

        setFeedback({
            variant: 'error',
            title: 'No se pudieron cargar los profesores',
            message:
                'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
        });
    }, []);

    const finishLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    const loadData = (options: GetDataOptions) => {
        setFeedback(null);
        setIsLoading(true);
        void getData(options)
            .then(applyData)
            .catch(handleLoadError)
            .finally(finishLoading);
    };

    const currentDataOptions: GetDataOptions = {
        page,
        pageSize,
        search: searchText,
        sortBy: sortConfig.key,
        sortDirection: sortConfig.direction,
    };

    const handleSearchSubmit = () => {
        setPage(1);
        loadData({ ...currentDataOptions, page: 1 });
    };

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage);
        loadData({ ...currentDataOptions, page: nextPage });
    };

    const handlePageSizeChange = (nextPageSize: EmployeePageSize) => {
        setPageSize(nextPageSize);
        setPage(1);
        loadData({
            ...currentDataOptions,
            page: 1,
            pageSize: nextPageSize,
        });
    };

    const handleSortChange = (nextSort: {
        key: EmployeeSortKey;
        direction: 'asc' | 'desc';
    }) => {
        setSortConfig(nextSort);
        setPage(1);
        loadData({
            ...currentDataOptions,
            page: 1,
            sortBy: nextSort.key,
            sortDirection: nextSort.direction,
        });
    };

    const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
        setSearchText(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchText('');
    };

    const handleDeleteItem = () => {
        closeModalDelete();
        loadData(currentDataOptions);
    };

    const handleDelete = (employee: Employee) => {
        setSelectData(employee);
        openModalDelete();
    };

    const handleAdd = () => {
        navigate('/coachs/add');
    };

    const handleEdit = (employee: Employee) => {
        navigate(`/coachs/edit/${employee?.user_id}`);
    };

    const handleDetail = (employee: Employee) => {
        navigate(`/coachs/${employee?.user_id}`);
    };

    useEffect(() => {
        void getData(INITIAL_DATA_OPTIONS)
            .then(applyData)
            .catch(handleLoadError)
            .finally(finishLoading);
    }, [applyData, finishLoading, getData, handleLoadError]);

    return (
        <div>
            <PageMeta
                title="App Gym - Administration Coach"
                description="Panel de administracion para Coaches"
            />
            <PageBreadcrumb pageTitle="Coachs" />
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/3 xl:px-10 xl:py-12">
                <div className="mx-auto w-full text-center mb-8">
                    <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                        Listado de Profesores
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                        Se muestran los profesores registrados hasta la fecha
                        actual.
                    </p>

                    {feedback && (
                        <div className="my-4 text-start">
                            <Alert
                                variant={feedback?.variant}
                                title={feedback?.title}
                                message={feedback?.message}
                            />
                        </div>
                    )}
                </div>

                {/* Search */}
                <Form
                    onSubmit={handleSearchSubmit}
                    className="flex flex-col md:flex-row justify-between md:items-end gap-4 max-sm:px-4 mb-3"
                >
                    <div className="space-y-6 w-full">
                        <Label htmlFor="searchText">Buscar Profesor</Label>
                        <div className="relative">
                            <Input
                                type="text"
                                id="searchText"
                                name="searchText"
                                placeholder="nombre o apellido"
                                value={searchText}
                                onChange={handleSearch}
                                className="pr-11"
                            />
                            {searchText && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    aria-label="Limpiar búsqueda"
                                    title="Limpiar búsqueda"
                                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                >
                                    <Lineicons
                                        icon={XmarkOutlined}
                                        size={20}
                                        color="grey"
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                    <Button type="submit" size="sm" disabled={isLoading}>
                        Buscar
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => loadData(currentDataOptions)}
                        disabled={isLoading}
                        startIcon={
                            <Lineicons
                                icon={RefreshCircle1ClockwiseOutlined}
                                size={20}
                                color="grey"
                            />
                        }
                    >
                        Actualizar
                    </Button>

                    <Button
                        size="sm"
                        onClick={handleAdd}
                        startIcon={
                            <Lineicons
                                icon={PlusOutlined}
                                size={20}
                                color="white"
                            />
                        }
                    >
                        Agregar
                    </Button>
                </Form>

                {/* Data Table */}
                <DataTable
                    listData={listData}
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    isLoading={isLoading}
                    sortConfig={sortConfig}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                    onSortChange={handleSortChange}
                    onView={handleDetail}
                    onEdit={handleEdit}
                    onDelet={handleDelete}
                />
            </div>

            {/* Modal Delete */}
            <ModalDelete
                isOpen={isOpenDelete}
                onClose={closeModalDelete}
                onSubmit={handleDeleteItem}
                defaultData={selectData}
            />
        </div>
    );
}
