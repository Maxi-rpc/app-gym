import { ChangeEvent, FormEvent, useState } from 'react';

import Alert from '../../../../components/ui/alert/Alert';
import Button from '../../../../components/ui/button/Button';
import { Modal } from '../../../../components/ui/modal';
import type { CreateImageInput, Image } from '../../../../service/types/Images';

type Props = {
    isOpen: boolean;
    image: Image | null;
    onClose: () => void;
    onSave: (payload: CreateImageInput) => Promise<void>;
    isSaving: boolean;
};
type ContentProps = Omit<Props, 'isOpen'>;

export default function ImageFormModal({
    isOpen,
    image,
    onClose,
    onSave,
    isSaving,
}: Props) {
    if (!isOpen) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-175 m-4">
            <ImageFormContent
                key={image?.id ?? 'new-image'}
                image={image}
                onClose={onClose}
                onSave={onSave}
                isSaving={isSaving}
            />
        </Modal>
    );
}

function ImageFormContent({ image, onClose, onSave, isSaving }: ContentProps) {
    const [name, setName] = useState(image?.name ?? '');
    const [url, setUrl] = useState(image?.source ?? '');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState(image?.source ?? '');
    const [error, setError] = useState('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] ?? null;
        if (selectedFile && !selectedFile.type.startsWith('image/')) {
            setError('El archivo seleccionado debe ser una imagen.');
            return;
        }
        setError('');
        setFile(selectedFile);
        setUrl('');
        setPreviewUrl(selectedFile ? URL.createObjectURL(selectedFile) : '');
    };

    const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        const source = event.target.value;
        setError('');
        setUrl(source);
        setFile(null);
        setPreviewUrl(source);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const source = url.trim();
        if (!file && !source) {
            setError(
                'Seleccioná un archivo de imagen o ingresá una URL antes de guardar.',
            );
            return;
        }
        await onSave({
            name: name.trim() || 'Imagen sin nombre',
            source: source || undefined,
            file: file ?? undefined,
        });
    };

    return (
        <div className="max-h-[90vh] overflow-y-auto p-6 dark:bg-gray-900 lg:p-11">
            <div className="mb-6 pr-12">
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                    {image ? 'Editar imagen' : 'Agregar imagen'}
                </h4>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Los cambios se guardarán en la galería de imágenes.
                </p>
            </div>
            {error && (
                <div className="mb-5">
                    <Alert variant="error" title={error} message="" />
                </div>
            )}
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="image-name"
                    >
                        Nombre
                    </label>
                    <input
                        id="image-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                        placeholder="Ej.: Logo principal"
                    />
                </div>
                <div>
                    <label
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="image-file"
                    >
                        Archivo de imagen
                    </label>
                    <input
                        id="image-file"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-brand-600 hover:file:bg-brand-100 dark:text-gray-400 dark:file:bg-white/[0.03] dark:file:text-brand-400"
                    />
                </div>
                <div className="relative py-1 text-center text-xs text-gray-400 before:absolute before:left-0 before:top-1/2 before:h-px before:w-[45%] before:bg-gray-200 after:absolute after:right-0 after:top-1/2 after:h-px after:w-[45%] after:bg-gray-200 dark:before:bg-gray-700 dark:after:bg-gray-700">
                    o
                </div>
                <div>
                    <label
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="image-url"
                    >
                        URL de la imagen
                    </label>
                    <input
                        id="image-url"
                        type="url"
                        value={url}
                        onChange={handleUrlChange}
                        className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                        placeholder="https://ejemplo.com/imagen.jpg"
                    />
                </div>
                {previewUrl && (
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Previsualización
                        </p>
                        <img
                            src={previewUrl}
                            alt="Previsualización de la imagen"
                            className="h-48 w-full rounded-xl border border-gray-200 object-contain dark:border-gray-700"
                            onError={() =>
                                setError(
                                    'No se pudo cargar la imagen indicada. Verificá la URL.',
                                )
                            }
                        />
                    </div>
                )}
                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isSaving}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? 'Guardando...' : 'Guardar'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
