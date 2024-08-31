import { View } from '@atomic';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FadeInOutSequence from './displays/FadeInOutSequence';
import useScratch from './useScratch';

const Scratch = () => {
	const { configMenuSheetApi } = useScratch();
	const insets = useSafeAreaInsets();

	return (
		<View flex={1} backgroundColor='bg.p' style={{ marginTop: insets.top }}>
			<FadeInOutSequence />
		</View>
	);
};

export default Scratch;
