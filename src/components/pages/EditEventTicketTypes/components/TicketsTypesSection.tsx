import { Icon, Section, View } from '@atomic';
import { FindOneTicketCollectionResponseDto } from '@flux/api/ticket-collection/dto/ticket-collection-find-one.dto';
import { SheetApi } from '@hooks';
import { CreateNewContentListItemToggle } from '@organisms';
import { ApiIdentifier } from '@types';
import React from 'react';
import { If, Then } from 'react-if';
import EditTicketListItem from './EditTicketListItem';

interface TicketsTypesSectionProps {
	ticketCollectionData?: FindOneTicketCollectionResponseDto;
	createTicketSheetApi: SheetApi;
	goToEditTicketTypePage: (ticket_type_uid: ApiIdentifier) => void;
}

const TicketsTypesSection: React.FC<TicketsTypesSectionProps> = ({
	ticketCollectionData,
	createTicketSheetApi,
	goToEditTicketTypePage
}) => {
	console.log(ticketCollectionData);
	return (
		<Section marginVertical='m'>
			<View margin='m' alignItems='center'>
				<Icon name='ticket' size='xlarge' color='t2' />
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
							onPress={() => goToEditTicketTypePage(ticketType.ticket_type_uid)}
						/>
					))}
				</Then>
			</If>
		</Section>
	);
};

export default TicketsTypesSection;
