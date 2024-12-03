import { Section, Text } from '@atomic';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { useImage, useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import React from 'react';

interface OrganizerSectionProps {
	eventData: FindOneEventResponseDto;
}

const OrganizerSection: React.FC<OrganizerSectionProps> = ({ eventData }) => {
	const { urlForKey } = useImage();
	const { artistPage } = useNavigation();

	if (!eventData?.artist) {
		return null;
	}

	const onPressOrganizer = () => {
		if (eventData?.artist) {
			artistPage(eventData.artist.artist_uid, {
				to: 'ArtistPage',
				to_uid: eventData.artist.artist_uid,
				from: 'ArtistEventPage',
				from_uid: eventData.event.event_uid,
				using: 'ARTIST_EVENT_ORGANIZER_CONTENT_LIST_ITEM'
			});
		}
	};

	return (
		<Section>
			<Text
				variant='section-header-1'
				marginBottom='m'
				marginHorizontal='m'
				textDecorationLine='underline'
			>
				Organizer
			</Text>
			<ContentListItem
				onPress={onPressOrganizer}
				titleTextProps={{
					title: eventData.artist.name
				}}
				profileImageProps={{
					image: urlForKey(eventData.artist.profile_image?.small.key),
					defaultImageProps: {
						icon: eventData.ref_type
					}
				}}
			/>
		</Section>
	);
};

export default OrganizerSection;
