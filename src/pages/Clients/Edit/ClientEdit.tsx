import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import PageBreadcrumb from '../../../components/common/PageBreadCrumb';
import PageMeta from '../../../components/common/PageMeta';

import Form from '../../../components/form/Form';
import Label from '../../../components/form/Label';
import InputField from '../../../components/form/input/InputField';
import TextArea from '../../../components/form/input/TextArea';
import Button from '../../../components/ui/button/Button';
import Alert from '../../../components/ui/alert/Alert';
import { Feedback } from '../../../components/ui/alert/types/AlertFeedback';
import IconSpinner from '../../../components/ui/button/IconSpinner';

import { Client } from '../../../service/types/Client';
import { UserStatus } from '../../../service/types/UserStatus';
import { clientService } from '../../../service/client.service';
import { profileService } from '../../../service/profile.service';
import { userStatusService } from '../../../service/userstatus.service';

const clientSchema = z.object({
    email: z
        .string()
        .refine(
            (value) =>
                value.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            'Email inválido',
        ),
    name: z
        .string()
        .refine(
            (value) => value.trim().length > 0,
            'Este campo es obligatorio',
        ),
    last_name: z
        .string()
        .refine(
            (value) => value.trim().length > 0,
            'Este campo es obligatorio',
        ),
    document: z
        .string()
        .refine(
            (value) => value.trim().length > 0,
            'Este campo es obligatorio',
        ),
    phone: z.string(),
    birth_date: z.string(),
    status_id: z.number().nullable(),
    height: z.number().nullable(),
    weight: z.number().nullable(),
    emergency_contact: z.string(),
    medical_notes: z.string(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

type ParamsUsuario = {
    id?: string;
};

export default function ClientEdit() {
    const { id } = useParams<ParamsUsuario>();
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [data, setData] = useState<Client | null>(null);
    const [listStatus, setListStatus] = useState<UserStatus[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ClientFormValues>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            email: '',
            name: '',
            last_name: '',
            document: '',
            phone: '',
            birth_date: '',
            status_id: null,
            height: null,
            weight: null,
            emergency_contact: '',
            medical_notes: '',
        },
    });

    const handleClose = () => {
        navigate('/clients');
    };

    const onSubmit = async (values: ClientFormValues) => {
        if (!data) {
            setFeedback({
                variant: 'error',
                title: 'No se pueden guardar los cambios',
                message: 'No se encontraron los datos del cliente.',
            });
            return;
        }

        setFeedback(null);

        try {
            const [clientResult, profileResult] = await Promise.allSettled([
                clientService.update({
                    user_id: data.user_id,
                    height: values.height,
                    weight: values.weight,
                    emergency_contact: values.emergency_contact,
                    medical_notes: values.medical_notes,
                }),
                profileService.update({
                    id: data.profile.id,
                    email: values.email.trim(),
                    name: values.name.trim(),
                    last_name: values.last_name.trim(),
                    document: values.document.trim(),
                    phone: values.phone,
                    birth_date: values.birth_date,
                    status_id: values.status_id ?? undefined,
                }),
            ]);

            const clientSaved =
                clientResult.status === 'fulfilled' &&
                !clientResult.value.error &&
                clientResult.value.data?.success === true;
            const profileSaved =
                profileResult.status === 'fulfilled' &&
                !profileResult.value.error &&
                profileResult.value.data?.success === true;

            if (clientResult.status === 'rejected') {
                console.error(
                    'Error al guardar datos del cliente:',
                    clientResult.reason,
                );
            } else if (clientResult.value.error) {
                console.error(
                    'Error al guardar datos del cliente:',
                    clientResult.value.error,
                );
            }

            if (profileResult.status === 'rejected') {
                console.error(
                    'Error al guardar datos del perfil:',
                    profileResult.reason,
                );
            } else if (profileResult.value.error) {
                console.error(
                    'Error al guardar datos del perfil:',
                    profileResult.value.error,
                );
            }

            if (!clientSaved || !profileSaved) {
                const partiallySaved = clientSaved !== profileSaved;
                setFeedback({
                    variant: 'error',
                    title: partiallySaved
                        ? 'Actualización parcial'
                        : 'No se pudieron actualizar los datos',
                    message: partiallySaved
                        ? 'Algunos datos se guardaron, pero otros no. Verificá la información e intentá nuevamente.'
                        : 'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
                });
                return;
            }

            setFeedback({
                variant: 'info',
                title: 'Info',
                message: 'Se actualizaron datos.',
            });
        } catch (error) {
            console.error('Error al guardar datos:', error);
            setFeedback({
                variant: 'error',
                title: 'No se puede guardar datos',
                message:
                    'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
            });
        }
    };

    useEffect(() => {
        let isCurrent = true;

        const getData = async () => {
            if (!id) {
                setData(null);
                setFeedback({
                    variant: 'error',
                    title: 'No se puede obtener datos',
                    message: 'No se indicó el identificador del cliente.',
                });
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setFeedback(null);

            try {
                const [clientResult, statusesResult] = await Promise.allSettled(
                    [clientService.getById(id), userStatusService.getAll()],
                );

                if (!isCurrent) {
                    return;
                }

                if (clientResult.status === 'rejected') {
                    throw clientResult.reason;
                }

                const client = clientResult.value as Client | null;
                if (!client?.profile) {
                    throw new Error('No se encontró el cliente o su perfil.');
                }

                setData(client);
                reset({
                    email: client.profile.email ?? '',
                    name: client.profile.name ?? '',
                    last_name: client.profile.last_name ?? '',
                    document: client.profile.document ?? '',
                    phone: client.profile.phone ?? '',
                    birth_date: client.profile.birth_date?.slice(0, 10) ?? '',
                    status_id: client.profile.status_id ?? null,
                    height: client.height,
                    weight: client.weight,
                    emergency_contact: client.emergency_contact ?? '',
                    medical_notes: client.medical_notes ?? '',
                });

                if (
                    statusesResult.status === 'fulfilled' &&
                    !statusesResult.value.error
                ) {
                    setListStatus(statusesResult.value.data ?? []);
                } else {
                    const error =
                        statusesResult.status === 'rejected'
                            ? statusesResult.reason
                            : statusesResult.value.error;
                    console.error(
                        'Error al obtener estados de usuario:',
                        error,
                    );
                    setFeedback({
                        variant: 'warning',
                        title: 'No se pudieron cargar los estados',
                        message:
                            'Podés editar los demás datos, pero no cambiar el estado hasta que se restablezca la conexión.',
                    });
                }
            } catch (error) {
                console.error('Error al obtener datos del cliente:', error);
                setData(null);
                setFeedback({
                    variant: 'error',
                    title: 'No se puede obtener datos',
                    message:
                        'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
                });
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        };

        void getData();

        return () => {
            isCurrent = false;
        };
    }, [id, reset]);

    return (
        <div>
            <PageMeta
                title="App Gym - Administration Client"
                description="Panel de administracion para clientes"
            />
            <PageBreadcrumb pageTitle="Clients" />
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                    <h2 className="text-xl font-medium text-gray-800 dark:text-white">
                        Editar
                    </h2>
                </div>
                <div className="border-gray-200 p-4 sm:p-8 dark:border-gray-800">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {feedback && (
                                <div className="col-span-2">
                                    <Alert
                                        variant={feedback.variant}
                                        title={feedback.title}
                                        message={feedback.message}
                                    />
                                </div>
                            )}

                            {isLoading ? (
                                <div className="col-span-2 flex items-center gap-2 text-gray-800 dark:text-white/90">
                                    <IconSpinner />
                                    <span>Cargando datos del cliente...</span>
                                </div>
                            ) : data ? (
                                <>
                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="email">Email</Label>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <InputField
                                                    type="text"
                                                    value={field.value}
                                                    name={field.name}
                                                    id="email"
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    hint={errors.email?.message}
                                                    error={Boolean(
                                                        errors.email,
                                                    )}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="name">Nombre*</Label>
                                        <Controller
                                            name="name"
                                            control={control}
                                            render={({ field }) => (
                                                <InputField
                                                    type="text"
                                                    value={field.value}
                                                    name={field.name}
                                                    id="name"
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    hint={errors.name?.message}
                                                    error={Boolean(errors.name)}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="last_name">
                                            Apellido*
                                        </Label>
                                        <Controller
                                            name="last_name"
                                            control={control}
                                            render={({ field }) => (
                                                <InputField
                                                    type="text"
                                                    value={field.value}
                                                    name={field.name}
                                                    id="last_name"
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    hint={
                                                        errors.last_name
                                                            ?.message
                                                    }
                                                    error={Boolean(
                                                        errors.last_name,
                                                    )}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="document">
                                            Documento*
                                        </Label>
                                        <Controller
                                            name="document"
                                            control={control}
                                            render={({ field }) => (
                                                <InputField
                                                    type="text"
                                                    value={field.value}
                                                    name={field.name}
                                                    id="document"
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    hint={
                                                        errors.document?.message
                                                    }
                                                    error={Boolean(
                                                        errors.document,
                                                    )}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="phone">Teléfono</Label>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            render={({ field }) => (
                                                <InputField
                                                    type="text"
                                                    value={field.value}
                                                    name={field.name}
                                                    id="phone"
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="birth_date">
                                            Fecha de Nacimiento
                                        </Label>
                                        <Controller
                                            name="birth_date"
                                            control={control}
                                            render={({ field }) => (
                                                <InputField
                                                    type="date"
                                                    value={field.value}
                                                    name={field.name}
                                                    id="birth_date"
                                                    placeholder="YYYY-MM-DD"
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="status_id">
                                            Estado
                                        </Label>
                                        <Controller
                                            name="status_id"
                                            control={control}
                                            render={({ field }) => (
                                                <select
                                                    id="status_id"
                                                    name={field.name}
                                                    ref={field.ref}
                                                    value={field.value ?? ''}
                                                    onBlur={field.onBlur}
                                                    onChange={(event) =>
                                                        field.onChange(
                                                            event.target.value
                                                                ? Number(
                                                                      event
                                                                          .target
                                                                          .value,
                                                                  )
                                                                : null,
                                                        )
                                                    }
                                                    disabled={
                                                        listStatus.length === 0
                                                    }
                                                    className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                                                >
                                                    <option value="" disabled>
                                                        Seleccionar Opción
                                                    </option>
                                                    {field.value !== null &&
                                                        field.value !==
                                                            undefined &&
                                                        !listStatus.some(
                                                            (status) =>
                                                                status.id ===
                                                                field.value,
                                                        ) && (
                                                            <option
                                                                value={String(
                                                                    field.value,
                                                                )}
                                                            >
                                                                {data.profile
                                                                    .status
                                                                    ?.name ??
                                                                    'Estado actual'}
                                                            </option>
                                                        )}
                                                    {listStatus.map(
                                                        (status) => (
                                                            <option
                                                                key={status.id}
                                                                value={
                                                                    status.id
                                                                }
                                                            >
                                                                {status.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                                            Campos opcionales.
                                        </p>
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="height">
                                            Altura (cm)
                                        </Label>
                                        <Controller
                                            name="height"
                                            control={control}
                                            render={({ field }) => (
                                                <InputField
                                                    type="number"
                                                    value={field.value ?? ''}
                                                    name={field.name}
                                                    id="height"
                                                    onChange={(event) =>
                                                        field.onChange(
                                                            event.target
                                                                .value === ''
                                                                ? null
                                                                : event.target
                                                                      .valueAsNumber,
                                                        )
                                                    }
                                                    onBlur={field.onBlur}
                                                    hint={
                                                        errors.height?.message
                                                    }
                                                    error={Boolean(
                                                        errors.height,
                                                    )}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="weight">
                                            Peso (kg)
                                        </Label>
                                        <Controller
                                            name="weight"
                                            control={control}
                                            render={({ field }) => (
                                                <InputField
                                                    type="number"
                                                    value={field.value ?? ''}
                                                    name={field.name}
                                                    id="weight"
                                                    onChange={(event) =>
                                                        field.onChange(
                                                            event.target
                                                                .value === ''
                                                                ? null
                                                                : event.target
                                                                      .valueAsNumber,
                                                        )
                                                    }
                                                    onBlur={field.onBlur}
                                                    hint={
                                                        errors.weight?.message
                                                    }
                                                    error={Boolean(
                                                        errors.weight,
                                                    )}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="emergency_contact">
                                            Contacto de Emergencia
                                        </Label>
                                        <Controller
                                            name="emergency_contact"
                                            control={control}
                                            render={({ field }) => (
                                                <InputField
                                                    type="text"
                                                    value={field.value}
                                                    name={field.name}
                                                    id="emergency_contact"
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <Label htmlFor="medical_notes">
                                            Notas Médicas
                                        </Label>
                                        <Controller
                                            name="medical_notes"
                                            control={control}
                                            render={({ field }) => (
                                                <TextArea
                                                    name={field.name}
                                                    id="medical_notes"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    rows={3}
                                                    error={Boolean(
                                                        errors.medical_notes,
                                                    )}
                                                    hint={
                                                        errors.medical_notes
                                                            ?.message
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                </>
                            ) : null}

                            <div className="col-span-2">
                                <div className="mt-6 flex items-center justify-end gap-3 px-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Cerrar
                                    </Button>
                                    <Button
                                        size="sm"
                                        type="submit"
                                        disabled={
                                            isSubmitting || isLoading || !data
                                        }
                                    >
                                        {isSubmitting && <IconSpinner />}
                                        Guardar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
