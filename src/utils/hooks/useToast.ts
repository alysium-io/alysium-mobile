import Toast from 'react-native-toast-message';

interface IUseToast {
	toastError: (msg?: string) => void;
	toastSuccess: (msg?: string) => void;
}

const useToast = (): IUseToast => {
	const toastError = (msg?: string) => {
		Toast.show({
			type: 'error',
			text1: 'Error',
			text2: msg || 'This one is on us... it may work if you try again.'
		});
	};

	const toastSuccess = (msg?: string) => {
		Toast.show({
			type: 'success',
			text1: 'Success',
			text2: msg || 'Great success!'
		});
	};

	return {
		toastError,
		toastSuccess
	};
};

export default useToast;
