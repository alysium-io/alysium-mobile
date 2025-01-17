import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { useNavigation } from '@hooks';
import { MenuListItem } from '@molecules';
import React from 'react';
import usePermissionsToastError from './usePermissionsError';

interface AboutSectionProps {
	eventData: FindOneArtistEventResponseDto;
}

const AboutSection: React.FC<AboutSectionProps> = ({ eventData }) => {
	const { editArtistEventAboutPage } = useNavigation();
	const { isEditable } = useArtistAppContext();
	const { permissionsError } = usePermissionsToastError();
	const onPress = isEditable
		? () => editArtistEventAboutPage(eventData.event.event_uid)
		: permissionsError;
	return (
		<View>
			<MenuListItem
				onPress={onPress}
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
						? 'About your event'
						: 'Tell us about your event',
					bottomSubtextVariant: 'paragraph-small',
					bottomSubtextColor: 'text.q',
					titleProps: {
						numberOfLines: eventData.event.about?.length ? 0 : 1
					}
				}}
			/>
		</View>
	);
};

export default AboutSection;
