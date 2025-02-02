import { locationApiSlice } from '@flux/api/location';
import {
	GeocodeResponseDto,
	GoogleMapsAutocompleteResult
} from '@flux/api/location/types';
import { useMap, usePersistedHomeMapState } from '@hooks';
import { useCurrentLocationContext } from '@src/utils/contexts/CurrentLocationContext';
import { useEffect, useMemo } from 'react';
import { Region } from 'react-native-maps';
import Toast from 'react-native-toast-message';

interface IUseHomeMapState {
	region: Region;
	city: GeocodeResponseDto | null;
	onSelectCurrentLocation: () => void;
	onSelectCity: (citySearchResult: GoogleMapsAutocompleteResult) => void;
}

const useHomeMapState = (): IUseHomeMapState => {
	const { geometryToRegion } = useMap();
	const [geocodePlaceId] = locationApiSlice.useLazyGeocodePlaceIdQuery();
	const [geocodeLatLng] = locationApiSlice.useLazyGeocodeLatLngQuery();
	const { userRegion, currentLocationData, initCurrentLocation } =
		useCurrentLocationContext();
	const { region, city, defaultRegion, setPersistedHomeMapState } =
		usePersistedHomeMapState();

	const defaultUserRegion = useMemo(
		() => ({
			latitude: userRegion?.latitude ?? defaultRegion.latitude,
			longitude: userRegion?.longitude ?? defaultRegion.longitude,
			latitudeDelta: userRegion?.latitudeDelta ?? defaultRegion.latitudeDelta,
			longitudeDelta: userRegion?.longitudeDelta ?? defaultRegion.longitudeDelta
		}),
		[userRegion, defaultRegion]
	);

	useEffect(() => {
		/**
		 * This will only run on the very first time the user opens the map.
		 * The purpose of this is to get the current city information from
		 * the default latitude and longitude, which is currently set to Los Angeles.
		 * Once the city is filled and persisted, it will never again be null,
		 * because it will only update from there on out when the user selects a city.
		 */
		if (city === null) {
			geocodeLatLng({
				query: {
					latitude: region.latitude,
					longitude: region.longitude
				}
			}).then(({ data }) => {
				if (data) {
					setPersistedHomeMapState({ city: data });
				}
			});
		}
	}, [region]);

	useEffect(() => {
		/**
		 * This asks the user for their permission to use their current location.
		 * If they grant permission, then geocode their current location and
		 * set the active region and city to their current location.
		 */
		initCurrentLocation().then(({ status, location }) => {
			if (status && location && city === null) {
				geocodeLatLng({
					query: location
				}).then(({ data }) => {
					if (data) {
						const newRegion = geometryToRegion(data.cityResult.geometry);
						setPersistedHomeMapState({ region: newRegion, city: data });
					}
				});
			}
		});
	}, []);

	const onSelectCurrentLocation = () => {
		setPersistedHomeMapState({
			region: defaultUserRegion,
			city: currentLocationData ?? null
		});
	};

	const onSelectCity = async (
		citySearchResult: GoogleMapsAutocompleteResult
	) => {
		try {
			const { data } = await geocodePlaceId({
				query: {
					place_id: citySearchResult.place_id
				}
			});
			if (data) {
				const newRegion = geometryToRegion(data.cityResult.geometry);
				setPersistedHomeMapState({ region: newRegion, city: data });
			} else {
				Toast.show({
					text1: 'Error',
					text2: 'Failed to select city'
				});
			}
		} catch (error) {
			Toast.show({
				text1: 'Error',
				text2: 'Failed to select city'
			});
		}
	};

	return {
		region,
		city,
		onSelectCurrentLocation,
		onSelectCity
	};
};

export default useHomeMapState;
