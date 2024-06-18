import { HeaderSafeArea, Loading, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { EditTicketTypePageRouteProp } from '@types';
import React, { useEffect } from 'react';
import DeleteTicketType from './components/DeleteTicketType';
import EditOnOffSaleTimes from './components/EditOnOffSaleTimes';
import NumberOfTickets from './components/NumberOfTickets';
import Price from './components/Price';
import TicketName from './components/TicketName';
import useEditTicketTypePage from './useEditTicketTypePage';

const EditTicketTypePage = () => {
	const route = useRoute<EditTicketTypePageRouteProp>();
	const {
		ticketTypeData,
		confirmDelete,
		formMethods,
		loadForm,
		numberOfTicketsTextInputApi,
		ticketPriceTextInputApi,
		onChangeStartSaleTime,
		onChangeEndSaleTime,
		editTicketTypeOnSaleSheetApi,
		editTicketTypeEndSaleSheetApi,
		onSubmit
	} = useEditTicketTypePage(
		route.params.ticket_collection_uid,
		route.params.ticket_type_uid
	);

	useEffect(() => {
		loadForm();
	}, [ticketTypeData]);

	if (!ticketTypeData) {
		return <Loading />;
	}

	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<TicketName formMethods={formMethods} onSubmit={onSubmit} />
					<NumberOfTickets
						formMethods={formMethods}
						numberOfTicketsTextInputApi={numberOfTicketsTextInputApi}
						onSubmit={onSubmit}
					/>
					<Price
						formMethods={formMethods}
						ticketPriceTextInputApi={ticketPriceTextInputApi}
						onSubmit={onSubmit}
					/>
					<EditOnOffSaleTimes
						onChangeStartSaleTime={onChangeStartSaleTime}
						onChangeEndSaleTime={onChangeEndSaleTime}
						formMethods={formMethods}
						editTicketTypeOnSaleSheetApi={editTicketTypeOnSaleSheetApi}
						editTicketTypeEndSaleSheetApi={editTicketTypeEndSaleSheetApi}
					/>
					<DeleteTicketType confirmDelete={confirmDelete} />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default EditTicketTypePage;
