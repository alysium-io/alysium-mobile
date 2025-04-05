import { View } from '@atomic';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagePickerTesting from './displays/ImagePickerTesting';

const Scratch = () => {
	const { top } = useSafeAreaInsets();
	return (
		<View flex={1} style={{ paddingTop: top }} backgroundColor='bg.p'>
			<ImagePickerTesting />
		</View>
	);
};

export default Scratch;
