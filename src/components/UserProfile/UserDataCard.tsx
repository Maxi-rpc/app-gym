import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// import { publicAsset } from "../../utils/publicAsset";
import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import Form from '../form/Form';
import Input from '../form/input/InputField';
import Label from '../form/Label';
import Badge from '../ui/badge/Badge';
import Alert from '../../components/ui/alert/Alert';
import { Feedback } from '../../components/ui/alert/types/AlertFeedback';
import IconSpinner from '../../components/ui/button/IconSpinner';
import QRCard from '../../components/ui/qr/QRCard';

import { Lineicons } from '@lineiconshq/react-lineicons';
import { Pencil1Outlined } from '@lineiconshq/free-icons';

import { useAuth } from '../../hooks/useAuth';

import { profileService } from '../../service/profile.service';

const profileSchema = z.object({
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
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function UserDataCard() {
    const { isOpen, openModal, closeModal } = useModal();
    const { profile } = useAuth();
    const [feedback, setFeedback] = useState<Feedback>(null);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: profile?.name ?? '',
            last_name: profile?.last_name ?? '',
            document: profile?.document ?? '',
            phone: profile?.phone ?? '',
            birth_date: profile?.birth_date ?? '',
        },
    });

    const roleNames =
        profile?.user_roles
            ?.map((ur) => ur.role?.name)
            .filter(Boolean)
            .join(', ') ?? '';

    const handleCloseModal = () => {
        setFeedback(null);
        closeModal();
    };

    const handleOpenModal = () => {
        reset({
            name: profile?.name ?? '',
            last_name: profile?.last_name ?? '',
            document: profile?.document ?? '',
            phone: profile?.phone ?? '',
            birth_date: profile?.birth_date ?? '',
        });
        setFeedback(null);
        openModal();
    };

    const onSubmit = async (values: ProfileFormValues) => {
        try {
            setFeedback(null);
            const resp = await profileService.update({
                id: profile?.id,
                email: profile?.email,
                image: profile?.image,
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

    return (
        <>
            <div className="mb-6 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
                <div className="flex flex-col gap-5 sm:flex-row xl:gap-10">
                    <div className="flex-1">
                        <div className="mb-6 flex flex-col gap-5 sm:flex-row xl:items-center xl:justify-between">
                            <div className="flex w-full flex-col items-start gap-6 sm:flex-row sm:items-center">
                                <QRCard value={profile?.qr_token} />
                                {/* <div className="border-gray-20 overflow-hidden rounded-full border dark:border-gray-800">
									<img
										className="size-20"
										alt="user"
										src={publicAsset("images/user/owner.jpg")}
									/>
								</div> */}
                                <div className="mr-3 overflow-hidden rounded-full h-20 w-20 bg-brand-400 inline-flex items-center justify-center text-5xl font-medium text-white">
                                    {profile?.name[0]}
                                </div>

                                <div className="text-left">
                                    <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
                                        {profile?.name} {profile?.last_name}{' '}
                                        <Badge color="success">
                                            {profile?.status?.name}
                                        </Badge>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="relative grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-11 xl:gap-y-7">
                            <div className="w-full">
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Nombre
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {profile?.name}
                                </p>
                            </div>
                            <div className="w-full">
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Apellido
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {profile?.last_name}
                                </p>
                            </div>
                            <div className="w-full">
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Email
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {profile?.email}
                                </p>
                            </div>
                            <div className="hidden xl:block"></div>
                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Cumpleaños
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {profile?.birth_date}
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Teléfono
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {profile?.phone}
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Role
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {roleNames}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleOpenModal}
                            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                        >
                            <Lineicons icon={Pencil1Outlined} size={20} />
                            Editar
                        </button>
                    </div>
                </div>
            </div>
            {/* modal */}
            <Modal
                isOpen={isOpen}
                onClose={handleCloseModal}
                className="max-w-175 m-4"
            >
                <div className="no-scrollbar relative w-full max-w-175 overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Editar información personal
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Actualiza tus datos para mantener tu perfil al día.
                        </p>
                    </div>
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col"
                    >
                        <div className="custom-scrollbar h-112.5 md:h-auto overflow-y-auto px-2 pb-3">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div className="col-span-2 lg:col-span-1">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                value={field.value}
                                                name={field.name}
                                                id="name"
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                error={Boolean(errors.name)}
                                                hint={errors.name?.message}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label htmlFor="last_name">Apellido</Label>
                                    <Controller
                                        name="last_name"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                value={field.value}
                                                name={field.name}
                                                id="last_name"
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                error={Boolean(
                                                    errors.last_name,
                                                )}
                                                hint={
                                                    errors.last_name?.message
                                                }
                                            />
                                        )}
                                    />
                                </div>

                                {/* <div className="col-span-2 lg:col-span-1">
										<Label htmlFor="email">Email</Label>
										<Input
											type="text"
											value={formData?.email}
											name="email"
                                            id="email"
											onChange={handleChange}
										/>
									</div> */}

                                <div className="col-span-2 lg:col-span-1">
                                    <Label htmlFor="document">Documento</Label>
                                    <Controller
                                        name="document"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                value={field.value}
                                                name={field.name}
                                                id="document"
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                error={Boolean(
                                                    errors.document,
                                                )}
                                                hint={
                                                    errors.document?.message
                                                }
                                            />
                                        )}
                                    />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label htmlFor="phone">Teléfono</Label>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
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

                                <div className="col-span-2 lg:col-span-1">
                                    <Label htmlFor="birth_date">
                                        Fecha de Cumpleaños
                                    </Label>
                                    <Controller
                                        name="birth_date"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="date"
                                                placeholder="AAAA-MM-DD"
                                                value={field.value}
                                                name={field.name}
                                                id="birth_date"
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
