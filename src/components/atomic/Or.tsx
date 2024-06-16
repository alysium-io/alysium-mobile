import { Text, View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';

const Or = () => {
	return (
		<View marginVertical='m' style={styles.container}>
			<View backgroundColor='bg2' style={styles.line} />
			<View backgroundColor='bg1'>
				<Text
					margin='m'
					variant='paragraph-small'
					textAlign='center'
					color='t3'
				>
					Or
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	line: {
		position: 'absolute',
		bottom: '50%',
		left: 0,
		right: 0,
		height: 1
	}
});

export default Or;
