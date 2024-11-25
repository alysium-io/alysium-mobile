import { Image, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useImage } from '@hooks';
import SubHeader from '@src/components/pages/ArtistEvent/components/SubHeader';
import React from 'react';
import { useWindowDimensions } from 'react-native';

interface IGStoryProps {
	event: EventLink;
}

const IGStory: React.FC<IGStoryProps> = ({ event }) => {
	const { height } = useWindowDimensions();
	const { urlForKey } = useImage();
	console.log(event.event.profile_image?.large.key);
	return (
		<View>
			<Image
				style={{ height: height * 0.35, width: '100%' }}
				source={{ uri: urlForKey(event.event.profile_image?.large.key) }}
			/>
			<View margin='m'>
				<SubHeader eventData={event} />
			</View>
		</View>
	);
};

export default IGStory;
