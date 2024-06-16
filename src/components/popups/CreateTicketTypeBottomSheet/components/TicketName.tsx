import { Text, View } from '@atomic';
import { CreateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-create.dto';
import { TextInputApi } from '@hooks';
import { EditableTextInputWithLabel } from '@molecules';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface TicketNameProps {
	formMethods: UseFormReturn<CreateTicketTypeBodyDto>;
	ticketTypeNameTextInputApi: TextInputApi;
	setTitle: (title: string) => void;
}

const TicketName: React.FC<TicketNameProps> = ({
	formMethods,
	ticketTypeNameTextInputApi,
	setTitle
}) => {
	return (
		<View margin='m'>
			<Controller
				name='name'
				control={formMethods.control}
				render={({ field: { onChange, onBlur, value } }) => (
					<EditableTextInputWithLabel
						label='Ticket Name'
						textInputApi={ticketTypeNameTextInputApi}
						placeholder='VIP, General Admission, etc.'
						onChangeText={(text: string) => {
							onChange(text);
							setTitle(text !== '' ? text : 'New Ticket');
						}}
						onBlur={onBlur}
						value={value ?? ''}
					/>
				)}
			/>
			<Text variant='paragraph-small' color='t2' margin='l' marginLeft='s'>
				VIP, General Admission, etc.
			</Text>
		</View>
	);
};

export default TicketName;
