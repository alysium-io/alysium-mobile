import { View } from '@atomic';
import React from 'react';
import GoogleMapsAutocomplete from './displays/GoogleMapsAutocomplete';

const Scratch = () => {
	return (
		<View flex={1}>
			<GoogleMapsAutocomplete />
		</View>
	);
};

export default Scratch;
