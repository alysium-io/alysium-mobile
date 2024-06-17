import { eventApiSlice } from '@flux/api/event';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { ticketCollectionApiSlice } from '@flux/api/ticket-collection';
import { FindOneTicketCollectionResponseDto } from '@flux/api/ticket-collection/dto/ticket-collection-find-one.dto';
import { SheetApi, useNavigation, useSheet } from '@hooks';
import { ApiIdentifier } from '@types';

interface IUseEditEventTickets {
	eventData?: FindOneEventResponseDto;
	eventError: any;
	eventIsLoading: boolean;
	ticketCollectionData?: FindOneTicketCollectionResponseDto;
	ticketCollectionError: any;
	ticketCollectionIsLoading: boolean;
	createTicketSheetApi: SheetApi;
	createTicketCollection: () => void;
	createTicketCollectionIsLoading: boolean;
	goToEditTicketTypePage: (ticket_type_uid: ApiIdentifier) => void;
}

const useEditEventTicketsPage = (
	event_uid: ApiIdentifier
): IUseEditEventTickets => {
	const { editTicketTypePage } = useNavigation();
	const createTicketSheetApi = useSheet();
	const [
		createTicketCollectionMutation,
		{ isLoading: createTicketCollectionIsLoading }
	] = ticketCollectionApiSlice.useCreateMutation();

	const {
		data: eventData,
		error: eventError,
		isLoading: eventIsLoading
	} = eventApiSlice.useFindOneQuery({
		params: { event_uid }
	});

	const {
		data: ticketCollectionData,
		error: ticketCollectionError,
		isLoading: ticketCollectionIsLoading
	} = ticketCollectionApiSlice.useFindOneQuery(
		{
			params: { ticket_collection_uid: eventData?.ticket_collection_uid ?? '' }
		},
		{ skip: !eventData?.ticket_collection_uid }
	);

	const createTicketCollection = () => {
		if (eventData) {
			createTicketCollectionMutation({
				query: {
					event_uid: eventData.event_uid
				},
				body: {
					name: undefined
				}
			});
		}
	};

	const goToEditTicketTypePage = (ticket_type_uid: ApiIdentifier) => {
		if (ticketCollectionData?.ticket_collection_uid) {
			editTicketTypePage(
				ticketCollectionData.ticket_collection_uid,
				ticket_type_uid
			);
		}
	};

	return {
		eventData,
		eventError,
		eventIsLoading,
		ticketCollectionData,
		ticketCollectionError,
		ticketCollectionIsLoading,
		createTicketSheetApi,
		createTicketCollection,
		createTicketCollectionIsLoading,
		goToEditTicketTypePage
	};
};

export default useEditEventTicketsPage;
