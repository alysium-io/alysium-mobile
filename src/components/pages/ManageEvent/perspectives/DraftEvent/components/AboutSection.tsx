import { View } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { useNavigation } from '@hooks';
import { MenuListItem } from '@molecules';
import React from 'react';

interface AboutSectionProps {
	eventData: FindOneArtistEventResponseDto;
}

const AboutSection: React.FC<AboutSectionProps> = ({ eventData }) => {
	const { editArtistEventAboutPage } = useNavigation();
	return (
		<View>
			<MenuListItem
				onPress={() => editArtistEventAboutPage(eventData.event.event_uid)}
				prefixIconProps={{
					name: 'question',
					size: 'l'
				}}
				titleTextProps={{
					title: eventData.event.about?.length
						? eventData.event.about
						: 'What?',
					titleVariant: eventData.event.about?.length
						? 'paragraph'
						: 'paragraph-medium',
					bottomSubtext: eventData.event.about?.length
						? undefined
						: 'Tell us about your event',
					bottomSubtextVariant: 'paragraph-small',
					bottomSubtextColor: 'text.q',
					titleColor: eventData.event.about?.length ? 'text.q' : 'text.p',
					titleProps: {
						numberOfLines: eventData.event.about?.length ? 0 : 1
					}
				}}
			/>
		</View>
	);
};

export default AboutSection;
