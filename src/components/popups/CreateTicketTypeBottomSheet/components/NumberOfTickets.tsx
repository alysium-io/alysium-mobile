import { Text, View } from '@atomic';
import { Formatting } from '@etc';
import { CreateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-create.dto';
import { TextInputApi } from '@hooks';
import { EditableNumericInputWithLabel } from '@molecules';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface NumberOfTicketsProps {
	formMethods: UseFormReturn<CreateTicketTypeBodyDto>;
	numberOfTicketsTextInputApi: TextInputApi;
}

const NumberOfTickets: React.FC<NumberOfTicketsProps> = ({
	formMethods,
	numberOfTicketsTextInputApi
}) => {
	return (
		<View margin='m'>
			<Controller
				name='num_available'
				control={formMethods.control}
				render={({ field: { onChange, onBlur, value } }) => (
					<EditableNumericInputWithLabel
						label='# of Tickets'
						textInputApi={numberOfTicketsTextInputApi}
						placeholder='10, 50, 100, etc.'
						onChangeText={onChange}
						onBlur={onBlur}
						value={Formatting.formatCommaSeparatedNumber(value)}
					/>
				)}
			/>
			<Text variant='paragraph-small' color='t2' margin='l' marginLeft='s'>
				How many tickets should be available?
			</Text>
		</View>
	);
};

export default NumberOfTickets;
