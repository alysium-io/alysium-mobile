import { View } from '@atomic';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Scrollto from './displays/Scrollto';

const Scratch = () => {
	const insets = useSafeAreaInsets();

	return (
		<View flex={1} backgroundColor='bg.p' style={{ paddingTop: insets.top }}>
			<Scrollto />
		</View>
	);
};

export default Scratch;
