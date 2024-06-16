import { Text, View } from '@atomic';
import { Formatting } from '@etc';
import { CreateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-create.dto';
import { TextInputApi } from '@hooks';
import { EditableNumericInputWithLabel } from '@molecules';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface PriceProps {
	formMethods: UseFormReturn<CreateTicketTypeBodyDto>;
	ticketPriceTextInputApi: TextInputApi;
}

const Price: React.FC<PriceProps> = ({
	formMethods,
	ticketPriceTextInputApi
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
						onBlur={onBlur}
						value={Formatting.formatCommaSeparatedNumber(value)}
					/>
				)}
			/>
			<Text variant='paragraph-small' color='t2' margin='l' marginLeft='s'>
				How much should this ticket cost?
			</Text>
		</View>
	);
};

export default Price;
