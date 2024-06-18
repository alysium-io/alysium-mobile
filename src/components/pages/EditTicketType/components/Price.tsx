import { Text, View } from '@atomic';
import { Formatting } from '@etc';
import { UpdateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-update.dto';
import { TextInputApi } from '@hooks';
import { EditableNumericInputWithLabel } from '@molecules';
import { OnSubmitHandler } from '@types';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface PriceProps {
	formMethods: UseFormReturn<UpdateTicketTypeBodyDto>;
	ticketPriceTextInputApi: TextInputApi;
	onSubmit: OnSubmitHandler;
}

const Price: React.FC<PriceProps> = ({
	formMethods,
	ticketPriceTextInputApi,
	onSubmit
}) => {
	return (
		<View margin='m'>
			<Controller
				name='price'
				control={formMethods.control}
				render={({ field: { onChange, onBlur, value } }) => (
					<EditableNumericInputWithLabel
						label='Ticket Price'
						textInputApi={ticketPriceTextInputApi}
						placeholder='$20.00, $50.00, etc.'
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
				How much should this ticket cost?
			</Text>
		</View>
	);
};

export default Price;
