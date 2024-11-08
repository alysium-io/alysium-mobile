import { Icon, Text, View } from '@atomic';
import { useTheme } from '@hooks';
import React from 'react';
import { StyleSheet } from 'react-native';

const MissingMapView = () => {
	const { theme } = useTheme();
	return (
		<View
			style={styles.container}
			backgroundColor='bg.negative.s'
			borderWidth={theme.borderWidth.thick}
			borderColor='border.light'
		>
			<Icon name='location' size='xl' color='text.negative.p' />
			<Text variant='paragraph' color='text.negative.p' marginTop='l'>
				Choose a Location
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default MissingMapView;
