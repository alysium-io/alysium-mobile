import { Linking } from 'react-native';

interface IUseLinking {
	go: (url: string) => void;
}

const useLinking = (): IUseLinking => {
	const go = async (url: string) => {
		try {
			// Ensure URL has proper protocol
			let properUrl = url;
			if (!url.match(/^[a-zA-Z]+:\/\//)) {
				properUrl = `https://${url}`;
			}

			const supported = await Linking.canOpenURL(properUrl);
			if (supported) {
				return Linking.openURL(properUrl);
			}
		} catch (e) {
			console.log(`An error occurred: ${e}`);
		}
	};

	return {
		go
	};
};

export default useLinking;
