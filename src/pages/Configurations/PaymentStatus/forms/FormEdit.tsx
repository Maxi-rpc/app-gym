import { useState } from 'react';

import Form from '../../../../components/form/Form';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/input/InputField';
import TextArea from '../../../../components/form/input/TextArea';
import Button from '../../../../components/ui/button/Button';
import Alert from '../../../../components/ui/alert/Alert';
import { Feedback } from '../../../../components/ui/alert/types/AlertFeedback';
import IconSpinner from '../../../../components/ui/button/IconSpinner';

import { UpdatePaymentStatusInput } from '../../../../service/types/PaymentsStatus';
import { paymentStatusService } from '../../../../service/paymentStatus.service';

type Props = {
    onSubmit?: () => void;
    onClose?: () => void;
    defaultData: UpdatePaymentStatusInput | null;
};

export default function FormEdit({ onSubmit, onClose, defaultData }: Props) {
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: defaultData?.id || '',
        name: defaultData?.name || '',
        description: defaultData?.description || '',
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

            // Validación básica
            if (!formData.name) {
                setFeedback({
                    variant: 'info',
                    title: 'Por favor completa todos los campos*',
                    message: '',
                });
                return;
            }

            const resp = await paymentStatusService.update(formData);
            if (resp.error) {
                throw resp.error;
            }

            setFeedback({
                variant: 'success',
                title: 'Registro guardado.',
                message: resp?.data?.message,
            });
        } catch (error) {
            console.error('Error al guardar registro:', error);

            setFeedback({
                variant: 'error',
                title: 'No se puede guardar registro',
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

    return (
        <Form onSubmit={handleSubmit} className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="id">ID</Label>
                        <Input
                            type="text"
                            value={formData?.id}
                            name="id"
                            id="id"
                            disabled
                        />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="name">Nombre*</Label>
                        <Input
                            type="text"
                            value={formData?.name}
                            name="name"
                            id="name"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <Label htmlFor="description">Descripción</Label>
                        <TextArea
                            id="description"
                            name="description"
                            placeholder="Ingresar descripción"
                            value={formData?.description}
                            onChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    description: value,
                                }))
                            }
                            rows={3}
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
                <Button size="sm" variant="outline" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button size="sm" type="submit" disabled={isLoading}>
                    {isLoading && <IconSpinner />}
                    Guardar
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-2 mt-3">
                {feedback && (
                    <div className="col-span-2 text-start">
                        <Alert
                            variant={feedback?.variant}
                            title={feedback?.title}
                            message={feedback?.message}
                        />
                    </div>
                )}
            </div>
        </Form>
    );
}
