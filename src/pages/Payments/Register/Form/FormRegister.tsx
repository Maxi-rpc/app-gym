import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Form from '../../../../components/form/Form';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';
import Select from '../../../../components/form/Select';
import Button from '../../../../components/ui/button/Button';
import Alert from '../../../../components/ui/alert/Alert';
import { Feedback } from '../../../../components/ui/alert/types/AlertFeedback';
import IconSpinner from '../../../../components/ui/button/IconSpinner';

import { Profile } from '../../../../context/types/Profile';
import { paymentsService } from '../../../../service/payments.service';
import { paymentMethodsService } from '../../../../service/paymentMethods.service';
import { paymentStatusService } from '../../../../service/paymentStatus.service';
import { serviceService } from '../../../../service/service.service';
import { PaymentMethods } from '../../../../service/types/PaymentMethods';
import { PaymentStatus } from '../../../../service/types/PaymentsStatus';
import { Service } from '../../../../service/types/Service';

interface Props {
    data: Profile | null;
}

const paymentSchema = z.object({
    client_id: z.string().min(1, 'No se seleccionó un cliente'),
    service_id: z.number().int().positive('Seleccioná un servicio'),
    start_date: z.string(),
    end_date: z.string(),
    observations: z.string(),
    original_amount: z
        .string()
        .trim()
        .min(1, 'Este campo es obligatorio')
        .refine(
            (value) => /^\d+(\.\d+)?$/.test(value),
            'Ingresá un monto válido',
        )
        .transform(Number)
        .refine(Number.isFinite, 'Ingresá un monto válido')
        .refine((value) => value >= 0, 'El monto no puede ser negativo'),
    discount: z
        .string()
        .trim()
        .refine(
            (value) => value === '' || /^\d+(\.\d+)?$/.test(value),
            'Ingresá un monto válido',
        )
        .transform((value) => (value === '' ? 0 : Number(value)))
        .refine(Number.isFinite, 'Ingresá un monto válido')
        .refine((value) => value >= 0, 'El monto no puede ser negativo'),
    amount_paid: z
        .string()
        .trim()
        .min(1, 'Este campo es obligatorio')
        .refine(
            (value) => /^\d+(\.\d+)?$/.test(value),
            'Ingresá un monto válido',
        )
        .transform(Number)
        .refine(Number.isFinite, 'Ingresá un monto válido')
        .refine((value) => value >= 0, 'El monto no puede ser negativo'),
    payment_method_id: z
        .number()
        .int()
        .positive('Seleccioná un método de pago'),
    billing_period: z.string().min(1, 'Este campo es obligatorio'),
    status_id: z.number().int().positive('Seleccioná un estado'),
    receipt_number: z.string(),
});

type PaymentFormValues = z.input<typeof paymentSchema>;
type PaymentSubmitValues = z.output<typeof paymentSchema>;

const defaultValues: PaymentFormValues = {
    client_id: '',
    service_id: 0,
    start_date: '',
    end_date: '',
    observations: '',
    original_amount: '',
    discount: '0',
    amount_paid: '',
    payment_method_id: 0,
    billing_period: '',
    status_id: 0,
    receipt_number: '',
};

interface SelectOption {
    value: string;
    label: string;
}

