import { Icon, View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';

const EditIcon = () => {
	return (
		<View
			backgroundColor='bg.negative.p'
			borderColor='bg.p'
			style={[styles.container]}
		>
			<Icon name='pencil' size='s' color='text.negative.p' />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 1000,
		borderWidth: 2,
		padding: 5
	}
});

export default EditIcon;
