import { Image } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useImage } from '@hooks';
import { Props } from '@types';
import React from 'react';
import { Marker } from 'react-native-maps';
import Animated, {
	useAnimatedStyle,
	withSpring
} from 'react-native-reanimated';

interface EventMapMarkerProps extends Omit<Props<typeof Marker>, 'coordinate'> {
	event: EventLink;
	isSelected?: boolean;
}

const EventMapMarker: React.FC<EventMapMarkerProps> = ({
	event,
	isSelected,
	...props
}) => {
	const { urlForKey } = useImage();
	const latitude = event.event.location?.latitude;
	const longitude = event.event.location?.longitude;
	const image = urlForKey(event.event.profile_image?.small.key);

	const animatedStyle = useAnimatedStyle(() => {
		const scale = withSpring(isSelected ? 1.3 : 1);
		return {
			transform: [{ scale }]
		};
	});

	if (!latitude || !longitude) return null;

	return (
		<Marker
			coordinate={{
				latitude: Number(latitude),
				longitude: Number(longitude)
			}}
			{...props}
		>
			{image && (
				<Animated.View style={animatedStyle}>
					<Image
						source={{ uri: image }}
						style={{
							width: 50,
							height: 50,
							borderRadius: 25,
							overflow: 'hidden',
							borderWidth: 2,
							borderColor: 'white',
							zIndex: 999
						}}
					/>
				</Animated.View>
			)}
		</Marker>
	);
};

export default EventMapMarker;