export default function FormRegister({ data }: Props) {
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [paymentMethods, setPaymentMethods] = useState<SelectOption[]>([]);
    const [paymentStatuses, setPaymentStatuses] = useState<SelectOption[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState(true);
    const [hasOptionsError, setHasOptionsError] = useState(false);
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<PaymentFormValues, unknown, PaymentSubmitValues>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            ...defaultValues,
            client_id: data?.id ?? '',
        },
    });

    useEffect(() => {
        reset({
            ...defaultValues,
            client_id: data?.id ?? '',
        });
    }, [data?.id, reset]);

    useEffect(() => {
        let isMounted = true;

        const loadPaymentOptions = async () => {
            try {
                const [methodsResponse, statusesResponse, servicesResponse] =
                    await Promise.all([
                        paymentMethodsService.getAll(),
                        paymentStatusService.getAll(),
                        serviceService.getAll(),
                    ]);

                if (methodsResponse.error) {
                    throw methodsResponse.error;
                }
                if (statusesResponse.error) {
                    throw statusesResponse.error;
                }
                if (servicesResponse.error) {
                    throw servicesResponse.error;
                }

                const methods = (methodsResponse.data ?? []).map(
                    (method: PaymentMethods) => ({
                        value: String(method.id),
                        label: method.name,
                    }),
                );
                const statuses = (statusesResponse.data ?? []).map(
                    (status: PaymentStatus) => ({
                        value: String(status.id),
                        label: status.name,
                    }),
                );
                const activeServices: Service[] = (
                    servicesResponse.data ?? []
                ).filter((service: Service) => service.active);

                if (isMounted) {
                    setPaymentMethods(methods);
                    setPaymentStatuses(statuses);
                    setServices(activeServices);

                    if (
                        methods.length === 0 ||
                        statuses.length === 0 ||
                        activeServices.length === 0
                    ) {
                        setHasOptionsError(true);
                        setFeedback({
                            variant: 'error',
                            title: 'Faltan opciones para registrar el pago',
                            message:
                                'Verificá que haya al menos un servicio activo, un método y un estado de pago configurados.',
                        });
                    }
                }
            } catch (error) {
                console.error('Error al cargar opciones del pago:', error);

                if (isMounted) {
                    setHasOptionsError(true);
                    setFeedback({
                        variant: 'error',
                        title: 'No se pudieron cargar las opciones del pago',
                        message:
                            'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
                    });
                }
            } finally {
                if (isMounted) {
                    setIsLoadingOptions(false);
                }
            }
        };

        void loadPaymentOptions();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleClose = () => {
        setFeedback(null);
    };

    const onSubmit = async (values: PaymentSubmitValues) => {
        try {
            setFeedback(null);

            const resp = await paymentsService.create(values);

            if (resp.error) {
                throw resp.error;
            }

            setFeedback({
                variant: 'success',
                title: 'Pago registrado.',
                message: resp?.data?.message,
            });
        } catch (error) {
            console.error('Error al registrar pago:', error);

            setFeedback({
                variant: 'error',
                title: 'No se puede registrar pago',
                message:
                    'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
            });
        }
    };

    return (
        <div className="my-6 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
            <Form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="px-2 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <div className="col-span-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                                Completar los campos para registrar el pago.
                            </p>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="service_id">Servicio*</Label>
                            <Controller
                                name="service_id"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        id="service_id"
                                        name={field.name}
                                        options={services.map((service) => ({
                                            value: service.id,
                                            label: service.name,
                                        }))}
                                        placeholder={
                                            isLoadingOptions
                                                ? 'Cargando...'
                                                : 'Seleccionar'
                                        }
                                        value={
                                            field.value
                                                ? String(field.value)
                                                : ''
                                        }
                                        onChange={(value) => {
                                            const serviceId = Number(value);
                                            field.onChange(serviceId);

                                            const selectedService =
                                                services.find(
                                                    (service) =>
                                                        Number(service.id) ===
                                                        serviceId,
                                                );
                                            if (selectedService) {
                                                setValue(
                                                    'original_amount',
                                                    String(
                                                        selectedService.price,
                                                    ),
                                                    {
                                                        shouldDirty: true,
                                                        shouldValidate: true,
                                                    },
                                                );
                                            }
                                        }}
                                        onBlur={field.onBlur}
                                        disabled={
                                            isLoadingOptions || hasOptionsError
                                        }
                                        error={Boolean(errors.service_id)}
                                        hint={errors.service_id?.message}
                                        className="dark:bg-dark-900"
                                    />
                                )}
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="original_amount">
                                Monto original*
                            </Label>
                            <Controller
                                name="original_amount"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="number"
                                        id="original_amount"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        error={Boolean(errors.original_amount)}
                                        hint={errors.original_amount?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="discount">Descuento</Label>
                            <Controller
                                name="discount"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="number"
                                        id="discount"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        error={Boolean(errors.discount)}
                                        hint={errors.discount?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="amount_paid">Total*</Label>
                            <Controller
                                name="amount_paid"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="number"
                                        id="amount_paid"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        error={Boolean(errors.amount_paid)}
                                        hint={errors.amount_paid?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="payment_method_id">
                                Método de Pago*
                            </Label>
                            <Controller
                                name="payment_method_id"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        id="payment_method_id"
                                        name={field.name}
                                        options={paymentMethods}
                                        placeholder={
                                            isLoadingOptions
                                                ? 'Cargando...'
                                                : 'Seleccionar'
                                        }
                                        value={
                                            field.value
                                                ? String(field.value)
                                                : ''
                                        }
                                        onChange={(value) =>
                                            field.onChange(Number(value))
                                        }
                                        onBlur={field.onBlur}
                                        disabled={
                                            isLoadingOptions || hasOptionsError
                                        }
                                        error={Boolean(
                                            errors.payment_method_id,
                                        )}
                                        hint={errors.payment_method_id?.message}
                                        className="dark:bg-dark-900"
                                    />
                                )}
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="billing_period">Período*</Label>
                            <Controller
                                name="billing_period"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="date"
                                        id="billing_period"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        error={Boolean(errors.billing_period)}
                                        hint={errors.billing_period?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="status_id">Estado del Pago*</Label>
                            <Controller
                                name="status_id"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        id="status_id"
                                        name={field.name}
                                        options={paymentStatuses}
                                        placeholder={
                                            isLoadingOptions
                                                ? 'Cargando...'
                                                : 'Seleccionar'
                                        }
                                        value={
                                            field.value
                                                ? String(field.value)
                                                : ''
                                        }
                                        onChange={(value) =>
                                            field.onChange(Number(value))
                                        }
                                        onBlur={field.onBlur}
                                        disabled={
                                            isLoadingOptions || hasOptionsError
                                        }
                                        error={Boolean(errors.status_id)}
                                        hint={errors.status_id?.message}
                                        className="dark:bg-dark-900"
                                    />
                                )}
                            />
                        </div>

                        <div className="col-span-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                                Campos opcionales.
                            </p>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="receipt_number">
                                Número de Recibo
                            </Label>
                            <Controller
                                name="receipt_number"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="number"
                                        id="receipt_number"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="observations">Observación</Label>
                            <Controller
                                name="observations"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        id="observations"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 justify-end">
                    <Button size="sm" variant="outline" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button
                        size="sm"
                        type="submit"
                        disabled={
                            isSubmitting || isLoadingOptions || hasOptionsError
                        }
                    >
                        {isSubmitting && <IconSpinner />}
                        Guardar
                    </Button>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-2 mt-3">
                    {feedback && (
                        <div className="col-span-2 text-start">
                            <Alert
                                variant={feedback.variant}
                                title={feedback.title}
                                message={feedback.message}
                            />
                        </div>
                    )}
                </div>
            </Form>
        </div>
    );
}
