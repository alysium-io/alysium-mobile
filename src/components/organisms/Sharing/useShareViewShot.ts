import { usePhotosAndCamera, useToast } from '@hooks';
import { Alert } from '@templates';
import { useRef } from 'react';
import { Share as RNShare } from 'react-native';
import { getBundleId } from 'react-native-device-info';
import Share, { Social } from 'react-native-share';
import ViewShot, { captureRef } from 'react-native-view-shot';

interface IUseShareViewShot {
	viewShotRef: React.MutableRefObject<ViewShot | null>;
	shareIGStory: () => Promise<void>;
	shareiMessage: () => Promise<void>;
	shareVia: () => Promise<void>;
	captureWithOptions: () => Promise<void>;
}

const useShareViewShot = (url: string): IUseShareViewShot => {
	const { toastSuccess } = useToast();
	const { saveImage } = usePhotosAndCamera();
	const viewShotRef = useRef<ViewShot>(null);

	const shareIGStory = async () => {
		try {
			if (!viewShotRef.current) {
				throw new Error('ViewShot ref not ready');
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
			Alert.error();
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
			Alert.error();
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
			Alert.error();
		}
	};

	const captureWithOptions = async () => {
		try {
			const uri = await captureRef(viewShotRef, {
				format: 'png',
				quality: 0.8
			});
			await saveImage(uri);
			toastSuccess('Image saved to camera roll');
		} catch (error) {
			console.error('Failed to capture view:', error);
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
