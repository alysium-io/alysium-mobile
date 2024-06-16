import { HeaderSafeArea, Text, View } from '@atomic';
import { Button } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { EditTicketTypePageRouteProp } from '@types';
import React from 'react';
import Loading from './components/Loading';
import useEditTicketTypePage from './useEditTicketTypePage';

const EditTicketTypePage = () => {
	const route = useRoute<EditTicketTypePageRouteProp>();
	const { ticketTypeData, confirmDelete } = useEditTicketTypePage(
		route.params.ticket_collection_uid,
		route.params.ticket_type_uid
	);

	if (!ticketTypeData) {
		return <Loading />;
	}
	console.log(ticketTypeData);
	return (
		<BasePage>
			<HeaderSafeArea>
				<View margin='m'>
					<Text variant='page-header' margin='m'>
						{ticketTypeData.name}
					</Text>
					<Text variant='page-header' margin='m'>
						{ticketTypeData.num_available}
					</Text>
					<Text variant='page-header' margin='m'>
						{ticketTypeData.price || 'Free'}
					</Text>
					<Button
						text='Delete'
						onPress={confirmDelete}
						colorVariant='negative'
						variant='outlined'
					/>
				</View>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default EditTicketTypePage;
