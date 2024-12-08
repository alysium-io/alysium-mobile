import { Linking } from 'react-native';

interface IusePhone {
	call: (phoneNumber: string) => Promise<void>;
}

const usePhone = (): IusePhone => {
	const call = async (phoneNumber: string) => {
		try {
			await Linking.openURL(`tel:${phoneNumber}`);
		} catch (error) {
			console.error('Error making phone call:', error);
		}
	};

	return {
		call
	};
};

export default usePhone;
