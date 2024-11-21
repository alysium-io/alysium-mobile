import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
	PERMISSIONS,
	Permission,
	RESULTS,
	check,
	request
} from 'react-native-permissions';

const LOCATION_PERMISSION = Platform.select({
	ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
	android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
}) as Permission;

const useLocationPermissions = () => {
	const [hasPermission, setHasPermission] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const checkPermission = async () => {
		try {
			const result = await check(LOCATION_PERMISSION);
			setHasPermission(result === RESULTS.GRANTED);
		} catch (error) {
			console.error('Error checking location permission:', error);
			setHasPermission(false);
		} finally {
			setIsLoading(false);
		}
	};

	const requestPermission = async () => {
		try {
			setIsLoading(true);
			const result = await request(LOCATION_PERMISSION);
			setHasPermission(result === RESULTS.GRANTED);
		} catch (error) {
			console.error('Error requesting location permission:', error);
			setHasPermission(false);
		} finally {
			setIsLoading(false);
		}
	};

	// Check permission on mount
	useEffect(() => {
		checkPermission();
	}, []);

	return {
		hasPermission,
		isLoading,
		requestPermission,
		checkPermission
	};
};

export default useLocationPermissions;
