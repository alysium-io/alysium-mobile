import { convert, Unit } from '@etc';
import { MediaType } from '@flux/api/media/types';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { captureException } from '@sentry/react-native';
import { getAssetMediaType } from '@src/etc/detect-media-type';
import { Alert } from '@templates';
import { Linking, Platform } from 'react-native';
import {
	Asset,
	ImageLibraryOptions,
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
import Toast from 'react-native-toast-message';

// Video constraints
const VIDEO_CONFIG = {
	DURATION_LIMIT_SECONDS: 61,
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
		mediaType?: RNMediaType,
		config?: Partial<ImageLibraryOptions>
	) => Promise<ImagePickerResponse | null>;
	extractAsset: (response: ImagePickerResponse | null) => Asset | null;
	saveImage: (uri: string) => Promise<string | boolean>;
	hasImageSavePermissions: () => Promise<boolean>;
	openPhotoInGallery: (assetUrl?: string) => void;
}

const usePhotosAndCamera = (): IUsePhotosAndCamera => {
	const handleApiResolve = async (fn: () => Promise<any>, resolve: any) =>
		fn().then((result: any) => resolve(result));

	const requestSavePermissions = async (): Promise<PermissionStatus> => {
		if (Platform.OS === 'android') {
			const permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
			const status = await check(permission);

			if (status === RESULTS.GRANTED) {
				return status;
			} else if (status === RESULTS.BLOCKED) {
				Alert.alert(
					'Storage Permission Required: Open Settings',
					'Permission to save images to your device is required. Please enable it in settings.',
					[
						{ text: 'Cancel', style: 'cancel' },
						{ text: 'Open Settings', onPress: () => Linking.openSettings() }
					]
				);
				return status;
			} else {
				return request(permission);
			}
		} else {
			// iOS requires photo library permission for saving
			const permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
			const status = await check(permission);

			if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
				return status;
			} else if (status === RESULTS.BLOCKED) {
				Alert.alert(
					'Photo Library Permission Required: Open Settings',
					'Permission to save images to your photo library is required. Please enable it in settings.',
					[
						{ text: 'Cancel', style: 'cancel' },
						{ text: 'Open Settings', onPress: () => Linking.openSettings() }
					]
				);
				return status;
			} else {
				return request(permission);
			}
		}
	};

	const hasImageSavePermissions = async (): Promise<boolean> => {
		try {
			const status = await requestSavePermissions();
			return status === RESULTS.GRANTED || status === RESULTS.LIMITED;
		} catch (error) {
			console.error('Error checking save permissions:', error);
			return false;
		}
	};

	const saveImage = async (uri: string): Promise<string | boolean> => {
		try {
			const hasPermission = await hasImageSavePermissions();
			if (!hasPermission) {
				return false;
			}

			const result = await CameraRoll.saveAsset(uri, {
				type: 'photo'
			});

			return result.node.image.uri || true;
		} catch (error) {
			Toast.show({
				text1: 'Error',
				text2: 'Failed to save image. Please try again.'
			});
			return false;
		}
	};

	const openPhotoInGallery = (assetUrl?: string) => {
		try {
			if (Platform.OS === 'ios') {
				// On iOS, if we have a specific asset URL, try to open it directly
				// Format could be like: assets-library://asset/asset.JPG?id=...
				if (assetUrl && assetUrl.startsWith('assets-library://')) {
					Linking.openURL(assetUrl).catch(() => {
						// If we can't open the specific photo, open the Photos app
						Linking.openURL('photos-redirect://');
					});
				} else {
					// If no specific asset URL, just open the Photos app
					Linking.openURL('photos-redirect://');
				}
			} else if (Platform.OS === 'android') {
				// On Android, open the gallery
				Linking.openURL('content://media/internal/images/media');
			} else {
				console.log('Could not open photo gallery app');
			}
		} catch (error) {
			captureException(error);
			Toast.show({
				text1: 'Error',
				text2: 'Could not open photo gallery'
			});
		}
	};

	const chooseMediaOrTakeNew = async (
		mediaType: RNMediaType = 'mixed',
		config?: Partial<ImageLibraryOptions>
	): Promise<ImagePickerResponse | null> => {
		return new Promise((resolve) => {
			Alert.alert(
				'Select media',
				'Choose media from library or capture a new one',
				[
					{
						text: 'Camera',
						onPress: () =>
							handleApiResolve(() => captureWithCamera(mediaType), resolve),
						style: 'accent'
					},
					{
						text: 'Library',
						onPress: () =>
							handleApiResolve(async () => {
								return new Promise((res) => {
									setTimeout(async () => {
										const result = await chooseFromLibrary(mediaType, config);
										res(result);
									}, 500);
								});
							}, resolve),
						style: 'accent'
					},
					{
						text: 'Cancel',
						style: 'cancel',
						onPress: () => resolve(null)
					}
				]
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
		mediaType: RNMediaType = 'mixed',
		config?: Partial<ImageLibraryOptions>
	): Promise<ImagePickerResponse | null> => {
		try {
			const permissionResult = await requestPhotosPermissions();
			if (
				permissionResult === RESULTS.GRANTED ||
				permissionResult === RESULTS.LIMITED
			) {
				const result = await launchImageLibrary({
					mediaType,
					videoQuality: 'high',
					includeExtra: true, // this allows us to get the timestamp of the media
					...{
						...SHARED_CONFIG,
						...config
					}
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
			Toast.show({
				text1: 'Error',
				text2: 'An error occurred while selecting media. Please try again.'
			});
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
			Toast.show({
				text1: 'Error',
				text2: 'Invalid video content.'
			});
			return false;
		}

		if (isVideoTooLong(duration)) {
			const videoLimitString =
				VIDEO_CONFIG.DURATION_LIMIT_SECONDS.toLocaleString();
			Toast.show({
				text1: 'Error',
				text2: `Videos cannot be longer than ${videoLimitString} seconds.`
			});
			return false;
		}

		if (isVideoTooLarge(fileSize)) {
			const videoLimitString = VIDEO_CONFIG.MAX_FILE_SIZE_MB.toLocaleString();
			const videoSizeMBString = Math.round(
				convert(fileSize, Unit.B, Unit.MB)
			).toLocaleString();
			Toast.show({
				text1: 'Error',
				text2: `${videoSizeMBString}MB video exceeds the ${videoLimitString}MB limit.`
			});
			return false;
		}

		return true;
	};

	const extractAsset = (response: ImagePickerResponse | null): Asset | null => {
		if (!response || !response.assets || response.assets.length === 0) {
			return null;
		}

		return response.assets[0];
	};

	return {
		chooseMediaOrTakeNew,
		extractAsset,
		saveImage,
		hasImageSavePermissions,
		openPhotoInGallery
	};
};

export default usePhotosAndCamera;
