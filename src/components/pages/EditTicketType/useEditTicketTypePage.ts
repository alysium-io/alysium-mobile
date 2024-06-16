import { ticketTypeApiSlice } from '@flux/api/ticket-type';
import { FindOneTicketTypeResponseDto } from '@flux/api/ticket-type/dto/ticket-type-find-one.dto';
import { useNavigation } from '@hooks';
import { ApiIdentifier } from '@types';
import { Alert } from 'react-native';

interface IUseEditTicketType {
	ticketTypeData?: FindOneTicketTypeResponseDto;
	ticketTypeError?: any;
	ticketTypeIsLoading: boolean;
	confirmDelete: () => void;
}

const useEditTicketTypePage = (
	ticket_collection_uid: ApiIdentifier,
	ticket_type_uid: ApiIdentifier
): IUseEditTicketType => {
	const { back } = useNavigation();
	const [deleteTicketTypeMutation] = ticketTypeApiSlice.useDeleteMutation();

	const {
		data: ticketTypeData,
		error: ticketTypeError,
		isLoading: ticketTypeIsLoading
	} = ticketTypeApiSlice.useFindOneQuery({
		params: { ticket_type_uid },
		query: { ticket_collection_uid }
	});

	const confirmDelete = () => {
		Alert.alert(
			'Delete Ticket Type',
			'Are you sure you want to delete this Ticket Type?',
			[
				{
					text: 'cancel',
					style: 'cancel'
				},
				{
					text: 'delete',
					onPress: onDeleteTicketType,
					style: 'destructive'
				}
			],
			{ cancelable: false }
		);
	};

	const onDeleteTicketType = () => {
		deleteTicketTypeMutation({
			params: { ticket_type_uid },
			query: { ticket_collection_uid }
		});
		back();
	};

	return {
		ticketTypeData,
		ticketTypeError,
		ticketTypeIsLoading,
		confirmDelete
	};
};

export default useEditTicketTypePage;
