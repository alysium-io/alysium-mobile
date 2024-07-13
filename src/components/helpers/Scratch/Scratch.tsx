import { View } from '@atomic';
import React from 'react';
import { ScrollView } from 'react-native';
import ConfigMenuBottomSheet from './components/ConfigMenuBottomSheet';
import Header from './components/Header';
import Radios from './displays/Radios';
import useScratch from './useScratch';

const Scratch = () => {
	const { configMenuSheetApi } = useScratch();

	return (
		<View flex={1} backgroundColor='bg.p'>
			<Header configMenuSheetApi={configMenuSheetApi} />
			<ScrollView>
				<Radios />
			</ScrollView>
			<ConfigMenuBottomSheet sheetApi={configMenuSheetApi} />
		</View>
	);
};

export default Scratch;
