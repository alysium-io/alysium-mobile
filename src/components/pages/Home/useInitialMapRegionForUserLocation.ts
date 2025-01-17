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
		const { currentLocation, currentLocationData, hasLocation } =
			useCurrentLocationContext();

		// Calculate initial region from city viewport if available
		const initialRegion = useMemo(() => {
			const currentLocationLatitude = currentLocation?.latitude;
			const currentLocationLongitude = currentLocation?.longitude;

			// Case 1: We have the user's current location (latitude & longitude)
			if (hasLocation && currentLocationLatitude && currentLocationLongitude) {
				// Case 1.1: We have the user's current location and the city viewport
				const currentLocationViewport =
					currentLocationData?.cityResult.geometry.viewport;
				if (currentLocationViewport) {
					const { northeast, southwest } = currentLocationViewport;
					const currentLocationLatitudeDelta = northeast.lat - southwest.lat;
					const currentLocationLongitudeDelta = northeast.lng - southwest.lng;

					// Most ideal scenario, we have the user's current location and the city viewport
					return {
						latitude: currentLocationLatitude,
						longitude: currentLocationLongitude,
						latitudeDelta: currentLocationLatitudeDelta,
						longitudeDelta: currentLocationLongitudeDelta
					};
				} else {
					// Case 1.2: We have the user's current location and no city viewport
					return {
						latitude: currentLocationLatitude,
						longitude: currentLocationLongitude,
						latitudeDelta: DEFAULT_LAT_LNG_DELTA,
						longitudeDelta: DEFAULT_LAT_LNG_DELTA
					};
				}
			} else {
				// Case 2: We don't have the user's current location
				return {
					latitude: DEFAULT_LATITUDE,
					longitude: DEFAULT_LONGITUDE,
					latitudeDelta: DEFAULT_LAT_LNG_DELTA,
					longitudeDelta: DEFAULT_LAT_LNG_DELTA
				};
			}
		}, [currentLocation, currentLocationData]);

		return {
			initialRegion
		};
	};

export default useInitialMapRegionForUserLocation;
