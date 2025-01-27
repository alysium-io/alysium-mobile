import Toast from 'react-native-toast-message';

const usePermissionsToastError = () => {
	return {
		permissionsError: () =>
			Toast.show({
				text1: 'Error',
				text2: 'You are not authorized to edit this event'
			})
	};
};

export default usePermissionsToastError;
