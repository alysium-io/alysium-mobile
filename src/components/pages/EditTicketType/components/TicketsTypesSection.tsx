import { Section, View } from '@atomic';
import { FindOneTicketCollectionResponseDto } from '@flux/api/ticket-collection/dto/ticket-collection-find-one.dto';
import { SheetApi } from '@hooks';
import { SectionHeader } from '@molecules';
import { CreateNewContentListItemToggle } from '@organisms';
import React from 'react';
import { If, Then } from 'react-if';
import EditTicketListItem from './EditTicketListItem';

interface TicketsTypesSectionProps {
	ticketCollectionData?: FindOneTicketCollectionResponseDto;
	createTicketSheetApi: SheetApi;
}

const TicketsTypesSection: React.FC<TicketsTypesSectionProps> = ({
	ticketCollectionData,
	createTicketSheetApi
}) => {
	console.log(ticketCollectionData);
	return (
		<Section marginVertical='m'>
			<View margin='m'>
				<SectionHeader text='Tickets' />
			</View>
			<CreateNewContentListItemToggle
				title='Create New Ticket'
				subtitle='VIP, General Admission, etc.'
				onPress={() => createTicketSheetApi.open()}
				subtitleFirst={true}
			/>
			<If
				condition={
					ticketCollectionData && ticketCollectionData.ticket_types.length > 0
				}
			>
				<Then>
					{ticketCollectionData?.ticket_types.map((ticketType) => (
						<EditTicketListItem
							key={ticketType.ticket_type_uid}
							ticketTypeData={ticketType}
						/>
					))}
				</Then>
			</If>
		</Section>
	);
};

export default TicketsTypesSection;
