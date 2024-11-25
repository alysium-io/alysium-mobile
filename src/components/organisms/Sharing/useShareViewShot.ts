import { useToast } from '@hooks';
import Clipboard from '@react-native-clipboard/clipboard';
import { useRef } from 'react';
import { Alert, Share as RNShare } from 'react-native';
import { getBundleId } from 'react-native-device-info';
import Share, { Social } from 'react-native-share';
import ViewShot, { captureRef } from 'react-native-view-shot';

interface IUseShareViewShot {
	viewShotRef: React.MutableRefObject<ViewShot | null>;
	shareIGStory: () => Promise<void>;
	shareiMessage: () => Promise<void>;
	shareVia: () => Promise<void>;
	copyToClipboard: () => void;
}

const useShareViewShot = (url: string): IUseShareViewShot => {
	const { toastSuccess } = useToast();

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
			Alert.alert(
				'Sharing Error',
				'There was an error sharing the content. Please try again.'
			);
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
			Alert.alert(
				'Sharing Error',
				'There was an error sharing the content. Please try again.'
			);
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
			Alert.alert('Error sharing', 'An error occurred while trying to share');
		}
	};

	const copyToClipboard = () => {
		Clipboard.setString(url);
		toastSuccess('Link copied to clipboard');
	};

	return {
		viewShotRef,
		shareIGStory,
		shareiMessage,
		shareVia,
		copyToClipboard
	};
};

export default useShareViewShot;
