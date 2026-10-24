import Button from '../../../../components/ui/button/Button';
import { Modal } from '../../../../components/ui/modal';
import type { Image } from '../../../../service/types/Images';

type Props = {
    image: Image | null;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    isDeleting: boolean;
};

export default function DeleteImageModal({
    image,
    onClose,
    onConfirm,
    isDeleting,
}: Props) {
    return (
        <Modal
            isOpen={Boolean(image)}
            onClose={onClose}
            className="max-w-md m-4"
        >
            <div className="p-6 dark:bg-gray-900 lg:p-8">
                <h4 className="pr-10 text-xl font-semibold text-gray-800 dark:text-white/90">
                    Eliminar imagen
                </h4>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    ¿Querés eliminar “{image?.name}”? Esta acción eliminará la
                    imagen guardada y no se puede deshacer.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancelar
                    </Button>
                    <Button
                        className="bg-error-500 hover:bg-error-600 disabled:bg-error-300"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
