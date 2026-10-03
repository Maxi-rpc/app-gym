import { useState } from 'react';
import { Link } from 'react-router';

import Layout from './Layout';
import PageMeta from '../../../components/common/PageMeta';

import { ChevronLeftIcon } from '../../../icons';
import Form from '../../../components/form/Form';
import Label from '../../../components/form/Label';
import Input from '../../../components/form/input/InputField';
import Button from '../../../components/ui/button/Button';
import Alert from '../../../components/ui/alert/Alert';
import { Feedback } from '../../../components/ui/alert/types/AlertFeedback';
import ButtonQr from './ButtonQr';
import IconSpinner from '../../../components/ui/button/IconSpinner';

import { attendanceService } from '../../../service/attendance.service';

import { validateArgentineDNI } from '../../../utils/validation';
import { publicAsset } from '../../../utils/publicAsset';

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
        }, 7000);
    };

    const handleSubmit = async () => {
        setFeedback(null);
        setError('');
        setIsLoading(true);

        const qr = formData.qr.trim();
        const dni = formData.dni.trim();

        // Validación básica
        if (!qr && !dni) {
            setError('Por favor completa uno de los campos QR o DNI.');
            setIsLoading(false);
            return;
        }

        // Validación dni
        if (dni && !validateArgentineDNI(dni)) {
            setError('El campo DNI debe ser solo números.');
            setIsLoading(false);
            return;
        }

        const body = {
            qr_token: qr,
            dni: dni,
            check_in_at: new Date().toISOString(),
        };

        try {
            const resp = await attendanceService.registerTerminal(body);
            console.log('resp', resp.data);
            if (resp.error) throw resp.error;

            if (resp.data?.error) {
                setFeedback({
                    variant: 'warning',
                    title: resp.data?.error,
                    message: '',
                });
            }

            if (resp.data?.success) {
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

        const qr = qrValue.trim();
        const dni = formData.dni.trim();

        // Validación básica
        if (!qr && !dni) {
            setError('Por favor completa uno de los campos QR o DNI.');
            setIsLoading(false);
            return;
        }

        // Validación dni
        if (dni && !validateArgentineDNI(dni)) {
            setError('El campo DNI debe ser solo números.');
            setIsLoading(false);
            return;
        }

        const body = {
            qr_token: qr,
            dni: dni,
            check_in_at: new Date().toISOString(),
        };

        try {
            const resp = await attendanceService.registerTerminal(body);

            if (resp.error) throw resp.error;

            if (resp.data?.error) {
                setFeedback({
                    variant: 'warning',
                    title: resp.data?.error,
                    message: resp.data?.error,
                });
            }

            if (resp.data?.success) {
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
                    <div className="mx-auto w-full max-w-md pt-10">
                        <Link
                            to="/"
                            className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            <ChevronLeftIcon className="size-5 rtl:rotate-180" />
                            Inicio
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                        <div>
                            <div className="flex justify-center w-full mb-5 sm:mb-8">
                                <img
                                    className="w-60"
                                    alt="logo"
                                    src={publicAsset(
                                        'images/logo/logo_2_sin_fondo.png',
                                    )}
                                />
                            </div>
                            <div className="mb-5 sm:mb-8">
                                <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                                    Bienvenido a Degani Gym
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    ¡Escanea tu cod QR o Introduce tu DNI!
                                </p>
                            </div>
                            <div className="mx-auto w-full text-center mb-5">
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
                                                {isLoading ? (
                                                    <IconSpinner />
                                                ) : (
                                                    'Registrar!'
                                                )}
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
