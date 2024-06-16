import { HeaderSafeArea, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import { CreateTicketTypeBottomSheet } from '@popups';
import { useRoute } from '@react-navigation/native';
import { EditEventTicketTypesPageRouteProp } from '@types';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import GetStarted from './components/GetStarted';
import Loading from './components/Loading';
import TicketsTypesSection from './components/TicketsTypesSection';
import useEditEventTicketTypesPage from './useEditEventTicketTypesPage';

const EditEventTicketTypesPage = () => {
	const route = useRoute<EditEventTicketTypesPageRouteProp>();
	const {
		eventData,
		createTicketSheetApi,
		createTicketCollection,
		createTicketCollectionIsLoading,
		ticketCollectionData,
		goToEditTicketTypePage
	} = useEditEventTicketTypesPage(route.params.event_uid);

	if (!eventData) {
		return <Loading />;
	}

	return (
		<BasePage>
			<HeaderSafeArea>
				<Switch>
					<Case condition={createTicketCollectionIsLoading}>
						<Loading />
					</Case>
					<Case condition={eventData.ticket_collection_uid === null}>
						<GetStarted createTicketCollection={createTicketCollection} />
					</Case>
					<Default>
						<ScrollView alwaysBounceVertical>
							<TicketsTypesSection
								goToEditTicketTypePage={goToEditTicketTypePage}
								ticketCollectionData={ticketCollectionData}
								createTicketSheetApi={createTicketSheetApi}
							/>
						</ScrollView>
						{eventData.ticket_collection_uid !== null && (
							<CreateTicketTypeBottomSheet
								sheetApi={createTicketSheetApi}
								ticket_collection_uid={eventData.ticket_collection_uid}
							/>
						)}
					</Default>
				</Switch>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default EditEventTicketTypesPage;
