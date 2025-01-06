import { View } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { useNavigation } from '@hooks';
import { MenuListItem } from '@molecules';
import React from 'react';

interface TicketsUrlSectionProps {
	eventData: FindOneArtistEventResponseDto;
}

const TicketsUrlSection: React.FC<TicketsUrlSectionProps> = ({ eventData }) => {
	const { editArtistEventTicketsUrlPage } = useNavigation();
	return (
		<View>
			<MenuListItem
				onPress={() => editArtistEventTicketsUrlPage(eventData.event.event_uid)}
				prefixIconProps={{
					name: 'ticket',
					size: 'l'
				}}
				titleTextProps={{
					title: eventData.event.tickets_url?.length
						? eventData.event.tickets_url
						: 'Tickets',
					titleVariant: eventData.event.tickets_url?.length
						? 'paragraph'
						: 'paragraph-medium',
					bottomSubtext: 'Where can fans buy tickets?',
					bottomSubtextVariant: 'paragraph-small',
					bottomSubtextColor: 'text.q',
					titleProps: {
						numberOfLines: eventData.event.tickets_url?.length ? 0 : 1
					}
				}}
			/>
		</View>
	);
};

export default TicketsUrlSection;
