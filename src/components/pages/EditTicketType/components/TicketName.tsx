import { View } from '@atomic';
import { UpdateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-update.dto';
import { LargeTextInput } from '@molecules';
import { OnSubmitHandler } from '@types';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface TicketNameProps {
	formMethods: UseFormReturn<UpdateTicketTypeBodyDto>;
	onSubmit: OnSubmitHandler;
}

const TicketName: React.FC<TicketNameProps> = ({ formMethods, onSubmit }) => {
	return (
		<View margin='l'>
			<Controller
				name='name'
				control={formMethods.control}
				rules={{ required: true }}
				render={({ field: { onChange, onBlur, value } }) => (
					<LargeTextInput
						placeholder='Ticket name'
						onChangeText={onChange}
						textAlign='center'
						onBlur={() => {
							onBlur();
							onSubmit();
						}}
						value={value}
					/>
				)}
			/>
		</View>
	);
};

export default TicketName;
