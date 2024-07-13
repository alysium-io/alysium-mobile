import { View } from '@atomic';
import { BottomSheetHandleProps } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet } from 'react-native';

const BottomSheetHandle: React.FC<BottomSheetHandleProps> = () => {
	return (
		<View marginVertical='m' flexDirection='row' justifyContent='center'>
			<View style={styles.handle} backgroundColor='sheet.handle' />
		</View>
	);
};

const styles = StyleSheet.create({
	handle: {
		height: 5,
		width: 45,
		borderRadius: 15
	}
});

export default BottomSheetHandle;
