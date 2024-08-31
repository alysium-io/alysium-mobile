import { Keyboard } from 'react-native';

interface IUseKeyboard {
	dismiss: () => void;
}

const useKeyboard = (): IUseKeyboard => {
	const dismiss = () => Keyboard.dismiss();

	return {
		dismiss
	};
};

export default useKeyboard;
