import { BlurView } from '@atomic';
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps
} from '@gorhom/bottom-sheet';
import { ChildrenProps } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

const ContentContainer: React.FC<BottomSheetBackdropProps & ChildrenProps> = ({
	children,
	...props
}) => {
	return (
		<BottomSheetBackdrop
			{...props}
			opacity={1}
			enableTouchThrough={false}
			appearsOnIndex={0}
			disappearsOnIndex={-1}
			style={[
				StyleSheet.absoluteFillObject,
				{ backgroundColor: 'transparent' }
			]}
		>
			<BlurView style={StyleSheet.absoluteFillObject} blurType='dark'>
				{children}
			</BlurView>
		</BottomSheetBackdrop>
	);
};

export default ContentContainer;
