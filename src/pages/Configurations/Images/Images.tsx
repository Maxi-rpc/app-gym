import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { Lineicons } from '@lineiconshq/react-lineicons';
import {
    PlusOutlined,
    RefreshCircle1ClockwiseOutlined,
} from '@lineiconshq/free-icons';

import PageBreadcrumb from '../../../components/common/PageBreadCrumb';
import PageMeta from '../../../components/common/PageMeta';
import Alert from '../../../components/ui/alert/Alert';
import type { Feedback } from '../../../components/ui/alert/types/AlertFeedback';
import Button from '../../../components/ui/button/Button';
import { useModal } from '../../../hooks/useModal';
import { imagesService } from '../../../service/images.service';
import type {
    CreateImageInput,
    Image,
    UpdateImageInput,
} from '../../../service/types/Images';

import DeleteImageModal from './components/DeleteImageModal';
import ImageFormModal from './components/ImageFormModal';
import ImageGallery from './components/ImageGallery';

export default function Images() {
    const [images, setImages] = useState<Image[]>([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [imageToDelete, setImageToDelete] = useState<Image | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { isOpen, openModal, closeModal } = useModal();

    const loadImages = async (clearFeedback = true) => {
        if (clearFeedback) setFeedback(null);
        setIsLoading(true);
        try {
            const { data, error } = await imagesService.getAll();
            if (error) throw error;
            setImages(data ?? []);
        } catch (error) {
            setFeedback({
                variant: 'error',
                title: 'No se pudieron cargar las imágenes.',
                message: getErrorMessage(error),
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const loadTimer = window.setTimeout(() => {
            void loadImages();
        }, 0);

        return () => window.clearTimeout(loadTimer);
    }, []);

    const filteredImages = useMemo(() => {
        const search = searchText.trim().toLocaleLowerCase();
        if (!search) return images;
        return images.filter((image) =>
            image.name.toLocaleLowerCase().includes(search),
        );
    }, [images, searchText]);

    const handleAdd = () => {
        setSelectedImage(null);
        openModal();
    };
    const handleEdit = (image: Image) => {
        setSelectedImage(image);
        openModal();
    };

    const handleSave = async (payload: CreateImageInput) => {
        setIsSaving(true);
        try {
            const result = selectedImage
                ? await imagesService.update({
                      ...payload,
                      id: selectedImage.id,
                  } satisfies UpdateImageInput)
                : await imagesService.create(payload);
            if (result.error) throw result.error;

            closeModal();
            setFeedback({
                variant: 'success',
                title: selectedImage
                    ? 'Imagen actualizada correctamente.'
                    : 'Imagen creada correctamente.',
                message: 'Los cambios ya fueron guardados.',
            });
            await loadImages(false);
        } catch (error) {
            setFeedback({
                variant: 'error',
                title: selectedImage
                    ? 'No se pudo actualizar la imagen.'
                    : 'No se pudo crear la imagen.',
                message: getErrorMessage(error),
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!imageToDelete) return;
        setIsDeleting(true);
        try {
            const { error } = await imagesService.remove({
                id: imageToDelete.id,
            });
            if (error) throw error;

            setImageToDelete(null);
            setFeedback({
                variant: 'success',
                title: 'Imagen eliminada correctamente.',
                message: 'La imagen ya no está disponible en la galería.',
            });
            await loadImages(false);
        } catch (error) {
            setFeedback({
                variant: 'error',
                title: 'No se pudo eliminar la imagen.',
                message: getErrorMessage(error),
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div>
            <PageMeta
                title="App Gym - Configuración de imágenes"
                description="Administración de imágenes"
            />
            <PageBreadcrumb pageTitle="Imágenes" />
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/3 xl:px-10 xl:py-12">
                <div className="mb-8 text-center">
                    <h3 className="mb-4 text-theme-xl font-semibold text-gray-800 dark:text-white/90 sm:text-2xl">
                        Galería de imágenes
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                        Administrá las imágenes disponibles en la aplicación.
                    </p>
                    {feedback && (
                        <div className="mt-4 text-left">
                            <Alert
                                variant={feedback.variant}
                                title={feedback.title}
                                message={feedback.message}
                            />
                        </div>
                    )}
                </div>
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="w-full md:max-w-md">
                        <label
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            htmlFor="image-search"
                        >
                            Buscar
                        </label>
                        <input
                            id="image-search"
                            value={searchText}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setSearchText(event.target.value)
                            }
                            placeholder="Buscar por nombre"
                            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                        />
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={loadImages}
                            disabled={isLoading}
                            startIcon={
                                <Lineicons
                                    icon={RefreshCircle1ClockwiseOutlined}
                                    size={20}
                                    color="grey"
                                />
                            }
                        >
                            Actualizar
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleAdd}
                            startIcon={
                                <Lineicons
                                    icon={PlusOutlined}
                                    size={20}
                                    color="white"
                                />
                            }
                        >
                            Agregar
                        </Button>
                    </div>
                </div>
                {!isLoading &&
                searchText &&
                !filteredImages.length &&
                images.length > 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                        No hay imágenes que coincidan con “{searchText}”.
                    </div>
                ) : (
                    <ImageGallery
                        images={filteredImages}
                        isLoading={isLoading}
                        onEdit={handleEdit}
                        onDelete={setImageToDelete}
                    />
                )}
            </div>
            <ImageFormModal
                isOpen={isOpen}
                image={selectedImage}
                onClose={closeModal}
                onSave={handleSave}
                isSaving={isSaving}
            />
            <DeleteImageModal
                image={imageToDelete}
                onClose={() => setImageToDelete(null)}
                onConfirm={handleDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
}

function getErrorMessage(error: unknown) {
    return error instanceof Error
        ? error.message
        : 'Intentá nuevamente en unos instantes.';
}
