import { useCurrentLocationContext } from '@src/utils/contexts';
import { useMemo } from 'react';
import { Region } from 'react-native-maps';

// Default location for San Francisco
const DEFAULT_LATITUDE = 37.785834;
const DEFAULT_LONGITUDE = -122.406417;

// Default latitude and longitude delta
const DEFAULT_LAT_LNG_DELTA = 0.35;

interface IUseInitialMapRegionForUserLocation {
	initialRegion: Region;
}

const useInitialMapRegionForUserLocation =
	(): IUseInitialMapRegionForUserLocation => {
		const { currentLocation, currentLocationData, userRegion } =
			useCurrentLocationContext();

		const initialRegion = useMemo(() => {
			// Case 1: If we have the user's current location, use it
			// Default a default LAT/LNG delta if not present in the userRegion
			if (userRegion) {
				return {
					...userRegion,
					latitudeDelta: userRegion.latitudeDelta ?? DEFAULT_LAT_LNG_DELTA,
					longitudeDelta: userRegion.longitudeDelta ?? DEFAULT_LAT_LNG_DELTA
				};
			}

			// Case 2: We don't have the user's current location
			return {
				latitude: DEFAULT_LATITUDE,
				longitude: DEFAULT_LONGITUDE,
				latitudeDelta: DEFAULT_LAT_LNG_DELTA,
				longitudeDelta: DEFAULT_LAT_LNG_DELTA
			};
		}, [currentLocation, currentLocationData]);

		return {
			initialRegion
		};
	};

export default useInitialMapRegionForUserLocation;
