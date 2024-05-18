import { View } from '@atomic';
import { UpdateEventBodyDto } from '@flux/api/event/dto/event-update.dto';
import { LargeTextInput } from '@molecules';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface EventNameProps {
	formMethods: UseFormReturn<UpdateEventBodyDto>;
}

const EventName: React.FC<EventNameProps> = ({ formMethods }) => {
	return (
		<View marginHorizontal='m' marginTop='l'>
			<Controller
				name='name'
				control={formMethods.control}
				rules={{ required: true }}
				render={({ field: { onChange, onBlur, value } }) => (
					<LargeTextInput
						placeholder='Event name'
						onChangeText={onChange}
						textAlign='center'
						onBlur={onBlur}
						value={value}
					/>
				)}
			/>
		</View>
	);
};

export default EventName;
