import { View } from '@atomic';
import { Location as ILocation } from '@flux/api/location';
import LocationMapView from '@src/components/molecules/Maps/LocationMapView';
import React from 'react';
import { data } from './sample_data';

const Location = () => {
	const markers = data.map((location) => ({
		location: location as ILocation,
		label: location.formatted_address,
		color: Math.random() > 0.5 ? 'red' : 'blue'
	}));
	return (
		<View flex={1}>
			<LocationMapView markers={markers} />
		</View>
	);
};

export default Location;
