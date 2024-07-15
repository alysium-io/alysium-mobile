import { Image, View } from '@atomic';
import { useTheme } from '@hooks';
import { IconNames } from '@svg';
import { ContentType, Persona } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';
import DefaultIconImage from './DefaultIconImage';

const defaultAvatarImageIconScheme = {
	[ContentType.artist]: 'artist' as IconNames,
	[ContentType.host]: 'host' as IconNames,
	[ContentType.tag]: 'tag' as IconNames,
	[ContentType.location]: 'location' as IconNames,
	[ContentType.event]: 'event' as IconNames,
	[ContentType.user]: 'user' as IconNames
};

interface AvatarProps {
	contentType: ContentType | Persona;
	image?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ contentType, image }) => {
	const { theme } = useTheme();

	return (
		<View style={[styles.container, { borderRadius: theme.borderRadii.round }]}>
			{!image ? (
				<DefaultIconImage icon={defaultAvatarImageIconScheme[contentType]} />
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
