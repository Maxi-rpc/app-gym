import { Modal } from "../../../../components/ui/modal";
import FormDelete from "./FormDelete";

import { Pay } from "../types/Pay";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: () => void | undefined;
	defaultData: Pay | null;
};

export default function ModalDelete({
	isOpen,
	onClose,
	onSubmit,
	defaultData,
}: Props) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} className="max-w-175 m-4">
			<div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
				<div className="px-2 pr-14">
					<h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
						Eliminar Registro: {defaultData?.clientid} {defaultData?.email}
					</h4>
				</div>

				<FormDelete
					onClose={onClose}
					onSubmit={onSubmit}
					deleteText={defaultData?.email}
				/>
			</div>
		</Modal>
	);
}
