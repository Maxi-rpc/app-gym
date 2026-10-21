import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import PageBreadcrumb from '../../../components/common/PageBreadCrumb';
import PageMeta from '../../../components/common/PageMeta';

import Form from '../../../components/form/Form';
import Label from '../../../components/form/Label';
import InputField from '../../../components/form/input/InputField';
import Button from '../../../components/ui/button/Button';
import DatePicker from '../../../components/form/date-picker';
import Alert from '../../../components/ui/alert/Alert';
import { Feedback } from '../../../components/ui/alert/types/AlertFeedback';
import IconSpinner from '../../../components/ui/button/IconSpinner';

import { TimeIcon } from '../../../icons';

import { formatLocalDateTime } from '../../../utils/date';

import {
    Attendance,
    UpdateAttendanceInput,
} from '../../../service/types/Attendance';
import { attendanceService } from '../../../service/attendance.service';

const attendanceSchema = z
    .object({
        access_granted: z.boolean(),
        access_reason: z.string(),
        check_in_date: z.string(),
        check_in_time: z.string(),
        check_out_date: z.string(),
        check_out_time: z.string(),
    })
    .superRefine((values, context) => {
        if (Boolean(values.check_in_date) !== Boolean(values.check_in_time)) {
            context.addIssue({
                code: 'custom',
                path: [
                    values.check_in_date ? 'check_in_time' : 'check_in_date',
                ],
                message: 'Indicá fecha y hora para modificar el horario.',
            });
        }

        if (Boolean(values.check_out_date) !== Boolean(values.check_out_time)) {
            context.addIssue({
                code: 'custom',
                path: [
                    values.check_out_date ? 'check_out_time' : 'check_out_date',
                ],
                message: 'Indicá fecha y hora para modificar el horario.',
            });
        }
    });

type AttendanceFormValues = z.infer<typeof attendanceSchema>;

type ParamsAsistencia = {
    id?: string;
};

