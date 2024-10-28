import { convert, Unit } from '@etc';
import { MediaType } from '@flux/api/media/types';
import { useTheme } from '@shopify/restyle';
import { getAssetMediaType } from '@src/etc/detect-media-type';
import { Alert, Linking, Platform } from 'react-native';
import {
	Asset,
	ImagePickerResponse,
	launchCamera,
	launchImageLibrary,
	MediaType as RNMediaType
} from 'react-native-image-picker';
import {
	check,
	PERMISSIONS,
	PermissionStatus,
	request,
	RESULTS
} from 'react-native-permissions';
import useToast from './useToast';

// Video constraints
const VIDEO_CONFIG = {
	DURATION_LIMIT_SECONDS: 45,
	MAX_FILE_SIZE_MB: 100,
	VIDEO_QUALITY: 'high' as const
} as const;

// Shared config for both video and photo
const SHARED_CONFIG = {
	QUALITY: 1,
	SELECTION_LIMIT: 1
} as const;

// Helper function to check if video exceeds size limit
const isVideoTooLarge = (fileSize: number): boolean => {
	return convert(fileSize, Unit.B, Unit.MB) > VIDEO_CONFIG.MAX_FILE_SIZE_MB;
};

const isVideoTooLong = (duration: number): boolean => {
	return duration > VIDEO_CONFIG.DURATION_LIMIT_SECONDS;
};

interface IUsePhotosAndCamera {
	chooseMediaOrTakeNew: (
		mediaType?: RNMediaType
	) => Promise<ImagePickerResponse | null>;
}

const usePhotosAndCamera = (): IUsePhotosAndCamera => {
	const { toastError } = useToast();
	const { mode } = useTheme();

	const handleApiResolve = async (fn: () => Promise<any>, resolve: any) =>
		fn().then((result: any) => resolve(result));

	const chooseMediaOrTakeNew = async (
		mediaType: RNMediaType = 'mixed'
	): Promise<ImagePickerResponse | null> => {
		return new Promise((resolve) => {
			Alert.alert(
				`Select media`,
				`Choose media from library or capture a new one`,
				[
					{
						text: 'Camera',
						onPress: () =>
							handleApiResolve(() => captureWithCamera(mediaType), resolve)
					},
					{
						text: 'Library',
						onPress: () =>
							handleApiResolve(() => chooseFromLibrary(mediaType), resolve)
					},
					{
						text: 'Cancel',
						style: 'destructive',
						onPress: () => resolve(null)
					}
				],
				{
					cancelable: true,
					userInterfaceStyle: mode
				}
			);
		});
	};

	const requestCameraPermissions = async (): Promise<PermissionStatus> => {
		const permission =
			Platform.OS === 'ios'
				? PERMISSIONS.IOS.CAMERA
				: PERMISSIONS.ANDROID.CAMERA;
		const status = await check(permission);

		if (status === RESULTS.GRANTED) {
			return status;
		} else if (status === RESULTS.BLOCKED) {
			Alert.alert(
				'Camera Permission Required: Open Settings',
				'Alysium requires access to the camera to allow you to capture photos and videos. This media will only be used within the app to personalize your account.',
				[
					{ text: 'Cancel', style: 'cancel' },
					{ text: 'Open Settings', onPress: () => Linking.openSettings() }
				]
			);
			return status;
		} else {
			return request(permission);
		}
	};

	const requestPhotosPermissions = async (): Promise<PermissionStatus> => {
		const permission =
			Platform.OS === 'ios'
				? PERMISSIONS.IOS.PHOTO_LIBRARY
				: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
		const status = await check(permission);

		if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
			return status;
		} else if (status === RESULTS.BLOCKED) {
			Alert.alert(
				'Photo Library Permission Required: Open Settings',
				'Alysium needs access to your photo library to allow you to choose existing photos and videos. We will only access the specific media you select to personalize your account.',
				[
					{ text: 'Cancel', style: 'cancel' },
					{ text: 'Open Settings', onPress: () => Linking.openSettings() }
				]
			);
			return status;
		} else {
			return request(permission);
		}
	};

	const chooseFromLibrary = async (
		mediaType: RNMediaType = 'mixed'
	): Promise<ImagePickerResponse | null> => {
		try {
			const permissionResult = await requestPhotosPermissions();
			if (
				permissionResult === RESULTS.GRANTED ||
				permissionResult === RESULTS.LIMITED
			) {
				const result = await launchImageLibrary({
					mediaType,
					quality: SHARED_CONFIG.QUALITY,
					selectionLimit: SHARED_CONFIG.SELECTION_LIMIT,
					videoQuality: 'high'
				});

				// If we chose nothing or canceled the operation
				if (!result || result.didCancel) {
					return null;
				}

				// Do any asset validation before returning
				const asset = result?.assets?.[0];
				if (asset) {
					const assetMediaType = getAssetMediaType(asset);
					if (assetMediaType === MediaType.video) {
						if (!isVideoAssetValid(asset)) {
							return null;
						}
					}
				}

				return result;
			} else {
				return null;
			}
		} catch (err) {
			console.log(`Something bad happened: ${err}`);
			toastError('An error occurred while selecting media. Please try again.');
			return null;
		}
	};

	const captureWithCamera = async (
		mediaType: RNMediaType = 'photo'
	): Promise<ImagePickerResponse | null> => {
		try {
			const permissionResult = await requestCameraPermissions();
			if (permissionResult === RESULTS.GRANTED) {
				const result = await launchCamera({
					mediaType,
					quality: 1,
					videoQuality: 'high' // Added for video
				});
				return result;
			} else {
				return null;
			}
		} catch (err) {
			console.log(`Something bad happened: ${err}`);
			return null;
		}
	};

	const isVideoAssetValid = (asset: Asset): boolean => {
		const duration = asset.duration;
		const fileSize = asset.fileSize;
		if (!duration || !fileSize) {
			toastError('Invalid video content.');
			return false;
		}

		if (isVideoTooLong(duration)) {
			const videoLimitString =
				VIDEO_CONFIG.DURATION_LIMIT_SECONDS.toLocaleString();
			toastError(`Videos cannot be longer than ${videoLimitString} seconds.`);
			return false;
		}

		if (isVideoTooLarge(fileSize)) {
			const videoLimitString = VIDEO_CONFIG.MAX_FILE_SIZE_MB.toLocaleString();
			const videoSizeMBString = Math.round(
				convert(fileSize, Unit.B, Unit.MB)
			).toLocaleString();
			toastError(
				`${videoSizeMBString}MB video exceeds the ${videoLimitString}MB limit.`
			);
			return false;
		}

		return true;
	};

	return {
		chooseMediaOrTakeNew
	};
};

export default usePhotosAndCamera;
