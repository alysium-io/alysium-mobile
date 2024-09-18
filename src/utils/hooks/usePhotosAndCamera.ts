import { useTheme } from '@shopify/restyle';
import { Alert, Linking, Platform } from 'react-native';
import {
	ImagePickerResponse,
	launchCamera,
	launchImageLibrary
} from 'react-native-image-picker';
import {
	PERMISSIONS,
	PermissionStatus,
	RESULTS,
	check,
	request
} from 'react-native-permissions';

interface IUsePhotosAndCamera {
	chooseImageOrTakeNewPhoto: () => Promise<ImagePickerResponse | null>;
}

const usePhotosAndCamera = (): IUsePhotosAndCamera => {
	const { mode } = useTheme();

	const handleApiResolve = async (fn: () => any, resolve: any) =>
		fn().then((result: any) => resolve(result));

	const requestPhotosOrCameraForImage =
		async (): Promise<ImagePickerResponse | null> => {
			return new Promise((resolve) => {
				Alert.alert(
					'Select Image',
					'Choose an image from library or take a new one',
					[
						{
							text: 'Camera',
							onPress: () => handleApiResolve(takePictureWithCamera, resolve)
						},
						{
							text: 'Library',
							onPress: () => handleApiResolve(chooseImageFromLibrary, resolve)
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
			// If blocked, prompt the user to open settings
			Alert.alert(
				'Camera Permission Required: Open Settings',
				'Alysium requires access to the camera to allow you to take and set a profile picture. This photo will only be used within the app to personalize your account.',
				[
					{ text: 'Cancel', style: 'cancel' },
					{ text: 'Open Settings', onPress: () => Linking.openSettings() }
				]
			);
			return status;
		} else {
			// Request permission if not already granted
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
			// If blocked, prompt the user to open settings
			Alert.alert(
				'Photo Library Permission Required: Open Settings',
				'Alysium needs access to your photo library to allow you to choose an existing photo as your profile picture. We will only access the specific image you select to personalize your account.',
				[
					{ text: 'Cancel', style: 'cancel' },
					{ text: 'Open Settings', onPress: () => Linking.openSettings() }
				]
			);
			return status;
		} else {
			// Request permission if not already granted or if status is limited
			return request(permission);
		}
	};

	const chooseImageFromLibrary =
		async (): Promise<ImagePickerResponse | null> => {
			try {
				const permissionResult = await requestPhotosPermissions();
				if (
					permissionResult === RESULTS.GRANTED ||
					permissionResult === RESULTS.LIMITED
				) {
					const result = await launchImageLibrary({
						mediaType: 'photo',
						quality: 1,
						selectionLimit: 1
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

	const takePictureWithCamera =
		async (): Promise<ImagePickerResponse | null> => {
			try {
				const permissionResult = await requestCameraPermissions();
				if (permissionResult === RESULTS.GRANTED) {
					const result = await launchCamera({ mediaType: 'photo', quality: 1 });
					return result;
				} else {
					return null;
				}
			} catch (err) {
				console.log(`Something bad happened: ${err}`);
				return null;
			}
		};

	const chooseImageOrTakeNewPhoto =
		async (): Promise<ImagePickerResponse | null> => {
			return requestPhotosOrCameraForImage();
		};

	return {
		chooseImageOrTakeNewPhoto
	};
};

export default usePhotosAndCamera;
