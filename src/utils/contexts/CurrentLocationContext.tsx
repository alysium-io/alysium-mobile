import { locationApiSlice } from '@flux/api/location';
import { GeocodeResponseDto } from '@flux/api/location/types';
import {
	createUseContextHook,
	useCityAndCountryFromAddressComponents,
	useMap
} from '@hooks';
import Geolocation from '@react-native-community/geolocation';
import { AddressComponent, ProviderProps } from '@types';
import React, { createContext, useMemo, useState } from 'react';
import { LatLng } from 'react-native-maps';

interface Coordinates {
	latitude: number;
	longitude: number;
	altitude: number | null;
	accuracy: number;
	altitudeAccuracy: number | null;
	heading: number | null;
	speed: number | null;
}

interface Position {
	coords: Coordinates;
	timestamp: number;
}

interface PositionError {
	code: number;
	message: string;
}

type InitUserCurrentLocationResponse = {
	status: boolean;
	location: LatLng | null;
};

// This is the same as the `Region` type, but with optional `latitudeDelta` and `longitudeDelta`
// because we might not have the city viewport.
type UserRegion = LatLng & {
	latitudeDelta?: number;
	longitudeDelta?: number;
};

export type CurrentLocationContextType = {
	currentLocation: LatLng | null | undefined;
	error: string | null;
	loading: boolean;
	hasLocation: boolean;
	currentLocationData?: GeocodeResponseDto | null;
	city?: AddressComponent | null;
	country?: AddressComponent | null;
	initCurrentLocation: () => Promise<InitUserCurrentLocationResponse>;
	userRegion: UserRegion | null;
};

export const CurrentLocationContext = createContext(
	{} as CurrentLocationContextType
);

export const CurrentLocationProvider: React.FC<ProviderProps> = ({
	children
}) => {
	/**
	 * This hook provides all data related to the user's current location for
	 * the entire application.
	 */
	const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [hasLocation, setHasLocation] = useState<boolean>(false);
	const { viewportToRegion } = useMap();

	const { data: currentLocationData } = locationApiSlice.useGeocodeLatLngQuery(
		{
			query: {
				latitude: currentLocation?.latitude || 0,
				longitude: currentLocation?.longitude || 0
			}
		},
		{ skip: !currentLocation }
	);

	const { city, country } = useCityAndCountryFromAddressComponents(
		currentLocationData?.cityResult.address_components
	);

	const initCurrentLocation =
		async (): Promise<InitUserCurrentLocationResponse> => {
			/**
			 * The purpose of this function is to initialize the user's current location
			 * in the application.
			 *
			 * If permissions have not yet been granted, this function will prompt the user
			 * to grant permissions.
			 *
			 * If permissions have been denied, then nothing will happen.
			 */
			return new Promise((resolve) => {
				Geolocation.requestAuthorization(
					() => {
						// console.log('User granted location permissions');
						Geolocation.getCurrentPosition(
							(position: Position) => {
								setCurrentLocation({
									latitude: position.coords.latitude,
									longitude: position.coords.longitude
								});
								setHasLocation(true);
								setLoading(false);
								resolve({
									status: true,
									location: {
										latitude: position.coords.latitude,
										longitude: position.coords.longitude
									}
								});
							},
							(err: PositionError) => {
								setError(err.message);
								setHasLocation(false);
								setLoading(false);
								resolve({
									status: false,
									location: null
								});
							},
							{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
						);
					},
					(error) => {
						// console.log('Error requesting user location authorization', error);
						resolve({
							status: false,
							location: null
						});
					}
				);
			});
		};

	const userRegion = useMemo(() => {
		const currentLocationLatitude = currentLocation?.latitude;
		const currentLocationLongitude = currentLocation?.longitude;
		const viewport = currentLocationData?.cityResult.geometry.viewport;

		if (hasLocation && currentLocationLatitude && currentLocationLongitude) {
			if (viewport) {
				const { latitudeDelta, longitudeDelta } = viewportToRegion(viewport);
				return {
					latitude: currentLocationLatitude,
					longitude: currentLocationLongitude,
					latitudeDelta,
					longitudeDelta
				};
			} else {
				return {
					latitude: currentLocationLatitude,
					longitude: currentLocationLongitude,
					latitudeDelta: undefined,
					longitudeDelta: undefined
				};
			}
		}

		return null;
	}, [currentLocation, currentLocationData, hasLocation, viewportToRegion]);

	return (
		<CurrentLocationContext.Provider
			value={{
				currentLocation,
				error,
				loading,
				hasLocation,
				currentLocationData,
				city,
				country,
				initCurrentLocation,
				userRegion
			}}
		>
			{children}
		</CurrentLocationContext.Provider>
	);
};

export const useCurrentLocationContext =
	createUseContextHook<CurrentLocationContextType>(
		CurrentLocationContext,
		'CurrentLocationContext'
	);
