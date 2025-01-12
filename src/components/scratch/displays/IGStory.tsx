import { Image, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useImage } from '@hooks';
import React from 'react';
import { useWindowDimensions } from 'react-native';

interface IGStoryProps {
	event: EventLink;
}

const IGStory: React.FC<IGStoryProps> = ({ event }) => {
	const { height } = useWindowDimensions();
	const { urlForKey } = useImage();

	return (
		<View>
			<Image
				style={{ height: height * 0.35, width: '100%' }}
				source={{ uri: urlForKey(event.event.profile_image?.large.key) }}
			/>
		</View>
	);
};

export default IGStory;
