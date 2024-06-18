import { Text, View } from '@atomic';
import { Formatting } from '@etc';
import { UpdateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-update.dto';
import { TextInputApi } from '@hooks';
import { EditableNumericInputWithLabel } from '@molecules';
import { OnSubmitHandler } from '@types';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface NumberOfTicketsProps {
	formMethods: UseFormReturn<UpdateTicketTypeBodyDto>;
	numberOfTicketsTextInputApi: TextInputApi;
	onSubmit: OnSubmitHandler;
}

const NumberOfTickets: React.FC<NumberOfTicketsProps> = ({
	formMethods,
	numberOfTicketsTextInputApi,
	onSubmit
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
						onBlur={() => {
							onBlur();
							onSubmit();
						}}
						value={Formatting.formatCommaSeparatedNumber(value)}
						labelColor='t1'
					/>
				)}
			/>
			<Text variant='paragraph-small' color='t3' margin='s'>
				How many tickets should be available?
			</Text>
		</View>
	);
};

export default NumberOfTickets;
