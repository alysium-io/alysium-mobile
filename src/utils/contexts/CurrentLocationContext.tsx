import { locationApiSlice } from '@flux/api/location';
import { GeocodeResponseDto } from '@flux/api/location/types';
import {
	createUseContextHook,
	useCityAndCountryFromAddressComponents
} from '@hooks';
import Geolocation from '@react-native-community/geolocation';
import { AddressComponent, ProviderProps } from '@types';
import React, { createContext, useEffect, useState } from 'react';
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

export type CurrentLocationContextType = {
	currentLocation: LatLng | null | undefined;
	error: string | null;
	loading: boolean;
	hasLocation: boolean;
	currentLocationData?: GeocodeResponseDto | null;
	city?: AddressComponent | null;
	country?: AddressComponent | null;
};

export const CurrentLocationContext = createContext(
	{} as CurrentLocationContextType
);

export const CurrentLocationProvider: React.FC<ProviderProps> = ({
	children
}) => {
	const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [hasLocation, setHasLocation] = useState<boolean>(false);
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

	useEffect(() => {
		Geolocation.getCurrentPosition(
			(position: Position) => {
				setCurrentLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
				setHasLocation(true);
				setLoading(false);
			},
			(err: PositionError) => {
				setError(err.message);
				setHasLocation(false);
				setLoading(false);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
		);
	}, []);

	return (
		<CurrentLocationContext.Provider
			value={{
				currentLocation,
				error,
				loading,
				hasLocation,
				currentLocationData,
				city,
				country
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
