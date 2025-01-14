import { Icon, View } from '@atomic';
import { IconNames } from '@svg';
import { Props, SemanticColor } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

interface DefaultImageProps {
	icon?: IconNames;
	containerProps?: Props<typeof View>;
	backgroundColor?: SemanticColor;
	iconColor?: SemanticColor;
	iconProps?: Omit<Props<typeof Icon>, 'name'>;
}

const DefaultImage: React.FC<DefaultImageProps> = ({
	icon = 'user',
	backgroundColor = 'default-profile-image.bg',
	iconColor = 'default-profile-image.icon',
	containerProps,
	iconProps
}) => {
	return (
		<View
			style={styles.container}
			backgroundColor={backgroundColor}
			{...containerProps}
		>
			<Icon name={icon} color={iconColor} size={20} {...iconProps} />
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
