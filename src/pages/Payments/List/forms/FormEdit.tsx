import React, { useState } from 'react';

import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';
import Button from '../../../../components/ui/button/Button';
import Alert from '../../../../components/ui/alert/Alert';
import { Feedback } from '../../../../components/ui/alert/types/AlertFeedback';
import IconSpinner from '../../../../components/ui/button/IconSpinner';

import { Membership_payment } from '../../../../service/types/Payments';
import { paymentsService } from '../../../../service/payments.service';

type Props = {
    onSubmit?: () => void;
    onClose?: () => void;
    defaultData: Membership_payment | null;
};

const ARGENTINA_TIME_ZONE = 'America/Argentina/Buenos_Aires';

function getPaymentDateForInput(value?: string | null): string {
    if (!value) return '';

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return '';

    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: ARGENTINA_TIME_ZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(date);
    const getPart = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((part) => part.type === type)?.value ?? '';

    return `${getPart('year')}-${getPart('month')}-${getPart('day')}`;
}

export default function FormEdit({ onSubmit, onClose, defaultData }: Props) {
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: defaultData?.id || '',
        payment_date: getPaymentDateForInput(defaultData?.payment_date),
        update_period_dates: true,
    });

    const handleClose = () => {
        setFeedback(null);
        onSubmit?.();
        onClose?.();
    };

    const handleSubmit = async () => {
        try {
            setFeedback(null);
            setIsLoading(true);

            const resp = await paymentsService.update(formData);

            if (resp.error) {
                throw resp.error;
            }

            setFeedback({
                variant: 'success',
                title: 'Pago actualizado.',
                message: resp?.data?.message,
            });
        } catch (error) {
            console.error('Error al actualizar pago:', error);

            setFeedback({
                variant: 'error',
                title: 'No se puede actualizar el pago',
                message:
                    'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdatePeriodDatesChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            update_period_dates: event.target.checked,
        }));
    };

    return (
        <form className="flex flex-col">
            <div className="custom-scrollbar h-112.5 overflow-y-auto px-2 pb-3">
                <div className="grid grid-cols-1 gap-y-5">
                    <div>
                        <Label>Fecha de pago*</Label>
                        <Input
                            type="date"
                            value={formData.payment_date}
                            name="payment_date"
                            onChange={handleChange}
                        />
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <input
                            type="checkbox"
                            checked={formData.update_period_dates}
                            onChange={handleUpdatePeriodDatesChange}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                        />
                        <span>
                            <span className="block text-sm font-medium text-gray-800 dark:text-white/90">
                                Recalcular período y próximo vencimiento
                            </span>
                            <span className="mt-1 block text-sm text-gray-500 dark:text-gray-400">
                                Usalo al corregir el pago inicial del período.
                                Desactivalo si solo corregís la fecha de un
                                abono parcial posterior.
                            </span>
                        </span>
                    </label>

                    <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600 dark:bg-white/5 dark:text-gray-300">
                        El monto, descuento, método de pago, recibo y
                        observaciones no se editan desde esta pantalla para
                        conservar el historial contable.
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
                <Button size="sm" variant="outline" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button size="sm" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading && <IconSpinner />}
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
        </form>
    );
}
