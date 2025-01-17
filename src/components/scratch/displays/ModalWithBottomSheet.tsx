import { Text, View } from '@atomic';
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps
} from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { BottomSheet } from '@organisms';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

export interface ModalWithBottomSheetProps {
	sheetApi: SheetApi;
}

const ModalWithBottomSheet: React.FC<ModalWithBottomSheetProps> = ({
	sheetApi
}) => {
	const CBottomSheetBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				opacity={1}
				enableTouchThrough={false}
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				pressBehavior='none'
				style={[
					{
						backgroundColor: 'rgba(0, 0, 0, 1)',
						justifyContent: 'center',
						alignItems: 'center'
					},
					StyleSheet.absoluteFillObject
				]}
			>
				<Text style={{ color: 'white' }}>WOAAAHHHHH</Text>
			</BottomSheetBackdrop>
		),
		[]
	);

	return (
		<BottomSheet
			ref={sheetApi.sheetRef}
			snapPoints={['30%', '70%']}
			backdropComponent={CBottomSheetBackdrop}
			enableContentPanningGesture={true}
			enablePanDownToClose={false}
		>
			<View flex={1} backgroundColor='bg.s'>
				<Text>Hello World</Text>
			</View>
		</BottomSheet>
	);
};

export default ModalWithBottomSheet;
