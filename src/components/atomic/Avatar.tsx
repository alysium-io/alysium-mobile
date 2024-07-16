import { Image, View } from '@atomic';
import { BorderRadii } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';
import DefaultImage from './DefaultImage';

interface AvatarProps {
	image?: string | null;
	borderRadius?: keyof BorderRadii;
	defaultImageProps?: React.ComponentProps<typeof DefaultImage>;
}

const Avatar: React.FC<AvatarProps> = ({
	image,
	borderRadius = 'round',
	defaultImageProps
}) => {
	return (
		<View style={styles.container} borderRadius={borderRadius}>
			{!image ? (
				<DefaultImage {...defaultImageProps} />
			) : (
				<Image source={{ uri: image }} style={styles.image} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden'
	},
	image: {
		height: '100%',
		width: '100%'
	}
});

export default Avatar;
