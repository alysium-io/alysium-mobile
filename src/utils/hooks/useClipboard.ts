import { Vibrator } from '@etc';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast, { ToastShowParams } from 'react-native-toast-message';

interface IUseClipboard {
	copy: (text: string, toastProps?: ToastShowParams) => void;
}

const useClipboard = (): IUseClipboard => {
	const copy = (text: string, toastProps?: ToastShowParams) => {
		Vibrator.notificationSuccess();
		Clipboard.setString(text);
		Toast.show({
			text1: toastProps?.text1 ?? 'Copied to clipboard',
			text2: toastProps?.text2 ?? text,
			props: { icon: 'link' }
		});
	};

	return {
		copy
	};
};

export default useClipboard;
