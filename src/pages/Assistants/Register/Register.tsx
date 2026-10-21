import { useEffect, useState } from 'react';
import PageBreadcrumb from '../../../components/common/PageBreadCrumb';
import PageMeta from '../../../components/common/PageMeta';

import Form from '../../../components/form/Form';
import Label from '../../../components/form/Label';
import Input from '../../../components/form/input/InputField';
import Button from '../../../components/ui/button/Button';
import Alert from '../../../components/ui/alert/Alert';
import { Feedback } from '../../../components/ui/alert/types/AlertFeedback';
import IconSpinner from '../../../components/ui/button/IconSpinner';

import { Lineicons } from '@lineiconshq/react-lineicons';
import { Search1Outlined, XmarkOutlined } from '@lineiconshq/free-icons';

import { Profile } from '../../../context/types/Profile';
import { clientService } from '../../../service/client.service';

import DataTable from './DataTable';
import FormAdd from './forms/FormAdd';

export default function Register() {
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [searchRequest, setSearchRequest] = useState<{ query: string } | null>(
        null,
    );

    const [selectData, setSelectData] = useState<Profile | null>(null);
    const [listData, setListData] = useState<Profile[] | []>([]);

    useEffect(() => {
        if (!searchRequest) return;

        let isCurrentRequest = true;

        const loadClients = async () => {
            setFeedback(null);
            setIsLoading(true);

            try {
                const resp = await clientService.getByCustomId(
                    searchRequest.query.trim(),
                );
                if (resp.error) throw resp.error;

                if (isCurrentRequest) setListData(resp.data ?? []);
            } catch (error) {
                if (!isCurrentRequest) return;

                console.error('Error No se puede obtener datos', error);
                setFeedback({
                    variant: 'error',
                    title: 'No se puede obtener datos',
                    message:
                        'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
                });
            } finally {
                if (isCurrentRequest) setIsLoading(false);
            }
        };

        void loadClients();

        return () => {
            isCurrentRequest = false;
        };
    }, [searchRequest]);

    const handleEdit = (client: Profile) => {
        setSelectData(client);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        setSelectData(null);
        setSearchRequest({ query: searchText });
    };

    const handleClearSearch = () => {
        setSearchText('');
        setSelectData(null);
        setSearchRequest({ query: '' });
    };

    return (
        <div>
            <PageMeta
                title="App Gym - Administration Asistencias"
                description="Panel de administracion para Asistencias"
            />
            <PageBreadcrumb pageTitle="Asistencias" />
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/3 xl:px-10 xl:py-12">
                <div className="mx-auto w-full text-center mb-8">
                    <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                        Registrar Asistencia Manual
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                        Se busca cliente y se registra asistencia.
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
                    onSubmit={handleSearch}
                    className="flex flex-col md:flex-row justify-between md:items-end gap-4 max-sm:px-4 mb-3"
                >
                    <div className="space-y-6 w-full">
                        <Label htmlFor="inputTwo">
                            Buscar Cliente por Nombre, Apellido, Email, DNI
                        </Label>
                        <div className="relative">
                            <Input
                                type="text"
                                id="searchText"
                                name="searchText"
                                placeholder="Nombre, Apellido, Email, DNI"
                                value={searchText}
                                onChange={handleChange}
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

                    <Button size="sm" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <IconSpinner />
                        ) : (
                            <Lineicons
                                icon={Search1Outlined}
                                size={20}
                                color="white"
                            />
                        )}
                        Buscar
                    </Button>
                </Form>

                {/* Data Table */}
                <DataTable listData={listData} onEdit={handleEdit} />
            </div>

            {selectData && (
                <div className="rounded-2xl border border-gray-200 bg-white my-3 px-5 py-7 dark:border-gray-800 dark:bg-white/3 xl:px-10 xl:py-12">
                    <FormAdd
                        key={selectData.id}
                        data={selectData}
                        onClose={() => setSelectData(null)}
                    />
                </div>
            )}
        </div>
    );
}
