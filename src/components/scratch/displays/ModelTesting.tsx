import { View } from '@atomic';
import { eventApiSlice } from '@flux/api/event';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ModelTesting = () => {
	const insets = useSafeAreaInsets();
	const { data } = eventApiSlice.useFindOneEventQuery({
		params: { event_uid: 'KOA4IhTfilAfiwGovCiLb98v' }
	});

	return (
		<View flex={1} style={{ paddingTop: insets.top }}>
			<View flex={1} backgroundColor='bg.s' />
			<View flex={1} backgroundColor='bg.t' />
			<View flex={1} backgroundColor='bg.q' />
		</View>
	);
};

export default ModelTesting;
