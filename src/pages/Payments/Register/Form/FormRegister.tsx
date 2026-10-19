import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
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
import { serviceService } from '../../../../service/service.service';
import { PaymentMethods } from '../../../../service/types/PaymentMethods';
import { Service } from '../../../../service/types/Service';

const discountOptions = [
    { value: '0', label: '0%' },
    { value: '10', label: '10%' },
    { value: '20', label: '20%' },
];

interface Props {
    data: Profile | null;
}

const paymentSchema = z.object({
    client_id: z.string().min(1, 'No se seleccionó un cliente'),
    service_id: z.number().int().positive('Seleccioná un servicio'),
    discount_percentage: z
        .enum(['0', '10', '20'], {
            error: 'Seleccioná un descuento válido',
        })
        .transform(Number),
    amount_paid: z
        .string()
        .trim()
        .min(1, 'Este campo es obligatorio')
        .refine(
            (value) => /^\d+(\.\d{1,2})?$/.test(value),
            'Ingresá un monto válido',
        )
        .transform(Number)
        .refine(Number.isFinite, 'Ingresá un monto válido')
        .refine((value) => value > 0, 'El importe debe ser mayor que cero'),
    payment_method_id: z
        .number()
        .int()
        .positive('Seleccioná un método de pago'),
    receipt_number: z.string(),
    observations: z.string(),
});

type PaymentFormValues = z.input<typeof paymentSchema>;
type PaymentSubmitValues = z.output<typeof paymentSchema>;

const defaultValues: PaymentFormValues = {
    client_id: '',
    service_id: 0,
    discount_percentage: '0',
    amount_paid: '',
    payment_method_id: 0,
    receipt_number: '',
    observations: '',
};

interface SelectOption {
    value: string;
    label: string;
}

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(amount);

export default function FormRegister({ data }: Props) {
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [paymentMethods, setPaymentMethods] = useState<SelectOption[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState(true);
    const [hasOptionsError, setHasOptionsError] = useState(false);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PaymentFormValues, unknown, PaymentSubmitValues>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            ...defaultValues,
            client_id: data?.id ?? '',
        },
    });

    const selectedServiceId = useWatch({ control, name: 'service_id' });
    const discountPercentage = Number(
        useWatch({ control, name: 'discount_percentage' }) ?? 0,
    );

    const selectedService = useMemo(
        () =>
            services.find(
                (service) => Number(service.id) === selectedServiceId,
            ),
        [selectedServiceId, services],
    );

    const originalAmount = selectedService?.price ?? 0;
    const discountAmount =
        originalAmount * (Math.max(0, discountPercentage) / 100);
    const totalAmount = originalAmount - discountAmount;

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
                const [methodsResponse, servicesResponse] = await Promise.all([
                    paymentMethodsService.getAll(),
                    serviceService.getAll(),
                ]);

                if (methodsResponse.error) {
                    throw methodsResponse.error;
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
                const activeServices: Service[] = (
                    servicesResponse.data ?? []
                ).filter((service: Service) => service.active);

                if (isMounted) {
                    setPaymentMethods(methods);
                    setServices(activeServices);

                    if (methods.length === 0 || activeServices.length === 0) {
                        setHasOptionsError(true);
                        setFeedback({
                            variant: 'error',
                            title: 'Faltan opciones para registrar el pago',
                            message:
                                'Verificá que haya al menos un servicio activo y un método de pago configurados.',
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
                message: resp.data?.message ?? 'Registrado correctamente.',
            });
        } catch (error) {
            console.error('Error al registrar pago:', error);

            setFeedback({
                variant: 'error',
                title: 'No se puede registrar pago',
                message:
                    'Verificá los datos e intentá nuevamente. Si el problema continúa, contactá al administrador.',
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
                                Registrá el importe recibido. El estado del
                                período se determinará automáticamente según el
                                total abonado.
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
                                        onChange={(value) =>
                                            field.onChange(Number(value))
                                        }
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
                            <Label htmlFor="discount_percentage">
                                Descuento
                            </Label>
                            <Controller
                                name="discount_percentage"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        id="discount_percentage"
                                        name={field.name}
                                        options={discountOptions}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        disabled={
                                            isLoadingOptions || hasOptionsError
                                        }
                                        error={Boolean(
                                            errors.discount_percentage,
                                        )}
                                        hint={
                                            errors.discount_percentage?.message
                                        }
                                        className="dark:bg-dark-900"
                                    />
                                )}
                            />
                        </div>

                        <div className="col-span-2 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/3">
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                                Resumen del cobro
                            </h3>
                            <dl className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                                <div>
                                    <dt className="text-gray-500 dark:text-gray-400">
                                        Subtotal
                                    </dt>
                                    <dd className="mt-1 font-medium text-gray-800 dark:text-white/90">
                                        {selectedService
                                            ? formatCurrency(originalAmount)
                                            : '—'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-gray-500 dark:text-gray-400">
                                        Descuento
                                    </dt>
                                    <dd className="mt-1 font-medium text-gray-800 dark:text-white/90">
                                        {selectedService
                                            ? `-${formatCurrency(discountAmount)}`
                                            : '—'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-gray-500 dark:text-gray-400">
                                        Total a cobrar
                                    </dt>
                                    <dd className="mt-1 font-semibold text-gray-800 dark:text-white">
                                        {selectedService
                                            ? formatCurrency(totalAmount)
                                            : '—'}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="amount_paid">
                                Importe recibido*
                            </Label>
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
                                        min="0.01"
                                        max={
                                            selectedService
                                                ? String(totalAmount)
                                                : undefined
                                        }
                                        step={0.01}
                                        disabled={!selectedService}
                                        error={Boolean(errors.amount_paid)}
                                        hint={
                                            errors.amount_paid?.message ??
                                            (selectedService
                                                ? `Para cancelar el período ingresá ${formatCurrency(totalAmount)}.`
                                                : 'Seleccioná un servicio para calcular el total.')
                                        }
                                    />
                                )}
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="payment_method_id">
                                Método de pago*
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

                        <div className="col-span-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                                Campos opcionales.
                            </p>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Label htmlFor="receipt_number">
                                Número de recibo
                            </Label>
                            <Controller
                                name="receipt_number"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="text"
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
                    <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                    >
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
                        Guardar pago
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
