import { Image, View } from '@atomic';
import { useImage } from '@hooks';
import { BorderRadii, Props } from '@types';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import DefaultImage from './DefaultImage';

interface AvatarProps {
	image?: string | null;
	borderRadius?: keyof BorderRadii;
	defaultImageProps?: Props<typeof DefaultImage>;
	containerProps?: Props<typeof View>;
}

const Avatar: React.FC<AvatarProps> = ({
	image,
	borderRadius = 'round',
	defaultImageProps,
	containerProps
}) => {
	const { urlForKey } = useImage();

	const imageCache = useMemo(() => {
		if (!image) return { uri: undefined };

		// These are really the only 2 protocols I see us supporting
		// Either we're pointing at an image on the internet (for some reason)
		// or we've selected a local file
		if (image.startsWith('https://') || image.startsWith('file://'))
			return { uri: image };

		// By default, we assume that the image comes from our own internal image
		// protocol system, so we prepend the base url
		return {
			uri: urlForKey(image)
		};
	}, [image]);

	return (
		<View
			borderRadius={borderRadius}
			{...containerProps}
			style={[styles.container, containerProps?.style]}
		>
			{!image ? (
				<DefaultImage {...defaultImageProps} />
			) : (
				<Image source={imageCache} style={styles.image} />
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
