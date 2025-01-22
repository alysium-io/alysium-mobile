import { locationApiSlice } from '@flux/api/location';
import {
	GeocodeResponseDto,
	GoogleMapsAutocompleteResult
} from '@flux/api/location/types';
import { useSheet } from '@hooks';
import { BasePage, useInitialMapRegionForUserLocation } from '@organisms';
import { useCurrentLocationContext } from '@src/utils/contexts';
import React, { useState } from 'react';
import { Region } from 'react-native-maps';
import EventMap from './components/EventMap';
import HomePageHeader from './Home.header';
import ChooseCitySheet from './sheets/ChooseCitySheet';

const HomePage = () => {
	const chooseCitySheetApi = useSheet();
	const { currentLocationData } = useCurrentLocationContext();
	const { initialRegion } = useInitialMapRegionForUserLocation();
	const [region, setRegion] = useState<Region>(initialRegion);
	const [currentCity, setCurrentCity] = useState<GeocodeResponseDto | null>(
		currentLocationData ?? null
	);
	const [geocodePlaceId] = locationApiSlice.useLazyGeocodePlaceIdQuery();

	const onChooseSearchCity = async (
		city: GoogleMapsAutocompleteResult | 'CurrentLocation'
	) => {
		if (city === 'CurrentLocation') {
			setRegion(initialRegion);
			setCurrentCity(currentLocationData ?? null);
			chooseCitySheetApi.close();
			return;
		}

		const { data } = await geocodePlaceId({
			query: {
				place_id: city.place_id
			}
		});
		if (!data) {
			// TODO: Handle error
			return;
		}
		const { northeast, southwest } = data.cityResult.geometry.viewport;
		const latitudeDelta = northeast.lat - southwest.lat;
		const longitudeDelta = northeast.lng - southwest.lng;
		const newRegion = {
			latitude: data.cityResult.geometry.location.lat,
			longitude: data.cityResult.geometry.location.lng,
			latitudeDelta: latitudeDelta,
			longitudeDelta: longitudeDelta
		};
		setRegion(newRegion);
		setCurrentCity(data);
		chooseCitySheetApi.close();
	};

	return (
		<BasePage>
			<HomePageHeader
				onPressCity={chooseCitySheetApi.open}
				currentCity={currentCity}
			/>
			<EventMap initialRegion={region} />
			<ChooseCitySheet
				sheetApi={chooseCitySheetApi}
				onChooseCity={onChooseSearchCity}
			/>
		</BasePage>
	);
};

export default HomePage;
