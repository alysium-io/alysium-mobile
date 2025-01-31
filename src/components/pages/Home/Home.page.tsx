import { useSheet } from '@hooks';
import { BasePage } from '@organisms';
import React from 'react';
import EventMap from './components/EventMap';
import HomePageHeader from './Home.header';
import ChooseCitySheet from './sheets/ChooseCitySheet';
import useHomeMapState from './useHomeMapState';

const HomePage = () => {
	const chooseCitySheetApi = useSheet();
	const { region, city, onSelectCity, onSelectCurrentLocation } =
		useHomeMapState();

	return (
		<BasePage>
			<HomePageHeader
				onPressCity={chooseCitySheetApi.open}
				currentCity={city}
			/>
			<EventMap initialRegion={region} />
			<ChooseCitySheet
				sheetApi={chooseCitySheetApi}
				onSelectCity={onSelectCity}
				onSelectCurrentLocation={onSelectCurrentLocation}
			/>
		</BasePage>
	);
};

export default HomePage;
