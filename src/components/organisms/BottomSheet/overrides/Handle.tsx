import { View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';

const Handle = () => {
	return (
		<View marginVertical='m' flexDirection='row' justifyContent='center'>
			<View style={styles.handle} backgroundColor='sheet.handle' />
		</View>
	);
};

const styles = StyleSheet.create({
	handle: {
		height: 2,
		width: 35,
		borderRadius: 15
	}
});

export default Handle;
