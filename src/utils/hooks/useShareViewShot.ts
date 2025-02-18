import { usePhotosAndCamera } from '@hooks';
import { useRef } from 'react';
import { Share as RNShare } from 'react-native';
import { getBundleId } from 'react-native-device-info';
import Share, { Social } from 'react-native-share';
import Toast from 'react-native-toast-message';
import ViewShot, { captureRef } from 'react-native-view-shot';

interface IUseShareViewShot {
	viewShotRef: React.MutableRefObject<ViewShot | null>;
	shareIGStory: () => Promise<void>;
	shareiMessage: () => Promise<void>;
	shareVia: () => Promise<void>;
	captureWithOptions: () => Promise<void>;
}

const useShareViewShot = (url: string): IUseShareViewShot => {
	const viewShotRef = useRef<ViewShot>(null);
	const { saveImage } = usePhotosAndCamera();

	const shareIGStory = async () => {
		try {
			if (!viewShotRef.current) {
				Toast.show({
					text1: 'ViewShotRef Error',
					text2: 'Failed to share Instagram Story'
				});
				return;
			}

			const uri = await captureRef(viewShotRef, {
				format: 'png',
				quality: 1
			});

			await Share.shareSingle({
				social: Social.InstagramStories,
				appId: getBundleId(),
				backgroundImage: uri
			});
		} catch (error) {
			console.log(error);
			Toast.show({
				text1: 'Error',
				text2: 'Failed to share Instagram Story'
			});
		}
	};

	const shareiMessage = async () => {
		try {
			await Share.shareSingle({
				social: Social.Sms,
				recipient: '',
				message: '',
				url
			});
		} catch (error) {
			console.log(error);
			Toast.show({
				text1: 'Error',
				text2: 'Failed to share iMessage'
			});
		}
	};

	const shareVia = async () => {
		try {
			await RNShare.share({
				title: 'Share Via',
				message: '',
				url
			});
		} catch (error) {
			console.log(error);
			Toast.show({
				text1: 'Error',
				text2: 'Failed to share image'
			});
		}
	};

	const captureWithOptions = async () => {
		try {
			const uri = await captureRef(viewShotRef, {
				format: 'png',
				quality: 1
			});
			await saveImage(uri);
			Toast.show({
				text1: 'Success',
				text2: 'Image saved to camera roll',
				props: { icon: 'save' }
			});
		} catch (error) {
			console.error('Failed to capture view:', error);
			Toast.show({
				text1: 'Error',
				text2: 'Failed to save image'
			});
		}
	};

	return {
		viewShotRef,
		shareIGStory,
		shareiMessage,
		shareVia,
		captureWithOptions
	};
};

export default useShareViewShot;
