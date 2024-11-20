import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useFullScreenSheet } from './useFullScreenSheet';

type FullScreenSheetContainerProps = Props<typeof View>;
const FullScreenSheetContainer: React.FC<FullScreenSheetContainerProps> = (
	props
) => {
	// Simply configures the proper height depending on the footer component
	// and makes that static.
	const { height } = useWindowDimensions();
	const { footerLayoutApi } = useFullScreenSheet();
	const contentContainerHeight = height - footerLayoutApi.dimensions.height;

	return <View height={contentContainerHeight} {...props} />;
};

export default FullScreenSheetContainer;
