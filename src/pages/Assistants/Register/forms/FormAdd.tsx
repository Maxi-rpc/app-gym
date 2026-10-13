import { useCallback, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Form from '../../../../components/form/Form';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';
import Button from '../../../../components/ui/button/Button';
import DatePicker from '../../../../components/form/date-picker';
import Alert from '../../../../components/ui/alert/Alert';
import { Feedback } from '../../../../components/ui/alert/types/AlertFeedback';
import IconSpinner from '../../../../components/ui/button/IconSpinner';

import { TimeIcon } from '../../../../icons';

import { Profile } from '../../../../context/types/Profile';
import { attendanceService } from '../../../../service/attendance.service';

type Props = {
    data: Profile | null;
    onClose: () => void;
};

const options = [
    { value: 'true', label: 'Si' },
    { value: 'false', label: 'No' },
];

const attendanceFormSchema = z
    .object({
        qr_token: z
            .string()
            .trim()
            .min(1, 'El cliente no tiene un QR asociado.'),
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
                message:
                    'Indicá fecha y hora para Check In, o dejá ambos campos vacíos.',
            });
        }

        if (Boolean(values.check_out_date) !== Boolean(values.check_out_time)) {
            context.addIssue({
                code: 'custom',
                path: [
                    values.check_out_date ? 'check_out_time' : 'check_out_date',
                ],
                message:
                    'Indicá fecha y hora para Check Out, o dejá ambos campos vacíos.',
            });
        }
    });

type AttendanceFormValues = z.infer<typeof attendanceFormSchema>;

function getDefaultValues(data: Profile | null): AttendanceFormValues {
    return {
        qr_token: data?.qr_token ?? '',
        access_granted: true,
        access_reason: '',
        check_in_date: '',
        check_in_time: '',
        check_out_date: '',
        check_out_time: '',
    };
}

export default function FormAdd({ data, onClose }: Props) {
    const [feedback, setFeedback] = useState<Feedback>(null);
    const {
        control,
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<AttendanceFormValues>({
        resolver: zodResolver(attendanceFormSchema),
        defaultValues: getDefaultValues(data),
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

    const onSubmit = async (values: AttendanceFormValues) => {
        try {
            setFeedback(null);

            const formCreate = {
                qr_token: values.qr_token,
                check_in_at: values.check_in_date
                    ? `${values.check_in_date}T${values.check_in_time}`
                    : '',
                check_out_at: values.check_out_date
                    ? `${values.check_out_date}T${values.check_out_time}`
                    : '',
                access_granted: values.access_granted,
                access_reason: values.access_reason,
            };

            const resp = await attendanceService.register(formCreate);
            if (resp.error) throw resp.error;

            setFeedback({
                variant: 'success',
                title: 'Info',
                message: resp.data?.message,
            });
        } catch (error) {
            console.error('Error No se puede obtener datos', error);

            setFeedback({
                variant: 'error',
                title: 'No se puede registrar la asistencia',
                message:
                    'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
            });
        }
    };

    useEffect(() => {
        reset(getDefaultValues(data));
    }, [data, reset]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="px-2 pb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="col-span-2">
                        <Label>QR</Label>
                        <Input
                            type="text"
                            value={data?.qr_token ?? ''}
                            disabled
                        />
                        <input type="hidden" {...register('qr_token')} />
                        {errors.qr_token?.message && (
                            <p className="mt-1.5 text-xs text-error-500">
                                {errors.qr_token.message}
                            </p>
                        )}
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="access_granted">Acceso?</Label>
                        <Controller
                            name="access_granted"
                            control={control}
                            render={({ field }) => (
                                <select
                                    id="access_granted"
                                    name={field.name}
                                    ref={field.ref}
                                    value={String(field.value)}
                                    onBlur={field.onBlur}
                                    onChange={(event) =>
                                        field.onChange(
                                            event.target.value === 'true',
                                        )
                                    }
                                    className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                                >
                                    <option value="">Seleccionar</option>
                                    {options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="access_reason">Razón</Label>
                        <Controller
                            name="access_reason"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="access_reason"
                                    type="text"
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <Controller
                            name="check_in_date"
                            control={control}
                            render={() => (
                                <DatePicker
                                    key={data?.id}
                                    id="date-picker-in"
                                    label="Check In - Fecha"
                                    placeholder="Seleccionar"
                                    onChange={handleCheckInDateChange}
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
                        <Label htmlFor="check-in-time">Check In - Hora</Label>
                        <div className="relative">
                            <Controller
                                name="check_in_time"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="time"
                                        id="check-in-time"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        hint={errors.check_in_time?.message}
                                        error={Boolean(errors.check_in_time)}
                                    />
                                )}
                            />
                            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                <TimeIcon className="size-6" />
                            </span>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                            Campos opcionales.
                        </p>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <Controller
                            name="check_out_date"
                            control={control}
                            render={() => (
                                <DatePicker
                                    key={data?.id}
                                    id="date-picker-out"
                                    label="Check Out - Fecha"
                                    placeholder="Seleccionar"
                                    onChange={handleCheckOutDateChange}
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
                        <Label htmlFor="check-out-time">Check Out - Hora</Label>
                        <div className="relative">
                            <Controller
                                name="check_out_time"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="time"
                                        id="check-out-time"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        hint={errors.check_out_time?.message}
                                        error={Boolean(errors.check_out_time)}
                                    />
                                )}
                            />
                            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                <TimeIcon className="size-6" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
                <Button
                    size="sm"
                    variant="outline"
                    type="button"
                    onClick={onClose}
                >
                    Cerrar
                </Button>
                <Button size="sm" type="submit" disabled={isSubmitting}>
                    {isSubmitting && <IconSpinner />}
                    Guardar
                </Button>
            </div>
            {feedback && (
                <div className="my-4 text-start">
                    <Alert
                        variant={feedback?.variant}
                        title={feedback?.title}
                        message={feedback?.message}
                    />
                </div>
            )}
        </Form>
    );
}
