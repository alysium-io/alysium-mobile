import { View } from '@atomic';
import React from 'react';
import ConfigMenuBottomSheet from './components/ConfigMenuBottomSheet';
import ScrollViewOverflow from './displays/ScrollViewOverflow';
import useScratch from './useScratch';

const Scratch = () => {
	const { configMenuSheetApi } = useScratch();

	return (
		<View flex={1} backgroundColor='bg.p'>
			<ScrollViewOverflow />
			<ConfigMenuBottomSheet sheetApi={configMenuSheetApi} />
		</View>
	);
};

export default Scratch;
