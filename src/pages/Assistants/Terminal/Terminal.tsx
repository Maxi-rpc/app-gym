import { useState } from 'react';

import Layout from './Layout';
import PageMeta from '../../../components/common/PageMeta';

import Form from '../../../components/form/Form';
import Label from '../../../components/form/Label';
import Input from '../../../components/form/input/InputField';
import Button from '../../../components/ui/button/Button';
import Alert from '../../../components/ui/alert/Alert';
import { Feedback } from '../../../components/ui/alert/types/AlertFeedback';
import ButtonQr from './ButtonQr';

import { attendanceService } from '../../../service/attendance.service';

import { validateArgentineDNI } from '../../../utils/validation';

export default function Terminal() {
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({ qr: '', dni: '' });

    const [error, setError] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const autoClose = () => {
        setTimeout(() => {
            setFeedback(null);
        }, 5000);
    };

    const handleSubmit = async () => {
        setFeedback(null);
        setError('');
        setIsLoading(true);

        // Validación básica
        if (!formData.qr && !formData.dni) {
            setError('Por favor completa uno de los campos QR o DNI.');
            return;
        }

        // Validación dni
        if (formData.dni) {
            if (!validateArgentineDNI(formData.dni)) {
                setError('El campo DNI debe ser solo números.');
                return;
            }
        }

        const date_to_string = new Date().toISOString();

        const body = {
            qr_token: formData.qr,
            dni: formData.dni,
            check_in_at: date_to_string,
        };

        try {
            const resp = await attendanceService.registerTerminal(body);
            console.log('resp', resp.data);
            if (resp.error) throw resp.error;

            if (resp.data) {
                setFeedback({
                    variant: 'success',
                    title: resp.data?.data,
                    message: resp.data?.message,
                });
            }
        } catch (err) {
            console.log('resp', err);
            setError(
                err instanceof Error
                    ? err.message
                    : 'Error al registrar asistencia',
            );
        } finally {
            setIsLoading(false);
            setFormData({ qr: '', dni: '' });
            autoClose();
        }
    };

    const handleSave = async (qrValue: string) => {
        setFeedback(null);
        setError('');
        setIsLoading(true);

        const date_to_string = new Date().toISOString();

        const body = {
            qr_token: qrValue,
            dni: formData.dni,
            check_in_at: date_to_string,
        };

        try {
            const resp = await attendanceService.registerTerminal(body);

            if (resp.error) throw resp.error;

            if (resp.data) {
                setFeedback({
                    variant: 'success',
                    title: resp.data?.data,
                    message: resp.data?.message,
                });
            }
        } catch (error) {
            console.error('Error No se puede obtener datos', error);

            setFeedback({
                variant: 'error',
                title: 'No se puede obtener datos',
                message:
                    'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
            });
        } finally {
            setIsLoading(false);
            setFormData({ qr: '', dni: '' });
            autoClose();
        }
    };

    return (
        <div>
            <PageMeta
                title="App Gym - Administration Asistencias"
                description="Panel de administracion para Asistencias"
            />
            <Layout>
                <div className="flex flex-col flex-1">
                    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                        <div>
                            <div className="mb-5 sm:mb-8">
                                <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                                    Bienvenido a Degani Gym
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    ¡Escanea tu cod QR o Introduce tu DNI!
                                </p>
                            </div>
                            <div className="mx-auto w-full text-center mb-8">
                                <ButtonQr onRegister={handleSave}>
                                    Abrir Cámara
                                </ButtonQr>
                            </div>

                            <div>
                                <Form onSubmit={handleSubmit}>
                                    <div className="space-y-6">
                                        {feedback && (
                                            <Alert
                                                variant={
                                                    feedback?.variant || 'info'
                                                }
                                                title={feedback?.title}
                                                message={feedback?.message}
                                            />
                                        )}

                                        {error && (
                                            <div className="p-4 rounded-lg bg-error-50 dark:bg-error-500/10 border border-error-200 dark:border-error-500/20">
                                                <p className="text-sm text-error-600 dark:text-error-400">
                                                    {error}
                                                </p>
                                            </div>
                                        )}

                                        <div>
                                            <Label htmlFor="qr">QR</Label>
                                            <Input
                                                type="text"
                                                value={formData?.qr}
                                                onChange={handleChange}
                                                disabled={isLoading}
                                                name="qr"
                                                id="qr"
                                            />
                                            <div className="relative"></div>
                                        </div>

                                        <div>
                                            <Label htmlFor="dni">
                                                DNI (Solo números)
                                            </Label>
                                            <Input
                                                type="text"
                                                value={formData?.dni}
                                                onChange={handleChange}
                                                disabled={isLoading}
                                                name="dni"
                                                id="dni"
                                            />
                                        </div>

                                        <div>
                                            <Button
                                                className="w-full"
                                                size="sm"
                                                type="submit"
                                                disabled={isLoading}
                                            >
                                                {isLoading
                                                    ? 'Cargando...'
                                                    : 'Registrar!'}
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}
