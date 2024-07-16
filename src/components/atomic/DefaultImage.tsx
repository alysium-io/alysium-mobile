import { Icon, View } from '@atomic';
import { IconNames } from '@svg';
import { SemanticColor } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

interface DefaultImageProps {
	icon?: IconNames;
	backgroundColor?: SemanticColor;
	iconColor?: SemanticColor;
}

const DefaultImage: React.FC<DefaultImageProps> = ({
	icon = 'user',
	backgroundColor = 'default-profile-image.bg',
	iconColor = 'default-profile-image.icon'
}) => {
	return (
		<View style={styles.container} backgroundColor={backgroundColor}>
			<Icon name={icon} color={iconColor} size={18} />
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

export default DefaultImage;
