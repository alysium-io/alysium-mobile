import { Icon, View } from '@atomic';
import { IconNames } from '@svg';
import React from 'react';
import { StyleSheet } from 'react-native';

interface DefaultIconImageProps {
	icon: IconNames;
}

const DefaultIconImage: React.FC<DefaultIconImageProps> = ({ icon }) => {
	return (
		<View style={styles.container} backgroundColor='bg.t'>
			<Icon name={icon} color='text.t' size='regular' />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default DefaultIconImage;
