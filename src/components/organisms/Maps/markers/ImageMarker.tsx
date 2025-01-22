import { DefaultImage, Image } from '@atomic';
import { Location } from '@flux/api/location';
import { useImage } from '@hooks';
import { Props } from '@types';
import React from 'react';
import { Marker } from 'react-native-maps';
import Animated, {
	useAnimatedStyle,
	withSpring
} from 'react-native-reanimated';

interface ImageMarkerProps
	extends Omit<Props<typeof Marker>, 'coordinate' | 'image'> {
	image?: string;
	location: Location;
	isSelected?: boolean;
	defaultImageProps?: Props<typeof DefaultImage>;
}

const ImageMarker: React.FC<ImageMarkerProps> = ({
	image,
	location,
	isSelected,
	defaultImageProps,
	...props
}) => {
	const { urlForKey } = useImage();

	const animatedStyle = useAnimatedStyle(() => {
		const scale = withSpring(isSelected ? 1.3 : 1);
		return {
			width: 50,
			height: 50,
			borderRadius: 9999,
			overflow: 'hidden',
			borderWidth: 2,
			borderColor: 'white',
			justifyContent: 'center',
			alignItems: 'center',
			transform: [{ scale }]
		};
	});

	if (!location.latitude || !location.longitude) return null;

	return (
		<Marker
			coordinate={{
				latitude: Number(location.latitude),
				longitude: Number(location.longitude)
			}}
			{...props}
		>
			<Animated.View style={animatedStyle}>
				{image ? (
					<Image
						source={{ uri: urlForKey(image) }}
						style={{
							height: '100%',
							width: '100%'
						}}
					/>
				) : (
					<DefaultImage icon='event' {...defaultImageProps} />
				)}
			</Animated.View>
		</Marker>
	);
};

export default ImageMarker;
