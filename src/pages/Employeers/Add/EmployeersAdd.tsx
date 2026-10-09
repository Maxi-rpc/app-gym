import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import PageBreadcrumb from '../../../components/common/PageBreadCrumb';
import PageMeta from '../../../components/common/PageMeta';

import Form from '../../../components/form/Form';
import Label from '../../../components/form/Label';
import InputField from '../../../components/form/input/InputField';
import TextArea from '../../../components/form/input/TextArea';
import Button from '../../../components/ui/button/Button';
import Alert from '../../../components/ui/alert/Alert';
import { Feedback } from '../../../components/ui/alert/types/AlertFeedback';
import IconSpinner from '../../../components/ui/button/IconSpinner';

import { employeeService } from '../../../service/employee.service';

const employeeSchema = z.object({
    email: z
        .string()
        .refine((value) => value.trim().length > 0, 'Este campo es obligatorio')
        .refine(
            (value) =>
                value.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            'Email inválido',
        ),
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
    salary: z.number().nullable(),
    hire_date: z.string(),
    specialist: z.string(),
    employee_number: z.string(),
    observations: z.string(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

export default function EmployeersAdd() {
    const [feedback, setFeedback] = useState<Feedback>(null);
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            email: '',
            name: '',
            last_name: '',
            document: '',
            phone: '',
            birth_date: '',
            salary: null,
            hire_date: '',
            specialist: '',
            employee_number: '',
            observations: '',
        },
    });

    const handleClose = () => {
        setFeedback(null);
    };

    const onSubmit = async (values: EmployeeFormValues) => {
        try {
            setFeedback(null);
            const resp = await employeeService.create({
                ...values,
                birth_date: values.birth_date || null,
                hire_date: values.hire_date || null,
            });
            if (resp.error) {
                throw resp.error;
            }

            setFeedback({
                variant: 'success',
                title: 'Empleado creado.',
                message: resp?.data?.message,
            });
        } catch (error) {
            console.error('Error al crear empleado:', error);

            setFeedback({
                variant: 'error',
                title: 'No se puede crear empleado',
                message:
                    'Verificá tu conexión e intentá nuevamente. Si el problema continúa, contactá al administrador.',
            });
        }
    };

    return (
        <div>
            <PageMeta
                title="App Gym - Administration Employees"
                description="Panel de administracion para Profesores"
            />
            <PageBreadcrumb pageTitle="Profesores" />
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                    <h2 className="text-xl font-medium text-gray-800 dark:text-white">
                        Registrar
                    </h2>
                </div>
                <div className="border-gray-200 p-4 sm:p-8 dark:border-gray-800">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {feedback && (
                                <div className="col-span-2">
                                    <Alert
                                        variant={feedback?.variant}
                                        title={feedback?.title}
                                        message={feedback?.message}
                                    />
                                </div>
                            )}

                            <div className="col-span-2 md:col-span-1">
                                <Label htmlFor="email">Email*</Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            type="text"
                                            value={field.value}
                                            name={field.name}
                                            id="email"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            hint={errors.email?.message}
                                            error={Boolean(errors.email)}
                                        />
                                    )}
                                />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <Label htmlFor="name">Nombre*</Label>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            type="text"
                                            value={field.value}
                                            name={field.name}
                                            id="name"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            hint={errors.name?.message}
                                            error={Boolean(errors.name)}
                                        />
                                    )}
                                />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <Label htmlFor="last_name">Apellido*</Label>
                                <Controller
                                    name="last_name"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            type="text"
                                            value={field.value}
                                            name={field.name}
                                            id="last_name"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            hint={errors.last_name?.message}
                                            error={Boolean(errors.last_name)}
                                        />
                                    )}
                                />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <Label htmlFor="document">Documento*</Label>
                                <Controller
                                    name="document"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            type="text"
                                            value={field.value}
                                            name={field.name}
                                            id="document"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            hint={errors.document?.message}
                                            error={Boolean(errors.document)}
                                        />
                                    )}
                                />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <Label htmlFor="phone">Teléfono</Label>
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
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

                            <div className="col-span-2 md:col-span-1">
                                <Label htmlFor="birth_date">
                                    Fecha de Nacimiento
                                </Label>
                                <Controller
                                    name="birth_date"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            type="date"
                                            value={field.value}
                                            name={field.name}
                                            id="birth_date"
                                            placeholder="YYYY-MM-DD"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
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
                                <Label htmlFor="salary">Salario</Label>
                                <Controller
                                    name="salary"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            type="number"
                                            value={field.value ?? ''}
                                            name={field.name}
                                            id="salary"
                                            onChange={(event) =>
                                                field.onChange(
                                                    event.target.value === ''
                                                        ? null
                                                        : event.target
                                                              .valueAsNumber,
                                                )
                                            }
                                            onBlur={field.onBlur}
                                            hint={errors.salary?.message}
                                            error={Boolean(errors.salary)}
                                        />
                                    )}
                                />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <Label htmlFor="hire_date">
                                    Fecha de Ingreso
                                </Label>
                                <Controller
                                    name="hire_date"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            type="date"
                                            value={field.value}
                                            name={field.name}
                                            id="hire_date"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                        />
                                    )}
                                />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <Label htmlFor="specialist">Especialidad</Label>
                                <Controller
                                    name="specialist"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            type="text"
                                            value={field.value}
                                            name={field.name}
                                            id="specialist"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                        />
                                    )}
                                />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <Label htmlFor="employee_number">
                                    Número de empleado
                                </Label>
                                <Controller
                                    name="employee_number"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            type="text"
                                            value={field.value}
                                            name={field.name}
                                            id="employee_number"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                        />
                                    )}
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="observations">
                                    Observación
                                </Label>
                                <Controller
                                    name="observations"
                                    control={control}
                                    render={({ field }) => (
                                        <TextArea
                                            name={field.name}
                                            id="observations"
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            rows={3}
                                            error={Boolean(errors.observations)}
                                            hint={errors.observations?.message}
                                        />
                                    )}
                                />
                            </div>

                            <div className="col-span-2">
                                <div className="flex items-center gap-3 px-2 mt-6 justify-end">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleClose}
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
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
