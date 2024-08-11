import { Linking } from 'react-native';

interface IUseLinking {
	go: () => void;
}

const useLinking = (mobileUrl: string, webUrl: string): IUseLinking => {
	const go = async () => {
		const supported = await Linking.canOpenURL(mobileUrl);
		if (supported) {
			await Linking.openURL(mobileUrl);
		} else {
			await Linking.openURL(webUrl);
		}
	};

	return {
		go
	};
};

export default useLinking;
