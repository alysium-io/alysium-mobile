import { View } from '@atomic';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const GapTesting = () => {
	/**
	 * I'm gunna keeel myself i NEVER KNEW ABOUT THIS GAP PROPERTY
	 * that's SUUUUPPER SICCKKKKKK i LOOVVEEE PROGRAMMINNGGGGG
	 */
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();
	const gap = 1;
	const numItemsPerRow = 3;
	const boxWidth = (width - gap * (numItemsPerRow - 1)) / numItemsPerRow;
	return (
		<View
			flex={1}
			style={{
				paddingTop: insets.top,
				gap,
				flexDirection: 'row',
				flexWrap: 'wrap'
			}}
		>
			<View
				style={{ height: boxWidth, aspectRatio: 1, backgroundColor: 'red' }}
			/>
			<View
				style={{ height: boxWidth, aspectRatio: 1, backgroundColor: 'blue' }}
			/>
			<View
				style={{ height: boxWidth, aspectRatio: 1, backgroundColor: 'green' }}
			/>
			<View
				style={{ height: boxWidth, aspectRatio: 1, backgroundColor: 'purple' }}
			/>
			<View
				style={{ height: boxWidth, aspectRatio: 1, backgroundColor: 'orange' }}
			/>
			<View
				style={{ height: boxWidth, aspectRatio: 1, backgroundColor: 'pink' }}
			/>
		</View>
	);
};

export default GapTesting;
