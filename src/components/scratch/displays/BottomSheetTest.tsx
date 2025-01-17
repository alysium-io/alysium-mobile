import { Text, View } from '@atomic';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from '@molecules';
import React, { useMemo, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomSheetTest = () => {
	const sheetRef = useRef<BottomSheetModal | null>(null);
	const insets = useSafeAreaInsets();
	const snapPoints = useMemo(() => ['10%', '50%'], []);

	return (
		<View backgroundColor='bg.p' flex={1} style={{ paddingTop: insets.top }}>
			<View flex={1} justifyContent='center'>
				<Button
					text='Open'
					onPress={() => {
						console.log('Should open');
						sheetRef.current?.present();
					}}
					containerProps={{
						marginBottom: 'm'
					}}
				/>
				<Button
					text='Snap'
					onPress={() => {
						console.log('Should snap');
						sheetRef.current?.snapToIndex(1);
					}}
				/>
			</View>
			<BottomSheetModal
				ref={sheetRef}
				snapPoints={snapPoints}
				enableDynamicSizing={false}
			>
				<BottomSheetView>
					<Text>Hello</Text>
				</BottomSheetView>
			</BottomSheetModal>
		</View>
	);
};

export default BottomSheetTest;
