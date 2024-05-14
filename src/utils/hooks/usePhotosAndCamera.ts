import { useTheme } from '@shopify/restyle';
import { Alert, Platform } from 'react-native';
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
			return new Promise((resolve, reject) => {
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
		const status = await check(
			Platform.OS === 'ios'
				? PERMISSIONS.IOS.CAMERA
				: PERMISSIONS.ANDROID.CAMERA
		);
		if (status === RESULTS.GRANTED) {
			return status;
		} else {
			// Request permission if not already granted
			return await request(
				Platform.OS === 'ios'
					? PERMISSIONS.IOS.CAMERA
					: PERMISSIONS.ANDROID.CAMERA
			);
		}
	};

	const requestPhotosPermissions = async (): Promise<PermissionStatus> => {
		const status = await check(
			Platform.OS === 'ios'
				? PERMISSIONS.IOS.PHOTO_LIBRARY
				: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
		);
		if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
			return status;
		} else {
			// Request permission if not already granted or if status is limited
			return await request(
				Platform.OS === 'ios'
					? PERMISSIONS.IOS.PHOTO_LIBRARY
					: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
			);
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
					console.log('Permission requried');
					console.log(permissionResult);
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