export default function AssistantEdit() {
    const { id } = useParams<ParamsAsistencia>();
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [data, setData] = useState<Attendance | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<AttendanceFormValues>({
        resolver: zodResolver(attendanceSchema),
        defaultValues: {
            access_granted: false,
            access_reason: '',
            check_in_date: '',
            check_in_time: '',
            check_out_date: '',
            check_out_time: '',
        },
    });

    const handleCheckInDateChange = useCallback(
        (_dates: Date[], date: string) => {
            setValue('check_in_date', date, {
                shouldDirty: true,
                shouldValidate: true,
            });
        },
        [setValue],
    );

    const handleCheckOutDateChange = useCallback(
        (_dates: Date[], date: string) => {
            setValue('check_out_date', date, {
                shouldDirty: true,
                shouldValidate: true,
            });
        },
        [setValue],
    );

    const handleClose = () => {
        navigate('/assistants/list');
    };

    const onSubmit = async (values: AttendanceFormValues) => {
        if (!data) {
            setFeedback({
                variant: 'error',
                title: 'No se pueden guardar los cambios',
                message: 'No se encontraron los datos de la asistencia.',
            });
            return;
        }

        setFeedback(null);

        const update: UpdateAttendanceInput = {
            id: data.id,
            check_in_at: data.check_in_at,
            new_check_in_at:
                values.check_in_date && values.check_in_time
                    ? `${values.check_in_date}T${values.check_in_time}`
                    : null,
            check_out_at: data.check_out_at || null,
            new_check_out_at:
                values.check_out_date && values.check_out_time
                    ? `${values.check_out_date}T${values.check_out_time}`
                    : null,
            access_granted: values.access_granted,
            access_reason: values.access_reason,
        };

        try {
            const response = await attendanceService.update(update);
            if (response.error) {
                throw response.error;
            }

            setFeedback({
                variant: 'success',
                title: 'Info',
                message: response.data?.message ?? 'Se actualizaron los datos.',
            });
        } catch (error) {
            console.error('Error al actualizar la asistencia:', error);
            setFeedback({
                variant: 'error',
                title: 'No se pueden guardar los cambios',
                message:
                    'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
            });
        }
    };

    useEffect(() => {
        let isCurrent = true;

        const getData = async () => {
            setData(null);
            reset();

            if (!id) {
                setFeedback({
                    variant: 'error',
                    title: 'No se puede obtener la asistencia',
                    message: 'No se indicó el identificador de la asistencia.',
                });
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setFeedback(null);

            try {
                const response = await attendanceService.getById(id);
                const attendance = (
                    Array.isArray(response) ? response[0] : response
                ) as Attendance | null | undefined;

                if (!attendance?.id) {
                    throw new Error('No se encontró la asistencia.');
                }

                if (!isCurrent) {
                    return;
                }

                setData(attendance);
                reset({
                    access_granted: attendance.access_granted,
                    access_reason: attendance.access_reason ?? '',
                    check_in_date: '',
                    check_in_time: '',
                    check_out_date: '',
                    check_out_time: '',
                });
            } catch (error) {
                console.error('Error al obtener la asistencia:', error);
                if (isCurrent) {
                    setData(null);
                    setFeedback({
                        variant: 'error',
                        title: 'No se puede obtener la asistencia',
                        message:
                            'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
                    });
                }
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
                title="App Gym - Administración Asistencias"
                description="Panel de administración para Asistencias"
            />
            <PageBreadcrumb pageTitle="Asistencias" />
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                    <h2 className="text-xl font-medium text-gray-800 dark:text-white">
                        Editar asistencia {data?.user?.name}{' '}
                        {data?.user?.last_name}
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
                                    <span>
                                        Cargando datos de la asistencia...
                                    </span>
                                </div>
                            ) : data ? (
                                <>
                                    <div className="col-span-2">
                                        <Label htmlFor="attendance_id">
                                            Id
                                        </Label>
                                        <InputField
                                            id="attendance_id"
                                            value={data.id}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label>Acceso actual</Label>
                                        <InputField
                                            value={
                                                data.access_granted
                                                    ? 'Sí'
                                                    : 'No'
                                            }
                                            disabled
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="access_granted">
                                            ¿Puede acceder?
                                        </Label>
                                        <Controller
                                            name="access_granted"
                                            control={control}
                                            render={({ field }) => (
                                                <select
                                                    id="access_granted"
                                                    name={field.name}
                                                    ref={field.ref}
                                                    value={
                                                        field.value
                                                            ? 'true'
                                                            : 'false'
                                                    }
                                                    onBlur={field.onBlur}
                                                    onChange={(event) =>
                                                        field.onChange(
                                                            event.target
                                                                .value ===
                                                                'true',
                                                        )
                                                    }
                                                    className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                                                >
                                                    <option value="true">
                                                        Sí
                                                    </option>
                                                    <option value="false">
                                                        No
                                                    </option>
                                                </select>
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label>Razón actual</Label>
                                        <InputField
                                            value={data.access_reason ?? ''}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="access_reason">
                                            Razón
                                        </Label>
                                        <Controller
                                            name="access_reason"
                                            control={control}
                                            render={({ field }) => (
                                                <InputField
                                                    id="access_reason"
                                                    name={field.name}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    hint={
                                                        errors.access_reason
                                                            ?.message
                                                    }
                                                    error={Boolean(
                                                        errors.access_reason,
                                                    )}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <Label>Check In - Actual</Label>
                                        <InputField
                                            value={formatLocalDateTime(
                                                data.check_in_at,
                                            )}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Controller
                                            name="check_in_date"
                                            control={control}
                                            render={() => (
                                                <DatePicker
                                                    id="check-in-date"
                                                    label="Check In - Fecha"
                                                    placeholder="Seleccionar"
                                                    onChange={
                                                        handleCheckInDateChange
                                                    }
                                                />
                                            )}
                                        />
                                        {errors.check_in_date?.message && (
                                            <p className="mt-1.5 text-xs text-error-500">
                                                {errors.check_in_date.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="check_in_time">
                                            Check In - Hora
                                        </Label>
                                        <div className="relative">
                                            <Controller
                                                name="check_in_time"
                                                control={control}
                                                render={({ field }) => (
                                                    <InputField
                                                        type="time"
                                                        id="check_in_time"
                                                        name={field.name}
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        onBlur={field.onBlur}
                                                        hint={
                                                            errors.check_in_time
                                                                ?.message
                                                        }
                                                        error={Boolean(
                                                            errors.check_in_time,
                                                        )}
                                                    />
                                                )}
                                            />
                                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                                <TimeIcon className="size-6" />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                                            Campos opcionales.
                                        </p>
                                    </div>

                                    <div className="col-span-2">
                                        <Label>Check Out - Actual</Label>
                                        <InputField
                                            value={formatLocalDateTime(
                                                data.check_out_at,
                                            )}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Controller
                                            name="check_out_date"
                                            control={control}
                                            render={() => (
                                                <DatePicker
                                                    id="check-out-date"
                                                    label="Check Out - Fecha"
                                                    placeholder="Seleccionar"
                                                    onChange={
                                                        handleCheckOutDateChange
                                                    }
                                                />
                                            )}
                                        />
                                        {errors.check_out_date?.message && (
                                            <p className="mt-1.5 text-xs text-error-500">
                                                {errors.check_out_date.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <Label htmlFor="check_out_time">
                                            Check Out - Hora
                                        </Label>
                                        <div className="relative">
                                            <Controller
                                                name="check_out_time"
                                                control={control}
                                                render={({ field }) => (
                                                    <InputField
                                                        type="time"
                                                        id="check_out_time"
                                                        name={field.name}
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        onBlur={field.onBlur}
                                                        hint={
                                                            errors
                                                                .check_out_time
                                                                ?.message
                                                        }
                                                        error={Boolean(
                                                            errors.check_out_time,
                                                        )}
                                                    />
                                                )}
                                            />
                                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                                <TimeIcon className="size-6" />
                                            </span>
                                        </div>
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
