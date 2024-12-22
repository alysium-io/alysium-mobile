import { useCallback, useState } from 'react';

export interface DisclosureApi {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	onToggle: () => void;
}

const useDisclosure = (initialState = false): DisclosureApi => {
	const [isOpen, setIsOpen] = useState<boolean>(initialState);

	const onOpen = useCallback(() => setIsOpen(true), []);
	const onClose = useCallback(() => setIsOpen(false), []);
	const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

	return { isOpen, onOpen, onClose, onToggle };
};

export default useDisclosure;
