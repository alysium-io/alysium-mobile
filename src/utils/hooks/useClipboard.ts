import { Vibrator } from '@etc';
import Clipboard from '@react-native-clipboard/clipboard';
import useToast from './useToast';

interface IUseClipboard {
	copy: (text: string, message?: string) => void;
}

const useClipboard = (): IUseClipboard => {
	const { toastSuccess } = useToast();

	const copy = (text: string, message?: string) => {
		Vibrator.notificationSuccess();
		Clipboard.setString(text);
		toastSuccess(message || 'Copied to clipboard');
	};

	return {
		copy
	};
};

export default useClipboard;
