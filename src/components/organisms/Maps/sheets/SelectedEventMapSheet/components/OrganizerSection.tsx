import { Section, Text } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useImage } from '@hooks';
import { ContentListItem } from '@molecules';
import React from 'react';

interface OrganizerSectionProps {
	event: EventLink | null;
	onPress: () => void;
}

const OrganizerSection: React.FC<OrganizerSectionProps> = ({
	event,
	onPress
}) => {
	const { urlForKey } = useImage();
	if (!event) {
		return null;
	}
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
				onPress={onPress}
				titleTextProps={{
					title: event.artist.name
				}}
				profileImageProps={{
					image: urlForKey(event.artist.profile_image?.small.key),
					defaultImageProps: {
						icon: event.ref_type
					}
				}}
			/>
		</Section>
	);
};

export default OrganizerSection;
