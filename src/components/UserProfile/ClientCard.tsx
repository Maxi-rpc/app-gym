import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import Form from '../form/Form';
import Input from '../form/input/InputField';
import TextArea from '../form/input/TextArea';
import Label from '../form/Label';
import Alert from '../../components/ui/alert/Alert';
import { Feedback } from '../../components/ui/alert/types/AlertFeedback';
import IconSpinner from '../../components/ui/button/IconSpinner';

import { Lineicons } from '@lineiconshq/react-lineicons';
import { Pencil1Outlined } from '@lineiconshq/free-icons';

import { clientService } from '../../service/client.service';
import { UpdateClientInput } from '../../service/types/Client';
import { useAuth } from '../../hooks/useAuth';

const clientSchema = z.object({
    height: z.number().nullable(),
    weight: z.number().nullable(),
    emergency_contact: z.string(),
    medical_notes: z.string(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

export default function ClientCard() {
    const { profile } = useAuth();
    const [client, setClient] = useState<UpdateClientInput | null>(null);
    const { isOpen, openModal, closeModal } = useModal();
    const [feedback, setFeedback] = useState<Feedback>(null);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ClientFormValues>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            height: null,
            weight: null,
            emergency_contact: '',
            medical_notes: '',
        },
    });

    const handleCloseModal = () => {
        setFeedback(null);
        closeModal();
    };

    const handleOpenModal = () => {
        reset({
            height: client?.height ?? null,
            weight: client?.weight ?? null,
            emergency_contact: client?.emergency_contact ?? '',
            medical_notes: client?.medical_notes ?? '',
        });
        setFeedback(null);
        openModal();
    };

    const onSubmit = async (values: ClientFormValues) => {
        try {
            setFeedback(null);
            const resp = await clientService.update({
                user_id: client?.user_id ?? profile?.id,
                ...values,
            });
            if (resp.data) {
                if (resp?.data?.success) {
                    setFeedback({
                        variant: 'success',
                        title: 'Info.',
                        message: resp?.data?.message,
                    });
                } else {
                    setFeedback({
                        variant: 'warning',
                        title: 'Info.',
                        message: resp?.data?.message,
                    });
                }
            }

            if (resp.error) {
                throw resp.error;
            }

            if (profile?.id) {
                await loadClient(profile.id);
            }
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

    const loadClient = async (userId: string) => {
        try {
            const clientData = await clientService.getById(userId);
            setClient(clientData);
            reset({
                height: clientData?.height ?? null,
                weight: clientData?.weight ?? null,
                emergency_contact: clientData?.emergency_contact ?? '',
                medical_notes: clientData?.medical_notes ?? '',
            });
        } catch (err) {
            console.error('Error cargando client', err);

            setClient(null);
        }
    };

    useEffect(() => {
        if (profile?.id) {
            void loadClient(profile.id);
        }
    }, [profile?.id]);

    return (
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Datos Opcionales
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Altura (cm)
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {client?.height}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Peso (kg)
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {client?.weight}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Contacto de Emergencia
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {client?.emergency_contact}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Notas Médicas
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {client?.medical_notes}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleOpenModal}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                    >
                        <Lineicons icon={Pencil1Outlined} size={20} />
                        Editar
                    </button>
                </div>
            </div>
            {/* modal */}
            <Modal
                isOpen={isOpen}
                onClose={handleCloseModal}
                className="max-w-175 m-4"
            >
                <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Editar Datos
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Actualiza tus datos para mantener tu perfil
                            actualizado.
                        </p>
                    </div>
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col"
                    >
                        <div className="px-2 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div className="col-span-2 lg:col-span-1">
                                    <Label htmlFor="height">Altura (cm)</Label>
                                    <Controller
                                        name="height"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="number"
                                                value={field.value ?? ''}
                                                name={field.name}
                                                id="height"
                                                onChange={(event) =>
                                                    field.onChange(
                                                        event.target.value ===
                                                            ''
                                                            ? null
                                                            : event.target
                                                                  .valueAsNumber,
                                                    )
                                                }
                                                onBlur={field.onBlur}
                                                error={Boolean(errors.height)}
                                                hint={errors.height?.message}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label htmlFor="weight">Peso (kg)</Label>
                                    <Controller
                                        name="weight"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="number"
                                                value={field.value ?? ''}
                                                name={field.name}
                                                id="weight"
                                                onChange={(event) =>
                                                    field.onChange(
                                                        event.target.value ===
                                                            ''
                                                            ? null
                                                            : event.target
                                                                  .valueAsNumber,
                                                    )
                                                }
                                                onBlur={field.onBlur}
                                                error={Boolean(errors.weight)}
                                                hint={errors.weight?.message}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label htmlFor="emergency_contact">
                                        Contacto de Emergencia
                                    </Label>
                                    <Controller
                                        name="emergency_contact"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                value={field.value}
                                                name={field.name}
                                                id="emergency_contact"
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                error={Boolean(
                                                    errors.emergency_contact,
                                                )}
                                                hint={
                                                    errors.emergency_contact
                                                        ?.message
                                                }
                                            />
                                        )}
                                    />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
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
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 justify-end">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCloseModal}
                            >
                                Cerrar
                            </Button>
                            <Button
                                size="sm"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <IconSpinner />}
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
                </div>
            </Modal>
        </>
    );
}
