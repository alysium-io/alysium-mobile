import { View } from '@atomic';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Network from './displays/Network';

const Scratch = () => {
	const insets = useSafeAreaInsets();

	return (
		<View flex={1} backgroundColor='bg.p' style={{ paddingTop: insets.top }}>
			<Network />
		</View>
	);
};

export default Scratch;
