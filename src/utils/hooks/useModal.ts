import { useState } from 'react';

export interface ModalApi {
	isOpen: boolean;
	toggle: () => void;
	open: () => void;
	close: () => void;
}

const useModal = (): ModalApi => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggle = () => setIsOpen(!isOpen);
	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);

	return {
		isOpen,
		toggle,
		open,
		close
	};
};

export default useModal;
