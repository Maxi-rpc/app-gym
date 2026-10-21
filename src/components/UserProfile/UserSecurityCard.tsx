import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import ButtonCustom from '../ui/button/ButtonCustom';
import Form from '../form/Form';
import Input from '../form/input/InputField';
import Label from '../form/Label';
import Alert from '../../components/ui/alert/Alert';
import { Feedback } from '../../components/ui/alert/types/AlertFeedback';
import IconSpinner from '../../components/ui/button/IconSpinner';

import { EyeCloseIcon, EyeIcon } from '../../icons';

import { useAuth } from '../../hooks/useAuth';
import { userService } from '../../service/user.service';

const userSecuritySchema = z.object({
    password: z
        .string()
        .refine(
            (value) => value.trim().length > 0,
            'Este campo es obligatorio',
        ),
});

type UserSecurityFormValues = z.infer<typeof userSecuritySchema>;

export default function UserSecurityCard() {
    const { profile } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [feedback, setFeedback] = useState<Feedback>(null);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UserSecurityFormValues>({
        resolver: zodResolver(userSecuritySchema),
        defaultValues: {
            password: '',
        },
    });

    const { isOpen, openModal, closeModal } = useModal();

    const handleCloseModal = () => {
        setFeedback(null);
        reset({ password: '' });
        setShowPassword(false);
        closeModal();
    };

    const handleOpenModal = () => {
        setFeedback(null);
        reset({ password: '' });
        setShowPassword(false);
        openModal();
    };

    const onSubmit = async ({ password }: UserSecurityFormValues) => {
        try {
            setFeedback(null);
            const resp = await userService.update_password({
                id: profile?.id ?? '',
                password,
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
            <div className="mb-6 rounded-2xl border border-gray-200  p-5 lg:p-6 dark:border-gray-800 ">
                <h4 className="text-lg mb-4 font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
                    Seguridad
                </h4>
                <div>
                    <div className="flex flex-col justify-between gap-4 border-b border-gray-200 py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-end dark:border-gray-800">
                        <div>
                            <span className="block text-base mb-1 font-medium text-gray-800 dark:text-white/90">
                                Cambiar la contraseña
                            </span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Una vez realizado el cambio, debe cerrar sesion.
                            </p>
                        </div>
                        <div>
                            <ButtonCustom
                                variant="outline"
                                color="error"
                                onClick={handleOpenModal}
                            >
                                Cambiar la contraseña
                            </ButtonCustom>
                        </div>
                    </div>
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
                            Editar Contraseña
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
                                <div className="col-span-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        type="text"
                                        value={profile?.email}
                                        name="email"
                                        id="email"
                                        disabled
                                    />
                                </div>

                                {/* <div className="col-span-2">
									<Label>
										Password Actual <span className="text-error-500">*</span>
									</Label>
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											name="password"
											value={formData.password}
											onChange={handleChange}
										/>
										<span
											onClick={() => setShowPassword(!showPassword)}
											className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
										>
											{showPassword ? (
												<EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
											) : (
												<EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
											)}
										</span>
									</div>
								</div> */}

                                <div className="col-span-2">
                                    <Label htmlFor="password">
                                        Password Nueva{' '}
                                        <span className="text-error-500">
                                            *
                                        </span>
                                    </Label>
                                    <div className="relative">
                                        <Controller
                                            name="password"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name={field.name}
                                                    id="password"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    error={Boolean(
                                                        errors.password,
                                                    )}
                                                    hint={
                                                        errors.password?.message
                                                    }
                                                />
                                            )}
                                        />
                                        <span
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                            ) : (
                                                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                            )}
                                        </span>
                                    </div>
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
                </div>
            </Modal>
        </>
    );
}
