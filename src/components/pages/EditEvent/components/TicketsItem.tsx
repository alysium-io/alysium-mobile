import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { MenuListItem } from '@organisms';
import React from 'react';

interface TicketsItemProps {
	goToEditEventTicketTypesPage: () => void;
	eventData?: FindOneEventResponseDto;
}

const TicketsItem: React.FC<TicketsItemProps> = ({
	goToEditEventTicketTypesPage,
	eventData
}) => {
	if (!eventData) return null;
	return (
		<MenuListItem
			title='Tickets'
			subtitle='VIP, General Admission, etc.'
			onPress={goToEditEventTicketTypesPage}
			color='ion'
			border
		/>
	);
};

export default TicketsItem;
