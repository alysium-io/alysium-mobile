import { Image, View } from '@atomic';
import { BorderRadii } from '@types';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useEnvContext } from 'src/utils/contexts';
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
	const { env } = useEnvContext();
	const [error, setError] = useState(false);
	return (
		<View style={styles.container} borderRadius={borderRadius}>
			{!image || error ? (
				<DefaultImage {...defaultImageProps} />
			) : (
				<Image
					source={{ uri: env.imagesBaseUrl + image }}
					style={styles.image}
					onError={() => setError(true)}
				/>
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
