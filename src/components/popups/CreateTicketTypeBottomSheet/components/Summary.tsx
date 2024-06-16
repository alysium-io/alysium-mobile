import { Text, View } from '@atomic';
import { CreateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-create.dto';
import { SimpleTable } from '@organisms';
import dayjs from 'dayjs';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface SummaryProps {
	formMethods: UseFormReturn<CreateTicketTypeBodyDto>;
}

const Summary: React.FC<SummaryProps> = ({ formMethods }) => {
	return (
		<View margin='m'>
			<SimpleTable
				title='Summary'
				items={[
					{
						field: 'Ticket Name',
						value: formMethods.getValues('name') || 'No Name'
					},
					{
						field: '# Tickets',
						value:
							formMethods.getValues('num_available')?.toLocaleString() ??
							'Unlimited'
					},
					{
						field: 'Price',
						value: formMethods.getValues('price')
							? '$' + formMethods.getValues('price')
							: 'Free'
					},
					{
						field: 'Start Sale Time',
						value:
							formMethods.getValues('sale_start_time') !== null
								? dayjs(formMethods.getValues('sale_start_time')).format(
										'MMM. D h:mma'
									)
								: 'On Event Creation'
					},
					{
						field: 'End Sale Time',
						value:
							formMethods.getValues('sale_end_time') !== null
								? dayjs(formMethods.getValues('sale_end_time')).format(
										'MMM. D h:mma'
									)
								: 'On Event End'
					}
				]}
			/>
			<View marginTop='m' flexDirection='row'>
				<Text variant='paragraph-small-bold' color='t2'>
					*Note:
				</Text>
				<Text variant='paragraph-small' color='t2' style={{ marginLeft: 5 }}>
					You can still edit these details later
				</Text>
			</View>
		</View>
	);
};

export default Summary;
