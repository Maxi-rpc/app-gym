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
    Membership_payment,
    MembershipPaymentPageSize,
    MembershipPaymentSortKey,
} from '../../../service/types/Payments';
import { paymentsService } from '../../../service/payments.service';

import DataTable from './DataTable';
import ModalEdit from './modals/ModalEdit';
import ModalDelete from './modals/ModalDelete';

type GetDataOptions = {
    page: number;
    pageSize: MembershipPaymentPageSize;
    search: string;
    sortBy: MembershipPaymentSortKey;
    sortDirection: 'asc' | 'desc';
    paymentDateFrom: string;
    paymentDateBefore: string;
};

const getCurrentMonth = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
};

const getPaymentDateRange = (month: string) => {
    const [year, monthNumber] = month.split('-').map(Number);
    const nextMonth = new Date(year, monthNumber, 1);

    return {
        paymentDateFrom: `${month}-01`,
        paymentDateBefore: `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}-01`,
    };
};

const INITIAL_DATA_OPTIONS: GetDataOptions = {
    page: 1,
    pageSize: 10,
    search: '',
    sortBy: 'payment_date',
    sortDirection: 'desc',
    ...getPaymentDateRange(getCurrentMonth()),
};

export default function List() {
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        isOpen: isOpenEdit,
        openModal: openModalEdit,
        closeModal: closeModalEdit,
    } = useModal();

    const {
        isOpen: isOpenDelete,
        openModal: openModalDelete,
        closeModal: closeModalDelete,
    } = useModal();

    const [searchText, setSearchText] = useState('');
    const [appliedSearchText, setAppliedSearchText] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth);
    const [selectData, setSelectData] = useState<Membership_payment | null>(
        null,
    );
    const [listData, setListData] = useState<Membership_payment[] | []>([]);
    const [page, setPage] = useState(INITIAL_DATA_OPTIONS.page);
    const [pageSize, setPageSize] = useState<MembershipPaymentPageSize>(
        INITIAL_DATA_OPTIONS.pageSize,
    );
    const [total, setTotal] = useState(0);
    const [sortConfig, setSortConfig] = useState<{
        key: MembershipPaymentSortKey;
        direction: 'asc' | 'desc';
    }>({
        key: INITIAL_DATA_OPTIONS.sortBy,
        direction: INITIAL_DATA_OPTIONS.sortDirection,
    });
    const navigate = useNavigate();

    const getData = useCallback(async (options: GetDataOptions) => {
        const resp = await paymentsService.getAll({
            page: options.page,
            pageSize: options.pageSize,
            search: options.search.trim(),
            sortBy: options.sortBy,
            sortDirection: options.sortDirection,
            paymentDateFrom: options.paymentDateFrom,
            paymentDateBefore: options.paymentDateBefore,
        });

        if (resp.error) {
            throw resp.error;
        }

        return resp;
    }, []);

    const applyData = useCallback(
        (resp: Awaited<ReturnType<typeof paymentsService.getAll>>) => {
            setListData(resp.data ?? []);
            setTotal(resp.pagination?.total ?? 0);
        },
        [],
    );

    const handleLoadError = useCallback((error: unknown) => {
        console.error('Error al obtener pagos:', error);

        setFeedback({
            variant: 'error',
            title: 'No se pudieron cargar los pagos',
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
        search: appliedSearchText,
        sortBy: sortConfig.key,
        sortDirection: sortConfig.direction,
        ...getPaymentDateRange(selectedMonth),
    };

    const handleSearchSubmit = () => {
        setAppliedSearchText(searchText);
        setPage(1);
        loadData({ ...currentDataOptions, page: 1, search: searchText });
    };

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage);
        loadData({ ...currentDataOptions, page: nextPage });
    };

    const handlePageSizeChange = (nextPageSize: MembershipPaymentPageSize) => {
        setPageSize(nextPageSize);
        setPage(1);
        loadData({
            ...currentDataOptions,
            page: 1,
            pageSize: nextPageSize,
        });
    };

    const handleSortChange = (nextSort: {
        key: MembershipPaymentSortKey;
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
        setAppliedSearchText('');
        setPage(1);
        loadData({ ...currentDataOptions, page: 1, search: '' });
    };

    const handleMonthChange = (month: string) => {
        if (!month) return;

        setSelectedMonth(month);
        setPage(1);
        loadData({
            ...currentDataOptions,
            page: 1,
            ...getPaymentDateRange(month),
        });
    };

    const handleDeleteItem = () => {
        closeModalDelete();
        loadData(currentDataOptions);
    };

    const handleDelete = (client: Membership_payment) => {
        setSelectData(client);
        openModalDelete();
    };

    const handleAdd = () => {
        navigate('/payments/register');
    };

    const handleUpdate = () => {
        closeModalEdit();
        loadData(currentDataOptions);
    };

    const handleEdit = (client: Membership_payment) => {
        setSelectData(client);
        openModalEdit();
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
                title="App Gym - Administration Payments"
                description="Panel de administracion para Pagos"
            />
            <PageBreadcrumb pageTitle="Payments" />
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/3 xl:px-10 xl:py-12">
                <div className="mx-auto w-full text-center mb-8">
                    <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                        Historial de pagos
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                        Se muestran los pagos realizados durante el mes
                        seleccionado.
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
                    <div className="space-y-2 w-full">
                        <Label htmlFor="searchText">Buscar cliente</Label>
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
                    <div className="space-y-2 w-full">
                        <Label htmlFor="paymentMonth">Mes del pago</Label>
                        <Input
                            type="month"
                            id="paymentMonth"
                            name="paymentMonth"
                            value={selectedMonth}
                            onChange={(event) =>
                                handleMonthChange(event.target.value)
                            }
                            disabled={isLoading}
                        />
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
                    onEdit={handleEdit}
                    onDelet={handleDelete}
                />
            </div>

            {/* Modal Edit */}
            <ModalEdit
                isOpen={isOpenEdit}
                onClose={closeModalEdit}
                onSubmit={handleUpdate}
                defaultData={selectData}
            />

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
