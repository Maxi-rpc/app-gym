import { Lineicons } from '@lineiconshq/react-lineicons';
import { Pencil1Outlined, Trash3Outlined } from '@lineiconshq/free-icons';
import type { Image } from '../../../../service/types/Images';

type Props = {
    images: Image[];
    isLoading: boolean;
    onEdit: (image: Image) => void;
    onDelete: (image: Image) => void;
};

export default function ImageGallery({
    images,
    isLoading,
    onEdit,
    onDelete,
}: Props) {
    if (isLoading)
        return (
            <p className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                Cargando imágenes...
            </p>
        );
    if (!images.length)
        return (
            <div className="rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-white/90">
                    No hay imágenes para mostrar
                </h4>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Agregá una imagen para verla en esta galería.
                </p>
            </div>
        );
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {images.map((image) => (
                <article
                    key={image.id}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
                >
                    <img
                        src={image.source}
                        alt={image.name}
                        className="h-48 w-full bg-gray-50 object-cover dark:bg-gray-800"
                    />
                    <div className="flex items-center justify-between gap-3 p-4">
                        <p
                            className="min-w-0 truncate text-sm font-medium text-gray-800 dark:text-white/90"
                            title={image.name}
                        >
                            {image.name}
                        </p>
                        <div className="flex shrink-0 gap-2">
                            <button
                                aria-label={`Editar ${image.name}`}
                                onClick={() => onEdit(image)}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                <Lineicons icon={Pencil1Outlined} size={18} />
                            </button>
                            <button
                                aria-label={`Eliminar ${image.name}`}
                                onClick={() => onDelete(image)}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-error-500 hover:bg-error-50 dark:border-gray-700 dark:hover:bg-error-500/10"
                            >
                                <Lineicons icon={Trash3Outlined} size={18} />
                            </button>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
