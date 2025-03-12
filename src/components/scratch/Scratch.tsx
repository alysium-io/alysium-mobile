import { View } from '@atomic';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NewMediaTest from './displays/NewMediaTest';

const Scratch = () => {
	const { top } = useSafeAreaInsets();
	return (
		<View flex={1} style={{ paddingTop: top }} backgroundColor='bg.p'>
			<NewMediaTest />
		</View>
	);
};

export default Scratch;
